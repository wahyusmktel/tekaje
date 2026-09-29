"use client";

import { useState } from "react";
import Link from "next/link";
import LabImage from "@/components/LabImage";
import InteractiveLabTerminal from "@/components/InteractiveLabTerminal";
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
  Sparkles,
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

export default function PertemuanSatuPage() {
  const {
    user,
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

  const progress = getProgress("pertemuan-1");
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
    bios: true,
    wizard: true,
    network: true,
    snapshot: true,
  });

  const preTestQuestions = [
    {
      id: 1,
      q: "Dalam model layanan Cloud Computing, penyediaan infrastruktur virtual seperti VM, storage, dan network disebut...",
      options: [
        "Infrastructure as a Service (IaaS)",
        "Software as a Service (SaaS)",
        "Platform as a Service (PaaS)",
        "Network as a Service (NaaS)",
      ],
      correctIndex: 0,
    },
    {
      id: 2,
      q: "Software virtualisasi Oracle VM VirtualBox yang diinstal di atas sistem operasi Windows atau macOS dikategorikan sebagai...",
      options: [
        "Type-1 Hypervisor (Bare-Metal)",
        "Type-2 Hypervisor (Hosted Hypervisor)",
        "Kernel Container Engine",
        "Storage Hypervisor",
      ],
      correctIndex: 1,
    },
    {
      id: 3,
      q: "Apa alasan utama sistem operasi Ubuntu Server tidak menyertakan antarmuka grafis (GUI) secara bawaan?",
      options: [
        "Supaya tidak dapat terhubung ke internet",
        "Karena Linux tidak mendukung kartu grafis",
        "Menghemat konsumsi RAM & CPU serta meningkatkan keamanan dan stabilitas",
        "Agar selalu memerlukan CD-ROM fisik",
      ],
      correctIndex: 2,
    },
    {
      id: 4,
      q: "Fitur CPU yang harus berstatus 'Enabled' di BIOS agar virtualisasi dapat berjalan di komputer lab adalah...",
      options: [
        "Hyper-Threading Turbo Boost",
        "Intel Virtualization Technology (VT-x) atau AMD-V",
        "Overclocking Memory",
        "Integrated GPU Accelerator",
      ],
      correctIndex: 1,
    },
    {
      id: 5,
      q: "Mengapa pada saat membuat VM baru di VirtualBox 7.x kita diwajibkan mencentang opsi 'Skip Unattended Installation'?",
      options: [
        "Agar kita dapat mengatur partisi disk, akun admin user, dan setup OpenSSH secara mandiri",
        "Supaya harddisk virtual otomatis terkompresi",
        "Agar VirtualBox otomatis mendownload Ubuntu Desktop",
        "Agar RAM laptop tidak terkuras",
      ],
      correctIndex: 0,
    },
  ];

  const postTestQuestions = [
    {
      id: 1,
      q: "Karakteristik mode jaringan NAT (Network Address Translation) pada VirtualBox adalah...",
      options: [
        "VM mendapatkan IP satu segmen langsung dengan Wi-Fi fisik sekolah",
        "VM dapat mengakses internet keluar dengan aman tanpa terdeteksi oleh perangkat luar lab",
        "VM tidak memiliki akses internet sama sekali",
        "VM harus memiliki dua kabel LAN fisik",
      ],
      correctIndex: 1,
    },
    {
      id: 2,
      q: "Berapa alokasi Base Memory (RAM) minimum yang disarankan untuk Ubuntu Server agar optimal saat dipasang web service?",
      options: ["512 MB", "1024 MB (1 GB)", "2048 MB (2 GB)", "8192 MB (8 GB)"],
      correctIndex: 2,
    },
    {
      id: 3,
      q: "Teks pilihan menu teratas yang muncul pada layar bootloader GNU GRUB saat pertama kali booting ISO Ubuntu Server adalah...",
      options: [
        "Format harddisk now",
        "> Try or Install Ubuntu Server",
        "Run memory test",
        "Boot from local drive",
      ],
      correctIndex: 1,
    },
    {
      id: 4,
      q: "Fungsi fitur Checkpoint Snapshot pada VirtualBox yang sangat penting bagi siswa di laboratorium adalah...",
      options: [
        "Menyimpan keadaan mesin virtual saat itu agar bisa di-restore kapan saja jika terjadi crash/error",
        "Menambah kapasitas harddisk fisik laptop secara gratis",
        "Mempercepat kecepatan internet Wi-Fi lab",
        "Menghapus seluruh file ISO di komputer",
      ],
      correctIndex: 0,
    },
    {
      id: 5,
      q: "Perintah terminal Ubuntu Server yang digunakan untuk melihat alokasi memori RAM dalam format yang mudah dibaca adalah...",
      options: ["ram -check", "show mem", "free -h", "memstat --all"],
      correctIndex: 2,
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
    setPreTestResult("pertemuan-1", score);
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
    setPostTestResult("pertemuan-1", score);
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-sky-100 selection:text-sky-900 pb-24 sm:pb-16">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/kelas/cloud-computing"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-sky-600 transition-colors mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Daftar Silabus</span>
            </Link>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-sky-500 flex items-center justify-center text-white shadow-sm shadow-sky-500/20">
                <Cloud className="h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm sm:text-base tracking-tight">
                  Pertemuan 01: Setup VM Ubuntu Server
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
        meetingNumber={1}
        meetingTitle="Pengenalan Virtualisasi & Persiapan VM Ubuntu Server"
      />

      {/* STUDENT NOT LOGGED IN CALLOUT BANNER */}
      {!user.isLoggedIn && (
        <div className="bg-sky-50 border-b border-sky-200 px-4 py-3">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-sky-900">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <Sparkles className="h-4 w-4 text-sky-600 shrink-0" />
              <span>
                <b>Halo Siswa!</b> Anda belum memasukkan nama lengkap.
                Masuk terlebih dahulu agar <b>Nilai Praktikum &amp; Sertifikat Digital</b> tercetak atas namamu!
              </span>
            </div>
            <button
              onClick={openLoginModal}
              className="px-4 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold transition-all shadow-xs shrink-0 cursor-pointer"
            >
              Masukkan Nama Siswa
            </button>
          </div>
        </div>
      )}

      {/* MAIN STEP CONTENT CONTAINER */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        {/* ========================================================================= */}
        {/* STEP 1: PRE-TEST DIAGNOSTIK */}
        {/* ========================================================================= */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="h-8 w-8 rounded-xl bg-sky-100 text-sky-700 font-extrabold flex items-center justify-center text-sm">
                    1
                  </span>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                      Langkah 1: Pre-Test Awal (Uji Diagnostik)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Jawablah 5 soal singkat berikut untuk menguji pemahaman awal sebelum memulai praktikum.
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
                      <span className="text-sky-600 font-mono">{idx + 1}.</span>
                      <span>{q.q}</span>
                    </div>

                    <div className="space-y-2 pl-4">
                      {q.options.map((opt, optIdx) => (
                        <label
                          key={optIdx}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                            preTestAnswers[idx] === optIdx
                              ? "bg-sky-50 border-sky-400 text-sky-900 font-semibold shadow-xs"
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
                            className="text-sky-600 focus:ring-sky-500"
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
                    className="w-full py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
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
                      Kerja bagus! Pemahaman awal Anda telah tercatat. Sekarang mari kita pelajari
                      konsep teori dasar virtualisasi sebelum masuk ke simulator praktikum.
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
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
                <span className="h-8 w-8 rounded-xl bg-indigo-100 text-indigo-700 font-extrabold flex items-center justify-center text-sm">
                  2
                </span>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                    Langkah 2: Modul Teori Dasar Virtualisasi &amp; Server
                  </h3>
                  <p className="text-xs text-slate-500">
                    Pahami pondasi arsitektur cloud server sebelum mempraktikkannya di laboratorium.
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  Di industri <b>Cloud Computing</b>, penyedia layanan seperti AWS EC2, Google Cloud,
                  atau Telkom Cloud membagi satu server fisik besar menjadi ratusan server virtual mandiri
                  menggunakan teknologi <b>Virtualisasi</b>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <h4 className="font-bold text-slate-900 text-xs text-sky-700">
                      1. Type-2 Hypervisor (Hosted)
                    </h4>
                    <p className="text-xs text-slate-600">
                      Berjalan di atas sistem operasi host (seperti VirtualBox di Windows). Sangat ideal untuk simulasi laboratorium sekolah siswa.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <h4 className="font-bold text-slate-900 text-xs text-indigo-700">
                      2. Ubuntu Server 22.04 LTS (CLI)
                    </h4>
                    <p className="text-xs text-slate-600">
                      Sistem operasi tanpa GUI (Headless) standar industri yang sangat hemat RAM (hanya butuh ~150-250MB saat idle) dan sangat stabil.
                    </p>
                  </div>
                </div>

                {/* Diagram Real / Placeholder */}
                <LabImage
                  src="/images/cloud-computing/pertemuan-1/gambar1_arsitektur_virtualisasi.png"
                  alt="Diagram Arsitektur Virtualisasi Type-2 Hypervisor"
                  caption="Gambar 1.1: Diagram Arsitektur Virtualisasi Type-2 Hypervisor pada OS Host Komputer Lab"
                  placeholderGuide="Diagram arsitektur virtualisasi yang membedakan Host Hardware, Host OS Windows, Hypervisor VirtualBox, dan Guest OS Ubuntu Server."
                  suggestedFileName="gambar1_arsitektur_virtualisasi.png"
                />
              </div>

              {/* Challenge completion button */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => goToPrevStep(2)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                >
                  &larr; Kembali ke Pre-Test
                </button>

                <button
                  onClick={() => {
                    completeTheory("pertemuan-1");
                    goToNextStep(2);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Saya Sudah Paham &amp; Lanjut ke Hands-on Lab</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: HANDS-ON LAB TERMINAL SIMULATOR */}
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
                      Langkah 3: Praktik Hands-on Lab di Web Terminal
                    </h3>
                    <p className="text-xs text-slate-500">
                      Selesaikan 5 misi perintah Linux berikut langsung di simulator terminal browser Anda.
                    </p>
                  </div>
                </div>

                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Interactive Simulator
                </span>
              </div>

              {/* Terminal Simulator Component */}
              <InteractiveLabTerminal />

              {/* Challenge navigation button */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => goToPrevStep(3)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                >
                  &larr; Kembali ke Teori
                </button>

                <button
                  onClick={() => {
                    completeLab("pertemuan-1");
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
        {/* STEP 4: CHECKLIST PRAKTIKUM & SCREENSHOT PORTOFOLIO */}
        {/* ========================================================================= */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="h-8 w-8 rounded-xl bg-amber-100 text-amber-700 font-extrabold flex items-center justify-center text-sm">
                    4
                  </span>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                      Langkah 4: Panduan VirtualBox &amp; Checklist Bukti Praktikum
                    </h3>
                    <p className="text-xs text-slate-500">
                      Pastikan Anda telah melakukan 4 tahapan praktikum di komputer lab fisik.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4 Panduan Praktikum Mandiri */}
              <div className="space-y-6">
                {/* 1. BIOS */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                      Tahap 1
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Task Manager Windows
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Verifikasi CPU Virtualization: Enabled
                  </h4>
                  <p className="text-xs text-slate-600">
                    Buka Task Manager (Ctrl+Shift+Esc) &rarr; Tab Performance &rarr; CPU &rarr; Pastikan
                    Virtualization: <b>Enabled</b>.
                  </p>
                  <LabImage
                    src="/images/cloud-computing/pertemuan-1/gambar2_task_manager_vtx.png"
                    alt="Task Manager CPU Virtualization"
                    caption="Gambar 1.2: Memastikan status Virtualization: Enabled pada Task Manager"
                    placeholderGuide="Screenshot tampilan Task Manager Windows (Performance -> CPU) yang menunjukkan informasi 'Virtualization: Enabled'."
                    suggestedFileName="gambar2_task_manager_vtx.png"
                  />
                </div>

                {/* 2. Wizard */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                      Tahap 2
                    </span>
                    <span className="text-xs font-bold text-rose-600">
                      Wajib: Skip Unattended!
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Pembuatan VM di VirtualBox (RAM 2GB, 2 CPU, Disk 25GB)
                  </h4>
                  <p className="text-xs text-slate-600">
                    Buka VirtualBox &rarr; Klik New &rarr; Beri nama <code>Ubuntu-Server-22.04</code> &rarr;
                    Centang <b>Skip Unattended Installation</b>.
                  </p>
                  <LabImage
                    src="/images/cloud-computing/pertemuan-1/gambar2_panduan_wizard_vm.png"
                    alt="Wizard VM Ubuntu Server"
                    caption="Gambar 1.3: Konfigurasi formulir Wizard New VM di VirtualBox"
                    placeholderGuide="Screenshot formulir pembuatan New VM di VirtualBox dengan centang Skip Unattended."
                    suggestedFileName="gambar2_panduan_wizard_vm.png"
                  />
                </div>

                {/* 3. Network */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                      Tahap 3
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Settings Network
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Pengecekan Adapter Jaringan Mode NAT
                  </h4>
                  <p className="text-xs text-slate-600">
                    Klik kanan VM &rarr; Settings &rarr; Network &rarr; Pastikan Adapter 1 terpasang pada mode <b>NAT</b>.
                  </p>
                  <LabImage
                    src="/images/cloud-computing/pertemuan-1/gambar3_konfigurasi_jaringan.png"
                    alt="Konfigurasi Network NAT"
                    caption="Gambar 1.4: Konfigurasi Mode Jaringan NAT pada VirtualBox"
                    placeholderGuide="Screenshot menu Network Settings VirtualBox menampilkan Attached to: NAT."
                    suggestedFileName="gambar3_konfigurasi_jaringan.png"
                  />
                </div>

                {/* 4. Boot & Snapshot */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Tahap 4
                    </span>
                    <span className="text-xs font-bold text-emerald-700">
                      Checkpoint Aman
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Uji Booting GRUB &amp; Pembuatan Snapshot
                  </h4>
                  <p className="text-xs text-slate-600">
                    Jalankan VM hingga muncul bootloader GNU GRUB (<code>&gt; Try or Install Ubuntu Server</code>),
                    lalu matikan dan simpan Snapshot: <code>Ptm 1 - VM Ready Pre-Install</code>.
                  </p>
                  <LabImage
                    src="/images/cloud-computing/pertemuan-1/gambar5_grub_boot_snapshot.png"
                    alt="Menu GNU GRUB dan Snapshot"
                    caption="Gambar 1.5: Menu Bootloader GNU GRUB & Checkpoint Snapshot"
                    placeholderGuide="Screenshot jendela VM menu GNU GRUB dan tab Snapshot VirtualBox."
                    suggestedFileName="gambar5_grub_boot_snapshot.png"
                  />
                </div>
              </div>

              {/* Student Checklist Validation Box */}
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <CheckSquare className="h-4 w-4 text-amber-700" />
                  <span>Lembar Verifikasi Mandiri Siswa</span>
                </h4>
                <p className="text-xs text-amber-800">
                  Centang pernyataan di bawah ini untuk mengonfirmasi bahwa Anda telah mempraktikkan langkah di atas:
                </p>

                <div className="space-y-2 text-xs text-slate-800">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.bios}
                      onChange={(e) => setChecklist({ ...checklist, bios: e.target.checked })}
                      className="rounded text-sky-600 focus:ring-sky-500"
                    />
                    <span>Saya sudah memeriksa Virtualization: Enabled di Task Manager.</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.wizard}
                      onChange={(e) => setChecklist({ ...checklist, wizard: e.target.checked })}
                      className="rounded text-sky-600 focus:ring-sky-500"
                    />
                    <span>Saya sudah membuat VM dengan alokasi RAM 2GB, 2 CPU, dan mencentang Skip Unattended.</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.network}
                      onChange={(e) => setChecklist({ ...checklist, network: e.target.checked })}
                      className="rounded text-sky-600 focus:ring-sky-500"
                    />
                    <span>Saya sudah memeriksa Adapter Jaringan berada pada mode NAT.</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.snapshot}
                      onChange={(e) => setChecklist({ ...checklist, snapshot: e.target.checked })}
                      className="rounded text-sky-600 focus:ring-sky-500"
                    />
                    <span>Saya sudah menguji boot GNU GRUB dan membuat snapshot 'Ptm 1 - VM Ready Pre-Install'.</span>
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
                    completePortfolio("pertemuan-1");
                    goToNextStep(4);
                  }}
                  disabled={!checklist.bios || !checklist.wizard || !checklist.network || !checklist.snapshot}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Konfirmasi Checklist &amp; Buka Post-Test</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 5: POST-TEST EVALUASI KOMPETENSI */}
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
                      Langkah 5: Post-Test Evaluasi Hasil Belajar
                    </h3>
                    <p className="text-xs text-slate-500">
                      Uji komprehensif pemahaman praktikum. Capai skor minimal KKM 75 untuk membuka sertifikat digital!
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
                        ? "Kompetensi dasar Pertemuan 1 Anda telah tervalidasi dengan sangat baik. Silakan buka Sertifikat Digital kelulusan Anda pada Langkah 6!"
                        : "Jangan berkecil hati! Anda dapat mengulang kembali kuis Post-Test ini (Remedial) sampai mencapai nilai minimal 75 untuk membuka sertifikat kelulusan."}
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
        {/* STEP 6: SERTIFIKAT KOMPETENSI DIGITAL */}
        {/* ========================================================================= */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-fade-in">
            <DigitalCertificate
              studentName={user.isLoggedIn ? user.name : "Ahmad Fauzan Pratama"}
              studentClass={user.isLoggedIn ? user.kelas : "XI TKJ 1"}
              studentNis={user.isLoggedIn ? user.nis : "2401001"}
              meetingNumber={1}
              meetingTitle="Pengenalan Virtualisasi & Persiapan VM Ubuntu Server 22.04 LTS"
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

            {/* Next Meeting Recommendation Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-sky-950 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  Materi Selanjutnya Telah Tersedia!
                </div>
                <h4 className="text-lg font-bold text-white">
                  Siap Melanjutkan ke Pertemuan 02?
                </h4>
                <p className="text-xs text-slate-300 max-w-lg">
                  Langkah berikutnya: Instalasi Sistem Operasi Ubuntu Server 22.04 LTS
                  (CLI Mode), konfigurasi partisi LVM, dan setup OpenSSH server.
                </p>
              </div>

              <Link
                href="/kelas/cloud-computing/pertemuan-2"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0"
              >
                <span>Buka Materi Pertemuan 02</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* MOBILE-FRIENDLY BOTTOM STICKY NAVIGATION BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3 text-xs">
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
                ? "bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
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
