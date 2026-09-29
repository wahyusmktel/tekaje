"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LabImage from "@/components/LabImage";
import InteractiveLabTerminalPtm2 from "@/components/InteractiveLabTerminalPtm2";
import GuidedStepperHeader from "@/components/GuidedStepperHeader";
import DigitalCertificate from "@/components/DigitalCertificate";
import UserNavPill from "@/components/UserNavPill";
import { useAuth } from "@/context/AuthContext";
import {
  Terminal,
  Copy,
  Check,
  Server,
  Cloud,
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
  Laptop,
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
} from "lucide-react";

export default function PertemuanDuaPage() {
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
    unlockNextStep,
    teacherBypassLocks,
    resetProgress,
  } = useAuth();

  useEffect(() => {
    if (isAuthReady && !user.isLoggedIn) {
      router.push("/login?redirect=/kelas/cloud-computing/pertemuan-2");
    }
  }, [isAuthReady, user.isLoggedIn, router]);

  const progress = getProgress("pertemuan-2");
  const [currentStep, setCurrentStep] = useState(progress.currentStep || 1);

  // Pre-Test state
  const [preTestAnswers, setPreTestAnswers] = useState<Record<number, number>>({});
  const [preTestSubmitted, setPreTestSubmitted] = useState(progress.preTestCompleted);
  const [preTestScore, setPreTestScore] = useState<number>(progress.preTestScore || 0);

  // Post-Test state
  const [postTestAnswers, setPostTestAnswers] = useState<Record<number, number>>({});
  const [postTestSubmitted, setPostTestSubmitted] = useState(progress.postTestCompleted);
  const [postTestScore, setPostTestScore] = useState<number>(progress.postTestScore || 0);

  // Portfolio Checklists
  const [checklist, setChecklist] = useState({
    subiquity: true,
    mirror: true,
    storage: true,
    profile: true,
    firstlogin: true,
  });

  const preTestQuestions = [
    {
      id: 1,
      q: "Nama program text-based installer resmi yang digunakan pada Ubuntu Server 22.04 LTS adalah...",
      options: ["Calamares", "Subiquity Installer", "Anaconda Installer", "Debian GUI Installer"],
      correctIndex: 1,
    },
    {
      id: 2,
      q: "Apa keuntungan utama menggunakan skema partisi Logical Volume Manager (LVM) pada server?",
      options: [
        "Membuat internet server lebih cepat",
        "Ukuran partisi virtual disk dapat diperbesar/diperkecil secara dinamis tanpa format ulang",
        "Mengurangi pemakaian RAM hingga 90%",
        "Menghilangkan kebutuhan password login",
      ],
      correctIndex: 1,
    },
    {
      id: 3,
      q: "Mengapa disarankan memilih mirror arsip lokal (misal: id.archive.ubuntu.com) saat instalasi?",
      options: [
        "Proses unduh update paket menjadi lebih cepat dan menghemat bandwidth internet lab",
        "Supaya bahasa Linux otomatis berubah menjadi bahasa daerah",
        "Agar tidak perlu mengalokasikan RAM 2GB",
        "Supaya VirtualBox tidak perlu diinstal",
      ],
      correctIndex: 0,
    },
    {
      id: 4,
      q: "Di sistem operasi Linux modern, mengapa pembuatan user non-root dengan akses 'sudo' lebih disarankan dibanding menggunakan user 'root' langsung?",
      options: [
        "User root tidak bisa mengetik di terminal",
        "Standar keamanan industri untuk mencegah salah eksekusi perintah berbahaya yang merusak OS",
        "Karena akun root memakan harddisk 10 GB",
        "Agar sistem operasi tidak memerlukan koneksi LAN",
      ],
      correctIndex: 1,
    },
    {
      id: 5,
      q: "Paket remote manajemen terenkripsi yang wajib dicentang saat instalasi agar server bisa diakses dari komputer lain adalah...",
      options: ["Telnet Server", "OpenSSH Server", "FTP Server", "VNC Desktop"],
      correctIndex: 1,
    },
  ];

  const postTestQuestions = [
    {
      id: 1,
      q: "Perintah terminal untuk memeriksa struktur pohon hierarki blok partisi disk (sda, sda1, LVM) adalah...",
      options: ["checkdisk", "lsblk", "show-parts", "mount-all"],
      correctIndex: 1,
    },
    {
      id: 2,
      q: "Perintah yang tepat untuk memverifikasi apakah daemon service OpenSSH sedang aktif berjalan adalah...",
      options: ["ssh -start", "sudo systemctl status ssh", "service check sshd", "ping ssh"],
      correctIndex: 1,
    },
    {
      id: 3,
      q: "Informasi apa yang ditampilkan saat mengeksekusi perintah 'hostnamectl' pada terminal Ubuntu Server?",
      options: [
        "Static hostname, Operating System rilis, arsitektur CPU, dan hypervisor virtualisasi",
        "Daftar password seluruh akun pengguna",
        "Daftar browser yang terinstal di komputer",
        "Kapasitas baterai laptop",
      ],
      correctIndex: 0,
    },
    {
      id: 4,
      q: "Untuk memastikan apakah akun user aktif tergabung dalam grup administratif 'sudo', perintah yang digunakan adalah...",
      options: ["id atau whoami", "pass-check", "ls -l /root", "user-show"],
      correctIndex: 0,
    },
    {
      id: 5,
      q: "Nama Checkpoint Snapshot yang direkomendasikan setelah instalasi Ubuntu Server selesai dan sebelum konfigurasi lanjutan adalah...",
      options: [
        "Ptm 2 - OS Installed Base System",
        "Windows Backup 1",
        "Delete All Disk",
        "New Snapshot 99",
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
    setPreTestResult("pertemuan-2", score);
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
    setPostTestResult("pertemuan-2", score);
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
      <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4 selection:bg-indigo-100 selection:text-indigo-900">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl text-center max-w-md w-full space-y-4">
          <div className="h-14 w-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="h-7 w-7" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Mengalihkan ke Halaman Login...</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Anda belum login ke sistem. Anda sedang dialihkan ke portal login siswa SMK Telkom Lampung untuk membuka materi Pertemuan 02 ini.
          </p>
          <div className="pt-2">
            <Link
              href="/login?redirect=/kelas/cloud-computing/pertemuan-2"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all"
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
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-24 sm:pb-16">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/kelas/cloud-computing"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Daftar Silabus</span>
            </Link>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20">
                <Server className="h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm sm:text-base tracking-tight">
                  Pertemuan 02: Instalasi Ubuntu Server
                </span>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  Kelas Cloud Computing &bull; Wahyu Rahmat Hidayat, S.Kom.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <UserNavPill />
          </div>
        </div>
      </header>

      {/* STICKY GUIDED STEPPER HEADER */}
      <GuidedStepperHeader
        currentStep={currentStep}
        maxUnlockedStep={progress.maxUnlockedStep}
        onSelectStep={(st) => {
          setCurrentStep(st);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        meetingNumber={2}
        meetingTitle="Instalasi OS Ubuntu Server 22.04 LTS (CLI) & Partisi Storage"
      />

      {/* STUDENT CALLOUT BANNER */}
      {!user.isLoggedIn && (
        <div className="bg-indigo-50 border-b border-indigo-200 px-4 py-3">
          <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-indigo-900">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <GraduationCap className="h-4 w-4 text-indigo-600 shrink-0" />
              <span>
                <b>Halo Siswa!</b> Anda belum memasukkan nama lengkap.
                Masuk terlebih dahulu agar <b>Nilai Praktikum &amp; Sertifikat Digital</b> Pertemuan 2 tercatat atas namamu!
              </span>
            </div>
            <button
              onClick={openLoginModal}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-xs shrink-0 cursor-pointer"
            >
              Masukkan Nama Siswa
            </button>
          </div>
        </div>
      )}

      {/* MAIN STEP CONTENT CONTAINER */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-8 flex-1 w-full space-y-8">
        {/* ========================================================================= */}
        {/* STEP 1: PRE-TEST PERTEMUAN 2 */}
        {/* ========================================================================= */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="h-8 w-8 rounded-xl bg-indigo-100 text-indigo-700 font-extrabold flex items-center justify-center text-sm">
                    1
                  </span>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                      Langkah 1: Pre-Test Awal Pertemuan 2
                    </h3>
                    <p className="text-xs text-slate-500">
                      Uji diagnostik mengenai konsep text installer, skema partisi LVM, dan peran OpenSSH.
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
                      <span className="text-indigo-600 font-mono">{idx + 1}.</span>
                      <span>{q.q}</span>
                    </div>

                    <div className="space-y-2 pl-4">
                      {q.options.map((opt, optIdx) => (
                        <label
                          key={optIdx}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                            preTestAnswers[idx] === optIdx
                              ? "bg-indigo-50 border-indigo-400 text-indigo-900 font-semibold shadow-xs"
                              : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`pretest-ptm2-${idx}`}
                            checked={preTestAnswers[idx] === optIdx}
                            onChange={() =>
                              setPreTestAnswers((prev) => ({
                                ...prev,
                                [idx]: optIdx,
                              }))
                            }
                            disabled={preTestSubmitted && !teacherBypassLocks}
                            className="text-indigo-600 focus:ring-indigo-500"
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
                    className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Kirim Jawaban Pre-Test &amp; Buka Langkah 2</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="font-extrabold text-sm flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        <span>Pre-Test Pertemuan 2 Selesai! Skor: {preTestScore} / 100</span>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-800">
                        Langkah 2 Terbuka
                      </span>
                    </div>
                    <p className="text-xs text-emerald-800 leading-relaxed">
                      Sangat baik! Jawaban awal Anda telah disimpan. Sekarang mari kita pelajari
                      konsep struktur partisi LVM dan installer Subiquity.
                    </p>
                    <button
                      type="button"
                      onClick={() => goToNextStep(1)}
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Lanjut ke Langkah 2: Teori &amp; Konsep Instalasi</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: TEORI & SKEMA PARTISI STORAGE */}
        {/* ========================================================================= */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
                <span className="h-8 w-8 rounded-xl bg-indigo-100 text-indigo-700 font-extrabold flex items-center justify-center text-sm">
                  2
                </span>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                    Langkah 2: Konsep Installer Subiquity &amp; Partisi Storage LVM
                  </h3>
                  <p className="text-xs text-slate-500">
                    Memahami arsitektur partisi disk server sebelum melakukan instalasi nyata.
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  Proses instalasi <b>Ubuntu Server 22.04 LTS</b> menggunakan antarmuka berbasis teks
                  yang disebut <b>Subiquity</b>. Penggunaan keyboard (tombol panah, Tab, Spacebar untuk mencentang,
                  dan Enter) adalah keterampilan esensial seorang SysAdmin.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <h4 className="font-bold text-slate-900 text-xs text-indigo-700">
                      1. Partisi /boot (~2.0 GB Ext4)
                    </h4>
                    <p className="text-xs text-slate-600">
                      Menyimpan kernel Linux dan file initial RAM disk (initrd) yang dibutuhkan saat pertama kali mesin melakukan bootloader GRUB.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <h4 className="font-bold text-slate-900 text-xs text-teal-700">
                      2. Volume Group LVM (Root Mount /)
                    </h4>
                    <p className="text-xs text-slate-600">
                      Menyimpan seluruh sistem operasi, paket aplikasi, dan data user. Fleksibel dapat diperbesar tanpa install ulang.
                    </p>
                  </div>
                </div>

                <LabImage
                  src="/images/cloud-computing/pertemuan-2/gambar3_storage_layout_lvm.png"
                  alt="Storage Configuration LVM Layout"
                  caption="Gambar 2.1: Skema partisi disk LVM pada harddisk virtual 25 GB VirtualBox"
                  placeholderGuide="Tangkapan layar halaman Guided Storage Configuration yang menampilkan opsi 'Use an entire disk' dan 'Set up as an LVM group'."
                  suggestedFileName="gambar3_storage_layout_lvm.png"
                />
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => goToPrevStep(2)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                >
                  &larr; Kembali ke Pre-Test
                </button>

                <button
                  onClick={() => {
                    completeTheory("pertemuan-2");
                    goToNextStep(2);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Saya Sudah Paham &amp; Lanjut ke Hands-on Simulator</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: HANDS-ON LAB TERMINAL SIMULATOR PTM 2 */}
        {/* ========================================================================= */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="h-8 w-8 rounded-xl bg-teal-100 text-teal-700 font-extrabold flex items-center justify-center text-sm">
                    3
                  </span>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                      Langkah 3: Hands-on Lab Verifikasi Pasca-Instalasi di Browser
                    </h3>
                    <p className="text-xs text-slate-500">
                      Selesaikan 5 misi verifikasi sistem baru (hostname, partisi LVM, service OpenSSH) di terminal berikut.
                    </p>
                  </div>
                </div>

                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
                  Pertemuan 2 Simulator
                </span>
              </div>

              {/* Terminal Simulator Component */}
              <InteractiveLabTerminalPtm2 />

              {/* Action */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => goToPrevStep(3)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                >
                  &larr; Kembali ke Teori
                </button>

                <button
                  onClick={() => {
                    completeLab("pertemuan-2");
                    goToNextStep(3);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Misi Lab Selesai &amp; Buka Checklist Portofolio</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 4: CHECKLIST BUKTI INSTALASI & PORTOFOLIO */}
        {/* ========================================================================= */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
                <span className="h-8 w-8 rounded-xl bg-amber-100 text-amber-700 font-extrabold flex items-center justify-center text-sm">
                  4
                </span>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                    Langkah 4: Panduan Langkah Instalasi di Komputer Lab &amp; Bukti Portofolio
                  </h3>
                  <p className="text-xs text-slate-500">
                    Pastikan Anda telah menyelesaikan 5 tahapan instalasi pada mesin VirtualBox komputer lab Anda.
                  </p>
                </div>
              </div>

              {/* 5 Panduan Hands-on Instalasi dengan Gambar / Placeholder */}
              <div className="space-y-6">
                {/* 1. Subiquity */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                      Tahap 1
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Language &amp; Keyboard
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Inisialisasi Boot Subiquity &amp; Pemilihan Bahasa
                  </h4>
                  <p className="text-xs text-slate-600">
                    Nyalakan VM, tekan Enter pada <code>Try or Install Ubuntu Server</code>, pilih bahasa <b>English</b>,
                    dan pilih <b>Continue without updating</b>.
                  </p>
                  <LabImage
                    src="/images/cloud-computing/pertemuan-2/gambar1_subiquity_welcome.png"
                    alt="Subiquity Welcome"
                    caption="Gambar 2.2: Tampilan awal pemilihan bahasa pada text installer Subiquity"
                    placeholderGuide="Screenshot jendela VirtualBox yang menampilkan menu awal pemilihan bahasa English installer Ubuntu Server."
                    suggestedFileName="gambar1_subiquity_welcome.png"
                  />
                </div>

                {/* 2. Network & Mirror */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                      Tahap 2
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      DHCP NAT &amp; Archive Mirror
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Konfigurasi Jaringan &amp; Mirror Arsip Lokal Indonesia
                  </h4>
                  <p className="text-xs text-slate-600">
                    Pastikan interface <code>enp0s3</code> mendapatkan IP dari DHCP NAT, lewati proxy, dan gunakan mirror:{" "}
                    <code>http://id.archive.ubuntu.com/ubuntu</code>.
                  </p>
                  <LabImage
                    src="/images/cloud-computing/pertemuan-2/gambar2_network_mirror.png"
                    alt="Network & Mirror"
                    caption="Gambar 2.3: Pemeriksaan IP DHCP NAT dan alamat archive mirror lokal"
                    placeholderGuide="Screenshot menu Network Connections Subiquity dan form archive mirror."
                    suggestedFileName="gambar2_network_mirror.png"
                  />
                </div>

                {/* 3. Storage */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                      Tahap 3
                    </span>
                    <span className="text-xs font-semibold text-teal-700">
                      LVM Entire Disk
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Konfigurasi Guided Storage &amp; LVM Group
                  </h4>
                  <p className="text-xs text-slate-600">
                    Pilih <b>Use an entire disk</b> (25 GB), centang <b>Set up this disk as an LVM group</b>, periksa partisi /boot dan /, lalu Continue.
                  </p>
                </div>

                {/* 4. Profile & SSH */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                      Tahap 4
                    </span>
                    <span className="text-xs font-bold text-indigo-700">
                      Wajib: OpenSSH [X]
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Pengaturan Profil Admin &amp; Centang OpenSSH Server
                  </h4>
                  <p className="text-xs text-slate-600">
                    Isi nama lengkap, hostname <code>ubuntu-server</code>, username <code>wahyu</code>, password kuat,
                    dan centang <b>[X] Install OpenSSH server</b>.
                  </p>
                  <LabImage
                    src="/images/cloud-computing/pertemuan-2/gambar4_profile_setup_ssh.png"
                    alt="Profile Setup & OpenSSH"
                    caption="Gambar 2.4: Pengisian form profil admin dan centang wajib paket OpenSSH server"
                    placeholderGuide="Screenshot halaman Profile Setup dan halaman SSH Setup centang [X] Install OpenSSH server."
                    suggestedFileName="gambar4_profile_setup_ssh.png"
                  />
                </div>

                {/* 5. First Login */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Tahap 5
                    </span>
                    <span className="text-xs font-bold text-emerald-700">
                      First Boot &amp; Snapshot Ptm 2
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Rebooting, Eject ISO, First Login, &amp; Simpan Snapshot
                  </h4>
                  <p className="text-xs text-slate-600">
                    Pilih Reboot Now, tekan Enter saat eject ISO, login dengan username/password yang dibuat, lalu simpan
                    Snapshot: <code>Ptm 2 - OS Installed Base System</code>.
                  </p>
                  <LabImage
                    src="/images/cloud-computing/pertemuan-2/gambar5_first_login_prompt.png"
                    alt="First Login Terminal"
                    caption="Gambar 2.5: Keberhasilan First Login pada konsol CLI terminal Ubuntu Server"
                    placeholderGuide="Screenshot jendela VirtualBox setelah berhasil login menampilkan prompt 'username@hostname:~$'"
                    suggestedFileName="gambar5_first_login_prompt.png"
                  />
                </div>
              </div>

              {/* Student Checklist Validation */}
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <CheckSquare className="h-4 w-4 text-amber-700" />
                  <span>Lembar Verifikasi Mandiri Siswa (Pertemuan 2)</span>
                </h4>
                <p className="text-xs text-amber-800">
                  Centang pernyataan di bawah ini untuk mengonfirmasi bahwa instalasi OS pada komputer lab telah sukses:
                </p>

                <div className="space-y-2 text-xs text-slate-800">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.subiquity}
                      onChange={(e) => setChecklist({ ...checklist, subiquity: e.target.checked })}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Saya sudah menavigasi Subiquity Installer dan memilih bahasa English.</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.mirror}
                      onChange={(e) => setChecklist({ ...checklist, mirror: e.target.checked })}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Saya sudah memeriksa IP DHCP NAT dan menggunakan archive mirror lokal.</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.storage}
                      onChange={(e) => setChecklist({ ...checklist, storage: e.target.checked })}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Saya sudah memilih partisi Guided LVM seluruh disk 25 GB.</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.profile}
                      onChange={(e) => setChecklist({ ...checklist, profile: e.target.checked })}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Saya sudah membuat akun admin sudo dan mencentang Install OpenSSH Server.</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.firstlogin}
                      onChange={(e) => setChecklist({ ...checklist, firstlogin: e.target.checked })}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Saya sudah berhasil first login dan menyimpan Snapshot 'Ptm 2 - OS Installed Base System'.</span>
                  </label>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => goToPrevStep(4)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                >
                  &larr; Kembali ke Simulator Lab
                </button>

                <button
                  onClick={() => {
                    completePortfolio("pertemuan-2");
                    goToNextStep(4);
                  }}
                  disabled={
                    !checklist.subiquity ||
                    !checklist.mirror ||
                    !checklist.storage ||
                    !checklist.profile ||
                    !checklist.firstlogin
                  }
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Konfirmasi 5 Bukti &amp; Buka Post-Test</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 5: POST-TEST EVALUASI KOMPETENSI PTM 2 */}
        {/* ========================================================================= */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="h-8 w-8 rounded-xl bg-purple-100 text-purple-700 font-extrabold flex items-center justify-center text-sm">
                    5
                  </span>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                      Langkah 5: Post-Test Evaluasi Pertemuan 2
                    </h3>
                    <p className="text-xs text-slate-500">
                      Uji komprehensif pasca-instalasi. Capai skor minimal KKM 75 untuk membuka sertifikat kelulusan digital!
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
                            name={`posttest-ptm2-${idx}`}
                            checked={postTestAnswers[idx] === optIdx}
                            onChange={() =>
                              setPostTestAnswers((prev) => ({
                                ...prev,
                                [idx]: optIdx,
                              }))
                            }
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
                    <span>Kirim Jawaban Post-Test &amp; Lihat Nilai</span>
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
                      <div className="font-extrabold text-sm sm:text-base flex items-center gap-2">
                        {postTestScore >= 75 ? (
                          <>
                            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                            <span>SELAMAT! Anda Lulus dengan Skor {postTestScore} / 100</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="h-5 w-5 text-rose-600" />
                            <span>Skor Anda: {postTestScore} / 100 (Belum Mencapai KKM 75)</span>
                          </>
                        )}
                      </div>
                    </div>

                    <p className="text-xs leading-relaxed">
                      {postTestScore >= 75
                        ? "Kompetensi instalasi sistem operasi dan partisi storage Anda telah tervalidasi dengan sangat baik. Silakan buka Sertifikat Digital kelulusan Anda pada Langkah 6!"
                        : "Jangan khawatir! Anda dapat mengulang kembali kuis Post-Test ini (Remedial) sampai mencapai nilai minimal 75 untuk membuka sertifikat kelulusan."}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                      {postTestScore >= 75 ? (
                        <button
                          type="button"
                          onClick={() => goToNextStep(5)}
                          className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          <span>Buka Sertifikat Kelulusan Digital (Langkah 6)</span>
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
        {/* STEP 6: SERTIFIKAT KOMPETENSI DIGITAL PTM 2 */}
        {/* ========================================================================= */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-fade-in">
            <DigitalCertificate
              studentName={user.isLoggedIn ? user.name : "Ahmad Fauzan Pratama"}
              studentClass={user.isLoggedIn ? user.kelas : "XI TKJ 1"}
              studentNis={user.isLoggedIn ? user.nis : "2401001"}
              meetingNumber={2}
              meetingTitle="Instalasi OS Ubuntu Server 22.04 LTS (CLI) & Partisi Storage"
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

            {/* Back to syllabus / overview */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Capaian Pembelajaran Berhasil
                </div>
                <h4 className="text-lg font-bold text-white">
                  Dua Pertemuan Praktikum Telah Anda Tuntaskan!
                </h4>
                <p className="text-xs text-slate-300 max-w-lg">
                  Server Ubuntu Server Anda telah siap untuk materi selanjutnya:
                  Konfigurasi Jaringan Statis Netplan, DNS Resolver, dan Web Server.
                </p>
              </div>

              <Link
                href="/kelas/cloud-computing"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0"
              >
                <span>Kembali ke Silabus Cloud Computing</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </main>

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
              {currentStep} <span className="text-slate-400 font-normal">dari 6</span>
            </span>
          </div>

          <button
            onClick={() => goToNextStep(currentStep)}
            disabled={currentStep === 6}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold transition-all ${
              currentStep === 6
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : isStepUnlocked(currentStep + 1)
                ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-sm"
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
