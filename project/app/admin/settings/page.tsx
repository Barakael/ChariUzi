"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { AdminLayout } from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBooking } from "@/lib/booking-context";

export default function AdminSettingsPage() {
  const { user, loading } = useBooking();
  const [mounted, setMounted] = useState(false);

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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
          <p className="text-sm text-slate-500">
            Manage your account and preferences
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Profile Information
          </h3>
          <div className="space-y-4 max-w-md">
            <div>
              <Label>Name</Label>
              <Input value={user.name} disabled />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={user.email} disabled />
            </div>
            <div>
              <Label>Role</Label>
              <Input value={user.role} disabled className="capitalize" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Hotel Information
          </h3>
          <p className="text-sm text-slate-500">
            Settings for hotel information coming soon...
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
