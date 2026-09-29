"use client";

import { useState, useRef, useEffect } from "react";
import {
  Terminal,
  CheckCircle2,
  Circle,
  Play,
  RotateCcw,
  Award,
  ChevronRight,
  Info,
  Maximize2,
  Minimize2,
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

export default function InteractiveLabTerminalPtm2() {
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 1,
      title: "Verifikasi Hostname & Rilis OS Baru",
      command: "hostnamectl",
      expectedPattern: /^(hostnamectl|cat\s+\/etc\/os-release)$/i,
      description: "Pastikan sistem operasi Ubuntu 22.04 LTS dan Static Hostname telah terpasang dengan benar.",
      hint: "Ketik 'hostnamectl' lalu tekan Enter.",
      completed: false,
    },
    {
      id: 2,
      title: "Inspeksi Struktur Partisi Disk (LVM/Ext4)",
      command: "lsblk",
      expectedPattern: /^(lsblk|df(\s+-h)?)$/i,
      description: "Periksa susunan blok partisi harddisk virtual 25 GB dan titik pasang root (/).",
      hint: "Ketik 'lsblk' atau 'df -h' lalu tekan Enter.",
      completed: false,
    },
    {
      id: 3,
      title: "Cek Status Layanan OpenSSH Server",
      command: "sudo systemctl status ssh",
      expectedPattern: /^(sudo\s+)?systemctl\s+status\s+ssh(d)?$/i,
      description: "Pastikan service SSH berstatus 'active (running)' pada port 22 untuk remote akses.",
      hint: "Ketik 'sudo systemctl status ssh' lalu tekan Enter.",
      completed: false,
    },
    {
      id: 4,
      title: "Verifikasi User Non-Root & Grup Sudo",
      command: "id",
      expectedPattern: /^(id|whoami|sudo\s+-l)$/i,
      description: "Buktikan akun pengguna siswa memiliki akses ke grup sudo (super user administratif).",
      hint: "Ketik 'id' lalu tekan Enter.",
      completed: false,
    },
    {
      id: 5,
      title: "Cek Waktu Uptime & Beban Server",
      command: "uptime",
      expectedPattern: /^(uptime|top|w)$/i,
      description: "Melihat berapa lama server aktif sejak first reboot dan statistik load average sistem.",
      hint: "Ketik 'uptime' lalu tekan Enter.",
      completed: false,
    },
  ]);

  const [terminalHistory, setTerminalHistory] = useState<HistoryItem[]>([
    {
      id: "ptm2-1",
      type: "system",
      content: "Ubuntu 22.04.4 LTS ubuntu-server tty1",
    },
    {
      id: "ptm2-2",
      type: "system",
      content: "ubuntu-server login: wahyu",
    },
    {
      id: "ptm2-3",
      type: "system",
      content: "Password: **********",
    },
    {
      id: "ptm2-4",
      type: "system",
      content: "Welcome to Ubuntu 22.04.4 LTS (GNU/Linux 5.15.0-107-generic x86_64)",
    },
    {
      id: "ptm2-5",
      type: "system",
      content: "Last login: Tue Sep 29 21:40:00 2026 from 10.0.2.2",
    },
    {
      id: "ptm2-6",
      type: "system",
      content: "First Boot Berhasil! Silakan selesaikan 5 Misi Verifikasi Pasca-Instalasi di panel kiri.",
      color: "text-sky-300 font-semibold",
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const completedCount = missions.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / missions.length) * 100);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      setIsFullscreen(true);
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {});
      }
    } else {
      setIsFullscreen(false);
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  const handleCommandExecution = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

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
          "Perintah Verifikasi Pasca-Instalasi Pertemuan 2:\n  hostnamectl             : Cek informasi OS & Static Hostname\n  lsblk                   : Tampilkan hierarki partisi storage (LVM/Ext4)\n  df -h                   : Tampilkan kapasitas ruang harddisk\n  sudo systemctl status ssh : Cek status daemon OpenSSH\n  id                      : Cek User ID (UID), GID, & keanggotaan grup sudo\n  uptime                  : Cek durasi aktif server & load average\n  whoami                  : Cek user aktif\n  clear                   : Bersihkan layar terminal",
        color: "text-slate-300",
      });
    } else if (lower === "hostnamectl") {
      responses.push({
        id: `out-${Date.now()}-1`,
        type: "output",
        content:
          " Static hostname: ubuntu-server-2204\n       Icon name: computer-vm\n         Chassis: vm\n      Machine ID: d98f3b90a012481098b97e937d12a84f\n  Virtualization: oracle\nOperating System: Ubuntu 22.04.4 LTS\n          Kernel: Linux 5.15.0-107-generic\n    Architecture: x86-64\n Hardware Vendor: innotek GmbH\n  Hardware Model: VirtualBox",
        color: "text-emerald-300 font-mono",
      });
    } else if (lower.includes("os-release")) {
      responses.push({
        id: `out-${Date.now()}-1`,
        type: "output",
        content:
          'PRETTY_NAME="Ubuntu 22.04.4 LTS"\nNAME="Ubuntu"\nVERSION_ID="22.04"\nVERSION="22.04.4 LTS (Jammy Jellyfish)"\nVERSION_CODENAME=jammy\nID=ubuntu\nHOME_URL="https://www.ubuntu.com/"',
        color: "text-sky-300 font-mono",
      });
    } else if (lower === "lsblk") {
      responses.push({
        id: `out-${Date.now()}-1`,
        type: "output",
        content:
          "NAME                      MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS\nsda                         8:0    0   25G  0 disk \n├─sda1                      8:1    0    1M  0 part \n├─sda2                      8:2    0    2G  0 part /boot\n└─sda3                      8:3    0   23G  0 part \n  └─ubuntu--vg-ubuntu--lv 253:0    0 11.5G  0 lvm  /",
        color: "text-sky-300 font-mono",
      });
    } else if (lower.startsWith("df")) {
      responses.push({
        id: `out-${Date.now()}-1`,
        type: "output",
        content:
          "Filesystem                         Size  Used Avail Use% Mounted on\n/dev/mapper/ubuntu--vg-ubuntu--lv   12G  3.8G  7.1G  35% /\n/dev/sda2                          2.0G  130M  1.7G   8% /boot",
        color: "text-slate-300 font-mono",
      });
    } else if (lower.includes("status ssh")) {
      responses.push({
        id: `out-${Date.now()}-1`,
        type: "output",
        content:
          "● ssh.service - OpenBSD Secure Shell server\n     Loaded: loaded (/lib/systemd/system/ssh.service; enabled; vendor preset: enabled)\n     Active: active (running) since Tue 2026-09-29 21:38:12 WIB; 6min ago\n       Docs: man:sshd(8)\n             man:sshd_config(5)\n   Main PID: 742 (sshd)\n      Tasks: 1 (limit: 2280)\n     Memory: 4.8M\n        CPU: 48ms\n     CGroup: /system.slice/ssh.service\n             └─742 \"sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups\"\n\nSep 29 21:38:12 ubuntu-server systemd[1]: Started OpenBSD Secure Shell server.\nSep 29 21:38:12 ubuntu-server sshd[742]: Server listening on 0.0.0.0 port 22.",
        color: "text-emerald-400 font-mono",
      });
    } else if (lower === "id") {
      responses.push({
        id: `out-${Date.now()}-1`,
        type: "output",
        content:
          "uid=1000(wahyu) gid=1000(wahyu) groups=1000(wahyu),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),110(lxd)",
        color: "text-amber-300 font-mono",
      });
    } else if (lower === "whoami") {
      responses.push({
        id: `out-${Date.now()}-1`,
        type: "output",
        content: "wahyu",
        color: "text-slate-200 font-mono",
      });
    } else if (lower.startsWith("uptime")) {
      responses.push({
        id: `out-${Date.now()}-1`,
        type: "output",
        content: " 21:45:10 up 7 min,  1 user,  load average: 0.04, 0.07, 0.02",
        color: "text-slate-200 font-mono",
      });
    } else if (lower.startsWith("free")) {
      responses.push({
        id: `out-${Date.now()}-1`,
        type: "output",
        content:
          "               total        used        free      shared  buff/cache   available\nMem:           1.9Gi       245Mi       1.3Gi       1.0Mi       410Mi       1.5Gi\nSwap:          2.0Gi          0B       2.0Gi",
        color: "text-slate-300 font-mono",
      });
    } else {
      responses.push({
        id: `out-${Date.now()}-1`,
        type: "output",
        content: `bash: ${cmd}: command not found. Ketik 'help' untuk daftar perintah praktikum Pertemuan 2.`,
        color: "text-rose-400 font-mono",
      });
    }

    if (completedMissionId !== null) {
      responses.push({
        id: `succ-${Date.now()}`,
        type: "system",
        content: `🎉 Mantap! Misi ${completedMissionId} Berhasil Divalidasi!`,
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
        content: "--- Hands-on Lab Pertemuan 2 di-reset ke kondisi awal ---",
        color: "text-amber-300 font-bold",
      },
      {
        id: "reset-2",
        type: "system",
        content: "Ketik 'help' untuk panduan perintah atau klik tombol 'Ketikkan' pada Misi 1.",
      },
    ]);
    setInputVal("");
  };

  return (
    <div
      ref={containerRef}
      className={`transition-all ${
        isFullscreen
          ? "fixed inset-0 z-[9999] w-screen h-screen bg-slate-950 flex flex-col overflow-hidden m-0 p-0 rounded-none border-none shadow-2xl"
          : "bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative"
      }`}
    >
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-4 sm:p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400 shrink-0">
            <Terminal className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-extrabold text-base sm:text-lg text-white">
                Web Hands-on Lab: Verifikasi Pasca-Instalasi OS
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                Pertemuan 2 Simulator
              </span>
              {isFullscreen && (
                <span className="text-[10px] font-mono px-2 py-0.5 bg-indigo-950 text-indigo-300 border border-indigo-700 hidden md:inline">
                  MODE FULLSCREEN AKTIF
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300">
              Praktik mandiri validasi sistem baru &bull; Ubuntu Server 22.04 LTS (CLI)
            </p>
          </div>
        </div>

        {/* Progress, Fullscreen Toggle & Reset */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right hidden sm:block">
            <div className="text-[11px] text-slate-300">
              Progres Misi: <b>{completedCount}</b> / {missions.length} Selesai
            </div>
            <div className="w-32 h-1.5 rounded-full bg-slate-700 overflow-hidden mt-1">
              <div
                className="h-full bg-gradient-to-r from-indigo-400 to-emerald-400 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm ${
              isFullscreen
                ? "bg-rose-600 hover:bg-rose-500 text-white border border-rose-500"
                : "bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500"
            }`}
            title={isFullscreen ? "Keluar dari mode fullscreen (Esc)" : "Buka mode layar penuh (Fullscreen)"}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="h-3.5 w-3.5" />
                <span>Keluar Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="h-3.5 w-3.5" />
                <span>Fullscreen</span>
              </>
            )}
          </button>

          <button
            onClick={handleResetLab}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all cursor-pointer"
            title="Reset ulang progress lab"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Split Pane: Left Missions Checklist, Right Terminal */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 ${
        isFullscreen ? "flex-1 min-h-0 overflow-hidden" : "min-h-[580px]"
      }`}>
        {/* LEFT PANE: MISSIONS CHECKLIST */}
        <div className={`lg:col-span-5 bg-slate-50 border-r border-slate-200 p-4 sm:p-6 flex flex-col justify-between space-y-4 ${
          isFullscreen ? "overflow-y-auto max-h-full" : ""
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                <span>Misi Praktikum Pertemuan 2</span>
              </h4>
              <span className="text-xs font-bold text-indigo-600 font-mono">
                {progressPercent}% Sukses
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Jalankan setiap perintah di terminal sebelah kanan. Sistem akan memvalidasi apakah
              partisi storage, service SSH, dan akun pengguna sudah sesuai standar industri!
            </p>

            {/* Mission Cards */}
            <div className="space-y-3">
              {missions.map((m) => (
                <div
                  key={m.id}
                  className={`p-3.5 rounded-2xl border transition-all duration-200 ${
                    m.completed
                      ? "bg-emerald-50/70 border-emerald-300 shadow-xs"
                      : "bg-white border-slate-200/80 hover:border-indigo-300 hover:shadow-xs"
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
                      className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-semibold border border-indigo-200 shrink-0 transition-colors cursor-pointer"
                      title="Isikan perintah ini ke terminal"
                    >
                      Ketikkan
                    </button>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-500">Perintah:</span>
                    <code className="text-indigo-700 bg-slate-100 px-1.5 py-0.5 rounded font-bold">
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
                Luar Biasa! Misi Pertemuan 2 Berhasil 100%
              </div>
              <p className="text-[11px] text-emerald-100 leading-relaxed">
                Anda telah memvalidasi hostname, partisi LVM, service OpenSSH aktif, hak akses
                sudo admin, dan waktu aktif first-boot pada Ubuntu Server 22.04 LTS!
              </p>
            </div>
          )}
        </div>

        {/* RIGHT PANE: INTERACTIVE TERMINAL */}
        <div
          className={`lg:col-span-7 bg-slate-950 text-slate-100 p-4 sm:p-6 flex flex-col justify-between font-mono text-xs sm:text-sm cursor-text ${
            isFullscreen ? "overflow-hidden h-full flex-1" : ""
          }`}
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
            <div className="text-[11px] text-slate-500">SSH Active &bull; Port 22</div>
          </div>

          {/* History Scroll Area */}
          <div className={`flex-1 overflow-y-auto space-y-2 pr-1 select-text ${
            isFullscreen ? "max-h-none h-full" : "max-h-[460px]"
          }`}>
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
              placeholder={isExecuting ? "Mengeksekusi perintah..." : "Ketik perintah & tekan Enter..."}
              className="flex-1 bg-transparent border-none outline-none text-slate-100 font-mono text-xs sm:text-sm placeholder:text-slate-600 caret-sky-400"
              autoFocus
            />
            <button
              onClick={() => handleCommandExecution(inputVal)}
              disabled={!inputVal.trim() || isExecuting}
              className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 transition-colors cursor-pointer shrink-0"
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
