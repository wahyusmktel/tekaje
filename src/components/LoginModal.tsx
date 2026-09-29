"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  X,
  User,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  School,
} from "lucide-react";

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, loginAsStudent, loginAsTeacher } =
    useAuth();

  const [activeTab, setActiveTab] = useState<"siswa" | "guru">("siswa");
  const [studentName, setStudentName] = useState("");
  const [studentKelas, setStudentKelas] = useState("XI TKJ 1");
  const [studentNis, setStudentNis] = useState("");
  const [teacherPass, setTeacherPass] = useState("");
  const [teacherError, setTeacherError] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;
    loginAsStudent(studentName, studentKelas, studentNis || "2401000");
  };

  const handleTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default pass or instant login for Pak Wahyu
    if (teacherPass.trim().toLowerCase() === "smktelkom" || teacherPass.trim() === "") {
      loginAsTeacher();
    } else {
      setTeacherError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 p-6 text-white relative">
          <button
            onClick={closeLoginModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Tutup Modal"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                Masuk ke Kelas TKJ
              </h3>
              <p className="text-xs text-slate-300">
                SMK Telkom Lampung &bull; Portal Wahyu Rahmat Hidayat
              </p>
            </div>
          </div>

          {/* Role Tabs */}
          <div className="grid grid-cols-2 gap-2 mt-5 p-1 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setActiveTab("siswa")}
              className={`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === "siswa"
                  ? "bg-sky-500 text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <User className="h-3.5 w-3.5" />
              <span>Akun Siswa</span>
            </button>

            <button
              onClick={() => setActiveTab("guru")}
              className={`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === "guru"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Akun Guru</span>
            </button>
          </div>
        </div>

        {/* Body Modal */}
        <div className="p-6">
          {activeTab === "siswa" ? (
            <form onSubmit={handleStudentSubmit} className="space-y-4">
              <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200/70 text-xs text-sky-900 leading-relaxed">
                💡 <b>Perhatian Siswa:</b> Masukkan nama lengkap Anda dengan benar karena nama ini akan tercetak otomatis pada <b>Sertifikat Kelulusan &amp; Nilai Praktikum</b>.
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Nama Lengkap Siswa *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ahmad Fauzan Pratama"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50 focus:bg-white transition-all font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Kelas TKJ *
                  </label>
                  <select
                    value={studentKelas}
                    onChange={(e) => setStudentKelas(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50 focus:bg-white font-medium"
                  >
                    <option value="XI TKJ 1">XI TKJ 1</option>
                    <option value="XI TKJ 2">XI TKJ 2</option>
                    <option value="XII TKJ 1">XII TKJ 1</option>
                    <option value="XII TKJ 2">XII TKJ 2</option>
                    <option value="X TJKT">X TJKT</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    NIS / No. Absen
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 2401001"
                    value={studentNis}
                    onChange={(e) => setStudentNis(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50 focus:bg-white font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!studentName.trim()}
                className="w-full mt-2 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-600/20 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Mulai Belajar &amp; Praktikum</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleTeacherSubmit} className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200/70 text-xs text-indigo-900 leading-relaxed space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-indigo-600" />
                  <span>Akses Pendidik (Pak Wahyu)</span>
                </div>
                <p className="text-[11px] text-indigo-800">
                  Sebagai guru, Anda dapat memantau seluruh nilai praktikum siswa,
                  membuka semua gembok tahap (demo mode), dan mengunduh rekap nilai.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Password Guru (Opsional / Ketik 'smktelkom')
                </label>
                <input
                  type="password"
                  placeholder="Ketik password atau langsung klik Masuk"
                  value={teacherPass}
                  onChange={(e) => {
                    setTeacherPass(e.target.value);
                    setTeacherError(false);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all"
                />
                {teacherError && (
                  <p className="text-[11px] text-rose-600">
                    Password salah. Gunakan 'smktelkom' atau kosongkan untuk akses cepat.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Masuk sebagai Guru Pengampu</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
