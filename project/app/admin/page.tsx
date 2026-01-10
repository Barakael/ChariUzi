"use client";

import { useMemo, useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { AdminLayout } from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ManualReservationForm } from "@/components/manual-reservation-form";
import { useBooking } from "@/lib/booking-context";

export default function AdminPage() {
  const { user, loading, rooms, reservations, stats, markReservationPaid } =
    useBooking();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const paidTotal = useMemo(
    () =>
      reservations
        .filter((r) => r.status === "paid")
        .reduce((acc, curr) => acc + curr.totalPrice, 0),
    [reservations]
  );

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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <StatCard label="Total Reservations" value={stats?.total_reservations ?? 0} />
          <StatCard label="Active" value={stats?.active_reservations ?? 0} />
          <StatCard
            label="Paid"
            value={stats?.paid_reservations ?? 0}
            helper={`$${paidTotal.toFixed(0)} collected`}
          />
          <StatCard label="Rooms" value={rooms.length} />
          <StatCard label="Revenue" value={`$${stats?.total_revenue?.toFixed(0) ?? 0}`} />
        </div>

        {/* Manual Reservation Form */}
        <ManualReservationForm />

        {/* Reservations Table */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">
              All Reservations
            </h2>
            <p className="text-sm text-slate-500">
              Manage customer bookings and payments
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-6 text-left text-slate-600 font-medium">
                    Guest
                  </th>
                  <th className="py-3 px-6 text-left text-slate-600 font-medium">
                    Room
                  </th>
                  <th className="py-3 px-6 text-left text-slate-600 font-medium">
                    Check-in
                  </th>
                  <th className="py-3 px-6 text-left text-slate-600 font-medium">
                    Check-out
                  </th>
                  <th className="py-3 px-6 text-left text-slate-600 font-medium">
                    Nights
                  </th>
                  <th className="py-3 px-6 text-left text-slate-600 font-medium">
                    Total
                  </th>
                  <th className="py-3 px-6 text-left text-slate-600 font-medium">
                    Status
                  </th>
                  <th className="py-3 px-6 text-left text-slate-600 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {reservations.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-500">
                      No reservations yet
                    </td>
                  </tr>
                ) : (
                  reservations.map((res) => {
                    const room = rooms.find((r) => r.id === res.roomId || r.id === res.room_id);
                    return (
                      <tr key={res.id} className="hover:bg-slate-50">
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-medium text-slate-900">
                              {res.userName || res.user?.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {res.userEmail || res.user?.email}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-slate-700">
                          {room?.name ?? "Room"}
                        </td>
                        <td className="py-4 px-6 text-slate-600">
                          {new Date(res.startDate || res.start_date).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6 text-slate-600">
                          {new Date(res.endDate || res.end_date).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6 text-slate-600">
                          {res.nights}
                        </td>
                        <td className="py-4 px-6 font-medium text-slate-900">
                          ${(res.totalPrice || res.total_price)?.toFixed(0)}
                        </td>
                        <td className="py-4 px-6">
                          <Badge
                            variant={
                              res.status === "paid"
                                ? "secondary"
                                : res.status === "cancelled"
                                ? "destructive"
                                : "outline"
                            }
                            className={
                              res.status === "paid"
                                ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                : res.status === "pending-payment"
                                ? "bg-amber-100 text-amber-700 border-amber-200"
                                : ""
                            }
                          >
                            {res.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-6">
                          {res.status === "pending-payment" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => markReservationPaid(res.id)}
                              className="text-sky-600 hover:text-sky-700"
                            >
                              Mark Paid
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string | number;
  helper?: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      {helper && <p className="text-xs text-slate-500 mt-1">{helper}</p>}
    </div>
  );
}
