"use client";

import { useState } from "react";
import {
  Gamepad2,
  Trophy,
  Zap,
  Heart,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Sparkles,
  ShieldCheck,
  Server,
  Layers,
  Terminal,
  Cpu,
  RefreshCw,
} from "lucide-react";

interface CloudSysadminGameProps {
  onComplete: () => void;
  alreadyCompleted?: boolean;
}

// STAGE 1 PIPELINE ITEMS
interface PipelineItem {
  id: string;
  order: number;
  title: string;
  desc: string;
  iconName: string;
}

const initialPipeline: PipelineItem[] = [
  {
    id: "step-bios",
    order: 1,
    title: "1. Aktifkan Intel VT-x / AMD-V di BIOS",
    desc: "Nyalakan fitur virtualisasi hardware prosesor komputer host agar hypervisor dapat menjalankan guest OS.",
    iconName: "cpu",
  },
  {
    id: "step-new-vm",
    order: 2,
    title: "2. Buat VM & Centang 'Skip Unattended'",
    desc: "Pilih file ISO Ubuntu Server 22.04 LTS dan hindari installer otomatis agar akun admin dapat disetup manual.",
    iconName: "server",
  },
  {
    id: "step-hardware",
    order: 3,
    title: "3. Alokasikan RAM 2GB, 2 vCPU, & 25GB Disk",
    desc: "Tentukan spesifikasi hardware virtual yang memadai untuk kebutuhan service server tanpa membebani host.",
    iconName: "layers",
  },
  {
    id: "step-network",
    order: 4,
    title: "4. Konfigurasi Kartu Jaringan (Mode NAT)",
    desc: "Pastikan opsi Cable Connected tercentang sehingga VM memperoleh IP privat dan akses internet keluar yang aman.",
    iconName: "terminal",
  },
  {
    id: "step-grub",
    order: 5,
    title: "5. Booting VM & Pilih 'Try or Install Ubuntu Server'",
    desc: "Nyalakan VM untuk membaca kernel installer dari virtual optical drive melalui bootloader GRUB.",
    iconName: "server",
  },
  {
    id: "step-snapshot",
    order: 6,
    title: "6. Buat Checkpoint Snapshot Pertama",
    desc: "Amankan titik restore kondisi awal VM sebelum dilakukan eksperimen instalasi paket atau konfigurasi jaringan.",
    iconName: "shield",
  },
];

// Shuffle helper
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // Ensure it's not accidentally already solved
  if (arr.every((item: any, idx) => item.order === idx + 1)) {
    return [arr[1], arr[0], ...arr.slice(2)];
  }
  return arr;
}

// STAGE 2 TROUBLESHOOTING QUESTIONS
interface TroubleQuestion {
  id: number;
  title: string;
  badge: string;
  scenario: string;
  options: { text: string; correct: boolean; feedback: string }[];
}

const troubleQuestions: TroubleQuestion[] = [
  {
    id: 1,
    badge: "INSIDEN CRITICAL",
    title: "Error: VT-x is disabled in the BIOS",
    scenario: "Saat menekan tombol Start pada VirtualBox, muncul kotak dialog error merah: 'VT-x is disabled in the BIOS for all CPU modes'. Apa tindakan tercepat Anda?",
    options: [
      {
        text: "Restart PC host, tekan F2/Del saat menyala, lalu ubah 'Intel Virtualization Tech' ke Enabled",
        correct: true,
        feedback: "Tepat sekali! Fitur virtualisasi hardware pada CPU wajib aktif di BIOS motherboard.",
      },
      {
        text: "Uninstall VirtualBox dan instal kembali versi lama",
        correct: false,
        feedback: "Kurang tepat. Masalah ini ada pada setelan firmware BIOS motherboard, bukan software VirtualBox.",
      },
      {
        text: "Tingkatkan kapasitas RAM mesin virtual menjadi 8 GB",
        correct: false,
        feedback: "Salah. RAM tidak berpengaruh jika instruksi CPU virtualisasi belum diaktifkan.",
      },
    ],
  },
  {
    id: 2,
    badge: "INSIDEN WIZARD",
    title: "Akun Default Terkunci: vboxuser",
    scenario: "Di VirtualBox 7.x, installer langsung jalan sendiri dan selesai tanpa memberi kesempatan menentukan username dan password administrator sendiri. Bagaimana solusinya?",
    options: [
      {
        text: "Wajib mencentang kotak 'Skip Unattended Installation' di jendela pertama pembuatan VM",
        correct: true,
        feedback: "Mantap! Opsi ini memberi kendali 100% pada siswa untuk mengatur partisi, username, dan OpenSSH.",
      },
      {
        text: "Cabut kabel internet komputer saat proses instalasi berjalan",
        correct: false,
        feedback: "Salah. Unattended install adalah fitur internal VirtualBox, bukan karena koneksi internet.",
      },
      {
        text: "Format harddisk utama komputer lab",
        correct: false,
        feedback: "Berbahaya & salah! Jangan pernah memformat drive host.",
      },
    ],
  },
  {
    id: 3,
    badge: "INSIDEN NETWORK",
    title: "VM Gagal Ping ke Internet (Network Unreachable)",
    scenario: "Siswa telah login ke Ubuntu Server, namun saat menjalankan 'ping google.com' muncul error Network Unreachable. Apa hal pertama yang harus diperiksa?",
    options: [
      {
        text: "Cek Menu Devices > Network Settings di VirtualBox, pastikan terhubung ke NAT dan opsi 'Cable Connected' aktif",
        correct: true,
        feedback: "Sangat benar! Virtual NIC harus tercolok (Cable Connected) dan dalam mode NAT agar mendapat gateway.",
      },
      {
        text: "Beli kartu Wi-Fi USB baru untuk laptop",
        correct: false,
        feedback: "Tidak perlu perangkat fisik baru, ini adalah konfigurasi adapter virtual di VirtualBox.",
      },
      {
        text: "Hapus ISO installer Ubuntu Server dari komputer",
        correct: false,
        feedback: "Salah. File ISO tidak mempengaruhi rute paket TCP/IP jaringan.",
      },
    ],
  },
  {
    id: 4,
    badge: "INSIDEN SAFETY",
    title: "Eksperimen Konfigurasi Berisiko Tinggi",
    scenario: "Siswa ingin memodifikasi file inti sistem /etc/network/interfaces dan konfigurasi firewall yang berisiko membuat server freeze total. Praktik terbaik apa yang harus dilakukan sebelum memulai?",
    options: [
      {
        text: "Buat 'Snapshot' / Checkpoint kondisi VM saat ini agar dapat di-Restore dalam 2 detik bila terjadi crash",
        correct: true,
        feedback: "Brilian! Snapshot adalah fitur keselamatan nomor satu bagi calon sysadmin di lingkungan uji coba.",
      },
      {
        text: "Salin seluruh folder C:\\Program Files\\Oracle\\VirtualBox ke flashdisk",
        correct: false,
        feedback: "Kurang tepat dan boros ruang. Cukup gunakan fitur native Snapshot VirtualBox.",
      },
      {
        text: "Mematikan paksa laptop dengan menekan tombol power lama-lama",
        correct: false,
        feedback: "Salah besar! Mematikan paksa dapat merusak filesystem virtual disk (.vdi).",
      },
    ],
  },
];

export default function CloudSysadminGame({
  onComplete,
  alreadyCompleted = false,
}: CloudSysadminGameProps) {
  // Game state
  const [stage, setStage] = useState<"intro" | "pipeline" | "troubleshoot" | "victory">(
    alreadyCompleted ? "victory" : "intro"
  );
  const [xp, setXp] = useState(alreadyCompleted ? 700 : 0);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);

  // Stage 1 Pipeline State
  const [pipeline, setPipeline] = useState<PipelineItem[]>(() => shuffleArray(initialPipeline));
  const [pipelineError, setPipelineError] = useState<string | null>(null);
  const [pipelineSuccess, setPipelineSuccess] = useState(false);

  // Stage 2 Troubleshooting State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOptIndex, setSelectedOptIndex] = useState<number | null>(null);
  const [answeredState, setAnsweredState] = useState<"idle" | "correct" | "wrong">("idle");
  const [feedbackText, setFeedbackText] = useState("");

  // Sound feedback synthesizer (Web Audio API)
  const playSfx = (type: "correct" | "wrong" | "victory") => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "correct") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.15); // G5
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === "wrong") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
        osc.frequency.linearRampToValueAtTime(140, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === "victory") {
        osc.type = "triangle";
        const notes = [440, 554.37, 659.25, 880];
        notes.forEach((freq, idx) => {
          const subOsc = ctx.createOscillator();
          const subGain = ctx.createGain();
          subOsc.connect(subGain);
          subGain.connect(ctx.destination);
          subOsc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
          subGain.gain.setValueAtTime(0.1, ctx.currentTime + idx * 0.1);
          subGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.1 + 0.3);
          subOsc.start(ctx.currentTime + idx * 0.1);
          subOsc.stop(ctx.currentTime + idx * 0.1 + 0.3);
        });
      }
    } catch {
      // AudioContext not allowed or disabled, silently ignore
    }
  };

  // Pipeline movement
  const movePipelineItem = (index: number, direction: "up" | "down") => {
    setPipelineError(null);
    const newItems = [...pipeline];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setPipeline(newItems);
  };

  const validatePipeline = () => {
    const isCorrect = pipeline.every((item, idx) => item.order === idx + 1);
    if (isCorrect) {
      setPipelineSuccess(true);
      setPipelineError(null);
      setXp((prev) => prev + 300);
      setStreak((prev) => prev + 1);
      playSfx("correct");
    } else {
      setPipelineError("Urutan alur pipeline belum tepat! Teliti urutan langkah mulai dari BIOS hingga Snapshot.");
      playSfx("wrong");
    }
  };

  const startTroubleshoot = () => {
    setStage("troubleshoot");
    setCurrentQIndex(0);
    setAnsweredState("idle");
    setSelectedOptIndex(null);
  };

  // Handle Stage 2 Option Choice
  const handleAnswerTrouble = (optIndex: number) => {
    if (answeredState !== "idle") return;
    setSelectedOptIndex(optIndex);
    const q = troubleQuestions[currentQIndex];
    const choice = q.options[optIndex];

    if (choice.correct) {
      setAnsweredState("correct");
      setFeedbackText(choice.feedback);
      setXp((prev) => prev + 100);
      setStreak((prev) => prev + 1);
      playSfx("correct");
    } else {
      setAnsweredState("wrong");
      setFeedbackText(choice.feedback);
      setLives((prev) => Math.max(0, prev - 1));
      setStreak(0);
      playSfx("wrong");
    }
  };

  const handleNextTrouble = () => {
    if (currentQIndex + 1 < troubleQuestions.length) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOptIndex(null);
      setAnsweredState("idle");
      setFeedbackText("");
    } else {
      // Finished all troubleshooting!
      setStage("victory");
      playSfx("victory");
      onComplete();
    }
  };

  const resetGame = () => {
    setPipeline(shuffleArray(initialPipeline));
    setPipelineError(null);
    setPipelineSuccess(false);
    setStage("pipeline");
    setLives(3);
    setStreak(0);
    setXp(0);
    setCurrentQIndex(0);
    setAnsweredState("idle");
    setSelectedOptIndex(null);
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 text-slate-100 overflow-hidden shadow-2xl relative">
      {/* Background Decorative Tech Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

      {/* GAMIFICATION TOP STATUS BAR */}
      <div className="relative z-10 px-4 sm:px-8 py-4 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20">
            <Gamepad2 className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                TEKAJE ARENA &bull; STEP 5
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Gamifikasi
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-extrabold text-white">
              Cloud SysAdmin Virtualization Quest
            </h3>
          </div>
        </div>

        {/* HUD: XP, Streak, Lives */}
        <div className="flex items-center gap-3 sm:gap-5 text-xs font-mono">
          {/* XP Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-amber-300 font-bold shadow-xs">
            <Zap className="h-4 w-4 text-amber-400 fill-amber-400" />
            <span>{xp} XP</span>
          </div>

          {/* Combo Streak */}
          {streak > 1 && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-400 font-bold animate-pulse">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{streak}x Combo</span>
            </div>
          )}

          {/* Hearts / Lives */}
          <div className="flex items-center gap-1 bg-slate-800/80 border border-slate-700/80 px-2.5 py-1.5 rounded-xl">
            {[1, 2, 3].map((heart) => (
              <Heart
                key={heart}
                className={`h-4 w-4 transition-all duration-300 ${
                  heart <= lives
                    ? "text-rose-500 fill-rose-500 scale-100"
                    : "text-slate-600 scale-90 opacity-40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="relative z-10 p-4 sm:p-8">
        {/* ========================================================================= */}
        {/* 1. INTRO SCREEN */}
        {/* ========================================================================= */}
        {stage === "intro" && (
          <div className="max-w-2xl mx-auto text-center space-y-6 py-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold">
              <Trophy className="h-4 w-4" />
              <span>Uji Ketangkasan Sebelum Post-Test</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Siapkah Anda Menjadi <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                Master Virtualisasi Server?
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
              Selamat datang di arena gamifikasi praktikum! Selesaikan <b>2 Misi Khusus</b> untuk membuktikan
              pemahaman alur setup server dan troubleshooting insiden lab Anda sebelum lanjut ke Post-Test.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-lg mx-auto pt-2">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-xs">
                  <span className="h-6 w-6 rounded-lg bg-sky-500/20 flex items-center justify-center text-xs">1</span>
                  <span>Pipeline Architect</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Susun 6 langkah alur setup VM secara logis dari BIOS hingga pembuatan snapshot.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <span className="h-6 w-6 rounded-lg bg-amber-500/20 flex items-center justify-center text-xs">2</span>
                  <span>Trouble-Hunter</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Pecahkan 4 kasus error umum di lab komputer dengan reaksi cepat dan tepat.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setStage("pipeline")}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-sky-500/20 active:scale-95 transition-all cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <span>Mulai Misi 1: Pipeline Architect</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. STAGE 1: PIPELINE ARCHITECT */}
        {/* ========================================================================= */}
        {stage === "pipeline" && (
          <div className="space-y-6 max-w-3xl mx-auto animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
                  Misi 1 dari 2
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-white">
                  Pipeline Architect: Urutkan Alur Setup VM
                </h3>
                <p className="text-xs text-slate-400">
                  Gunakan tombol panah <b>Naik (&uarr;)</b> atau <b>Turun (&darr;)</b> pada setiap kartu untuk menyusun alur kerja praktikum dari awal hingga akhir.
                </p>
              </div>

              <button
                onClick={() => setPipeline(shuffleArray(initialPipeline))}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white text-xs font-medium cursor-pointer transition-colors"
                title="Acak ulang balok"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Acak Ulang</span>
              </button>
            </div>

            {/* Error / Success Alerts */}
            {pipelineError && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 animate-shake">
                <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0" />
                <span>{pipelineError}</span>
              </div>
            )}

            {pipelineSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Luar Biasa! Alur Pipeline Berhasil Disusun Sempurna (+300 XP)</span>
                </div>
                <p className="text-xs text-emerald-200/80">
                  Pemahaman tahapan kerja Anda sangat presisi! Sekarang lanjutkan ke tantangan pemecahan masalah insiden.
                </p>
              </div>
            )}

            {/* Pipeline List */}
            <div className="space-y-2.5">
              {pipeline.map((item, idx) => {
                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border transition-all ${
                      pipelineSuccess
                        ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-100"
                        : "bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-xl bg-slate-800 text-sky-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white">
                          {item.title}
                        </div>
                        <p className="text-[11px] text-slate-400 leading-tight pt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {!pipelineSuccess && (
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => movePipelineItem(idx, "up")}
                          disabled={idx === 0}
                          className="h-8 w-8 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-300 flex items-center justify-center cursor-pointer transition-all"
                          title="Geser ke atas"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => movePipelineItem(idx, "down")}
                          disabled={idx === pipeline.length - 1}
                          className="h-8 w-8 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-300 flex items-center justify-center cursor-pointer transition-all"
                          title="Geser ke bawah"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Stage 1 Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-400">
                Status Alur: {pipelineSuccess ? "Tervalidasi 100%" : "Menunggu pengujian susunan"}
              </div>

              {!pipelineSuccess ? (
                <button
                  onClick={validatePipeline}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Uji Validasi Alur Pipeline</span>
                </button>
              ) : (
                <button
                  onClick={startTroubleshoot}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 animate-bounce"
                >
                  <span>Lanjut ke Misi 2: Trouble-Hunter</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. STAGE 2: TROUBLE-HUNTER */}
        {/* ========================================================================= */}
        {stage === "troubleshoot" && (
          <div className="space-y-6 max-w-2xl mx-auto animate-fade-in">
            {/* Header with Case Progress */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Misi 2 dari 2 &bull; Kasus {currentQIndex + 1} dari {troubleQuestions.length}
                </span>
                <h3 className="text-base font-extrabold text-white">
                  Trouble-Hunter: Analisis Insiden Lab
                </h3>
              </div>
              <div className="text-xs font-mono text-slate-400">
                Kasus {currentQIndex + 1}/{troubleQuestions.length}
              </div>
            </div>

            {/* Scenario Card */}
            {(() => {
              const q = troubleQuestions[currentQIndex];
              return (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-rose-500/20 text-rose-300 text-[10px] font-bold uppercase tracking-wider border border-rose-500/30">
                      <AlertTriangle className="h-3 w-3" />
                      <span>{q.badge}</span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-white">
                      {q.title}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {q.scenario}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="space-y-2.5">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = selectedOptIndex === oIdx;
                      let btnStyle = "bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-200";

                      if (answeredState !== "idle") {
                        if (opt.correct) {
                          btnStyle = "bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold";
                        } else if (isSelected && !opt.correct) {
                          btnStyle = "bg-rose-950/40 border-rose-500 text-rose-200";
                        } else {
                          btnStyle = "opacity-40 bg-slate-900/40 border-slate-800 text-slate-400";
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleAnswerTrouble(oIdx)}
                          disabled={answeredState !== "idle"}
                          className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm transition-all cursor-pointer flex items-start gap-3 ${btnStyle}`}
                        >
                          <span className="h-6 w-6 rounded-lg bg-slate-800 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="leading-snug">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Box */}
                  {answeredState !== "idle" && (
                    <div
                      className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-2 animate-fade-in ${
                        answeredState === "correct"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                          : "bg-rose-500/10 border-rose-500/30 text-rose-200"
                      }`}
                    >
                      <div className="font-bold flex items-center gap-2">
                        {answeredState === "correct" ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            <span>Solusi Tepat! (+100 XP)</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="h-4 w-4 text-rose-400" />
                            <span>Solusi Kurang Tepat (-1 Nyawa)</span>
                          </>
                        )}
                      </div>
                      <p className="text-xs opacity-90 leading-relaxed">{feedbackText}</p>

                      <div className="pt-2 text-right">
                        <button
                          onClick={handleNextTrouble}
                          className="px-5 py-2.5 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-200 transition-all cursor-pointer inline-flex items-center gap-2"
                        >
                          <span>
                            {currentQIndex + 1 < troubleQuestions.length
                              ? "Lanjut ke Kasus Berikutnya"
                              : "Selesaikan Arena & Lihat Hasil"}
                          </span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. VICTORY SCREEN */}
        {/* ========================================================================= */}
        {stage === "victory" && (
          <div className="max-w-xl mx-auto text-center space-y-6 py-6 animate-fade-in">
            <div className="h-20 w-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center mx-auto shadow-2xl shadow-amber-500/30 animate-pulse">
              <Trophy className="h-10 w-10" />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Misi Selesai &bull; Stage Cleared</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Selamat! Anda Lolos Arena Virtualisasi
              </h2>
              <p className="text-xs text-slate-400">
                Peringkat Diperoleh: <b className="text-amber-300">Junior Cloud SysAdmin Specialist</b>
              </p>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Total XP</div>
                <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                  {xp} XP
                </div>
              </div>
              <div className="border-x border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Sisa Nyawa</div>
                <div className="text-xl sm:text-2xl font-black text-rose-400 font-mono">
                  {lives} / 3
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Langkah 6</div>
                <div className="text-sm sm:text-base font-extrabold text-emerald-400 mt-1">
                  TERBUKA ✓
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-sky-950/30 border border-sky-500/30 text-xs text-sky-200 leading-relaxed text-left">
              💡 <b>Langkah Selanjutnya:</b> Seluruh bekal pengetahuan simulator, checklist portofolio, dan arena troubleshooting kini telah lengkap.
              Buktikan kompetensi akhir Anda di <b>Langkah 6: Post-Test Evaluasi Mandiri</b> untuk mencetak Sertifikat Kelulusan!
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={resetGame}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-800 hover:bg-slate-900 text-slate-300 text-xs font-semibold cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Mainkan Ulang Arena</span>
              </button>

              <button
                onClick={onComplete}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <span>Buka &amp; Lanjut ke Langkah 6: Post-Test</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
