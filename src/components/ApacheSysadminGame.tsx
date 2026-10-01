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
  Globe,
  RefreshCw,
} from "lucide-react";

interface ApacheSysadminGameProps {
  onComplete: () => void;
  alreadyCompleted?: boolean;
}

interface PipelineItem {
  id: string;
  order: number;
  title: string;
  desc: string;
}

const initialPipeline: PipelineItem[] = [
  {
    id: "step-apt",
    order: 1,
    title: "1. Update Repositori APT Linux",
    desc: "Perbarui katalog paket sistem operasi (sudo apt update) agar index paket teranyar.",
  },
  {
    id: "step-install",
    order: 2,
    title: "2. Install Paket Apache2 Web Server",
    desc: "Eksekusi 'sudo apt install -y apache2' untuk mengunduh core daemon dan dependensi HTTP.",
  },
  {
    id: "step-firewall",
    order: 3,
    title: "3. Izinkan Port 80 HTTP di Firewall UFW",
    desc: "Buka port komunikasi HTTP (sudo ufw allow 'Apache') agar lalu lintas web tidak diblokir.",
  },
  {
    id: "step-service",
    order: 4,
    title: "4. Verifikasi Status Service Apache2",
    desc: "Cek 'sudo systemctl status apache2' untuk memastikan statusnya 'active (running)'.",
  },
  {
    id: "step-docroot",
    order: 5,
    title: "5. Kustomisasi File Index di DocumentRoot",
    desc: "Tulis kode HTML pada direktori '/var/www/html/index.html' dengan hak akses www-data.",
  },
  {
    id: "step-test",
    order: 6,
    title: "6. Uji Akses Respon HTTP Header 200 OK",
    desc: "Lakukan curl -I http://localhost atau buka IP server pada browser untuk memvalidasi halaman.",
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  if (arr.every((item: any, idx) => item.order === idx + 1)) {
    return [arr[1], arr[0], ...arr.slice(2)];
  }
  return arr;
}

interface TroubleQuestion {
  id: number;
  badge: string;
  title: string;
  scenario: string;
  options: { text: string; correct: boolean; feedback: string }[];
}

const troubleQuestions: TroubleQuestion[] = [
  {
    id: 1,
    badge: "PORT CONFLICT",
    title: "Error: (98)Address already in use: make_sock 0.0.0.0:80",
    scenario: "Saat menjalankan 'sudo systemctl start apache2', service gagal start dengan log error 'Address already in use: AH00072'. Apa penyebab dan tindakan tercepat Anda?",
    options: [
      {
        text: "Ada web server lain (misal Nginx) yang berjalan di port 80; matikan service Nginx (sudo systemctl stop nginx)",
        correct: true,
        feedback: "Tepat sekali! Dua daemon web server tidak dapat mengikat port TCP 80 secara bersamaan pada IP yang sama.",
      },
      {
        text: "Hapus seluruh folder /var/www/html",
        correct: false,
        feedback: "Salah. Masalah ini ada pada socket port binding, bukan isi file website.",
      },
      {
        text: "Instal ulang sistem operasi Ubuntu Server dari awal",
        correct: false,
        feedback: "Sangat tidak efisien dan salah. Cukup hentikan proses yang menempati port 80.",
      },
    ],
  },
  {
    id: 2,
    badge: "PERMISSION DENIED",
    title: "Tampilan Web Error 403 Forbidden",
    scenario: "Setelah siswa mengganti file index.html, browser menampilkan '403 Forbidden: You don't have permission to access this resource'. Solusi apa yang tepat?",
    options: [
      {
        text: "Atur kepemilikan user web server: 'sudo chown -R www-data:www-data /var/www/html' dan chmod 644 index.html",
        correct: true,
        feedback: "Brilian! Daemon Apache berjalan sebagai user 'www-data' sehingga memerlukan izin baca file DocumentRoot.",
      },
      {
        text: "Ganti kabel LAN komputer lab",
        correct: false,
        feedback: "Kurang tepat. 403 Forbidden adalah error hak akses filesystem di dalam server, bukan koneksi kabel fisik.",
      },
      {
        text: "Matikan firewall UFW",
        correct: false,
        feedback: "Salah. Jika firewall memblokir, responnya adalah timeout/connection refused, bukan HTTP 403.",
      },
    ],
  },
  {
    id: 3,
    badge: "SYNTAX CHECK",
    title: "Pemeriksaan Sintaks Konfigurasi Tanpa Downtime",
    scenario: "Sebelum melakukan restart pada Apache2 production di lab, perintah CLI apa yang wajib dijalankan untuk memverifikasi apakah ada kesalahan ketik (syntax error) pada VirtualHost?",
    options: [
      {
        text: "sudo apache2ctl configtest (atau apachectl -t)",
        correct: true,
        feedback: "Sangat akurat! Perintah ini akan memvalidasi sintaks dan menampilkan 'Syntax OK' sebelum reload service.",
      },
      {
        text: "sudo reboot now",
        correct: false,
        feedback: "Salah. Me-reboot server tanpa cek sintaks justru akan membuat web server gagal start saat booting.",
      },
      {
        text: "ping google.com",
        correct: false,
        feedback: "Salah. Ping hanya menguji konektivitas jaringan ICMP, bukan konfigurasi Apache2.",
      },
    ],
  },
  {
    id: 4,
    badge: "REMOTE ACCESS",
    title: "Client Laptop Tidak Bisa Akses Web Server Lab",
    scenario: "Perintah 'curl http://localhost' di dalam server menghasilkan 200 OK, tetapi laptop siswa lain di jaringan lab tidak bisa membuka http://10.10.20.5. Apa masalah utamanya?",
    options: [
      {
        text: "Port 80 diblokir oleh firewall internal; jalankan 'sudo ufw allow Apache' dan cek bridge network",
        correct: true,
        feedback: "Tepat sekali! Layanan web server lokal harus diizinkan melewati firewall untuk menerima traffic eksternal.",
      },
      {
        text: "Hapus paket Apache2 lalu ganti ke FTP server",
        correct: false,
        feedback: "Salah. Protokol web HTTP membutuhkan web server seperti Apache2, bukan FTP.",
      },
      {
        text: "Kapasitas RAM server 2GB terlalu besar",
        correct: false,
        feedback: "Salah. RAM 2GB sangat cukup dan bukan penyebab pemblokiran jaringan.",
      },
    ],
  },
];

export default function ApacheSysadminGame({
  onComplete,
  alreadyCompleted = false,
}: ApacheSysadminGameProps) {
  // Game state: Always start at intro so player can actively play the game
  const [stage, setStage] = useState<"intro" | "pipeline" | "troubleshoot" | "victory">("intro");
  const [xp, setXp] = useState(alreadyCompleted ? 700 : 0);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);

  // Stage 1
  const [pipeline, setPipeline] = useState<PipelineItem[]>(() => shuffleArray(initialPipeline));
  const [pipelineError, setPipelineError] = useState<string | null>(null);
  const [pipelineSuccess, setPipelineSuccess] = useState(false);

  // Stage 2
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOptIndex, setSelectedOptIndex] = useState<number | null>(null);
  const [answeredState, setAnsweredState] = useState<"idle" | "correct" | "wrong">("idle");
  const [feedbackText, setFeedbackText] = useState("");

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
    } else {
      setPipelineError("Urutan instalasi Apache2 belum tepat! Teliti dari proses update paket hingga pengujian curl.");
    }
  };

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
    } else {
      setAnsweredState("wrong");
      setFeedbackText(choice.feedback);
      setLives((prev) => Math.max(0, prev - 1));
      setStreak(0);
    }
  };

  const handleNextTrouble = () => {
    if (currentQIndex + 1 < troubleQuestions.length) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOptIndex(null);
      setAnsweredState("idle");
      setFeedbackText("");
    } else {
      setStage("victory");
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
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

      {/* Top HUD */}
      <div className="relative z-10 px-4 sm:px-8 py-4 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20">
            <Gamepad2 className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                TEKAJE ARENA &bull; ASJ STEP 5
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Gamifikasi
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-extrabold text-white">
              Apache2 Webmaster Quest &bull; Hermawan Rijal Arasy, S.Kom.
            </h3>
          </div>
        </div>

        {/* HUD: XP, Streak, Lives */}
        <div className="flex items-center gap-3 sm:gap-5 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-amber-300 font-bold shadow-xs">
            <Zap className="h-4 w-4 text-amber-400 fill-amber-400" />
            <span>{xp} XP</span>
          </div>

          {streak > 1 && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-400 font-bold animate-pulse">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{streak}x Combo</span>
            </div>
          )}

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

      <div className="relative z-10 p-4 sm:p-8">
        {/* Intro */}
        {stage === "intro" && (
          <div className="max-w-2xl mx-auto text-center space-y-6 py-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <Trophy className="h-4 w-4" />
              <span>Tantangan Praktikum Web Server Apache2</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Kuasai Arsitektur Web Server <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
                Apache2 Linux SysAdmin
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
              Selesaikan <b>2 Misi Arena</b>: Susun pipeline deployment Apache2 dan selesaikan 4 kasus
              insiden troubleshooting nyata sebelum Anda membuka Post-Test Evaluasi Mandiri!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-lg mx-auto pt-2">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-xs">
                  <span className="h-6 w-6 rounded-lg bg-sky-500/20 flex items-center justify-center text-xs">1</span>
                  <span>Pipeline Architect</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Urutkan 6 tahapan alur instalasi Apache2 dari update APT hingga uji curl 200 OK.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <span className="h-6 w-6 rounded-lg bg-amber-500/20 flex items-center justify-center text-xs">2</span>
                  <span>Trouble-Hunter</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Pecahkan 4 skenario insiden error port binding, 403 Forbidden, dan syntax error.
                </p>
              </div>
            </div>

            {alreadyCompleted && (
              <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Anda sudah pernah menyelesaikan quest ini sebelumnya (+{xp} XP). Anda dapat memainkannya kembali untuk mengasah skill atau langsung melihat hasil.</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStage("victory")}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shrink-0 cursor-pointer transition-colors"
                >
                  Lihat Hasil
                </button>
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setStage("pipeline")}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-extrabold text-sm shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <span>{alreadyCompleted ? "Mainkan Ulang Quest" : "Mulai Misi 1: Pipeline Architect"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Stage 1: Pipeline */}
        {stage === "pipeline" && (
          <div className="space-y-6 max-w-3xl mx-auto animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Misi 1 dari 2
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-white">
                  Pipeline Architect: Urutkan Deployment Apache2
                </h3>
                <p className="text-xs text-slate-400">
                  Gunakan tombol panah <b>Naik (&uarr;)</b> atau <b>Turun (&darr;)</b> pada kartu untuk menyusun alur instalasi server yang benar.
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
                  <span>Pipeline Apache2 Sempurna! (+300 XP)</span>
                </div>
                <p className="text-xs text-emerald-200/80">
                  Alur logika deployment server Anda sangat rapi. Lanjutkan ke pemecahan insiden di Misi 2!
                </p>
              </div>
            )}

            <div className="space-y-2.5">
              {pipeline.map((item, idx) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border transition-all ${
                    pipelineSuccess
                      ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-100"
                      : "bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white">{item.title}</div>
                      <p className="text-[11px] text-slate-400 leading-tight pt-0.5">{item.desc}</p>
                    </div>
                  </div>

                  {!pipelineSuccess && (
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => movePipelineItem(idx, "up")}
                        disabled={idx === 0}
                        className="h-8 w-8 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 flex items-center justify-center cursor-pointer transition-all"
                        title="Geser ke atas"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => movePipelineItem(idx, "down")}
                        disabled={idx === pipeline.length - 1}
                        className="h-8 w-8 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 flex items-center justify-center cursor-pointer transition-all"
                        title="Geser ke bawah"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-400">
                Status Alur: {pipelineSuccess ? "Tervalidasi 100%" : "Menunggu pengujian susunan"}
              </div>

              {!pipelineSuccess ? (
                <button
                  onClick={validatePipeline}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Uji Validasi Alur Pipeline</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setStage("troubleshoot");
                    setCurrentQIndex(0);
                    setAnsweredState("idle");
                    setSelectedOptIndex(null);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 animate-bounce"
                >
                  <span>Lanjut ke Misi 2: Trouble-Hunter</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Stage 2: Trouble-Hunter */}
        {stage === "troubleshoot" && (
          <div className="space-y-6 max-w-2xl mx-auto animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Misi 2 dari 2 &bull; Kasus {currentQIndex + 1} dari {troubleQuestions.length}
                </span>
                <h3 className="text-base font-extrabold text-white">
                  Trouble-Hunter: Analisis Insiden Apache2
                </h3>
              </div>
              <div className="text-xs font-mono text-slate-400">
                Kasus {currentQIndex + 1}/{troubleQuestions.length}
              </div>
            </div>

            {(() => {
              const q = troubleQuestions[currentQIndex];
              return (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-rose-500/20 text-rose-300 text-[10px] font-bold uppercase tracking-wider border border-rose-500/30">
                      <AlertTriangle className="h-3 w-3" />
                      <span>{q.badge}</span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-white">{q.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{q.scenario}</p>
                  </div>

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

        {/* Victory */}
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
                Selamat! Anda Lolos Arena Apache2 Web Server
              </h2>
              <p className="text-xs text-slate-400">
                Peringkat: <b className="text-amber-300">Certified Apache2 Linux Webmaster</b>
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Total XP</div>
                <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">{xp} XP</div>
              </div>
              <div className="border-x border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Sisa Nyawa</div>
                <div className="text-xl sm:text-2xl font-black text-rose-400 font-mono">{lives} / 3</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Langkah 6</div>
                <div className="text-sm sm:text-base font-extrabold text-emerald-400 mt-1">TERBUKA ✓</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 leading-relaxed text-left">
              💡 <b>Langkah Selanjutnya:</b> Anda siap untuk menguji pemahaman akhir pada <b>Langkah 6: Post-Test Evaluasi Mandiri</b> dan mencetak Sertifikat Kelulusan resmi dari <b>Hermawan Rijal Arasy, S.Kom.</b>!
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
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer inline-flex items-center justify-center gap-2"
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
