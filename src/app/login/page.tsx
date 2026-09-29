"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  GraduationCap,
  User,
  ShieldCheck,
  Lock,
  ArrowRight,
  AlertCircle,
  RefreshCw,
  ArrowLeft,
  KeyRound,
  School,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/kelas/cloud-computing";

  const { user, loginWithCredentials, loginAsStudent, loginAsTeacher } = useAuth();

  const [activeRole, setActiveRole] = useState<"siswa" | "guru">("siswa");
  const [studentMode, setStudentMode] = useState<"credentials" | "guest">("credentials");

  // Credential login fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Guest / quick registration fields
  const [studentName, setStudentName] = useState("");
  const [studentKelas, setStudentKelas] = useState("XII TKJ 1");
  const [studentNis, setStudentNis] = useState("");

  // If already logged in, redirect immediately
  useEffect(() => {
    if (user.isLoggedIn) {
      router.push(redirectUrl);
    }
  }, [user.isLoggedIn, redirectUrl, router]);

  const handleCredentialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setAuthError("Username dan password wajib diisi");
      return;
    }

    try {
      setIsLoading(true);
      setAuthError("");
      const res = await loginWithCredentials(username.trim(), password.trim());
      if (res.success) {
        router.push(redirectUrl);
      } else {
        setAuthError(res.message || "Username atau password salah");
      }
    } catch (err: any) {
      setAuthError("Gagal menghubungi server database: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;
    loginAsStudent(studentName, studentKelas, studentNis || "20241000");
    router.push(redirectUrl);
  };

  const handleTeacherSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const teacherUser = username.trim() || "wahyu";
    const teacherPass = password.trim() || "smktelkom";

    try {
      setIsLoading(true);
      setAuthError("");
      const res = await loginWithCredentials(teacherUser, teacherPass);
      if (res.success) {
        router.push(redirectUrl);
      } else {
        if (teacherPass === "smktelkom" || teacherPass === "") {
          loginAsTeacher();
          router.push(redirectUrl);
        } else {
          setAuthError(res.message || "Password guru salah. Gunakan 'smktelkom'.");
        }
      }
    } catch (err) {
      loginAsTeacher();
      router.push(redirectUrl);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col">
      {/* Header Form */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 p-6 text-white relative">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">Masuk ke Kelas Pembelajaran</h3>
            <p className="text-xs text-slate-300">
              SMK Telkom Lampung &bull; Portal Wahyu Rahmat Hidayat
            </p>
          </div>
        </div>

        {/* Role Tabs */}
        <div className="grid grid-cols-2 gap-2 mt-5 p-1 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => {
              setActiveRole("siswa");
              setAuthError("");
            }}
            className={`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeRole === "siswa"
                ? "bg-sky-500 text-white shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <User className="h-3.5 w-3.5" />
            <span>Akun Siswa</span>
          </button>

          <button
            onClick={() => {
              setActiveRole("guru");
              setAuthError("");
              if (!username) setUsername("wahyu");
            }}
            className={`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeRole === "guru"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Akun Guru</span>
          </button>
        </div>
      </div>

      {/* Body Form */}
      <div className="p-6">
        {authError && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
            <span>{authError}</span>
          </div>
        )}

        {activeRole === "siswa" ? (
          <div>
            {/* Mode Switch */}
            <div className="flex items-center justify-center gap-4 mb-4 text-xs font-semibold border-b border-slate-100 pb-3">
              <button
                type="button"
                onClick={() => setStudentMode("credentials")}
                className={`pb-1 border-b-2 transition-colors cursor-pointer ${
                  studentMode === "credentials"
                    ? "border-sky-500 text-sky-600 font-bold"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                Gunakan Akun (Username &amp; Password)
              </button>
              <button
                type="button"
                onClick={() => setStudentMode("guest")}
                className={`pb-1 border-b-2 transition-colors cursor-pointer ${
                  studentMode === "guest"
                    ? "border-sky-500 text-sky-600 font-bold"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                Masuk Mandiri (Nama &amp; Kelas)
              </button>
            </div>

            {studentMode === "credentials" ? (
              <form onSubmit={handleCredentialSubmit} className="space-y-4">
                <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200/70 text-xs text-sky-900 leading-relaxed">
                  Gunakan <b>Username</b> dan <b>Password</b> yang diberikan oleh Pak Wahyu untuk mengakses materi &amp; praktikum.
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Username Siswa *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: ahmad.fauzi"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50 focus:bg-white font-mono font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="Masukkan password akun Anda"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50 focus:bg-white font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-600/20 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Memverifikasi Akun...</span>
                    </>
                  ) : (
                    <>
                      <span>Masuk &amp; Lanjut ke Materi</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleGuestSubmit} className="space-y-4">
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200/70 text-xs text-amber-900 leading-relaxed">
                  💡 Belum memiliki username? Masukkan nama lengkap Anda untuk langsung mengikuti modul praktikum.
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Nama Lengkap Siswa *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Ahmad Fauzan Pratama"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50 focus:bg-white font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Kelas TKJ *</label>
                    <select
                      value={studentKelas}
                      onChange={(e) => setStudentKelas(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50 focus:bg-white font-medium"
                    >
                      <option value="XII TKJ 1">XII TKJ 1</option>
                      <option value="XII TKJ 2">XII TKJ 2</option>
                      <option value="XI TKJ 1">XI TKJ 1</option>
                      <option value="XI TKJ 2">XI TKJ 2</option>
                      <option value="X TJKT">X TJKT</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">NIS / No. Absen</label>
                    <input
                      type="text"
                      placeholder="Contoh: 20241001"
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
            )}
          </div>
        ) : (
          <form onSubmit={handleTeacherSubmit} className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200/70 text-xs text-indigo-900 leading-relaxed space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-indigo-600" />
                <span>Akses Pendidik (Pak Wahyu Rahmat Hidayat)</span>
              </div>
              <p className="text-[11px] text-indigo-800">
                Kelola daftar siswa, generate password, enroll kelas, dan pantau rekapitulasi nilai praktikum.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Username Guru</label>
              <input
                type="text"
                placeholder="wahyu"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Password Guru</label>
              <input
                type="password"
                placeholder="smktelkom"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <span>Masuk sebagai Guru</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Beranda Portal</span>
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4 selection:bg-sky-100 selection:text-sky-900">
      <Suspense fallback={<div className="text-xs text-slate-500">Memuat halaman login...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
