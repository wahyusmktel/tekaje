"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  ShieldCheck,
  Users,
  UserPlus,
  FileSpreadsheet,
  Download,
  Upload,
  BookOpen,
  ArrowLeft,
  Search,
  RefreshCw,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Trash2,
  Edit3,
  X,
  Printer,
  ChevronRight,
  Layers,
  GraduationCap,
} from "lucide-react";

interface StudentItem {
  id: number;
  username: string;
  password: string;
  name: string;
  nis: string;
  class_name: string;
  created_at: string;
  courses: string[];
  completed_labs?: number;
}

const AVAILABLE_COURSES = [
  { slug: "cloud-computing", name: "Cloud Computing (Komputasi Awan)" },
  { slug: "administrasi-server", name: "Administrasi Server Jaringan (ASJ)" },
  { slug: "administrasi-infrastruktur", name: "Administrasi Infrastruktur Jaringan (AIJ)" },
  { slug: "cyber-security", name: "Keamanan Jaringan & Cyber Security" },
];

export default function ManajemenGuruPage() {
  const { user, openLoginModal } = useAuth();

  const [activeTab, setActiveTab] = useState<"siswa" | "enroll" | "import" | "kartu">("siswa");
  const [students, setStudents] = useState<StudentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");

  // Modal State: Tambah / Edit Siswa
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    nis: "",
    class_name: "XII TKJ 1",
    username: "",
    password: "",
    courses: ["cloud-computing"],
  });

  // Import State
  const [importFile, setImportFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<{ count: number; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Copied state indicator
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Fetch Students from API
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const res = await fetch("/api/guru/students");
      const data = await res.json();
      if (data.success) {
        setStudents(data.students);
      } else {
        setErrorMsg(data.message || "Gagal memuat data siswa");
      }
    } catch (err: any) {
      setErrorMsg("Koneksi ke database gagal: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Generate clean random password
  const generatePassword = () => {
    const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    let rand = "";
    for (let i = 0; i < 4; i++) {
      rand += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ ...prev, password: `TKJ#${rand}` }));
  };

  // Generate clean username from name
  const generateUsername = (name: string, nis?: string) => {
    if (nis && nis.trim()) {
      const cleanNis = nis.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
      if (cleanNis) {
        setFormData((prev) => ({ ...prev, username: `siswa.${cleanNis}` }));
        return;
      }
    }
    const clean = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .slice(0, 2)
      .join(".");
    const randNum = Math.floor(10 + Math.random() * 90);
    setFormData((prev) => ({ ...prev, username: `${clean || "siswa"}.${randNum}` }));
  };

  const handleOpenAddModal = () => {
    setEditingStudent(null);
    const initialPassChars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    let rand = "";
    for (let i = 0; i < 4; i++) {
      rand += initialPassChars.charAt(Math.floor(Math.random() * initialPassChars.length));
    }
    setFormData({
      name: "",
      nis: "",
      class_name: "XII TKJ 1",
      username: "",
      password: `TKJ#${rand}`,
      courses: ["cloud-computing"],
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (s: StudentItem) => {
    setEditingStudent(s);
    setFormData({
      name: s.name,
      nis: s.nis === "-" ? "" : s.nis,
      class_name: s.class_name,
      username: s.username,
      password: s.password,
      courses: s.courses.length > 0 ? s.courses : ["cloud-computing"],
    });
    setIsModalOpen(true);
  };

  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      if (editingStudent) {
        // Update
        const res = await fetch("/api/guru/students", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingStudent.id,
            name: formData.name,
            nis: formData.nis,
            class_name: formData.class_name,
            username: formData.username,
            password: formData.password,
            courses: formData.courses,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setSuccessMsg("Data siswa berhasil diperbarui!");
          setIsModalOpen(false);
          fetchStudents();
        } else {
          alert(data.message || "Gagal memperbarui siswa");
        }
      } else {
        // Create
        const res = await fetch("/api/guru/students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success) {
          setSuccessMsg("Siswa baru berhasil ditambahkan!");
          setIsModalOpen(false);
          fetchStudents();
        } else {
          alert(data.message || "Gagal menambahkan siswa");
        }
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const handleDeleteStudent = async (id: number, name: string) => {
    if (!confirm(`Hapus data dan akses siswa "${name}"?`)) return;
    try {
      const res = await fetch(`/api/guru/students?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg(`Siswa "${name}" berhasil dihapus.`);
        fetchStudents();
      } else {
        alert(data.message || "Gagal menghapus siswa");
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const handleToggleCourse = async (studentId: number, courseSlug: string, currentEnrolled: boolean) => {
    try {
      const action = currentEnrolled ? "unenroll" : "enroll";
      const res = await fetch("/api/guru/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: studentId,
          course_slug: courseSlug,
          action,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStudents((prev) =>
          prev.map((s) => {
            if (s.id !== studentId) return s;
            const updatedCourses = currentEnrolled
              ? s.courses.filter((c) => c !== courseSlug)
              : [...s.courses, courseSlug];
            return { ...s, courses: updatedCourses };
          })
        );
      } else {
        alert(data.message || "Gagal mengubah enrollment");
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const handleCopyCredentials = (s: StudentItem) => {
    const text = `Akun Belajar Siswa TKJ:\nNama: ${s.name}\nKelas: ${s.class_name}\nUsername: ${s.username}\nPassword: ${s.password}\nLogin di Portal TKJ`;
    navigator.clipboard.writeText(text);
    setCopiedId(s.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleImportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!importFile) {
      alert("Pilih file Excel (.xlsx) atau CSV terlebih dahulu!");
      return;
    }

    try {
      setIsImporting(true);
      const fd = new FormData();
      fd.append("file", importFile);

      const res = await fetch("/api/guru/students/import", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (data.success) {
        setImportResult({ count: data.count, message: data.message });
        setImportFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        fetchStudents();
      } else {
        alert(data.message || "Gagal mengimpor file");
      }
    } catch (err: any) {
      alert("Error saat import: " + err.message);
    } finally {
      setIsImporting(false);
    }
  };

  // Filtered Students
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nis.includes(searchQuery);
    const matchesClass = selectedClass === "all" || s.class_name === selectedClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
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
                  Manajemen Siswa &amp; Kelas
                </span>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  Pusat Kelola Akun Siswa &bull; Database MySQL SMK Telkom Lampung
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/dashboard-guru"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Rekap Nilai Siswa</span>
            </Link>

            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-all cursor-pointer"
            >
              <UserPlus className="h-3.5 w-3.5" />
              <span>Tambah Siswa</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1 w-full">
        {/* Alerts */}
        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
            <button
              onClick={() => setSuccessMsg("")}
              className="text-emerald-600 hover:text-emerald-900 p-1 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between text-xs text-rose-800">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button
              onClick={() => setErrorMsg("")}
              className="text-rose-600 hover:text-rose-900 p-1 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-200/70 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveTab("siswa")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === "siswa"
                ? "bg-white text-indigo-700 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Daftar Siswa &amp; Akun ({students.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("enroll")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === "enroll"
                ? "bg-white text-indigo-700 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>Enrollment Kelas</span>
          </button>

          <button
            onClick={() => setActiveTab("import")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === "import"
                ? "bg-white text-indigo-700 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FileSpreadsheet className="h-4 w-4" />
            <span>Import Massal Excel/CSV</span>
          </button>

          <button
            onClick={() => setActiveTab("kartu")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === "kartu"
                ? "bg-white text-indigo-700 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Printer className="h-4 w-4" />
            <span>Cetak Kartu Login Siswa</span>
          </button>
        </div>

        {/* TAB 1: DAFTAR SISWA */}
        {activeTab === "siswa" && (
          <div className="space-y-6">
            {/* Filter and Action Bar */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari nama, username, atau NIS..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white font-medium"
                  />
                </div>

                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white font-medium"
                >
                  <option value="all">Semua Kelas</option>
                  <option value="XII TKJ 1">XII TKJ 1</option>
                  <option value="XII TKJ 2">XII TKJ 2</option>
                  <option value="XI TKJ 1">XI TKJ 1</option>
                  <option value="XI TKJ 2">XI TKJ 2</option>
                  <option value="X TJKT">X TJKT</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchStudents}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 cursor-pointer transition-colors"
                  title="Segarkan data"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>

                <a
                  href="/api/guru/students/template"
                  download="Template_Data_Siswa_TKJ.xlsx"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Template Excel</span>
                </a>
              </div>
            </div>

            {/* Student Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Daftar Akun Login Siswa
                  </h3>
                  <p className="text-xs text-slate-500">
                    Siswa menggunakan <b>Username</b> dan <b>Password</b> di bawah ini untuk masuk ke lab praktikum.
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                  {filteredStudents.length} siswa ditemukan
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
                      <th className="p-4">Username Login</th>
                      <th className="p-4">Password</th>
                      <th className="p-4">Kelas Terdaftar</th>
                      <th className="p-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loading ? (
                      <tr>
                        <td colSpan={8} className="p-10 text-center text-slate-400">
                          <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-indigo-500" />
                          <span>Menghubungkan ke database MySQL...</span>
                        </td>
                      </tr>
                    ) : filteredStudents.length > 0 ? (
                      filteredStudents.map((s, idx) => (
                        <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4 font-mono text-slate-400">{idx + 1}</td>
                          <td className="p-4">
                            <span className="font-bold text-slate-900 block">{s.name}</span>
                          </td>
                          <td className="p-4">
                            <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                              {s.class_name}
                            </span>
                          </td>
                          <td className="p-4 font-mono text-slate-500">{s.nis}</td>
                          <td className="p-4 font-mono font-bold text-sky-700 bg-sky-50/40">
                            {s.username}
                          </td>
                          <td className="p-4 font-mono font-medium text-slate-700">
                            <div className="flex items-center gap-1.5">
                              <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                                {s.password}
                              </span>
                              <button
                                onClick={() => handleCopyCredentials(s)}
                                className="p-1 text-slate-400 hover:text-indigo-600 rounded transition-colors cursor-pointer"
                                title="Salin info login siswa"
                              >
                                {copiedId === s.id ? (
                                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="h-3.5 w-3.5" />
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1">
                              {s.courses.map((c) => (
                                <span
                                  key={c}
                                  className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200/60"
                                >
                                  {c === "cloud-computing"
                                    ? "Cloud Computing"
                                    : c === "administrasi-server"
                                    ? "ASJ"
                                    : c === "administrasi-infrastruktur"
                                    ? "AIJ"
                                    : "Cyber Sec"}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => handleOpenEditModal(s)}
                                className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                                title="Edit Siswa"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteStudent(s.id, s.name)}
                                className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                title="Hapus Siswa"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="p-10 text-center text-slate-400">
                          Belum ada data siswa. Klik tombol <b>"Tambah Siswa"</b> atau import file Excel.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ENROLLMENT KELAS */}
        {activeTab === "enroll" && (
          <div className="space-y-6">
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <h3 className="font-extrabold text-base text-slate-900 mb-1">
                Atur Enrollment Siswa per Kelas Pembelajaran
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Centang mata pelajaran yang dapat diakses oleh masing-masing siswa. Siswa yang di-enroll akan langsung dapat mengakses modul praktikum dan hands-on lab.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-4">Siswa</th>
                      <th className="p-4">Kelas</th>
                      {AVAILABLE_COURSES.map((c) => (
                        <th key={c.slug} className="p-4 text-center">
                          {c.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {students.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4">
                          <span className="font-bold text-slate-900 block">{s.name}</span>
                          <span className="font-mono text-[10px] text-slate-400">@{s.username}</span>
                        </td>
                        <td className="p-4 font-semibold text-slate-600">{s.class_name}</td>
                        {AVAILABLE_COURSES.map((c) => {
                          const isEnrolled = s.courses.includes(c.slug);
                          return (
                            <td key={c.slug} className="p-4 text-center">
                              <label className="inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={isEnrolled}
                                  onChange={() => handleToggleCourse(s.id, c.slug, isEnrolled)}
                                  className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer"
                                />
                              </label>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: IMPORT MASSAL EXCEL */}
        {activeTab === "import" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Unggah Berkas Excel / CSV Data Siswa
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Gunakan template resmi untuk mengimpor seluruh data kelas secara instan.
                  </p>
                </div>

                <form onSubmit={handleImportSubmit} className="space-y-4">
                  <div className="border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-3xl p-8 text-center bg-slate-50 hover:bg-indigo-50/20 transition-all">
                    <FileSpreadsheet className="h-12 w-12 mx-auto text-indigo-500 mb-3" />
                    <p className="text-xs font-bold text-slate-700">
                      {importFile ? importFile.name : "Pilih file Excel (.xlsx) atau .csv dari komputer"}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Format kolom: NIS, Nama Lengkap, Kelas, Username, Password, Enroll Kelas
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".xlsx, .xls, .csv"
                      onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                      className="hidden"
                      id="excel-file-input"
                    />
                    <label
                      htmlFor="excel-file-input"
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-xs font-bold text-slate-700 shadow-xs cursor-pointer transition-colors"
                    >
                      <Upload className="h-3.5 w-3.5 text-indigo-600" />
                      <span>Telusuri File</span>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <a
                      href="/api/guru/students/template"
                      download="Template_Data_Siswa_TKJ.xlsx"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download Template Excel Format Standar</span>
                    </a>

                    <button
                      type="submit"
                      disabled={!importFile || isImporting}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {isImporting ? (
                        <>
                          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                          <span>Sedang Memproses...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="h-3.5 w-3.5" />
                          <span>Mulai Import ke Database</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {importResult && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">{importResult.message}</p>
                      <p className="text-[11px] text-emerald-700 mt-1">
                        Siswa yang baru diimpor telah otomatis dibuatkan username dan password dan siap login di portal.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Guide */}
            <div className="space-y-4">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                  <BookOpen className="h-4 w-4 text-indigo-600" />
                  <span>Petunjuk Format Import</span>
                </div>
                <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
                  <p>
                    1. <b>Nama Lengkap &amp; Kelas:</b> Wajib diisi agar siswa dapat tercatat dalam absensi modul.
                  </p>
                  <p>
                    2. <b>Username (Opsional):</b> Jika dikosongkan, sistem akan meng-generate otomatis dari nama depan siswa.
                  </p>
                  <p>
                    3. <b>Password (Opsional):</b> Jika dikosongkan, sistem akan otomatis membuat password unik yang aman (contoh: <code>TKJ#829</code>).
                  </p>
                  <p>
                    4. <b>Enroll Kelas:</b> Masukkan <code>cloud-computing</code> untuk mengizinkan akses ke modul lab saat ini.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CETAK KARTU LOGIN SISWA */}
        {activeTab === "kartu" && (
          <div className="space-y-6">
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  Cetak Kartu Login Siswa (Siap Gunting &amp; Bagikan)
                </h3>
                <p className="text-xs text-slate-500">
                  Cetak lembar kartu ini untuk dibagikan kepada siswa saat memasuki laboratorium komputer.
                </p>
              </div>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-sm cursor-pointer"
              >
                <Printer className="h-4 w-4" />
                <span>Cetak Semua Kartu (Ctrl + P)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {students.map((s) => (
                <div
                  key={s.id}
                  className="p-5 rounded-2xl bg-white border-2 border-dashed border-slate-300 relative space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-sky-600" />
                      <span className="font-bold text-xs text-slate-800">SMK Telkom Lampung</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-700">
                      {s.class_name}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Nama Siswa</span>
                    <p className="font-black text-sm text-slate-900 leading-tight">{s.name}</p>
                    <p className="text-xs text-slate-500 font-mono">NIS: {s.nis}</p>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">USERNAME</span>
                      <span className="font-mono font-bold text-sky-700">{s.username}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">PASSWORD</span>
                      <span className="font-mono font-bold text-slate-900 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                        {s.password}
                      </span>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 text-center">
                    Mata Pelajaran: <b>Cloud Computing &amp; Jaringan</b>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Modal Tambah / Edit Siswa */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
            <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
                  <UserPlus className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">
                    {editingStudent ? "Edit Data & Kredensial Siswa" : "Tambah Siswa Baru"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Database MySQL Tekaje &bull; Portal Wahyu Rahmat Hidayat
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveStudent} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Nama Lengkap Siswa *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Muhammad Rizki"
                  value={formData.name}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData((prev) => ({ ...prev, name: val }));
                    if (!editingStudent && !formData.username) {
                      generateUsername(val, formData.nis);
                    }
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Kelas *</label>
                  <select
                    value={formData.class_name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, class_name: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white font-medium"
                  >
                    <option value="XII TKJ 1">XII TKJ 1</option>
                    <option value="XII TKJ 2">XII TKJ 2</option>
                    <option value="XI TKJ 1">XI TKJ 1</option>
                    <option value="XI TKJ 2">XI TKJ 2</option>
                    <option value="X TJKT">X TJKT</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">NIS (Nomor Induk)</label>
                  <input
                    type="text"
                    placeholder="Contoh: 20241010"
                    value={formData.nis}
                    onChange={(e) => setFormData((prev) => ({ ...prev, nis: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white font-medium"
                  />
                </div>
              </div>

              {/* Username field with generator */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">Username Login *</label>
                  <button
                    type="button"
                    onClick={() => generateUsername(formData.name, formData.nis)}
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>Generate Otomatis</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  placeholder="Contoh: rizki.24"
                  value={formData.username}
                  onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white font-mono font-medium"
                />
              </div>

              {/* Password field with generator */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">Password Siswa *</label>
                  <button
                    type="button"
                    onClick={generatePassword}
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                  >
                    <KeyRound className="h-3 w-3" />
                    <span>Generate Acak Otomatis</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  placeholder="Contoh: TKJ#729"
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white font-mono font-bold text-slate-800"
                />
              </div>

              {/* Courses enroll checkboxes */}
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Enroll ke Kelas Pelajaran:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {AVAILABLE_COURSES.map((c) => {
                    const checked = formData.courses.includes(c.slug);
                    return (
                      <label
                        key={c.slug}
                        className={`flex items-center gap-2 p-2 rounded-xl border text-xs cursor-pointer transition-colors ${
                          checked
                            ? "bg-indigo-50 border-indigo-300 text-indigo-900 font-semibold"
                            : "bg-slate-50 border-slate-200 text-slate-600"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData((prev) => ({
                                ...prev,
                                courses: [...prev.courses, c.slug],
                              }));
                            } else {
                              setFormData((prev) => ({
                                ...prev,
                                courses: prev.courses.filter((x) => x !== c.slug),
                              }));
                            }
                          }}
                          className="h-3.5 w-3.5 rounded text-indigo-600 cursor-pointer"
                        />
                        <span className="truncate">{c.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-sm cursor-pointer"
                >
                  {editingStudent ? "Simpan Perubahan" : "Simpan Siswa"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-[11px]">
          &copy; {new Date().getFullYear()} TEKAJE LABS &bull; Portal Pendidik Wahyu Rahmat Hidayat, S.Kom. &bull; SMK Telkom Lampung
        </div>
      </footer>
    </div>
  );
}
