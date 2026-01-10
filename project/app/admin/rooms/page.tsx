"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { AdminLayout } from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useBooking, ServiceOption } from "@/lib/booking-context";
import { Plus } from "lucide-react";
import { ImageUpload } from "@/components/image-upload";

const serviceOptions: { key: ServiceOption; label: string }[] = [
  { key: "wifi", label: "WiFi" },
  { key: "breakfast", label: "Breakfast" },
  { key: "parking", label: "Parking" },
  { key: "pool", label: "Pool" },
  { key: "air-conditioning", label: "Air Conditioning" },
  { key: "laundry", label: "Laundry" },
  { key: "tv", label: "TV" },
  { key: "workspace", label: "Workspace" },
];

export default function AdminRoomsPage() {
  const { user, loading, rooms, addRoom } = useBooking();
  const [mounted, setMounted] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    location: "Uzi Island, Zanzibar",
    imageUrl: "",
    pricePerNight: 250,
    amenities: "WiFi, TV, Air conditioning",
    services: new Set<ServiceOption>(["wifi", "breakfast"]),
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    redirect("/");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRoom({
      name: formState.name,
      description: formState.description,
      location: formState.location,
      imageUrl: formState.imageUrl,
      rating: 4.8,
      pricePerNight: Number(formState.pricePerNight) || 0,
      amenities: formState.amenities
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
      services: Array.from(formState.services),
      featured: false,
      capacity: 2,
    });
    setFormState({
      name: "",
      description: "",
      location: "Uzi Island, Zanzibar",
      imageUrl: "",
      pricePerNight: 250,
      amenities: "WiFi, TV, Air conditioning",
      services: new Set<ServiceOption>(["wifi", "breakfast"]),
    });
    setIsFormOpen(false);
  };

  const toggleService = (service: ServiceOption) => {
    setFormState((prev) => {
      const next = new Set(prev.services);
      if (next.has(service)) next.delete(service);
      else next.add(service);
      return { ...prev, services: next };
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Rooms</h2>
            <p className="text-sm text-slate-500">
              Manage your hotel rooms and availability
            </p>
          </div>
          {!isFormOpen && (
            <Button
              onClick={() => setIsFormOpen(true)}
              className="bg-sky-600 hover:bg-sky-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Room
            </Button>
          )}
        </div>

        {isFormOpen && (
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Add New Room
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Room Name</Label>
                  <Input
                    id="name"
                    placeholder="Deluxe Ocean View"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, name: e.target.value }))
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price per Night ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formState.pricePerNight}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        pricePerNight: Number(e.target.value),
                      }))
                    }
                    min={0}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the room features..."
                  value={formState.description}
                  onChange={(e) =>
                    setFormState((s) => ({
                      ...s,
                      description: e.target.value,
                    }))
                  }
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Uzi Island, Zanzibar"
                  value={formState.location}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, location: e.target.value }))
                  }
                />
              </div>

              <div>
                <Label>Room Image</Label>
                <ImageUpload
                  value={formState.imageUrl}
                  onChange={(url) =>
                    setFormState((s) => ({ ...s, imageUrl: url }))
                  }
                />
              </div>

              <div>
                <Label htmlFor="amenities">Amenities (comma separated)</Label>
                <Input
                  id="amenities"
                  placeholder="WiFi, TV, Air conditioning"
                  value={formState.amenities}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, amenities: e.target.value }))
                  }
                />
              </div>

              <div>
                <Label>Services</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                  {serviceOptions.map((option) => (
                    <label
                      key={option.key}
                      className="flex items-center gap-2 text-sm font-medium text-slate-700 border rounded-lg px-3 py-2 cursor-pointer hover:bg-slate-50"
                    >
                      <Checkbox
                        checked={formState.services.has(option.key)}
                        onCheckedChange={() => toggleService(option.key)}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700 text-white"
              >
                Add Room
              </Button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={room.imageUrl || room.image_url}
                alt={room.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-slate-900">
                  {room.name}
                </h3>
                <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                  {room.description}
                </p>
                <p className="text-sm text-slate-500 mt-2">{room.location}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold text-slate-900">
                    ${room.pricePerNight || room.price_per_night}/night
                  </span>
                  <span className="text-sm text-slate-500">
                    ⭐ {room.rating || 4.8}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {rooms.length === 0 && !isFormOpen && (
          <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
            <p className="text-slate-500">No rooms yet. Add your first room!</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
