"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  User,
  GraduationCap,
  ShieldCheck,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  Users,
} from "lucide-react";

export default function UserNavPill() {
  const { user, openLoginModal, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (!user.isLoggedIn) {
    return (
      <button
        onClick={openLoginModal}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-all cursor-pointer shadow-xs"
      >
        <User className="h-3.5 w-3.5" />
        <span>Masuk Akun</span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-all cursor-pointer"
      >
        <div
          className={`h-6 w-6 rounded-lg flex items-center justify-center text-white text-[11px] font-bold ${
            user.role === "guru" ? "bg-indigo-600" : "bg-sky-500"
          }`}
        >
          {user.role === "guru" ? (
            <ShieldCheck className="h-3.5 w-3.5" />
          ) : (
            <GraduationCap className="h-3.5 w-3.5" />
          )}
        </div>

        <div className="text-left hidden sm:block max-w-[130px] truncate">
          <div className="font-bold text-slate-800 text-[11px] truncate">
            {user.name}
          </div>
          <div className="text-[10px] text-slate-500 font-medium">
            {user.role === "guru" ? "Guru Pengampu" : user.kelas}
          </div>
        </div>

        <ChevronDown className="h-3 w-3 text-slate-400" />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-fade-in text-xs space-y-1">
          <div className="p-2 border-b border-slate-100">
            <div className="font-bold text-slate-900 truncate">{user.name}</div>
            <div className="text-[10px] text-slate-500">
              {user.role === "guru" ? "NIP: 198801012015011001" : `NIS: ${user.nis}`}
            </div>
          </div>

          {user.role === "guru" && (
            <>
              <Link
                href="/manajemen-guru"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2 p-2 rounded-xl hover:bg-indigo-50 text-indigo-700 font-semibold transition-colors"
              >
                <Users className="h-4 w-4" />
                <span>Manajemen Siswa &amp; Kelas</span>
              </Link>
              <Link
                href="/dashboard-guru"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2 p-2 rounded-xl hover:bg-indigo-50 text-indigo-700 font-semibold transition-colors"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard Rekap Nilai</span>
              </Link>
            </>
          )}

          <button
            onClick={() => {
              setDropdownOpen(false);
              openLoginModal();
            }}
            className="w-full text-left flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
          >
            <User className="h-4 w-4 text-slate-400" />
            <span>Ganti Akun</span>
          </button>

          <button
            onClick={() => {
              setDropdownOpen(false);
              logout();
            }}
            className="w-full text-left flex items-center gap-2 p-2 rounded-xl hover:bg-rose-50 text-rose-600 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      )}
    </div>
  );
}
