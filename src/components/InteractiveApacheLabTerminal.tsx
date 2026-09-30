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
  Globe,
  ExternalLink,
  ShieldCheck,
  Server,
  Code2,
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

export default function InteractiveApacheLabTerminal() {
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 1,
      title: "Sinkronisasi Repositori APT",
      command: "sudo apt update",
      expectedPattern: /^(sudo\s+)?apt(-get)?\s+update/i,
      description: "Perbarui metadata paket Ubuntu dari server mirror sebelum menginstal paket Apache2.",
      hint: "Ketik 'sudo apt update' lalu tekan Enter.",
      completed: false,
    },
    {
      id: 2,
      title: "Instalasi Web Server Apache2",
      command: "sudo apt install -y apache2",
      expectedPattern: /^(sudo\s+)?apt(-get)?\s+install(\s+-y)?\s+apache2/i,
      description: "Unduh dan instal daemon HTTP server Apache2 beserta dependensinya.",
      hint: "Ketik 'sudo apt install -y apache2' lalu tekan Enter.",
      completed: false,
    },
    {
      id: 3,
      title: "Cek Status Layanan Systemd",
      command: "sudo systemctl status apache2",
      expectedPattern: /^(sudo\s+)?systemctl\s+status\s+apache2(\.service)?$/i,
      description: "Pastikan unit service Apache2 berjalan dengan status 'active (running)'.",
      hint: "Ketik 'sudo systemctl status apache2' lalu tekan Enter.",
      completed: false,
    },
    {
      id: 4,
      title: "Buka Port 80 di Firewall UFW",
      command: "sudo ufw allow 'Apache'",
      expectedPattern: /^(sudo\s+)?ufw\s+allow\s+('Apache'|"Apache"|80\/tcp|80)/i,
      description: "Izinkan lalu lintas paket HTTP masuk (inbound port 80 TCP) pada sistem firewall Linux.",
      hint: "Ketik 'sudo ufw allow 'Apache'' lalu tekan Enter.",
      completed: false,
    },
    {
      id: 5,
      title: "Kustomisasi Halaman Index Web",
      command: "echo '<h1>Selamat Datang di Apache2 SMK Telkom Lampung</h1>' | sudo tee /var/www/html/index.html",
      expectedPattern: /(tee\s+\/var\/www\/html\/index\.html|echo.*(index\.html|selamat))/i,
      description: "Tuliskan kode HTML kustom ke dalam DocumentRoot default (/var/www/html/index.html).",
      hint: "Salin atau ketik perintah pembuatan index.html lalu tekan Enter.",
      completed: false,
    },
    {
      id: 6,
      title: "Uji Respon HTTP Web Server",
      command: "curl -I http://localhost",
      expectedPattern: /^curl(\s+(-I|-i))?\s+(http:\/\/)?(localhost|127\.0\.0\.1)/i,
      description: "Uji respon header HTTP (Status 200 OK) langsung dari terminal menggunakan cURL.",
      hint: "Ketik 'curl -I http://localhost' lalu tekan Enter.",
      completed: false,
    },
  ]);

  const [terminalHistory, setTerminalHistory] = useState<HistoryItem[]>([
    {
      id: "welcome-1",
      type: "system",
      content: "Welcome to Ubuntu 22.04 LTS (GNU/Linux 5.15.0-107-generic x86_64)",
    },
    {
      id: "welcome-2",
      type: "system",
      content: "LAB ASJ: Praktikum Instalasi & Konfigurasi Web Server Apache2",
      color: "text-amber-300 font-bold",
    },
    {
      id: "welcome-3",
      type: "system",
      content: "Guru Pengampu: Hermawan Rijal Arasy, S.Kom. &bull; SMK Telkom Lampung",
    },
    {
      id: "welcome-4",
      type: "system",
      content: "IP Server: 10.10.20.5 (Static Lab) | Web Service: Pending Setup",
    },
    {
      id: "welcome-5",
      type: "system",
      content: "Ketik perintah sesuai misi atau gunakan tombol 'Jalankan Perintah' di sebelah kiri.",
      color: "text-sky-300 font-semibold",
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<"terminal" | "preview">("terminal");
  const [isApacheInstalled, setIsApacheInstalled] = useState(false);
  const [isCustomIndexApplied, setIsCustomIndexApplied] = useState(false);

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
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  const executeCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw || isExecuting) return;

    setIsExecuting(true);
    setCommandHistory((prev) => [raw, ...prev]);
    setHistoryIndex(-1);

    // Append user input
    setTerminalHistory((prev) => [
      ...prev,
      {
        id: `input-${Date.now()}`,
        type: "input",
        content: `siswa@asj-server:~$ ${raw}`,
      },
    ]);

    setInputVal("");

    setTimeout(() => {
      handleCommandResponse(raw);
      setIsExecuting(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }, 280);
  };

  const handleCommandResponse = (raw: string) => {
    const cmd = raw.toLowerCase().trim();

    // Check Missions
    let matchedMissionId: number | null = null;
    missions.forEach((m) => {
      if (!m.completed && m.expectedPattern.test(raw)) {
        matchedMissionId = m.id;
      }
    });

    if (matchedMissionId) {
      setMissions((prev) =>
        prev.map((m) => (m.id === matchedMissionId ? { ...m, completed: true } : m))
      );
    }

    // Specific command outputs
    if (cmd === "clear") {
      setTerminalHistory([]);
      return;
    }

    if (cmd === "help") {
      setTerminalHistory((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: "output",
          content: `Perintah Lab Apache2 yang Didukung:
  - sudo apt update                      : Perbarui daftar paket
  - sudo apt install -y apache2          : Instalasi web server Apache
  - sudo systemctl status apache2        : Cek status daemon Apache2
  - sudo ufw allow 'Apache'              : Buka port HTTP di firewall
  - echo '...' | sudo tee /var/www/...   : Tulis file index HTML
  - curl -I http://localhost             : Uji respon HTTP Header
  - apache2 -v                           : Cek versi Apache terinstal
  - ip a                                 : Cek alamat IP server
  - clear                                : Bersihkan layar terminal`,
        },
      ]);
      return;
    }

    if (/^((sudo\s+)?apt(-get)?\s+update)/i.test(raw)) {
      setTerminalHistory((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: "output",
          content: `Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease
Hit:2 http://archive.ubuntu.com/ubuntu jammy-updates InRelease
Hit:3 http://security.ubuntu.com/ubuntu jammy-security InRelease
Reading package lists... Done
Building dependency tree... Done
All packages are up to date.`,
        },
      ]);
      return;
    }

    if (/^((sudo\s+)?apt(-get)?\s+install(\s+-y)?\s+apache2)/i.test(raw)) {
      setIsApacheInstalled(true);
      setTerminalHistory((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: "output",
          content: `Reading package lists... Done
The following additional packages will be installed:
  apache2-bin apache2-data apache2-utils libapr1 libaprutil1
0 upgraded, 6 newly installed, 0 to remove and 0 not upgraded.
Need to get 1,842 kB of archives.
Unpacking apache2 (2.4.52-1ubuntu4.12) ...
Setting up apache2-bin (2.4.52-1ubuntu4.12) ...
Setting up apache2-data (2.4.52-1ubuntu4.12) ...
Setting up apache2 (2.4.52-1ubuntu4.12) ...
Enabling module mpm_event.
Enabling conf charset, localized-error-pages, other-vhosts-access-log, security.
Enabling site 000-default.
Created symlink /etc/systemd/system/multi-user.target.wants/apache2.service.
Processing triggers for ureadahead ...
[OK] Apache2 Web Server successfully installed and started!`,
        },
      ]);
      return;
    }

    if (/^((sudo\s+)?systemctl\s+status\s+apache2)/i.test(raw)) {
      setTerminalHistory((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: "output",
          content: `● apache2.service - The Apache HTTP Server
     Loaded: loaded (/lib/systemd/system/apache2.service; enabled; vendor preset: enabled)
     Active: active (running) since Tue 2026-09-30 10:15:22 WIB; 1min 45s ago
       Docs: https://httpd.apache.org/docs/2.4/
   Main PID: 2480 (apache2)
      Tasks: 55 (limit: 2311)
     Memory: 14.8M
        CPU: 120ms
     CGroup: /system.slice/apache2.service
             ├─2480 /usr/sbin/apache2 -k start
             ├─2482 /usr/sbin/apache2 -k start
             └─2483 /usr/sbin/apache2 -k start

Sep 30 10:15:22 asj-server systemd[1]: Started The Apache HTTP Server.`,
          color: "text-emerald-400 font-mono text-xs",
        },
      ]);
      return;
    }

    if (/^((sudo\s+)?ufw\s+allow)/i.test(raw)) {
      setTerminalHistory((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: "output",
          content: `Rule added
Rule added (v6)
[Firewall Policy Updated]: Port 80/tcp (Apache) is now allowed from anywhere.`,
          color: "text-amber-300 font-mono text-xs",
        },
      ]);
      return;
    }

    if (/(tee\s+\/var\/www\/html\/index\.html|echo.*index\.html)/i.test(raw)) {
      setIsCustomIndexApplied(true);
      setTerminalHistory((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: "output",
          content: `<h1>Selamat Datang di Web Server Apache2 SMK Telkom Lampung</h1>
<p>Dokumen berhasil diperbarui pada DocumentRoot: /var/www/html/index.html (Owner: root:root / Permission: 644)</p>`,
          color: "text-sky-300 font-mono text-xs",
        },
      ]);
      return;
    }

    if (/^curl(\s+(-i|-i))?\s+(http:\/\/)?(localhost|127\.0\.0\.1|10\.10\.20\.5)/i.test(raw)) {
      setTerminalHistory((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: "output",
          content: `HTTP/1.1 200 OK
Date: Wed, 30 Sep 2026 03:20:15 GMT
Server: Apache/2.4.52 (Ubuntu)
Last-Modified: Wed, 30 Sep 2026 03:19:40 GMT
ETag: "63-5f5c3b9b47e80"
Accept-Ranges: bytes
Content-Length: 99
Vary: Accept-Encoding
Content-Type: text/html

<!DOCTYPE html>
<html>
<body>
<h1>Selamat Datang di Web Server Apache2 SMK Telkom Lampung</h1>
</body>
</html>`,
          color: "text-emerald-400 font-mono text-xs",
        },
      ]);
      return;
    }

    if (cmd === "apache2 -v" || cmd === "apachectl -v") {
      setTerminalHistory((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: "output",
          content: `Server version: Apache/2.4.52 (Ubuntu)
Server built:   2026-06-18T14:22:10`,
        },
      ]);
      return;
    }

    if (cmd === "ip a" || cmd === "ip address") {
      setTerminalHistory((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: "output",
          content: `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN
    inet 127.0.0.1/8 scope host lo
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP
    inet 10.10.20.5/24 brd 10.10.20.255 scope global enp0s3`,
        },
      ]);
      return;
    }

    // Default unknown
    setTerminalHistory((prev) => [
      ...prev,
      {
        id: `out-${Date.now()}`,
        type: "output",
        content: `bash: ${raw}: command executed in simulated environment. Ketik 'help' untuk panduan perintah lab.`,
        color: "text-slate-400",
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInputVal(commandHistory[nextIndex]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const prevIndex = historyIndex - 1;
        setHistoryIndex(prevIndex);
        setInputVal(commandHistory[prevIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }
  };

  const resetLab = () => {
    setMissions((prev) => prev.map((m) => ({ ...m, completed: false })));
    setIsApacheInstalled(false);
    setIsCustomIndexApplied(false);
    setTerminalHistory([
      {
        id: `reset-${Date.now()}`,
        type: "system",
        content: "--- SESI LAB APACHE2 DI-RESET KE KONDISI AWAL ---",
        color: "text-amber-400 font-bold",
      },
      {
        id: `info-${Date.now()}`,
        type: "system",
        content: "Silakan jalankan Misi 1: Sinkronisasi Repositori APT (sudo apt update)",
      },
    ]);
  };

  return (
    <div
      ref={containerRef}
      className={`rounded-3xl border border-slate-800 bg-slate-950 text-slate-100 overflow-hidden shadow-2xl flex flex-col ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none h-screen w-screen" : "min-h-[580px]"
      }`}
    >
      {/* Top Header */}
      <div className="px-4 sm:px-6 py-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="h-3 w-3 rounded-full bg-rose-500/80" />
          <div className="h-3 w-3 rounded-full bg-amber-500/80" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
          <span className="text-xs font-mono font-bold text-slate-300 ml-2">
            root@asj-server: ~/apache2-web-lab
          </span>
        </div>

        {/* Tab Switcher: Terminal vs Live Preview */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab("terminal")}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "terminal"
                ? "bg-slate-800 text-white shadow-xs"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Terminal className="h-3.5 w-3.5 text-sky-400" />
            <span>Terminal CLI</span>
          </button>

          <button
            onClick={() => setActiveTab("preview")}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "preview"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Globe className="h-3.5 w-3.5 text-amber-300" />
            <span>Live Web Browser</span>
            {isApacheInstalled && (
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-2">
          <button
            onClick={resetLab}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Reset Terminal & Misi"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title={isFullscreen ? "Keluar Fullscreen (ESC)" : "Layar Penuh (Fullscreen)"}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Main Grid: Mission Sidebar + Interactive Canvas */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Missions Checklist Sidebar */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-900/50 p-4 sm:p-5 flex flex-col justify-between overflow-y-auto max-h-72 lg:max-h-none">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                  Misi Praktikum ASJ
                </span>
                <h3 className="text-sm font-bold text-white">Setup Web Server Apache2</h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {completedCount}/{missions.length} Selesai
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-sky-500 to-emerald-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Mission Items */}
            <div className="space-y-2">
              {missions.map((m) => (
                <div
                  key={m.id}
                  className={`p-3 rounded-2xl border text-xs transition-all space-y-1.5 ${
                    m.completed
                      ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-200"
                      : "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 font-bold">
                      {m.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Circle className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                      )}
                      <span>
                        {m.id}. {m.title}
                      </span>
                    </div>

                    {!m.completed && (
                      <button
                        onClick={() => executeCommand(m.command)}
                        className="px-2 py-0.5 rounded-md bg-sky-600/30 hover:bg-sky-600 text-sky-200 text-[10px] font-mono font-bold transition-all cursor-pointer shrink-0"
                        title="Jalankan perintah ini otomatis"
                      >
                        Jalankan &rarr;
                      </button>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-400 leading-snug">{m.description}</p>

                  <div className="font-mono text-[10px] bg-slate-950/80 px-2 py-1 rounded-md text-amber-300 truncate">
                    $ {m.command}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 mt-4 text-[11px] text-slate-400 flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5 text-sky-400 shrink-0" />
            <span>Klik tab <b>Live Web Browser</b> untuk menguji tampilan web setelah service Apache aktif.</span>
          </div>
        </div>

        {/* Right Canvas: Terminal CLI or Browser Preview */}
        <div className="lg:col-span-8 flex flex-col bg-slate-950 overflow-hidden">
          {activeTab === "terminal" ? (
            <>
              {/* Output stream */}
              <div className="flex-1 p-4 sm:p-5 font-mono text-xs sm:text-sm space-y-2 overflow-y-auto leading-relaxed select-text">
                {terminalHistory.map((item) => (
                  <div key={item.id} className="whitespace-pre-wrap break-words">
                    {item.type === "input" ? (
                      <span className="text-emerald-400 font-bold">{item.content}</span>
                    ) : item.type === "system" ? (
                      <span className={item.color || "text-slate-400"}>{item.content}</span>
                    ) : (
                      <span className={item.color || "text-slate-200"}>{item.content}</span>
                    )}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Input prompt */}
              <div className="p-3 sm:p-4 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-emerald-400 shrink-0">
                  siswa@asj-server:~$
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ketik perintah linux (contoh: sudo apt update) atau klik 'Jalankan' pada panel misi..."
                  className="flex-1 bg-transparent border-none text-white font-mono text-xs sm:text-sm focus:outline-none placeholder:text-slate-600"
                  autoFocus
                />
                <button
                  onClick={() => executeCommand(inputVal)}
                  disabled={!inputVal.trim() || isExecuting}
                  className="p-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-30 text-white transition-all cursor-pointer"
                  title="Eksekusi Perintah"
                >
                  <CornerDownLeft className="h-4 w-4" />
                </button>
              </div>
            </>
          ) : (
            /* Tab: Live Browser Preview */
            <div className="flex-1 flex flex-col bg-slate-900 p-4 sm:p-6 overflow-y-auto">
              {/* Simulated Browser Bar */}
              <div className="rounded-2xl border border-slate-700 bg-slate-950 overflow-hidden shadow-2xl flex-1 flex flex-col">
                <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  </div>

                  <div className="flex-1 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-emerald-400">http://</span>
                      <span>10.10.20.5:80</span>
                      <span className="text-slate-500">(/var/www/html/index.html)</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">
                      Port 80 HTTP
                    </span>
                  </div>
                </div>

                {/* Browser Viewport */}
                <div className="flex-1 p-6 sm:p-10 bg-white text-slate-900 flex flex-col justify-center items-center text-center">
                  {!isApacheInstalled ? (
                    <div className="space-y-3 max-w-md">
                      <div className="h-14 w-14 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto">
                        <Server className="h-7 w-7" />
                      </div>
                      <h4 className="text-lg font-extrabold text-slate-900">
                        This site can’t be reached (ERR_CONNECTION_REFUSED)
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Server web Apache2 belum diinstal atau belum aktif di Linux.
                        Kembalilah ke tab <b>Terminal CLI</b> dan jalankan <code>sudo apt install -y apache2</code>.
                      </p>
                    </div>
                  ) : isCustomIndexApplied ? (
                    <div className="space-y-4 max-w-xl animate-fade-in p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span>Respon HTTP 200 OK &bull; Apache/2.4.52</span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                        Selamat Datang di Web Server Apache2
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        SMK Telkom Lampung &bull; Bidang Keahlian Teknik Komputer &amp; Jaringan (TJKT)
                      </p>

                      <div className="p-4 rounded-xl bg-white border border-slate-200 text-left text-xs font-mono space-y-1">
                        <div className="text-slate-400 text-[10px] uppercase font-bold">Metadata Server Linux:</div>
                        <div>DocumentRoot : /var/www/html/index.html</div>
                        <div>Service Name : apache2.service (Active)</div>
                        <div>Port Binding : 0.0.0.0:80 (TCP)</div>
                        <div>Guru Pengampu: Hermawan Rijal Arasy, S.Kom.</div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 max-w-xl animate-fade-in">
                      <div className="h-14 w-14 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
                        <Globe className="h-7 w-7" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">
                        Apache2 Ubuntu Default Page: It works!
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                        Web server Apache2 berhasil berjalan dengan halaman bawaan. Untuk menyelesaikan Misi 5, kustomisasi halaman index dengan perintah echo / tee pada tab terminal.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
