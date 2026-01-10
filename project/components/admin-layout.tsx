"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Hotel, 
  Calendar, 
  Settings, 
  LogOut 
} from "lucide-react";
import { useBooking } from "@/lib/booking-context";
import { Button } from "./ui/button";

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: "/admin", label: "Reservations", icon: Calendar },
  { href: "/admin/rooms", label: "Rooms", icon: Hotel },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const { user, signOut } = useBooking();

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <Link href="/admin" className="flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-sky-600" />
            <span className="font-bold text-lg text-slate-900">ChariUzi Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-sky-50 text-sky-700 font-medium"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="mb-3 px-4">
            <p className="text-xs text-slate-500">Logged in as</p>
            <p className="text-sm font-medium text-slate-900">{user?.name}</p>
            <p className="text-xs text-slate-500">{user?.email}</p>
          </div>
          <Button
            onClick={() => signOut()}
            variant="outline"
            className="w-full justify-start text-slate-600 hover:text-slate-900"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
              <p className="text-sm text-slate-500">Manage your hotel bookings and rooms</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">
                View Website
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
