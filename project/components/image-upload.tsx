"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "./ui/button";

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

const STORAGE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "room-images";

export function ImageUpload({ value, onChange, className = "" }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(value || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setPreview(value || "");
  }, [value]);

  const uploadToSupabase = useCallback(async (file: File) => {
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.]+/g, "-").toLowerCase();
    const extension = sanitizedName.includes(".") ? sanitizedName.split(".").pop() : "jpg";
    const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
    const filePath = `rooms/${uniqueName}`;

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);
    if (!data?.publicUrl) {
      throw new Error("Unable to retrieve image URL");
    }

    return data.publicUrl;
  }, []);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB.");
      return;
    }

    setError(null);
    setUploading(true);

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    try {
      const publicUrl = await uploadToSupabase(file);
      URL.revokeObjectURL(objectUrl);
      setPreview(publicUrl);
      onChange(publicUrl);
    } catch (err) {
      console.error("Failed to upload image", err);
      setPreview(value || "");
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }, [onChange, uploadToSupabase, value]);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFile(file);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFile(file);
    }
  }, [handleFile]);

  const handleRemove = useCallback(() => {
    setPreview("");
    onChange("");
    setError(null);
  }, [onChange]);

  const handleUrlInput = useCallback(() => {
    const url = prompt("Enter image URL:");
    if (!url) return;

    try {
      const parsed = new URL(url);
      setError(null);
      setPreview(parsed.toString());
      onChange(parsed.toString());
    } catch {
      setError("Please enter a valid URL.");
    }
  }, [onChange]);

  return (
    <div className={className}>
      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border border-slate-200"
          />
          {uploading && (
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-sm rounded-lg">
              <Loader2 className="w-6 h-6 animate-spin mb-2" />
              Uploading...
            </div>
          )}
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleRemove}
            disabled={uploading}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? "border-sky-500 bg-sky-50"
              : "border-slate-300 bg-slate-50 hover:border-slate-400"
          } ${uploading ? "opacity-60 pointer-events-none" : ""}`}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
              <Upload className="w-6 h-6 text-slate-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">
                Drop an image here, or click to browse
              </p>
              <p className="text-xs text-slate-500 mt-1">
                PNG, JPG up to 5MB
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Browse Files
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleUrlInput}
                disabled={uploading}
              >
                Use URL
              </Button>
            </div>
          </div>
          <input
            ref={fileInputRef}
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
            disabled={uploading}
          />
        </div>
      )}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
