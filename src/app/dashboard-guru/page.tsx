"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import * as XLSX from "xlsx";
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
  BookOpen,
  UserPlus,
  RefreshCw,
  Edit3,
  Trash2,
  Plus,
  FileSpreadsheet,
  Layers,
  ChevronRight,
  ExternalLink,
  Printer,
  Sparkles,
  AlertCircle,
  Server,
  Cloud,
  Check,
  X,
  FileText,
} from "lucide-react";

// Types
interface GradeRecord {
  user_id: number;
  student_name: string;
  nis: string;
  class_name: string;
  meeting_id: string;
  pretest_score: number;
  posttest_score: number;
  lab_score: number;
  final_score: number;
  is_completed: number;
  updated_at?: string;
}

interface StudentItem {
  id: number;
  username: string;
  password: string;
  name: string;
  nis: string;
  class_name: string;
  courses: string[];
  completed_labs?: number;
}

interface CourseContent {
  id: string;
  slug: string;
  title: string;
  teacher: string;
  nip: string;
  category: string;
  description: string;
  meetings: {
    id: string;
    number: number;
    title: string;
    topic: string;
    status: "active" | "draft" | "upcoming";
    path: string;
    duration: string;
    targetScore: number;
  }[];
}

const INITIAL_COURSES: CourseContent[] = [
  {
    id: "asj",
    slug: "administrasi-sistem-jaringan",
    title: "Administrasi Sistem Jaringan (ASJ - Linux Server)",
    teacher: "Hermawan Rijal Arasy, S.Kom.",
    nip: "199208172022011003",
    category: "Sistem Operasi Server",
    description:
      "Konfigurasi dan pemeliharaan server mandiri: Web Server Apache2, Multi-VirtualHost, Directory Security, DNS BIND9, dan MariaDB.",
    meetings: [
      {
        id: "asj-pertemuan-1",
        number: 1,
        title: "Instalasi Web Server Linux (Apache2) & Uji Browser",
        topic: "Web Server, HTTP Port 80, Virtual Terminal & Gamifikasi Webmaster Quest",
        status: "active",
        path: "/kelas/administrasi-sistem-jaringan/pertemuan-1",
        duration: "4 JP (180 Menit)",
        targetScore: 75,
      },
      {
        id: "asj-pertemuan-2",
        number: 2,
        title: "Konfigurasi Virtual Host & Multi-Domain Directory",
        topic: "Name-based VirtualHost, DocumentRoot, Apache2 Sites-Available & Sites-Enabled",
        status: "upcoming",
        path: "/kelas/administrasi-sistem-jaringan",
        duration: "4 JP (180 Menit)",
        targetScore: 75,
      },
      {
        id: "asj-pertemuan-3",
        number: 3,
        title: "Engine PHP 8 & Database MariaDB Server",
        topic: "Integrasi LAMP Stack, php-fpm, Manajemen SQL User & phpMyAdmin",
        status: "upcoming",
        path: "/kelas/administrasi-sistem-jaringan",
        duration: "4 JP (180 Menit)",
        targetScore: 75,
      },
    ],
  },
  {
    id: "cloud",
    slug: "cloud-computing",
    title: "Administrasi Cloud Computing & Virtualisasi",
    teacher: "Wahyu Rahmat Hidayat, S.Kom.",
    nip: "198905202022011001",
    category: "Infrastruktur Cloud",
    description:
      "Arsitektur virtualisasi server, hypervisor type-2, alokasi resource hardware vCPU/vRAM, instalasi OS CLI, dan konfigurasi jaringan virtual.",
    meetings: [
      {
        id: "pertemuan-1",
        number: 1,
        title: "Setup VM Ubuntu Server 22.04 LTS di VirtualBox",
        topic: "Hypervisor Type-2, Wizard VM, Alokasi Resource, NAT Mode, GRUB & Snapshot",
        status: "active",
        path: "/kelas/cloud-computing/pertemuan-1",
        duration: "4 JP (180 Menit)",
        targetScore: 75,
      },
      {
        id: "pertemuan-2",
        number: 2,
        title: "Instalasi OS CLI Headless & Partisi Virtual Storage",
        topic: "Subiquity Installer, User Admin Sudoers, Partisi LVM, dan SSH Server",
        status: "active",
        path: "/kelas/cloud-computing/pertemuan-2",
        duration: "4 JP (180 Menit)",
        targetScore: 75,
      },
      {
        id: "pertemuan-3",
        number: 3,
        title: "Konfigurasi Remote SSH Key Hardening",
        topic: "Asymmetric Cryptography, SSH Keygen, Disabling Root Login & UFW Rule",
        status: "upcoming",
        path: "/kelas/cloud-computing",
        duration: "4 JP (180 Menit)",
        targetScore: 75,
      },
    ],
  },
];

export default function TeacherDashboardPage() {
  const { user, teacherBypassLocks, setTeacherBypassLocks } = useAuth();

  // Navigation tab
  const [activeTab, setActiveTab] = useState<"konten" | "nilai" | "enroll" | "kartu">("konten");

  // Courses state (Kelola Konten)
  const [courses, setCourses] = useState<CourseContent[]>(INITIAL_COURSES);
  const [selectedCourseSlug, setSelectedCourseSlug] = useState<string>("administrasi-sistem-jaringan");
  const [editingMeeting, setEditingMeeting] = useState<any | null>(null);

  // Grades state (Kelola Nilai)
  const [grades, setGrades] = useState<GradeRecord[]>([]);
  const [loadingGrades, setLoadingGrades] = useState<boolean>(false);
  const [searchGrade, setSearchGrade] = useState("");
  const [filterClassGrade, setFilterClassGrade] = useState("all");
  const [filterMeetingGrade, setFilterMeetingGrade] = useState("all");
  const [editingGrade, setEditingGrade] = useState<GradeRecord | null>(null);

  // Students & Enrollment state
  const [students, setStudents] = useState<StudentItem[]>([]);
  const [loadingStudents, setLoadingStudents] = useState<boolean>(false);
  const [searchStudent, setSearchStudent] = useState("");
  const [filterClassStudent, setFilterClassStudent] = useState("all");
  const [selectedStudentForEnroll, setSelectedStudentForEnroll] = useState<StudentItem | null>(null);

  // New student form
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentNis, setNewStudentNis] = useState("");
  const [newStudentClass, setNewStudentClass] = useState("XI TKJ 2");
  const [newStudentCourse, setNewStudentCourse] = useState("administrasi-sistem-jaringan");

  // Feedback notifications
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  // Fetch Grades
  const fetchGrades = async () => {
    setLoadingGrades(true);
    try {
      const res = await fetch("/api/guru/grades");
      const data = await res.json();
      if (data.success && Array.isArray(data.grades)) {
        setGrades(data.grades);
      }
    } catch (err: any) {
      console.error("Gagal load grades:", err);
    } finally {
      setLoadingGrades(false);
    }
  };

  // Fetch Students
  const fetchStudents = async () => {
    setLoadingStudents(true);
    try {
      const res = await fetch("/api/guru/students");
      const data = await res.json();
      if (data.success && Array.isArray(data.students)) {
        setStudents(data.students);
      }
    } catch (err: any) {
      console.error("Gagal load students:", err);
    } finally {
      setLoadingStudents(false);
    }
  };

  useEffect(() => {
    fetchGrades();
    fetchStudents();
  }, []);

  // Save edited grade
  const handleSaveGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGrade) return;

    try {
      const res = await fetch("/api/guru/grades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingGrade),
      });
      const data = await res.json();
      if (data.success) {
        showFeedback("success", `Nilai untuk ${editingGrade.student_name} berhasil diperbarui!`);
        setEditingGrade(null);
        fetchGrades();
      } else {
        showFeedback("error", data.message || "Gagal memperbarui nilai");
      }
    } catch (err: any) {
      showFeedback("error", "Error koneksi server: " + err.message);
    }
  };

  // Toggle Enrollment for a student
  const handleToggleEnroll = async (studentId: number, courseSlug: string, isEnrolled: boolean) => {
    try {
      const action = isEnrolled ? "unenroll" : "enroll";
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
        showFeedback(
          "success",
          isEnrolled
            ? `Siswa berhasil di-unenroll dari ${courseSlug}`
            : `Siswa berhasil di-enroll ke ${courseSlug}`
        );
        fetchStudents();
      } else {
        showFeedback("error", data.message || "Gagal mengubah enrollment");
      }
    } catch (err: any) {
      showFeedback("error", "Error: " + err.message);
    }
  };

  // Batch enroll all students of selected class
  const handleBatchEnroll = async (className: string, courseSlug: string) => {
    if (!confirm(`Konfirmasi: Daftarkan seluruh siswa kelas ${className} ke ${courseSlug}?`)) return;

    const targets = students.filter(
      (s) => s.class_name === className && !s.courses.includes(courseSlug)
    );

    if (targets.length === 0) {
      showFeedback("success", `Semua siswa kelas ${className} sudah terdaftar di kelas ini.`);
      return;
    }

    let successCount = 0;
    for (const student of targets) {
      try {
        await fetch("/api/guru/enroll", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: student.id,
            course_slug: courseSlug,
            action: "enroll",
          }),
        });
        successCount++;
      } catch (e) {
        console.error(e);
      }
    }

    showFeedback("success", `Berhasil mendaftarkan ${successCount} siswa ${className} ke ${courseSlug}!`);
    fetchStudents();
  };

  // Add new student
  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentNis.trim()) return;

    try {
      const res = await fetch("/api/guru/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newStudentName.trim(),
          nis: newStudentNis.trim(),
          username: newStudentNis.trim(),
          password: "smktelkom",
          class_name: newStudentClass,
          courses: [newStudentCourse],
        }),
      });
      const data = await res.json();
      if (data.success) {
        showFeedback("success", `Siswa ${newStudentName} berhasil didaftarkan! Password: smktelkom`);
        setIsAddStudentOpen(false);
        setNewStudentName("");
        setNewStudentNis("");
        fetchStudents();
        fetchGrades();
      } else {
        showFeedback("error", data.message || "Gagal menambahkan siswa");
      }
    } catch (err: any) {
      showFeedback("error", "Error: " + err.message);
    }
  };

  // Export Grades to Excel (.xlsx)
  const handleExportExcel = () => {
    if (filteredGrades.length === 0) {
      showFeedback("error", "Tidak ada data nilai untuk diekspor.");
      return;
    }

    const dataForSheet = filteredGrades.map((g, idx) => ({
      No: idx + 1,
      "Nama Siswa": g.student_name,
      NIS: g.nis || "-",
      Kelas: g.class_name,
      Pertemuan: g.meeting_id || "Pertemuan 1",
      "Nilai Pre-Test": g.pretest_score || 0,
      "Nilai Post-Test": g.posttest_score || 0,
      "Skor Lab/Game XP": g.lab_score || 0,
      "Nilai Akhir": g.final_score || 0,
      Status: (g.final_score || 0) >= 75 ? "LULUS" : "REMEDIAL",
      "Sertifikat Digital": (g.final_score || 0) >= 75 ? "TERBIT" : "BELUM",
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataForSheet);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rekap Nilai Siswa");

    XLSX.writeFile(
      workbook,
      `Rekap_Nilai_TEKAJE_${selectedCourseSlug}_${new Date().toISOString().slice(0, 10)}.xlsx`
    );
    showFeedback("success", "File Excel rekap nilai berhasil diunduh!");
  };

  // Filtered grades calculation
  const filteredGrades = grades.filter((g) => {
    const matchesSearch =
      g.student_name.toLowerCase().includes(searchGrade.toLowerCase()) ||
      (g.nis && g.nis.includes(searchGrade));
    const matchesClass = filterClassGrade === "all" || g.class_name === filterClassGrade;
    const matchesMeeting = filterMeetingGrade === "all" || g.meeting_id === filterMeetingGrade;
    return matchesSearch && matchesClass && matchesMeeting;
  });

  // Filtered students calculation
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchStudent.toLowerCase()) ||
      s.username.toLowerCase().includes(searchStudent.toLowerCase()) ||
      (s.nis && s.nis.includes(searchStudent));
    const matchesClass = filterClassStudent === "all" || s.class_name === filterClassStudent;
    return matchesSearch && matchesClass;
  });

  const selectedCourse =
    courses.find((c) => c.slug === selectedCourseSlug) || courses[0];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Toast Feedback */}
      {feedback && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold border transition-all animate-bounce ${
            feedback.type === "success"
              ? "bg-emerald-950/90 border-emerald-500 text-emerald-200"
              : "bg-rose-950/90 border-rose-500 text-rose-200"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Header Bar */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Kembali ke Beranda"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-white tracking-tight">
                PORTAL GURU KELAS
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800 font-bold">
                SMK TELKOM LAMPUNG
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Pengampu: <b className="text-white">{user.name || "Hermawan Rijal Arasy, S.Kom. & Wahyu Hidayat, S.Kom."}</b>
            </p>
          </div>
        </div>

        {/* Global Lock Bypass Switch */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setTeacherBypassLocks(!teacherBypassLocks);
              showFeedback(
                "success",
                !teacherBypassLocks
                  ? "Mode Penguji Aktif: Seluruh tahap gembok praktikum dibuka untuk demonstrasi guru!"
                  : "Mode Penguji Dinonaktifkan: Siswa kembali mengikuti alur bertahap."
              );
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono border transition-all cursor-pointer flex items-center gap-1.5 ${
              teacherBypassLocks
                ? "bg-amber-950/80 border-amber-600 text-amber-300 shadow-sm shadow-amber-900/30"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
            title="Buka seluruh kunci materi untuk demonstrasi kelas"
          >
            {teacherBypassLocks ? (
              <>
                <Unlock className="h-3.5 w-3.5 text-amber-400" />
                <span className="hidden sm:inline">DEMO GURU: KUNCI DIBUKA</span>
                <span className="sm:hidden">DEMO ON</span>
              </>
            ) : (
              <>
                <Lock className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">KUNCI NORMAL</span>
                <span className="sm:hidden">KUNCI</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6 flex-1">
        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab("konten")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "konten"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Kelola Konten Kelas</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("nilai");
                fetchGrades();
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "nilai"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Award className="h-4 w-4" />
              <span>Kelola Nilai Siswa</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-emerald-300">
                {grades.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab("enroll");
                fetchStudents();
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "enroll"
                  ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Enrolment Siswa</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-sky-300">
                {students.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("kartu")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "kartu"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Printer className="h-4 w-4" />
              <span>Cetak Kartu Login Siswa</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                fetchGrades();
                fetchStudents();
                showFeedback("success", "Data berhasil disinkronkan dengan server MySQL!");
              }}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Segarkan Data"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: KELOLA KONTEN KELAS */}
        {/* ========================================================================= */}
        {activeTab === "konten" && (
          <div className="space-y-6">
            {/* Course Selector Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((course) => {
                const isSelected = selectedCourseSlug === course.slug;
                const IconComponent = course.id === "asj" ? Server : Cloud;

                return (
                  <div
                    key={course.id}
                    onClick={() => setSelectedCourseSlug(course.slug)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-slate-950 border-indigo-500 shadow-lg shadow-indigo-950/50 ring-1 ring-indigo-500"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                          {course.category}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-900/80 text-indigo-300 border border-indigo-700 flex items-center gap-1">
                            <Check className="h-3 w-3" />
                            Kelas Aktif
                          </span>
                        )}
                      </div>

                      <div className="flex items-start gap-3">
                        <div
                          className={`p-3 rounded-xl ${
                            course.id === "asj"
                              ? "bg-orange-950/60 text-orange-400 border border-orange-800"
                              : "bg-sky-950/60 text-sky-400 border border-sky-800"
                          }`}
                        >
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-base text-white">{course.title}</h3>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Pengampu: <b className="text-slate-200">{course.teacher}</b> (NIP: {course.nip})
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed">{course.description}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>Total: {course.meetings.length} Pertemuan Pembelajaran</span>
                      <Link
                        href={`/kelas/${course.slug}`}
                        target="_blank"
                        className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Lihat Silabus</span>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Course Modules Management */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                <div>
                  <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-indigo-400" />
                    <span>Modul &amp; Pertemuan: {selectedCourse.title}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Atur status modul praktikum, instruksi lab, target KKM, dan link materi siswa.
                  </p>
                </div>

                <button
                  onClick={() => {
                    alert("Fitur Tambah Pertemuan Baru: Modul pertemuan baru siap dibuat!");
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
                >
                  <Plus className="h-4 w-4" />
                  <span>Tambah Pertemuan Baru</span>
                </button>
              </div>

              {/* Modules List */}
              <div className="space-y-4">
                {selectedCourse.meetings.map((m) => (
                  <div
                    key={m.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="h-8 w-8 rounded-xl bg-indigo-950 border border-indigo-700 text-indigo-300 font-extrabold flex items-center justify-center text-sm font-mono">
                          {m.number}
                        </span>
                        <div>
                          <h4 className="font-bold text-sm sm:text-base text-white">{m.title}</h4>
                          <p className="text-xs text-slate-400 font-mono">{m.topic}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                            m.status === "active"
                              ? "bg-emerald-950/80 text-emerald-400 border-emerald-800"
                              : "bg-amber-950/80 text-amber-400 border-amber-800"
                          }`}
                        >
                          {m.status === "active" ? "Aktif & Tersedia" : "Akan Datang"}
                        </span>

                        <span className="text-xs font-mono px-2 py-1 rounded-lg bg-slate-800 text-slate-300">
                          {m.duration}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                      <div className="flex items-center gap-4 text-slate-400 font-mono">
                        <span>Standar KKM: <b>{m.targetScore} Poin</b></span>
                        <span>Alur: 7 Guided Steps (Pre-Test, Teori, Lab, Portfolio, Game, Post-Test, Sertifikat)</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={m.path}
                          target="_blank"
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center gap-1.5 transition-colors"
                        >
                          <span>Buka Modul Siswa</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>

                        <button
                          onClick={() => {
                            setEditingMeeting(m);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-indigo-950 border border-indigo-800 text-indigo-300 hover:bg-indigo-900 font-medium text-xs flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                          <span>Edit Konten</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: KELOLA NILAI SISWA */}
        {/* ========================================================================= */}
        {activeTab === "nilai" && (
          <div className="space-y-6">
            {/* Filter & Export Bar */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-white flex items-center gap-2">
                    <Award className="h-5 w-5 text-emerald-400" />
                    <span>Rekapitulasi Nilai &amp; Hasil Belajar Siswa</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Nilai otomatis tersinkronisasi dari pengerjaan Pre-Test, Post-Test, dan Lab Simulator.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleExportExcel}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
                  >
                    <FileSpreadsheet className="h-4 w-4" />
                    <span>Export Rekap Excel (.xlsx)</span>
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="relative">
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Cari Nama Siswa atau NIS..."
                    value={searchGrade}
                    onChange={(e) => setSearchGrade(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <select
                    value={filterClassGrade}
                    onChange={(e) => setFilterClassGrade(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-xs focus:border-emerald-500 focus:outline-none cursor-pointer"
                  >
                    <option value="all">Semua Rombel Kelas</option>
                    <option value="XI TKJ 2">XI TKJ 2 (Siswa Guru Hermawan)</option>
                    <option value="XI TKJ 1">XI TKJ 1</option>
                    <option value="XII TKJ 1">XII TKJ 1</option>
                    <option value="XII TKJ 2">XII TKJ 2</option>
                  </select>
                </div>

                <div>
                  <select
                    value={filterMeetingGrade}
                    onChange={(e) => setFilterMeetingGrade(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-xs focus:border-emerald-500 focus:outline-none cursor-pointer"
                  >
                    <option value="all">Semua Pertemuan</option>
                    <option value="asj-pertemuan-1">ASJ Pertemuan 1 (Apache2)</option>
                    <option value="pertemuan-1">Cloud Computing Pertemuan 1</option>
                    <option value="pertemuan-2">Cloud Computing Pertemuan 2</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Grades Table */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-mono text-[11px]">
                      <th className="py-3 px-4">NO</th>
                      <th className="py-3 px-4">NAMA SISWA</th>
                      <th className="py-3 px-4">NIS</th>
                      <th className="py-3 px-4">KELAS</th>
                      <th className="py-3 px-4">PERTEMUAN</th>
                      <th className="py-3 px-4 text-center">PRE-TEST</th>
                      <th className="py-3 px-4 text-center">POST-TEST</th>
                      <th className="py-3 px-4 text-center">NILAI AKHIR</th>
                      <th className="py-3 px-4 text-center">STATUS KELULUSAN</th>
                      <th className="py-3 px-4 text-center">AKSI GURU</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {loadingGrades ? (
                      <tr>
                        <td colSpan={10} className="py-8 text-center text-slate-500 font-mono">
                          <RefreshCw className="h-5 w-5 animate-spin mx-auto mb-2 text-emerald-500" />
                          Memuat data nilai dari database server...
                        </td>
                      </tr>
                    ) : filteredGrades.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="py-8 text-center text-slate-500">
                          Belum ada rekap nilai siswa yang sesuai dengan filter pencarian.
                        </td>
                      </tr>
                    ) : (
                      filteredGrades.map((g, idx) => {
                        const finalScore = g.final_score || 0;
                        const isPassed = finalScore >= 75;

                        return (
                          <tr key={`${g.user_id}-${g.meeting_id || idx}`} className="hover:bg-slate-900/50 transition-colors">
                            <td className="py-3.5 px-4 font-mono text-slate-500">{idx + 1}</td>
                            <td className="py-3.5 px-4 font-bold text-white">
                              {g.student_name}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-slate-300">{g.nis || "-"}</td>
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">
                                {g.class_name}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-mono text-slate-300">
                              {g.meeting_id || "Pertemuan 1"}
                            </td>
                            <td className="py-3.5 px-4 text-center font-mono font-bold text-sky-400">
                              {g.pretest_score ?? 0}
                            </td>
                            <td className="py-3.5 px-4 text-center font-mono font-bold text-indigo-400">
                              {g.posttest_score ?? 0}
                            </td>
                            <td className="py-3.5 px-4 text-center font-mono font-extrabold text-sm text-amber-400">
                              {finalScore}
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                                  isPassed
                                    ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                                    : "bg-rose-950 text-rose-400 border-rose-800"
                                }`}
                              >
                                {isPassed ? (
                                  <>
                                    <CheckCircle2 className="h-3 w-3" />
                                    LULUS KKM
                                  </>
                                ) : (
                                  <>
                                    <XCircle className="h-3 w-3" />
                                    REMEDIAL
                                  </>
                                )}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <button
                                onClick={() => setEditingGrade(g)}
                                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer transition-colors"
                              >
                                Edit Nilai
                              </button>
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
        )}

        {/* ========================================================================= */}
        {/* TAB 3: ENROLMENT SISWA */}
        {/* ========================================================================= */}
        {activeTab === "enroll" && (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-white flex items-center gap-2">
                    <Users className="h-5 w-5 text-sky-400" />
                    <span>Manajemen Enrolment Siswa ke Kelas</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Daftarkan siswa ke kelas ASJ atau Cloud Computing agar dapat mengakses lab dan ujian.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleBatchEnroll("XI TKJ 2", "administrasi-sistem-jaringan")}
                    className="px-3.5 py-2 rounded-xl bg-orange-950 border border-orange-700 text-orange-300 hover:bg-orange-900 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Server className="h-4 w-4" />
                    <span>Auto-Enroll XI TKJ 2 ke ASJ</span>
                  </button>

                  <button
                    onClick={() => setIsAddStudentOpen(true)}
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Tambah Siswa Baru</span>
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="relative">
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Cari Nama Siswa atau NIS..."
                    value={searchStudent}
                    onChange={(e) => setSearchStudent(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <select
                    value={filterClassStudent}
                    onChange={(e) => setFilterClassStudent(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-xs focus:border-sky-500 focus:outline-none cursor-pointer"
                  >
                    <option value="all">Semua Rombel Kelas</option>
                    <option value="XI TKJ 2">XI TKJ 2 (36 Siswa Guru Hermawan)</option>
                    <option value="XI TKJ 1">XI TKJ 1</option>
                    <option value="XII TKJ 1">XII TKJ 1</option>
                    <option value="XII TKJ 2">XII TKJ 2</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Students Enrollment Table */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-mono text-[11px]">
                      <th className="py-3 px-4">NO</th>
                      <th className="py-3 px-4">NAMA SISWA</th>
                      <th className="py-3 px-4">NIS / USERNAME</th>
                      <th className="py-3 px-4">PASSWORD</th>
                      <th className="py-3 px-4">ROMBEL</th>
                      <th className="py-3 px-4 text-center">ENROLL ASJ (APACHE2)</th>
                      <th className="py-3 px-4 text-center">ENROLL CLOUD COMPUTING</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {loadingStudents ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-500 font-mono">
                          <RefreshCw className="h-5 w-5 animate-spin mx-auto mb-2 text-sky-500" />
                          Memuat data pendaftaran siswa...
                        </td>
                      </tr>
                    ) : filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-500">
                          Tidak ditemukan siswa yang cocok.
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((s, idx) => {
                        const isEnrolledAsj = s.courses.includes("administrasi-sistem-jaringan");
                        const isEnrolledCloud = s.courses.includes("cloud-computing");

                        return (
                          <tr key={s.id} className="hover:bg-slate-900/50 transition-colors">
                            <td className="py-3.5 px-4 font-mono text-slate-500">{idx + 1}</td>
                            <td className="py-3.5 px-4 font-bold text-white">{s.name}</td>
                            <td className="py-3.5 px-4 font-mono text-slate-300">{s.username}</td>
                            <td className="py-3.5 px-4 font-mono text-slate-400">{s.password}</td>
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">
                                {s.class_name}
                              </span>
                            </td>
                            {/* ASJ Toggle */}
                            <td className="py-3.5 px-4 text-center">
                              <button
                                onClick={() =>
                                  handleToggleEnroll(s.id, "administrasi-sistem-jaringan", isEnrolledAsj)
                                }
                                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                                  isEnrolledAsj
                                    ? "bg-emerald-950 text-emerald-400 border border-emerald-700 hover:bg-emerald-900"
                                    : "bg-slate-800 text-slate-400 border border-slate-700 hover:text-white"
                                }`}
                              >
                                {isEnrolledAsj ? "✓ Terdaftar" : "+ Daftarkan"}
                              </button>
                            </td>
                            {/* Cloud Toggle */}
                            <td className="py-3.5 px-4 text-center">
                              <button
                                onClick={() =>
                                  handleToggleEnroll(s.id, "cloud-computing", isEnrolledCloud)
                                }
                                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                                  isEnrolledCloud
                                    ? "bg-sky-950 text-sky-400 border border-sky-700 hover:bg-sky-900"
                                    : "bg-slate-800 text-slate-400 border border-slate-700 hover:text-white"
                                }`}
                              >
                                {isEnrolledCloud ? "✓ Terdaftar" : "+ Daftarkan"}
                              </button>
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
        )}

        {/* ========================================================================= */}
        {/* TAB 4: CETAK KARTU LOGIN SISWA */}
        {/* ========================================================================= */}
        {activeTab === "kartu" && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-white flex items-center gap-2">
                  <Printer className="h-5 w-5 text-purple-400" />
                  <span>Cetak Kartu Login Siswa (A4 Lembar Potong)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Kartu login siap dicetak untuk dibagikan kepada siswa sebelum praktikum di lab.
                </p>
              </div>

              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer transition-all"
              >
                <Printer className="h-4 w-4" />
                <span>Cetak Semua Kartu (Ctrl + P)</span>
              </button>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 print:grid-cols-2 print:gap-2">
              {filteredStudents.map((s) => (
                <div
                  key={s.id}
                  className="p-4 rounded-2xl bg-white text-slate-900 border-2 border-dashed border-slate-300 print:border-slate-400 space-y-3 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-indigo-700 uppercase">
                        SMK TELKOM LAMPUNG
                      </span>
                      <h4 className="font-extrabold text-xs text-slate-900">KARTU AKSES LAB TEKAJE</h4>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {s.class_name}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block">NAMA SISWA:</span>
                      <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{s.name}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
                      <div className="p-2 rounded bg-slate-50 border border-slate-200">
                        <span className="text-[9px] text-slate-500 block">USERNAME (NIS):</span>
                        <span className="font-bold text-indigo-700 text-xs">{s.username}</span>
                      </div>
                      <div className="p-2 rounded bg-slate-50 border border-slate-200">
                        <span className="text-[9px] text-slate-500 block">PASSWORD:</span>
                        <span className="font-bold text-slate-900 text-xs">{s.password}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>Portal: tekaje.smktelkom-lpg.id</span>
                    <span>Valid: 2026/2027</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Edit Grade Modal */}
      {editingGrade && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Edit Nilai Siswa</h3>
              <button
                onClick={() => setEditingGrade(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGrade} className="space-y-4 text-xs font-mono">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-500 block text-[10px]">SISWA:</span>
                <span className="font-bold text-white text-sm">{editingGrade.student_name}</span>
                <span className="text-slate-400 block text-xs">NIS: {editingGrade.nis} | Rombel: {editingGrade.class_name}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400">Skor Pre-Test (0-100):</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editingGrade.pretest_score}
                    onChange={(e) =>
                      setEditingGrade({
                        ...editingGrade,
                        pretest_score: Number(e.target.value),
                        final_score: Math.round(Number(e.target.value) * 0.3 + Number(editingGrade.posttest_score) * 0.7),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Skor Post-Test (0-100):</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editingGrade.posttest_score}
                    onChange={(e) =>
                      setEditingGrade({
                        ...editingGrade,
                        posttest_score: Number(e.target.value),
                        final_score: Math.round(Number(editingGrade.pretest_score) * 0.3 + Number(e.target.value) * 0.7),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Kalkulasi Nilai Akhir:</span>
                <span className="text-lg font-bold text-amber-400">{editingGrade.final_score} / 100</span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingGrade(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  Simpan Nilai
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {isAddStudentOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Tambah Siswa Baru</h3>
              <button
                onClick={() => setIsAddStudentOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold">NAMA LENGKAP SISWA *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Prakoso"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold">NIS SISWA (SEBAGAI USERNAME) *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 553251200"
                  value={newStudentNis}
                  onChange={(e) => setNewStudentNis(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">ROMBEL KELAS</label>
                  <select
                    value={newStudentClass}
                    onChange={(e) => setNewStudentClass(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:border-sky-500 focus:outline-none"
                  >
                    <option value="XI TKJ 2">XI TKJ 2</option>
                    <option value="XI TKJ 1">XI TKJ 1</option>
                    <option value="XII TKJ 1">XII TKJ 1</option>
                    <option value="XII TKJ 2">XII TKJ 2</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">DEFAULT KELAS</label>
                  <select
                    value={newStudentCourse}
                    onChange={(e) => setNewStudentCourse(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:border-sky-500 focus:outline-none"
                  >
                    <option value="administrasi-sistem-jaringan">ASJ (Apache2)</option>
                    <option value="cloud-computing">Cloud Computing</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-amber-300">
                💡 Password default akan otomatis di-set ke: <b>smktelkom</b>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddStudentOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold"
                >
                  Daftarkan Siswa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
