"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import InteractiveApacheLabTerminal from "@/components/InteractiveApacheLabTerminal";
import ApacheSysadminGame from "@/components/ApacheSysadminGame";
import MeetingSidebarNav, { StepItem } from "@/components/MeetingSidebarNav";
import DigitalCertificate from "@/components/DigitalCertificate";
import UserNavPill from "@/components/UserNavPill";
import { useAuth } from "@/context/AuthContext";
import {
  Terminal,
  Copy,
  Check,
  Server,
  Globe,
  Layers,
  Cpu,
  ShieldCheck,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  Clock,
  Award,
  HardDrive,
  Network,
  ArrowLeft,
  ArrowRight,
  Code2,
  CheckSquare,
  FileText,
  AlertTriangle,
  Info,
  CheckCircle,
  FolderOpen,
  Lock,
  Unlock,
  User,
  GraduationCap,
  RotateCcw,
  Gamepad2,
  FileQuestion,
  FileBadge,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
} from "lucide-react";

export default function PertemuanSatuASJPage() {
  const router = useRouter();
  const {
    user,
    isAuthReady,
    openLoginModal,
    getProgress,
    setPreTestResult,
    setPostTestResult,
    completeTheory,
    completeLab,
    completePortfolio,
    completeGamification,
    unlockNextStep,
    teacherBypassLocks,
    resetProgress,
  } = useAuth();

  useEffect(() => {
    if (isAuthReady && !user.isLoggedIn) {
      router.push("/login?redirect=/kelas/administrasi-sistem-jaringan/pertemuan-1");
    }
  }, [isAuthReady, user.isLoggedIn, router]);

  const progress = getProgress("asj-pertemuan-1");
  const [currentStep, setCurrentStep] = useState(progress.currentStep || 1);

  // Sidebar show/hide state
  const [isSidebarOpenDesktop, setIsSidebarOpenDesktop] = useState(true);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);

  const steps: StepItem[] = [
    {
      number: 1,
      title: "Pre-Test Awal (Uji Diagnostik)",
      short: "Pre-Test",
      type: "Kuis",
      duration: "5 Menit",
      icon: FileQuestion,
    },
    {
      number: 2,
      title: "Teori & Arsitektur Web Server Apache2",
      short: "Teori",
      type: "Materi",
      duration: "15 Menit",
      icon: BookOpen,
    },
    {
      number: 3,
      title: "Web Hands-on Lab Terminal Apache2",
      short: "Simulator",
      type: "Lab CLI",
      duration: "20 Menit",
      icon: Terminal,
    },
    {
      number: 4,
      title: "Panduan Lab Fisik & Checklist Bukti",
      short: "Checklist",
      type: "Portofolio",
      duration: "15 Menit",
      icon: CheckSquare,
    },
    {
      number: 5,
      title: "Gamifikasi: Apache2 Webmaster Quest",
      short: "Gamifikasi",
      type: "Mini-Game",
      duration: "10 Menit",
      icon: Gamepad2,
    },
    {
      number: 6,
      title: "Post-Test Evaluasi Mandiri",
      short: "Post-Test",
      type: "Evaluasi",
      duration: "15 Menit",
      icon: Award,
    },
    {
      number: 7,
      title: "Sertifikat Kelulusan Digital",
      short: "Sertifikat",
      type: "Kompetensi",
      duration: "Validasi",
      icon: FileBadge,
    },
  ];

  // Pre-Test state
  const [preTestAnswers, setPreTestAnswers] = useState<Record<number, number>>({});
  const [preTestSubmitted, setPreTestSubmitted] = useState(progress.preTestCompleted);
  const [preTestScore, setPreTestScore] = useState<number>(progress.preTestScore || 0);

  // Post-Test state
  const [postTestAnswers, setPostTestAnswers] = useState<Record<number, number>>({});
  const [postTestSubmitted, setPostTestSubmitted] = useState(progress.postTestCompleted);
  const [postTestScore, setPostTestScore] = useState<number>(progress.postTestScore || 0);

  // Checklist state
  const [checklist, setChecklist] = useState({
    pkg: true,
    service: true,
    firewall: true,
    html: true,
  });

  const preTestQuestions = [
    {
      id: 1,
      q: "Protokol standar jaringan yang digunakan oleh Web Server Apache2 untuk mentransmisikan halaman web tanpa enkripsi adalah...",
      options: [
        "Hypertext Transfer Protocol (HTTP) pada port 80",
        "File Transfer Protocol (FTP) pada port 21",
        "Domain Name System (DNS) pada port 53",
        "Simple Mail Transfer Protocol (SMTP) pada port 25",
      ],
      correctIndex: 0,
    },
    {
      id: 2,
      q: "Direktori bawaan (DocumentRoot) pada distro Debian/Ubuntu Server tempat file website pertama kali diletakkan adalah...",
      options: [
        "/etc/apache2/conf/",
        "/var/www/html/",
        "/home/user/web/",
        "/usr/share/nginx/",
      ],
      correctIndex: 1,
    },
    {
      id: 3,
      q: "Perintah CLI Linux yang tepat untuk memeriksa apakah daemon service Apache2 sedang aktif berjalan di background adalah...",
      options: [
        "sudo systemctl status apache2",
        "apache --test-now",
        "cat /etc/hosts",
        "ps -aux | kill 80",
      ],
      correctIndex: 0,
    },
    {
      id: 4,
      q: "User dan group sistem bawaan yang digunakan oleh Apache2 untuk membaca dan menyajikan file web di sistem operasi Linux adalah...",
      options: ["root", "admin", "www-data", "nobody"],
      correctIndex: 2,
    },
    {
      id: 5,
      q: "Perintah firewall UFW yang digunakan untuk mengizinkan lalu lintas masuk protokol HTTP ke web server adalah...",
      options: [
        "sudo ufw deny 80",
        "sudo ufw allow 'Apache'",
        "sudo ufw reset all",
        "sudo ufw block web",
      ],
      correctIndex: 1,
    },
  ];

  const postTestQuestions = [
    {
      id: 1,
      q: "Ketika browser client mengakses web server dan menerima status kode HTTP '200 OK', artinya...",
      options: [
        "Halaman web tidak ditemukan di DocumentRoot",
        "Permintaan berhasil diproses dan server mengirimkan dokumen web yang diminta",
        "Akses ditolak karena masalah izin www-data",
        "Server sedang kehabisan memori RAM",
      ],
      correctIndex: 1,
    },
    {
      id: 2,
      q: "Perintah utilitas bawaan Apache yang sangat disarankan untuk memeriksa kesalahan pengetikan sintaks direktif konfigurasi sebelum restart adalah...",
      options: [
        "sudo apache2ctl configtest",
        "sudo apt remove apache2",
        "sudo systemctl kill apache2",
        "ping 127.0.0.1",
      ],
      correctIndex: 0,
    },
    {
      id: 3,
      q: "Jika web server menampilkan kode error '403 Forbidden', langkah perbaikan hak akses direktori yang tepat pada Linux adalah...",
      options: [
        "Mengganti kabel UTP pada switch",
        "Mengatur kepemilikan 'sudo chown -R www-data:www-data /var/www/html'",
        "Menghapus file /etc/apache2/apache2.conf",
        "Mematikan router sekolah",
      ],
      correctIndex: 1,
    },
    {
      id: 4,
      q: "File konfigurasi utama Apache2 pada distro Ubuntu/Debian Server terletak pada path...",
      options: [
        "/etc/apache2/apache2.conf",
        "/var/log/apache2/access.log",
        "/boot/grub/grub.cfg",
        "/etc/network/interfaces",
      ],
      correctIndex: 0,
    },
    {
      id: 5,
      q: "Perintah cURL yang tepat untuk memeriksa respon header HTTP dari server lokal tanpa mengunduh seluruh isi dokumen web adalah...",
      options: [
        "curl -I http://localhost",
        "curl --delete-all http://localhost",
        "curl -upload index.html",
        "curl ping 80",
      ],
      correctIndex: 0,
    },
  ];

  const handlePreTestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let score = 0;
    preTestQuestions.forEach((item, idx) => {
      if (preTestAnswers[idx] === item.correctIndex) {
        score += 20;
      }
    });
    setPreTestScore(score);
    setPreTestSubmitted(true);
    setPreTestResult("asj-pertemuan-1", score);
  };

  const handlePostTestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let score = 0;
    postTestQuestions.forEach((item, idx) => {
      if (postTestAnswers[idx] === item.correctIndex) {
        score += 20;
      }
    });
    setPostTestScore(score);
    setPostTestSubmitted(true);
    setPostTestResult("asj-pertemuan-1", score);
  };

  const isStepUnlocked = (stepNum: number) => {
    if (teacherBypassLocks) return true;
    return stepNum <= progress.maxUnlockedStep;
  };

  const goToNextStep = (stepNum: number) => {
    const next = stepNum + 1;
    if (isStepUnlocked(next)) {
      setCurrentStep(next);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      alert(`🔒 Langkah ${next} masih terkunci! Selesaikan tantangan pada langkah ini terlebih dahulu.`);
    }
  };

  const goToPrevStep = (stepNum: number) => {
    if (stepNum > 1) {
      setCurrentStep(stepNum - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!isAuthReady || !user.isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl text-center max-w-md w-full space-y-4">
          <div className="h-14 w-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="h-7 w-7" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Mengalihkan ke Portal Login...</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Anda belum login ke sistem. Anda sedang dialihkan ke portal login SMK Telkom Lampung untuk membuka modul praktikum ASJ ini.
          </p>
          <div className="pt-2">
            <Link
              href="/login?redirect=/kelas/administrasi-sistem-jaringan/pertemuan-1"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition-all"
            >
              <span>Klik di sini untuk Login</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900 pb-24 sm:pb-20">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/kelas/administrasi-sistem-jaringan"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-amber-600 transition-colors mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Silabus ASJ</span>
            </Link>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-sm shadow-amber-500/20">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm sm:text-base tracking-tight">
                  Pertemuan 01: Setup Web Server Apache2
                </span>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  Administrasi Sistem Jaringan &bull; Hermawan Rijal Arasy, S.Kom.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <UserNavPill />
          </div>
        </div>
      </header>

      {/* SUB-HEADER CONTROL BAR: Toggle Sidebar, Active Step, Prev/Next buttons */}
      <div className="sticky top-18 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Desktop Toggle Button */}
            <button
              onClick={() => setIsSidebarOpenDesktop(!isSidebarOpenDesktop)}
              className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all cursor-pointer shrink-0 shadow-2xs"
              title={isSidebarOpenDesktop ? "Sembunyikan Daftar Isi" : "Buka Daftar Isi"}
            >
              {isSidebarOpenDesktop ? (
                <PanelLeftClose className="h-4 w-4 text-amber-600" />
              ) : (
                <PanelLeftOpen className="h-4 w-4 text-amber-600" />
              )}
              <span>{isSidebarOpenDesktop ? "Tutup Daftar Isi" : "Buka Daftar Isi"}</span>
            </button>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setIsSidebarOpenMobile(true)}
              className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
            >
              <Menu className="h-4 w-4" />
              <span>Daftar Isi ({currentStep}/7)</span>
            </button>

            <div className="h-5 w-px bg-slate-200 hidden sm:block shrink-0" />

            <div className="min-w-0 truncate text-xs">
              <span className="text-slate-400 font-semibold mr-1.5 hidden sm:inline">
                Langkah {currentStep} dari 7:
              </span>
              <span className="font-extrabold text-slate-900 truncate">
                {steps[currentStep - 1]?.title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => goToPrevStep(currentStep)}
              disabled={currentStep === 1}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none text-slate-600 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Sebelumnya</span>
            </button>

            <button
              onClick={() => goToNextStep(currentStep)}
              disabled={currentStep === 7}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                currentStep === 7
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : isStepUnlocked(currentStep + 1)
                  ? "bg-slate-900 hover:bg-slate-800 text-white shadow-2xs"
                  : "bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200"
              }`}
            >
              <span className="hidden md:inline">Selanjutnya</span>
              {isStepUnlocked(currentStep + 1) ? (
                <ArrowRight className="h-3.5 w-3.5" />
              ) : (
                <Lock className="h-3.5 w-3.5 text-amber-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT WRAPPER WITH SIDEBAR NAVIGATION */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        <MeetingSidebarNav
          steps={steps}
          currentStep={currentStep}
          maxUnlockedStep={progress.maxUnlockedStep}
          onSelectStep={(st) => {
            setCurrentStep(st);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          meetingNumber={1}
          meetingTitle="Instalasi & Konfigurasi Web Server Apache2 di Linux"
          isOpenDesktop={isSidebarOpenDesktop}
          onToggleDesktop={() => setIsSidebarOpenDesktop(!isSidebarOpenDesktop)}
          isOpenMobile={isSidebarOpenMobile}
          onCloseMobile={() => setIsSidebarOpenMobile(false)}
          onOpenMobile={() => setIsSidebarOpenMobile(true)}
        />

        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* ========================================================================= */}
          {/* STEP 1: PRE-TEST DIAGNOSTIK */}
          {/* ========================================================================= */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="h-8 w-8 rounded-xl bg-amber-100 text-amber-700 font-extrabold flex items-center justify-center text-sm">
                      1
                    </span>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                        Langkah 1: Pre-Test Awal Web Server
                      </h3>
                      <p className="text-xs text-slate-500">
                        Jawablah 5 soal singkat berikut untuk menguji pemahaman dasar sebelum memulai praktikum Apache2.
                      </p>
                    </div>
                  </div>

                  {preTestSubmitted && (
                    <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold font-mono">
                      Skor Pre-Test: {preTestScore} / 100
                    </div>
                  )}
                </div>

                <form onSubmit={handlePreTestSubmit} className="space-y-6 pt-2">
                  {preTestQuestions.map((q, idx) => (
                    <div
                      key={q.id}
                      className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3"
                    >
                      <div className="font-bold text-xs sm:text-sm text-slate-900 flex items-start gap-2">
                        <span className="text-amber-600 font-mono">{idx + 1}.</span>
                        <span>{q.q}</span>
                      </div>

                      <div className="space-y-2 pl-4">
                        {q.options.map((opt, optIdx) => (
                          <label
                            key={optIdx}
                            className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                              preTestAnswers[idx] === optIdx
                                ? "bg-amber-50 border-amber-400 text-amber-900 font-semibold shadow-xs"
                                : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`pretest-${idx}`}
                              checked={preTestAnswers[idx] === optIdx}
                              onChange={() =>
                                setPreTestAnswers((prev) => ({
                                  ...prev,
                                  [idx]: optIdx,
                                }))
                              }
                              disabled={preTestSubmitted && !teacherBypassLocks}
                              className="text-amber-600 focus:ring-amber-500"
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  {!preTestSubmitted ? (
                    <button
                      type="submit"
                      disabled={Object.keys(preTestAnswers).length < preTestQuestions.length}
                      className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Kirim Jawaban Pre-Test &amp; Buka Langkah 2</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="font-extrabold text-sm flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                          <span>Pre-Test Selesai! Skor Anda: {preTestScore} / 100</span>
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-800">
                          Langkah 2 Terbuka
                        </span>
                      </div>
                      <p className="text-xs text-emerald-800 leading-relaxed">
                        Kerja bagus! Pemahaman awal Anda tercatat. Sekarang mari kita pelajari teori arsitektur web server sebelum masuk ke simulator praktikum.
                      </p>
                      <button
                        type="button"
                        onClick={() => goToNextStep(1)}
                        className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>Lanjut ke Langkah 2: Teori &amp; Konsep</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 2: TEORI & OBSERVASI KONSEP */}
          {/* ========================================================================= */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="h-8 w-8 rounded-xl bg-amber-100 text-amber-700 font-extrabold flex items-center justify-center text-sm">
                      2
                    </span>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                        Langkah 2: Teori &amp; Arsitektur Web Server Apache2
                      </h3>
                      <p className="text-xs text-slate-500">
                        Memahami cara kerja protokol HTTP, struktur file konfigurasi, dan alur permintaan web pada Linux.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
                    <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
                      <Globe className="h-4 w-4 text-amber-600" />
                      <span>Apa itu Web Server Apache2?</span>
                    </div>
                    <p>
                      <b>Apache HTTP Server</b> (dikenal sebagai <code>apache2</code> pada Debian/Ubuntu) adalah
                      perangkat lunak server web sumber terbuka (open-source) yang paling banyak digunakan di dunia.
                      Fungsi utamanya adalah menerima permintaan klien (seperti browser web Chrome/Firefox) melalui
                      protokol <b>HTTP (Port 80)</b> atau <b>HTTPS (Port 443)</b>, lalu mengirimkan kembali berkas dokumen web
                      (HTML, CSS, JavaScript, Gambar) ke layar pengguna.
                    </p>
                  </div>

                  {/* 3 Pillar Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                        <FolderOpen className="h-4 w-4 text-sky-600" />
                        <span>DocumentRoot (/var/www/html)</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Direktori fisik di penyimpanan Linux tempat file website disimpan. Secara bawaan, file <code>index.html</code> adalah halaman pertama yang otomatis disajikan saat domain diakses.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                        <Server className="h-4 w-4 text-amber-600" />
                        <span>Direktori Konfigurasi (/etc/apache2/)</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Pusat setelan Apache: <code>apache2.conf</code> (file utama), <code>ports.conf</code> (port listening 80/443), dan folder <code>sites-available/</code> untuk manajemen VirtualHost.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                        <ShieldCheck className="h-4 w-4 text-emerald-600" />
                        <span>User &amp; Permission (www-data)</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Demi alasan keamanan, daemon Apache berjalan di bawah akun khusus non-root bernama <code>www-data</code>. Hak akses file web diatur ke 644 dan folder ke 755.
                      </p>
                    </div>
                  </div>

                  {/* Flow Diagram */}
                  <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 space-y-3">
                    <div className="font-mono text-xs font-bold text-amber-400">
                      ALUR KERJA REQUEST WEB (HTTP CLIENT-SERVER)
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl font-mono text-[11px] text-emerald-300 leading-relaxed overflow-x-auto">
                      [Browser Siswa: http://10.10.20.5:80] <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&darr; (Kirim HTTP GET Request)<br />
                      [Linux Kernel &bull; Firewall UFW Port 80 Allowed]<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&darr;<br />
                      [Apache2 Daemon (/usr/sbin/apache2) Listen 0.0.0.0:80]<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&darr; (Baca /var/www/html/index.html)<br />
                      [Kirim HTTP Response: 200 OK + Payload HTML] &rarr; Tampil di Browser!
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={() => goToPrevStep(2)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                  >
                    &larr; Kembali ke Pre-Test
                  </button>

                  <button
                    onClick={() => {
                      completeTheory("asj-pertemuan-1");
                      goToNextStep(2);
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Paham Materi &amp; Buka Simulator Lab Apache2</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 3: WEB HANDS-ON LAB TERMINAL SIMULATOR */}
          {/* ========================================================================= */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    Langkah 3: Web Hands-on Lab Terminal Simulator
                  </h3>
                  <p className="text-xs text-slate-500">
                    Selesaikan 6 Misi Praktikum instalasi Apache2 dan uji respon halaman web pada tab Live Web Browser.
                  </p>
                </div>

                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  Interactive Simulator &bull; Apache2
                </span>
              </div>

              {/* Terminal Simulator Component */}
              <InteractiveApacheLabTerminal />

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => goToPrevStep(3)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                >
                  &larr; Kembali ke Teori
                </button>

                <button
                  onClick={() => {
                    completeLab("asj-pertemuan-1");
                    goToNextStep(3);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Misi Lab Selesai &amp; Buka Checklist Portofolio</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 4: CHECKLIST PRAKTIKUM & BUKTI PORTOFOLIO */}
          {/* ========================================================================= */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="h-8 w-8 rounded-xl bg-amber-100 text-amber-700 font-extrabold flex items-center justify-center text-sm">
                      4
                    </span>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                        Langkah 4: Checklist Praktikum &amp; Verifikasi Bukti
                      </h3>
                      <p className="text-xs text-slate-500">
                        Pastikan Anda telah memverifikasi seluruh komponen instalasi web server di server lab.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-all text-xs">
                    <input
                      type="checkbox"
                      checked={checklist.pkg}
                      onChange={(e) => setChecklist({ ...checklist, pkg: e.target.checked })}
                      className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
                    />
                    <span>Paket <b>apache2</b> berhasil diinstal melalui APT tanpa pesan error broken dependencies.</span>
                  </label>

                  <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-all text-xs">
                    <input
                      type="checkbox"
                      checked={checklist.service}
                      onChange={(e) => setChecklist({ ...checklist, service: e.target.checked })}
                      className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
                    />
                    <span>Layanan systemd <b>apache2.service</b> terkonfirmasi berstatus <code>active (running)</code>.</span>
                  </label>

                  <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-all text-xs">
                    <input
                      type="checkbox"
                      checked={checklist.firewall}
                      onChange={(e) => setChecklist({ ...checklist, firewall: e.target.checked })}
                      className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
                    />
                    <span>Aturan firewall UFW telah mengizinkan profil <b>'Apache' (Port 80 TCP)</b>.</span>
                  </label>

                  <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-all text-xs">
                    <input
                      type="checkbox"
                      checked={checklist.html}
                      onChange={(e) => setChecklist({ ...checklist, html: e.target.checked })}
                      className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
                    />
                    <span>File <b>/var/www/html/index.html</b> telah dimodifikasi dan merespon status <b>HTTP 200 OK</b> saat diakses.</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={() => goToPrevStep(4)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                  >
                    &larr; Kembali ke Simulator Lab
                  </button>

                  <button
                    onClick={() => {
                      completePortfolio("asj-pertemuan-1");
                      goToNextStep(4);
                    }}
                    disabled={!checklist.pkg || !checklist.service || !checklist.firewall || !checklist.html}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Konfirmasi Checklist &amp; Buka Arena Gamifikasi</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 5: GAMIFIKASI: APACHE2 WEBMASTER QUEST */}
          {/* ========================================================================= */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fade-in">
              <ApacheSysadminGame
                alreadyCompleted={Boolean(progress.gamificationCompleted)}
                onComplete={() => {
                  completeGamification("asj-pertemuan-1");
                  goToNextStep(5);
                }}
              />

              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
                <button
                  onClick={() => goToPrevStep(5)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                >
                  &larr; Kembali ke Checklist Portofolio
                </button>

                <button
                  onClick={() => {
                    completeGamification("asj-pertemuan-1");
                    goToNextStep(5);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Lanjut ke Langkah 6: Post-Test Evaluasi</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 6: POST-TEST EVALUASI KOMPETENSI */}
          {/* ========================================================================= */}
          {currentStep === 6 && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="h-8 w-8 rounded-xl bg-purple-100 text-purple-700 font-extrabold flex items-center justify-center text-sm">
                      6
                    </span>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                        Langkah 6: Post-Test Evaluasi Mandiri ASJ
                      </h3>
                      <p className="text-xs text-slate-500">
                        Uji pemahaman komprehensif praktikum Apache2. Capai KKM minimal 75 untuk membuka sertifikat digital!
                      </p>
                    </div>
                  </div>

                  {postTestSubmitted && (
                    <div
                      className={`px-3 py-1 rounded-xl border text-xs font-bold font-mono ${
                        postTestScore >= 75
                          ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                          : "bg-rose-50 border-rose-300 text-rose-800"
                      }`}
                    >
                      Skor: {postTestScore} / 100 {postTestScore >= 75 ? "(LULUS)" : "(REMEDIAL)"}
                    </div>
                  )}
                </div>

                <form onSubmit={handlePostTestSubmit} className="space-y-6 pt-2">
                  {postTestQuestions.map((q, idx) => (
                    <div
                      key={q.id}
                      className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3"
                    >
                      <div className="font-bold text-xs sm:text-sm text-slate-900 flex items-start gap-2">
                        <span className="text-purple-600 font-mono">{idx + 1}.</span>
                        <span>{q.q}</span>
                      </div>

                      <div className="space-y-2 pl-4">
                        {q.options.map((opt, optIdx) => (
                          <label
                            key={optIdx}
                            className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                              postTestAnswers[idx] === optIdx
                                ? "bg-purple-50 border-purple-400 text-purple-900 font-semibold shadow-xs"
                                : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`posttest-${idx}`}
                              checked={postTestAnswers[idx] === optIdx}
                              onChange={() =>
                                setPostTestAnswers((prev) => ({
                                  ...prev,
                                  [idx]: optIdx,
                                }))
                              }
                              disabled={postTestSubmitted && !teacherBypassLocks}
                              className="text-purple-600 focus:ring-purple-500"
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  {!postTestSubmitted ? (
                    <button
                      type="submit"
                      disabled={Object.keys(postTestAnswers).length < postTestQuestions.length}
                      className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Kirim Jawaban Post-Test &amp; Nilai Hasil Belajar</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <div
                      className={`p-5 rounded-2xl border space-y-3 ${
                        postTestScore >= 75
                          ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                          : "bg-rose-50 border-rose-200 text-rose-900"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-extrabold text-sm flex items-center gap-2">
                          {postTestScore >= 75 ? (
                            <>
                              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                              <span>Selamat! Anda Lulus Evaluasi (Skor: {postTestScore}/100)</span>
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="h-5 w-5 text-rose-600" />
                              <span>Nilai Anda ({postTestScore}/100) Belum Mencapai KKM 75</span>
                            </>
                          )}
                        </div>
                        <span
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                            postTestScore >= 75
                              ? "bg-emerald-200 text-emerald-800"
                              : "bg-rose-200 text-rose-800"
                          }`}
                        >
                          {postTestScore >= 75 ? "Sertifikat Terbuka" : "Perlu Remedial"}
                        </span>
                      </div>

                      <p className="text-xs leading-relaxed opacity-90">
                        {postTestScore >= 75
                          ? "Kerja luar biasa! Anda telah membuktikan penguasaan instalasi web server Apache2. Sekarang Anda berhak mencetak sertifikat digital kompetensi yang ditandatangani oleh Pak Hermawan Rijal Arasy, S.Kom."
                          : "Pelajari kembali materi DocumentRoot dan perintah cURL, lalu ulangi kuis sampai mencapai batas KKM."}
                      </p>

                      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                        {postTestScore >= 75 ? (
                          <button
                            type="button"
                            onClick={() => goToNextStep(6)}
                            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                          >
                            <span>Buka Sertifikat Kelulusan Digital (Langkah 7)</span>
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setPostTestSubmitted(false)}
                            className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                          >
                            <RotateCcw className="h-4 w-4" />
                            <span>Ulangi Kuis Post-Test (Remedial)</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 7: SERTIFIKAT KOMPETENSI DIGITAL */}
          {/* ========================================================================= */}
          {currentStep === 7 && (
            <div className="space-y-6 animate-fade-in">
              <DigitalCertificate
                studentName={user.isLoggedIn ? user.name : "Ahmad Fauzan Pratama"}
                studentClass={user.isLoggedIn ? user.kelas : "XI TKJ 1"}
                studentNis={user.isLoggedIn ? user.nis : "2401001"}
                courseName="Administrasi Sistem Jaringan (ASJ)"
                teacherName="Hermawan Rijal Arasy, S.Kom."
                teacherNip="199208172022011003"
                meetingNumber={1}
                meetingTitle="Instalasi & Konfigurasi Web Server Apache2 di Linux"
                finalScore={progress.finalGrade || postTestScore || 90}
                certifiedAt={
                  progress.certifiedAt ||
                  new Date().toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                }
              />

              {/* Next Meeting Banner */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-amber-950 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center md:text-left">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Modul Selanjutnya Telah Tersedia!
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    Siap Melanjutkan ke Pertemuan 02 ASJ?
                  </h4>
                  <p className="text-xs text-slate-300 max-w-lg">
                    Langkah berikutnya: Konfigurasi Virtual Host, manajemen multi-domain dalam satu IP, dan aktivasi modul rewrite.
                  </p>
                </div>

                <Link
                  href="/kelas/administrasi-sistem-jaringan"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0"
                >
                  <span>Kembali ke Silabus ASJ</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MOBILE-FRIENDLY BOTTOM STICKY NAVIGATION BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 shadow-lg">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-3 text-xs">
          <button
            onClick={() => goToPrevStep(currentStep)}
            disabled={currentStep === 1}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Langkah Sebelumnya</span>
            <span className="sm:hidden">Kembali</span>
          </button>

          <div className="text-center">
            <span className="text-slate-400 text-[10px] uppercase font-bold block sm:inline mr-1">
              Langkah
            </span>
            <span className="font-extrabold text-slate-900">
              {currentStep} <span className="text-slate-400 font-normal">dari 7</span>
            </span>
          </div>

          <button
            onClick={() => goToNextStep(currentStep)}
            disabled={currentStep === 7}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold transition-all ${
              currentStep === 7
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : isStepUnlocked(currentStep + 1)
                ? "bg-amber-600 hover:bg-amber-500 text-white shadow-sm"
                : "bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200"
            }`}
          >
            <span className="hidden sm:inline">Langkah Berikutnya</span>
            <span className="sm:hidden">Lanjut</span>
            {isStepUnlocked(currentStep + 1) ? (
              <ArrowRight className="h-4 w-4" />
            ) : (
              <Lock className="h-3.5 w-3.5 text-amber-700" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
