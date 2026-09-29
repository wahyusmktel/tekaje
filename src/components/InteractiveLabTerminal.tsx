"use client";

import { useState, useRef, useEffect } from "react";
import {
  Terminal,
  CheckCircle2,
  Circle,
  Play,
  RotateCcw,
  Sparkles,
  Award,
  ChevronRight,
  Info,
  Maximize2,
  Copy,
  CornerDownLeft,
} from "lucide-react";

interface Mission {
  id: number;
  title: string;
  command: string;
  expectedPattern: RegExp;
  description: string;
  hint: string;
  completed: boolean;
}

interface HistoryItem {
  id: string;
  type: "input" | "output" | "system";
  content: string;
  color?: string;
}

export default function InteractiveLabTerminal() {
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 1,
      title: "Verifikasi Memori RAM 2GB",
      command: "free -h",
      expectedPattern: /^free(\s+-h)?$/i,
      description: "Periksa apakah memori RAM 2048 MB (2GB) terdeteksi pada sistem Ubuntu Server.",
      hint: "Ketik 'free -h' lalu tekan Enter.",
      completed: false,
    },
    {
      id: 2,
      title: "Cek Alamat IP & Antarmuka Jaringan",
      command: "ip -brief address show",
      expectedPattern: /^ip(\s+(-brief|-br)?\s+(a|addr|address)(\s+show)?)?$/i,
      description: "Pastikan interface jaringan (enp0s3) berstatus UP dan memiliki IP address dari NAT.",
      hint: "Ketik 'ip -brief address show' atau 'ip a'.",
      completed: false,
    },
    {
      id: 3,
      title: "Uji Konektivitas Internet (Ping DNS)",
      command: "ping -c 4 8.8.8.8",
      expectedPattern: /^ping(\s+-c\s+\d+)?\s+8\.8\.8\.8$/i,
      description: "Uji koneksi keluar melalui gateway NAT ke Google Public DNS (8.8.8.8).",
      hint: "Ketik 'ping -c 4 8.8.8.8' lalu tekan Enter.",
      completed: false,
    },
    {
      id: 4,
      title: "Sinkronisasi Indeks Paket (APT)",
      command: "sudo apt update",
      expectedPattern: /^(sudo\s+)?apt(-get)?\s+update/i,
      description: "Perbarui katalog repositori paket resmi Ubuntu dari server mirror.",
      hint: "Ketik 'sudo apt update' lalu tekan Enter.",
      completed: false,
    },
    {
      id: 5,
      title: "Deteksi Lingkungan VirtualBox",
      command: "systemd-detect-virt",
      expectedPattern: /^systemd-detect-virt$/i,
      description: "Buktikan bahwa sistem operasi berjalan di dalam mesin virtual (VM) Oracle VirtualBox.",
      hint: "Ketik 'systemd-detect-virt' lalu tekan Enter.",
      completed: false,
    },
  ]);

  const [terminalHistory, setTerminalHistory] = useState<HistoryItem[]>([
    {
      id: "welcome-1",
      type: "system",
      content: "Welcome to Ubuntu 22.04.4 LTS (GNU/Linux 5.15.0-107-generic x86_64)",
    },
    {
      id: "welcome-2",
      type: "system",
      content: " * Documentation:  https://help.ubuntu.com",
    },
    {
      id: "welcome-3",
      type: "system",
      content: " * Management:     https://landscape.canonical.com",
    },
    {
      id: "welcome-4",
      type: "system",
      content: " * Support:        https://ubuntu.com/pro",
    },
    {
      id: "welcome-5",
      type: "system",
      content: "System information as of Tue Sep 29 21:30:00 WIB 2026",
    },
    {
      id: "welcome-6",
      type: "system",
      content: "System load: 0.08 | Memory usage: 14% | IP address: 10.0.2.15 (NAT)",
    },
    {
      id: "welcome-7",
      type: "system",
      content: "Ketik 'help' untuk daftar perintah, atau ikuti 5 Misi Praktikum di panel kiri.",
      color: "text-sky-300 font-semibold",
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isExecuting, setIsExecuting] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const completedCount = missions.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / missions.length) * 100);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  const handleCommandExecution = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Save to command history for Up/Down arrow navigation
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    // Add user input to terminal view
    setTerminalHistory((prev) => [
      ...prev,
      {
        id: `input-${Date.now()}`,
        type: "input",
        content: trimmed,
      },
    ]);

    setInputVal("");
    setIsExecuting(true);

    // Check if command satisfies any mission
    let justCompletedMissionId: number | null = null;
    missions.forEach((m) => {
      if (!m.completed && m.expectedPattern.test(trimmed)) {
        justCompletedMissionId = m.id;
      }
    });

    if (justCompletedMissionId !== null) {
      setMissions((prev) =>
        prev.map((m) =>
          m.id === justCompletedMissionId ? { ...m, completed: true } : m
        )
      );
    }

    // Generate output response based on command
    setTimeout(() => {
      generateResponse(trimmed, justCompletedMissionId);
      setIsExecuting(false);
    }, 350);
  };

  const generateResponse = (cmd: string, completedMissionId: number | null) => {
    const lower = cmd.toLowerCase().trim();
    const responses: HistoryItem[] = [];

    if (lower === "clear") {
      setTerminalHistory([]);
      return;
    }

    if (lower === "help") {
      responses.push({
        id: `out-${Date.now()}-1`,
        type: "output",
        content:
          "Perintah yang tersedia pada lab ini:\n  free -h                  : Cek alokasi RAM\n  ip -brief address show   : Cek interface & IP address\n  ping -c 4 8.8.8.8        : Tes konektivitas internet\n  sudo apt update          : Update repositori paket\n  systemd-detect-virt      : Cek teknologi hypervisor\n  df -h /                  : Cek kapasitas penyimpanan\n  hostnamectl              : Cek nama host & kernel\n  uname -a                 : Cek versi sistem operasi\n  whoami                   : Cek user aktif\n  clear                    : Bersihkan layar terminal",
        color: "text-slate-300",
      });
    } else if (lower.startsWith("free")) {
      responses.push({
        id: `out-${Date.now()}-1`,
        type: "output",
        content:
          "               total        used        free      shared  buff/cache   available\nMem:           1.9Gi       268Mi       1.2Gi       2.0Mi       480Mi       1.5Gi\nSwap:          2.0Gi          0B       2.0Gi",
        color: "text-emerald-300 font-mono",
      });
    } else if (lower.startsWith("ip") || lower === "ifconfig") {
      responses.push({
        id: `out-${Date.now()}-1`,
        type: "output",
        content:
          "lo               UNKNOWN        127.0.0.1/8 ::1/128\nenp0s3           UP             10.0.2.15/24 fe80::a00:27ff:fe88:99aa/64",
        color: "text-sky-300 font-mono",
      });
    } else if (lower.startsWith("ping")) {
      responses.push({
        id: `out-${Date.now()}-1`,
        type: "output",
        content:
          "PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.\n64 bytes from 8.8.8.8: icmp_seq=1 ttl=115 time=16.4 ms\n64 bytes from 8.8.8.8: icmp_seq=2 ttl=115 time=15.8 ms\n64 bytes from 8.8.8.8: icmp_seq=3 ttl=115 time=16.2 ms\n64 bytes from 8.8.8.8: icmp_seq=4 ttl=115 time=16.0 ms\n\n--- 8.8.8.8 ping statistics ---\n4 packets transmitted, 4 received, 0% packet loss, time 3004ms\nrtt min/avg/max/mdev = 15.801/16.100/16.402/0.218 ms",
        color: "text-slate-200 font-mono",
      });
    } else if (lower.includes("apt update") || lower.includes("apt-get update")) {
      responses.push({
        id: `out-${Date.now()}-1`,
        type: "output",
        content:
          "Hit:1 http://id.archive.ubuntu.com/ubuntu jammy InRelease\nGet:2 http://id.archive.ubuntu.com/ubuntu jammy-updates InRelease [119 kB]\nGet:3 http://id.archive.ubuntu.com/ubuntu jammy-security InRelease [110 kB]\nFetched 229 kB in 1s (210 kB/s)\nReading package lists... Done\nBuilding dependency tree... Done\nAll packages are up to date.",
        color: "text-slate-300 font-mono",
      });
    } else if (lower === "systemd-detect-virt") {
      responses.push({
        id: `out-${Date.now()}-1`,
        type: "output",
        content: "oracle",
        color: "text-emerald-400 font-bold font-mono",
      });
    } else if (lower.startsWith("df")) {
      responses.push({
        id: `out-${Date.now()}-1`,
        type: "output",
        content:
          "Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda3        24G  4.2G   19G  19% /\n/dev/sda2       1.9G  120M  1.6G   7% /boot",
        color: "text-slate-300 font-mono",
      });
    } else if (lower === "hostnamectl") {
      responses.push({
        id: `out-${Date.now()}-1`,
        type: "output",
        content:
          " Static hostname: ubuntu-server-2204\n       Icon name: computer-vm\n         Chassis: vm\n      Machine ID: a98ef930219483849182390192847192\n  Virtualization: oracle\nOperating System: Ubuntu 22.04.4 LTS\n          Kernel: Linux 5.15.0-107-generic\n    Architecture: x86-64",
        color: "text-slate-300 font-mono",
      });
    } else if (lower === "whoami") {
      responses.push({
        id: `out-${Date.now()}-1`,
        type: "output",
        content: "wahyu",
        color: "text-slate-200 font-mono",
      });
    } else if (lower === "uname -a") {
      responses.push({
        id: `out-${Date.now()}-1`,
        type: "output",
        content:
          "Linux ubuntu-server-2204 5.15.0-107-generic #117-Ubuntu SMP Mon May 13 14:01:01 UTC 2024 x86_64 x86_64 x86_64 GNU/Linux",
        color: "text-slate-300 font-mono",
      });
    } else {
      responses.push({
        id: `out-${Date.now()}-1`,
        type: "output",
        content: `bash: ${cmd}: command not found. Ketik 'help' untuk melihat perintah yang didukung pada lab ini.`,
        color: "text-rose-400 font-mono",
      });
    }

    if (completedMissionId !== null) {
      responses.push({
        id: `succ-${Date.now()}`,
        type: "system",
        content: `🎉 Hebat! Misi ${completedMissionId} Berhasil Divalidasi!`,
        color: "text-emerald-400 font-bold",
      });
    }

    setTerminalHistory((prev) => [...prev, ...responses]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommandExecution(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInputVal(commandHistory[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setInputVal("");
        }
      }
    }
  };

  const handleFillCommand = (cmd: string) => {
    setInputVal(cmd);
    inputRef.current?.focus();
  };

  const handleResetLab = () => {
    setMissions((prev) => prev.map((m) => ({ ...m, completed: false })));
    setTerminalHistory([
      {
        id: "reset-1",
        type: "system",
        content: "--- Hands-on Lab telah di-reset ke kondisi awal ---",
        color: "text-amber-300 font-bold",
      },
      {
        id: "reset-2",
        type: "system",
        content: "Ketik 'help' untuk melihat perintah atau pilih Misi 1 di panel kiri.",
      },
    ]);
    setInputVal("");
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
            <Terminal className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-lg text-white">
                Web Hands-on Lab Terminal
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Interactive Simulator
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Praktik mandiri langsung di browser siswa &bull; Ubuntu Server 22.04 LTS (CLI)
            </p>
          </div>
        </div>

        {/* Progress & Reset */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-[11px] text-slate-300">
              Progres Misi: <b>{completedCount}</b> / {missions.length} Selesai
            </div>
            <div className="w-36 h-2 rounded-full bg-slate-700 overflow-hidden mt-1">
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <button
            onClick={handleResetLab}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all cursor-pointer"
            title="Reset ulang progress lab"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Split Pane: Left Missions Checklist, Right Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* LEFT PANE: MISSIONS CHECKLIST */}
        <div className="lg:col-span-5 bg-slate-50 border-r border-slate-200 p-5 sm:p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-sky-600" />
                <span>Misi Praktikum Siswa</span>
              </h4>
              <span className="text-xs font-bold text-sky-600 font-mono">
                {progressPercent}% Sukses
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Jalankan setiap perintah di terminal sebelah kanan. Ketika perintah yang tepat
              dijalankan, misi akan otomatis tercentang hijau secara instan!
            </p>

            {/* Mission Cards */}
            <div className="space-y-3">
              {missions.map((m) => (
                <div
                  key={m.id}
                  className={`p-3.5 rounded-2xl border transition-all duration-200 ${
                    m.completed
                      ? "bg-emerald-50/70 border-emerald-300 shadow-xs"
                      : "bg-white border-slate-200/80 hover:border-sky-300 hover:shadow-xs"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      {m.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="h-4 w-4 text-slate-300 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div
                          className={`text-xs font-bold ${
                            m.completed ? "text-emerald-900" : "text-slate-800"
                          }`}
                        >
                          Misi {m.id}: {m.title}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {m.description}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleFillCommand(m.command)}
                      className="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 text-[11px] font-semibold border border-sky-200 shrink-0 transition-colors cursor-pointer"
                      title="Isikan perintah ini ke terminal"
                    >
                      Ketikkan
                    </button>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-500">Perintah:</span>
                    <code className="text-sky-700 bg-slate-100 px-1.5 py-0.5 rounded font-bold">
                      {m.command}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completion Celebration Card */}
          {completedCount === missions.length && (
            <div className="p-4 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-md space-y-2 text-center animate-fade-in">
              <Award className="h-7 w-7 mx-auto text-amber-200" />
              <div className="font-extrabold text-sm">
                Selamat! Seluruh Misi Praktikum Selesai
              </div>
              <p className="text-[11px] text-emerald-100 leading-relaxed">
                Anda telah memvalidasi alokasi RAM, konfigurasi IP NAT, konektivitas ping,
                update APT, dan isolasi hypervisor di terminal!
              </p>
            </div>
          )}
        </div>

        {/* RIGHT PANE: INTERACTIVE TERMINAL */}
        <div
          className="lg:col-span-7 bg-slate-950 text-slate-100 p-4 sm:p-6 flex flex-col justify-between font-mono text-xs sm:text-sm cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Top Bar inside terminal */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3 select-none">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500 inline-block" />
              <span className="h-3 w-3 rounded-full bg-amber-500 inline-block" />
              <span className="h-3 w-3 rounded-full bg-emerald-500 inline-block" />
              <span className="text-xs text-slate-400 ml-2 font-mono">
                wahyu@ubuntu-server-2204: ~
              </span>
            </div>
            <div className="text-[11px] text-slate-500">bash 5.1.16</div>
          </div>

          {/* History Scroll Area */}
          <div className="flex-1 overflow-y-auto max-h-[460px] space-y-2 pr-1 select-text">
            {terminalHistory.map((item) => (
              <div key={item.id} className="leading-relaxed whitespace-pre-wrap break-all">
                {item.type === "input" && (
                  <div className="flex items-center gap-2 text-slate-100">
                    <span className="text-emerald-400 font-bold select-none">
                      wahyu@ubuntu-server:~$
                    </span>
                    <span className="font-semibold text-white">{item.content}</span>
                  </div>
                )}
                {item.type === "output" && (
                  <div className={`${item.color || "text-slate-300"}`}>
                    {item.content}
                  </div>
                )}
                {item.type === "system" && (
                  <div className={`${item.color || "text-slate-400 text-xs italic"}`}>
                    {item.content}
                  </div>
                )}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Active Input Line */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
            <span className="text-emerald-400 font-bold select-none shrink-0">
              wahyu@ubuntu-server:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isExecuting}
              placeholder={isExecuting ? "Menjalankan perintah..." : "Ketik perintah & tekan Enter..."}
              className="flex-1 bg-transparent border-none outline-none text-slate-100 font-mono text-xs sm:text-sm placeholder:text-slate-600 caret-sky-400"
              autoFocus
            />
            <button
              onClick={() => handleCommandExecution(inputVal)}
              disabled={!inputVal.trim() || isExecuting}
              className="p-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white disabled:opacity-40 transition-colors cursor-pointer shrink-0"
              title="Kirim perintah (Enter)"
            >
              <CornerDownLeft className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-2 text-[10px] text-slate-500 flex items-center justify-between select-none">
            <span>Tip: Gunakan tombol panah ↑ / ↓ untuk memanggil riwayat perintah</span>
            <span>Tab / Shift untuk shortcut</span>
          </div>
        </div>
      </div>
    </div>
  );
}
