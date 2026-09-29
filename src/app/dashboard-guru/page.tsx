"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth, StudentSubmission } from "@/context/AuthContext";
import {
  ShieldCheck,
  Users,
  Award,
  CheckCircle2,
  XCircle,
  Download,
  Search,
  Filter,
  ArrowLeft,
  GraduationCap,
  Unlock,
  Lock,
  Sparkles,
  BookOpen,
} from "lucide-react";

export default function TeacherDashboardPage() {
  const { user, submissions, teacherBypassLocks, setTeacherBypassLocks, openLoginModal } =
    useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedMeeting, setSelectedMeeting] = useState("all");

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.nis.includes(searchQuery);
    const matchesClass = selectedClass === "all" || sub.kelas === selectedClass;
    const matchesMeeting =
      selectedMeeting === "all" || sub.pertemuan === Number(selectedMeeting);
    return matchesSearch && matchesClass && matchesMeeting;
  });

  const totalStudents = new Set(submissions.map((s) => s.nis)).size;
  const passedCount = submissions.filter((s) => s.passed).length;
  const avgScore =
    submissions.length > 0
      ? Math.round(
          submissions.reduce((acc, curr) => acc + curr.finalScore, 0) /
            submissions.length
        )
      : 0;

  const handleExportCSV = () => {
    if (submissions.length === 0) {
      alert("Belum ada data nilai siswa untuk diekspor.");
      return;
    }

    const headers = [
      "No",
      "Nama Siswa",
      "Kelas",
      "NIS",
      "Pertemuan",
      "Nilai Pre-Test",
      "Nilai Post-Test",
      "Nilai Akhir",
      "Status",
      "Waktu Selesai",
    ];

    const rows = filteredSubmissions.map((s, idx) => [
      idx + 1,
      `"${s.name}"`,
      s.kelas,
      s.nis,
      `Pertemuan ${s.pertemuan}`,
      s.preTestScore,
      s.postTestScore,
      s.finalScore,
      s.passed ? "LULUS" : "REMEDIAL",
      s.submittedAt,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Rekap_Nilai_Cloud_Computing_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header Bar */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Portal Guru</span>
            </Link>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm sm:text-base tracking-tight">
                  Dashboard Pemantauan Nilai Guru
                </span>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  Wahyu Rahmat Hidayat, S.Kom. &bull; SMK Telkom Lampung
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTeacherBypassLocks(!teacherBypassLocks)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                teacherBypassLocks
                  ? "bg-amber-100 text-amber-900 border border-amber-300"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              {teacherBypassLocks ? (
                <>
                  <Unlock className="h-3.5 w-3.5 text-amber-600" />
                  <span>Mode Demo: Semua Terbuka</span>
                </>
              ) : (
                <>
                  <Lock className="h-3.5 w-3.5 text-slate-500" />
                  <span>Mode Terkunci (Siswa)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 flex-1">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase">
                Total Siswa Unik
              </div>
              <div className="text-2xl font-black text-slate-900 font-mono">
                {totalStudents} <span className="text-xs font-normal">Siswa</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase">
                Total Penyelesaian
              </div>
              <div className="text-2xl font-black text-slate-900 font-mono">
                {passedCount} <span className="text-xs font-normal">Lulus</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase">
                Rata-rata Nilai
              </div>
              <div className="text-2xl font-black text-slate-900 font-mono">
                {avgScore} <span className="text-xs font-normal">/ 100</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase">
                Standar KKM Lab
              </div>
              <div className="text-2xl font-black text-slate-900 font-mono">
                75 <span className="text-xs font-normal">Poin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama siswa atau NIS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white"
              />
            </div>

            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white font-medium"
            >
              <option value="all">Semua Kelas TKJ</option>
              <option value="XI TKJ 1">XI TKJ 1</option>
              <option value="XI TKJ 2">XI TKJ 2</option>
              <option value="XII TKJ 1">XII TKJ 1</option>
              <option value="XII TKJ 2">XII TKJ 2</option>
            </select>

            <select
              value={selectedMeeting}
              onChange={(e) => setSelectedMeeting(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white font-medium"
            >
              <option value="all">Semua Pertemuan</option>
              <option value="1">Pertemuan 1</option>
              <option value="2">Pertemuan 2</option>
            </select>
          </div>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all cursor-pointer shrink-0"
          >
            <Download className="h-4 w-4" />
            <span>Ekspor ke Excel/CSV</span>
          </button>
        </div>

        {/* Table Submissions */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
              Daftar Rekapitulasi Nilai Siswa
            </h3>
            <span className="text-xs text-slate-500">
              Menampilkan <b>{filteredSubmissions.length}</b> data
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">No</th>
                  <th className="p-4">Nama Lengkap Siswa</th>
                  <th className="p-4">Kelas</th>
                  <th className="p-4">NIS</th>
                  <th className="p-4">Materi</th>
                  <th className="p-4 text-center">Pre-Test</th>
                  <th className="p-4 text-center">Post-Test</th>
                  <th className="p-4 text-center">Nilai Akhir</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4">Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSubmissions.length > 0 ? (
                  filteredSubmissions.map((sub, idx) => (
                    <tr
                      key={sub.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="p-4 font-mono text-slate-400">{idx + 1}</td>
                      <td className="p-4 font-bold text-slate-900">
                        {sub.name}
                      </td>
                      <td className="p-4 font-medium text-slate-600">
                        {sub.kelas}
                      </td>
                      <td className="p-4 font-mono text-slate-500">{sub.nis}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 font-semibold text-[11px] border border-sky-200">
                          Ptm {sub.pertemuan}
                        </span>
                      </td>
                      <td className="p-4 text-center font-mono font-medium text-slate-600">
                        {sub.preTestScore}
                      </td>
                      <td className="p-4 text-center font-mono font-medium text-slate-600">
                        {sub.postTestScore}
                      </td>
                      <td className="p-4 text-center font-mono font-bold text-slate-900 text-sm">
                        {sub.finalScore}
                      </td>
                      <td className="p-4 text-center">
                        {sub.passed ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>LULUS</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 font-bold text-[10px] border border-rose-200">
                            <XCircle className="h-3 w-3" />
                            <span>REMEDIAL</span>
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-slate-400 text-[11px]">
                        {sub.submittedAt}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="p-8 text-center text-slate-400">
                      Tidak ada data siswa yang cocok dengan filter pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-[11px]">
          &copy; {new Date().getFullYear()} TEKAJE LABS &bull; Dashboard Pendidik SMK Telkom Lampung
        </div>
      </footer>
    </div>
  );
}
