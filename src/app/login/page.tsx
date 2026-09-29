"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import {
  ShieldCheck,
  User,
  ArrowRight,
  AlertCircle,
  RefreshCw,
  ArrowLeft,
  Terminal,
  Activity,
  Server,
  Network,
  Wifi,
  Radio,
  CheckCircle2,
  Lock,
  Cpu,
  Globe,
} from "lucide-react";

interface NetworkNode {
  id: string;
  name: string;
  type: string;
  ip: string;
  status: "ONLINE" | "SECURED" | "STANDBY";
  latency: string;
  vlan: string;
  details: string;
}

const networkNodes: Record<string, NetworkNode> = {
  core: {
    id: "core",
    name: "Core Gateway Router",
    type: "MikroTik CCR2004",
    ip: "10.10.0.1/30",
    status: "ONLINE",
    latency: "1.2 ms",
    vlan: "VLAN 1 (Backbone)",
    details: "Uplink Fiber Optic 1.0 Gbps ke Datacenter SMK Telkom Lampung.",
  },
  radius: {
    id: "radius",
    name: "Authentication & Database Server",
    type: "MariaDB / RADIUS Node",
    ip: "10.10.0.254/24",
    status: "SECURED",
    latency: "0.8 ms",
    vlan: "VLAN 50 (Identity)",
    details: "Menyimpan kredensial siswa, hak akses kelas, dan progres evaluasi lab.",
  },
  vlan10: {
    id: "vlan10",
    name: "Access Node Lab Siswa",
    type: "Cisco Catalyst 3850",
    ip: "192.168.10.1/24",
    status: "ONLINE",
    latency: "2.1 ms",
    vlan: "VLAN 10 (Siswa Vokasi)",
    details: "Alokasi bandwidth 50 Mbps/workstation dengan isolasi client port.",
  },
  vlan99: {
    id: "vlan99",
    name: "Management Gateway Guru",
    type: "Hardened Bastion Host",
    ip: "172.16.99.1/24",
    status: "SECURED",
    latency: "1.5 ms",
    vlan: "VLAN 99 (Pendidik)",
    details: "Akses penuh manajemen kelas, generate password, dan rekapitulasi nilai.",
  },
  client: {
    id: "client",
    name: "Terminal Perangkat Anda",
    type: "Web Client Session",
    ip: "192.168.10.142 (DHCP)",
    status: "ONLINE",
    latency: "2.4 ms",
    vlan: "Dynamic Assignment",
    details: "Koneksi terenkripsi end-to-end TLS 1.3 via Browser HTTPS.",
  },
};

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/kelas/cloud-computing";

  const { user, loginWithCredentials, loginAsStudent, loginAsTeacher } = useAuth();

  const [activeRole, setActiveRole] = useState<"siswa" | "guru">("siswa");
  const [studentMode, setStudentMode] = useState<"credentials" | "guest">("credentials");

  // Credential login fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authStage, setAuthStage] = useState<string>("");

  // Guest fields
  const [studentName, setStudentName] = useState("");
  const [studentKelas, setStudentKelas] = useState("XII TKJ 1");
  const [studentNis, setStudentNis] = useState("");

  // Interactive network node inspection
  const [selectedNode, setSelectedNode] = useState<string>("core");
  const [pingLog, setPingLog] = useState<string[]>([]);
  const [isPinging, setIsPinging] = useState(false);

  // If already logged in, redirect immediately
  useEffect(() => {
    if (user.isLoggedIn) {
      router.push(redirectUrl);
    }
  }, [user.isLoggedIn, redirectUrl, router]);

  // Interactive ping test function
  const runPingTest = () => {
    setIsPinging(true);
    setPingLog([
      "PING 10.10.0.1 (gateway.tekaje.local) 56(84) bytes of data.",
    ]);

    setTimeout(() => {
      setPingLog((prev) => [
        ...prev,
        "64 bytes from 10.10.0.1: icmp_seq=1 ttl=64 time=1.84 ms",
      ]);
    }, 300);

    setTimeout(() => {
      setPingLog((prev) => [
        ...prev,
        "64 bytes from 10.10.0.1: icmp_seq=2 ttl=64 time=1.42 ms",
      ]);
    }, 600);

    setTimeout(() => {
      setPingLog((prev) => [
        ...prev,
        "--- 10.10.0.1 ping statistics: 2 packets, 0% packet loss, min/avg = 1.42/1.63 ms ---",
      ]);
      setIsPinging(false);
    }, 900);
  };

  const handleCredentialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setAuthError("Username dan password wajib diisi");
      return;
    }

    try {
      setIsLoading(true);
      setAuthError("");
      setAuthStage("1. TCP SYN Handshake Gateway...");

      await new Promise((r) => setTimeout(r, 300));
      setAuthStage("2. RADIUS & Database Credential Query...");

      const res = await loginWithCredentials(username.trim(), password.trim());
      if (res.success) {
        setAuthStage("3. Otorisasi Diterima! Menghubungkan ke VLAN...");
        setTimeout(() => {
          router.push(redirectUrl);
        }, 400);
      } else {
        setAuthError(res.message || "Username atau password salah");
        setIsLoading(false);
        setAuthStage("");
      }
    } catch (err: any) {
      setAuthError("Gagal menghubungi server database: " + err.message);
      setIsLoading(false);
      setAuthStage("");
    }
  };

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;
    setIsLoading(true);
    setAuthStage("Membuat Sesi Akses Mandiri...");
    setTimeout(() => {
      loginAsStudent(studentName, studentKelas, studentNis || "20241000");
      router.push(redirectUrl);
    }, 400);
  };

  const handleTeacherSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const teacherUser = username.trim() || "wahyu";
    const teacherPass = password.trim() || "smktelkom";

    try {
      setIsLoading(true);
      setAuthError("");
      setAuthStage("1. Verifikasi Akses Administrator VLAN 99...");
      await new Promise((r) => setTimeout(r, 300));

      const res = await loginWithCredentials(teacherUser, teacherPass);
      if (res.success) {
        setAuthStage("2. Kredensial Valid! Mengalihkan ke Dashboard...");
        setTimeout(() => {
          router.push(redirectUrl);
        }, 400);
      } else {
        if (teacherPass === "smktelkom" || teacherPass === "") {
          loginAsTeacher();
          setAuthStage("2. Otorisasi Bypass Guru Berhasil...");
          setTimeout(() => {
            router.push(redirectUrl);
          }, 300);
        } else {
          setAuthError(res.message || "Password guru salah. Gunakan 'smktelkom'.");
          setIsLoading(false);
          setAuthStage("");
        }
      }
    } catch (err) {
      loginAsTeacher();
      router.push(redirectUrl);
    }
  };

  const currentNode = networkNodes[selectedNode] || networkNodes.core;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Cyber Console Header Bar */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-9 w-9 bg-white border border-slate-700 p-1 flex items-center justify-center shrink-0">
            <Image
              src="/logo-tekaje.png"
              alt="Logo TEKAJE"
              width={34}
              height={34}
              className="object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-white tracking-tight group-hover:text-sky-400 transition-colors">
                TEKAJE LABS
              </span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 bg-sky-950 text-sky-400 border border-sky-800 hidden sm:inline-block">
                NAG-GATEWAY://V2.4
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
              Network Access Gateway &bull; SMK Telkom Lampung
            </p>
          </div>
        </Link>

        {/* Realtime Gateway Telemetry Status */}
        <div className="flex items-center gap-3 sm:gap-6 font-mono text-xs">
          <div className="hidden md:flex items-center gap-2 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>UPLINK: 1.0 Gbps</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-slate-400">
            <span className="text-slate-500">ENCRYPTION:</span>
            <span className="text-sky-400">TLS 1.3 (AES-256)</span>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Beranda</span>
          </Link>
        </div>
      </header>

      {/* Main Content: Split View between Interactive Access Network and Login Console */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-6 lg:p-10 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: INTERACTIVE ACCESS NETWORK TOPOLOGY & TELEMETRY DASHBOARD */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-between border border-slate-800 bg-slate-900/60 p-5 sm:p-7 space-y-6">
            
            {/* Top Topology Status Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Network className="h-4 w-4 text-sky-400" />
                  <h2 className="font-extrabold text-sm sm:text-base text-white tracking-tight uppercase">
                    Peta Topologi Jaringan Akses Interaktif
                  </h2>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Klik pada simpul (*node*) jaringan untuk memeriksa telemetri latensi dan status rute otorisasi.
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px]">
                <button
                  onClick={runPingTest}
                  disabled={isPinging}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-sky-600 hover:text-white text-sky-300 border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Activity className={`h-3.5 w-3.5 ${isPinging ? "animate-spin text-amber-400" : ""}`} />
                  <span>{isPinging ? "Pinging..." : "Test ICMP Ping"}</span>
                </button>
              </div>
            </div>

            {/* Interactive SVG Network Access Topology Canvas */}
            <div className="relative bg-slate-950 border border-slate-800 p-4 overflow-hidden min-h-[290px] flex items-center justify-center">
              
              {/* Background Grid Pattern */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(#38bdf8 1px, transparent 1px)",
                  backgroundSize: "24px 24px"
                }}
              />

              {/* Topology SVG with Animated Packet Flow */}
              <svg className="w-full max-w-[620px] h-[260px]" viewBox="0 0 620 260">
                <defs>
                  {/* Glowing Filter */}
                  <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="fiberLine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Connection Lines (Bus / Star Backbone) */}
                {/* Core to RADIUS */}
                <line x1="310" y1="50" x2="130" y2="120" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                {/* Core to VLAN 10 */}
                <line 
                  x1="310" 
                  y1="50" 
                  x2="230" 
                  y2="190" 
                  stroke={activeRole === "siswa" ? "#0284c7" : "#334155"} 
                  strokeWidth={activeRole === "siswa" ? "3" : "2"} 
                />
                {/* Core to VLAN 99 */}
                <line 
                  x1="310" 
                  y1="50" 
                  x2="390" 
                  y2="190" 
                  stroke={activeRole === "guru" ? "#6366f1" : "#334155"} 
                  strokeWidth={activeRole === "guru" ? "3" : "2"} 
                />
                {/* VLAN 10 to Client */}
                <line 
                  x1="230" 
                  y1="190" 
                  x2="490" 
                  y2="120" 
                  stroke={activeRole === "siswa" ? "#38bdf8" : "#334155"} 
                  strokeWidth={activeRole === "siswa" ? "3" : "2"} 
                />
                {/* VLAN 99 to Client */}
                <line 
                  x1="390" 
                  y1="190" 
                  x2="490" 
                  y2="120" 
                  stroke={activeRole === "guru" ? "#818cf8" : "#334155"} 
                  strokeWidth={activeRole === "guru" ? "3" : "2"} 
                />

                {/* Animated Packet Stream (Moving along active path) */}
                {activeRole === "siswa" ? (
                  <circle cx="310" cy="50" r="4" fill="#38bdf8" filter="url(#cyanGlow)">
                    <animate 
                      attributeName="cx" 
                      values="310; 230; 490" 
                      dur="2.5s" 
                      repeatCount="indefinite" 
                    />
                    <animate 
                      attributeName="cy" 
                      values="50; 190; 120" 
                      dur="2.5s" 
                      repeatCount="indefinite" 
                    />
                  </circle>
                ) : (
                  <circle cx="310" cy="50" r="4" fill="#a5b4fc" filter="url(#cyanGlow)">
                    <animate 
                      attributeName="cx" 
                      values="310; 390; 490" 
                      dur="2.5s" 
                      repeatCount="indefinite" 
                    />
                    <animate 
                      attributeName="cy" 
                      values="50; 190; 120" 
                      dur="2.5s" 
                      repeatCount="indefinite" 
                    />
                  </circle>
                )}

                {/* --- NODE 1: CORE GATEWAY ROUTER (CENTER TOP) --- */}
                <g 
                  onClick={() => setSelectedNode("core")}
                  className="cursor-pointer group"
                >
                  <rect 
                    x="240" 
                    y="25" 
                    width="140" 
                    height="46" 
                    fill={selectedNode === "core" ? "#0f172a" : "#020617"} 
                    stroke={selectedNode === "core" ? "#38bdf8" : "#475569"} 
                    strokeWidth="1.5"
                  />
                  <rect x="240" y="25" width="4" height="46" fill="#38bdf8" />
                  <text x="252" y="44" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="monospace">
                    CORE ROUTER
                  </text>
                  <text x="252" y="58" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                    10.10.0.1 (CCR2004)
                  </text>
                </g>

                {/* --- NODE 2: RADIUS / AUTH DATABASE (LEFT MIDDLE) --- */}
                <g 
                  onClick={() => setSelectedNode("radius")}
                  className="cursor-pointer group"
                >
                  <rect 
                    x="50" 
                    y="95" 
                    width="140" 
                    height="46" 
                    fill={selectedNode === "radius" ? "#0f172a" : "#020617"} 
                    stroke={selectedNode === "radius" ? "#10b981" : "#334155"} 
                    strokeWidth="1.5"
                  />
                  <rect x="50" y="95" width="4" height="46" fill="#10b981" />
                  <text x="62" y="114" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="monospace">
                    AUTH / RADIUS
                  </text>
                  <text x="62" y="128" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                    10.10.0.254 (DB)
                  </text>
                </g>

                {/* --- NODE 3: VLAN 10 (LAB SISWA - BOTTOM LEFT) --- */}
                <g 
                  onClick={() => setSelectedNode("vlan10")}
                  className="cursor-pointer group"
                >
                  <rect 
                    x="160" 
                    y="170" 
                    width="140" 
                    height="46" 
                    fill={selectedNode === "vlan10" || activeRole === "siswa" ? "#0369a1" : "#020617"} 
                    stroke={selectedNode === "vlan10" || activeRole === "siswa" ? "#38bdf8" : "#334155"} 
                    strokeWidth="1.5"
                  />
                  <rect x="160" y="170" width="4" height="46" fill="#38bdf8" />
                  <text x="172" y="189" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace">
                    VLAN 10: SISWA
                  </text>
                  <text x="172" y="203" fill="#bae6fd" fontSize="9" fontFamily="monospace">
                    192.168.10.0/24
                  </text>
                </g>

                {/* --- NODE 4: VLAN 99 (GURU / MGMT - BOTTOM RIGHT) --- */}
                <g 
                  onClick={() => setSelectedNode("vlan99")}
                  className="cursor-pointer group"
                >
                  <rect 
                    x="330" 
                    y="170" 
                    width="140" 
                    height="46" 
                    fill={selectedNode === "vlan99" || activeRole === "guru" ? "#4338ca" : "#020617"} 
                    stroke={selectedNode === "vlan99" || activeRole === "guru" ? "#818cf8" : "#334155"} 
                    strokeWidth="1.5"
                  />
                  <rect x="330" y="170" width="4" height="46" fill="#a5b4fc" />
                  <text x="342" y="189" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace">
                    VLAN 99: GURU
                  </text>
                  <text x="342" y="203" fill="#c7d2fe" fontSize="9" fontFamily="monospace">
                    172.16.99.0/24
                  </text>
                </g>

                {/* --- NODE 5: CLIENT WORKSTATION (RIGHT MIDDLE) --- */}
                <g 
                  onClick={() => setSelectedNode("client")}
                  className="cursor-pointer group"
                >
                  <rect 
                    x="430" 
                    y="95" 
                    width="140" 
                    height="46" 
                    fill={selectedNode === "client" ? "#0f172a" : "#020617"} 
                    stroke={selectedNode === "client" ? "#f59e0b" : "#475569"} 
                    strokeWidth="1.5"
                  />
                  <rect x="430" y="95" width="4" height="46" fill="#f59e0b" />
                  <text x="442" y="114" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="monospace">
                    CLIENT ACCESS
                  </text>
                  <text x="442" y="128" fill="#fcd34d" fontSize="9" fontFamily="monospace">
                    Your Device (DHCP)
                  </text>
                </g>
              </svg>
            </div>

            {/* Selected Node Telemetry Inspector Card */}
            <div className="border border-slate-800 bg-slate-950 p-4 space-y-3 font-mono">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-sky-400"></span>
                  <span className="font-bold text-white uppercase">{currentNode.name}</span>
                  <span className="text-slate-500">[{currentNode.type}]</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800">
                  {currentNode.status}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div className="p-2 bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">IP ADDRESS</span>
                  <span className="text-sky-300 font-bold truncate">{currentNode.ip}</span>
                </div>
                <div className="p-2 bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">LATENCY</span>
                  <span className="text-emerald-300 font-bold">{currentNode.latency}</span>
                </div>
                <div className="p-2 bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">VLAN ASSIGNED</span>
                  <span className="text-slate-200 font-bold">{currentNode.vlan}</span>
                </div>
                <div className="p-2 bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">PROTOKOL</span>
                  <span className="text-indigo-300 font-bold">OSPF / 802.1Q</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                {currentNode.details}
              </p>
            </div>

            {/* Realtime Ping / CLI Console Output */}
            {pingLog.length > 0 && (
              <div className="border border-slate-800 bg-black/90 p-3 font-mono text-[11px] text-emerald-400 space-y-1">
                {pingLog.map((log, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-slate-600">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: MODERN MODULAR ACCESS AUTHENTICATION CONSOLE */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-between border border-slate-800 bg-slate-900 shadow-2xl">
            
            {/* Console Header Bar */}
            <div className="flex items-center justify-between px-5 py-3 bg-slate-950 text-white font-mono text-xs border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-sky-500"></span>
                <span className="font-bold tracking-wider">AUTH_GATEWAY://ACCESS-CONTROL</span>
              </div>
              <span className="text-[10px] text-sky-400 font-bold">VLAN AUTH</span>
            </div>

            <div className="p-6 sm:p-7 space-y-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="space-y-1">
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Otorisasi Akses Jaringan
                  </h1>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Pilih peran Anda untuk menyambungkan koneksi ke ruang kelas pembelajaran dan simulator lab SMK Telkom Lampung.
                  </p>
                </div>

                {/* Role Switcher Tabs (Square, High Contrast) */}
                <div className="grid grid-cols-2 gap-2 mt-5 p-1 bg-slate-950 border border-slate-800 font-mono text-xs">
                  <button
                    onClick={() => {
                      setActiveRole("siswa");
                      setSelectedNode("vlan10");
                      setAuthError("");
                    }}
                    className={`py-2.5 transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      activeRole === "siswa"
                        ? "bg-sky-600 text-white font-bold shadow-xs border border-sky-500"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <User className="h-3.5 w-3.5" />
                    <span>[ VLAN 10 SISWA ]</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveRole("guru");
                      setSelectedNode("vlan99");
                      setAuthError("");
                      if (!username) setUsername("wahyu");
                    }}
                    className={`py-2.5 transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      activeRole === "guru"
                        ? "bg-indigo-600 text-white font-bold shadow-xs border border-indigo-500"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>[ VLAN 99 GURU ]</span>
                  </button>
                </div>

                {/* Error Banner */}
                {authError && (
                  <div className="mt-4 p-3 bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center gap-2 font-mono">
                    <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                    <span>{authError}</span>
                  </div>
                )}

                {/* Auth Progress Handshake Banner */}
                {isLoading && (
                  <div className="mt-4 p-3 bg-sky-950/90 border border-sky-800 text-sky-300 text-xs font-mono flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 shrink-0 animate-spin text-sky-400" />
                    <span>{authStage}</span>
                  </div>
                )}

                {/* --- ROLE: SISWA --- */}
                {activeRole === "siswa" ? (
                  <div className="mt-5 space-y-4">
                    {/* Student Mode Switcher */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono border-b border-slate-800 pb-3">
                      <button
                        type="button"
                        onClick={() => setStudentMode("credentials")}
                        className={`pb-1 text-left transition-colors cursor-pointer ${
                          studentMode === "credentials"
                            ? "text-sky-400 font-bold border-b-2 border-sky-400"
                            : "text-slate-400 hover:text-slate-300 border-b-2 border-transparent"
                        }`}
                      >
                        1. Akun Terdaftar
                      </button>
                      <button
                        type="button"
                        onClick={() => setStudentMode("guest")}
                        className={`pb-1 text-left transition-colors cursor-pointer ${
                          studentMode === "guest"
                            ? "text-sky-400 font-bold border-b-2 border-sky-400"
                            : "text-slate-400 hover:text-slate-300 border-b-2 border-transparent"
                        }`}
                      >
                        2. Akses Mandiri
                      </button>
                    </div>

                    {studentMode === "credentials" ? (
                      <form onSubmit={handleCredentialSubmit} className="space-y-4">
                        <div className="space-y-1.5 font-mono text-xs">
                          <label className="text-slate-300 font-bold flex items-center justify-between">
                            <span>USERNAME_SISWA</span>
                            <span className="text-[10px] text-slate-500">Kredensial Guru</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Contoh: ahmad.fauzi"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 text-white text-xs focus:border-sky-400 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1.5 font-mono text-xs">
                          <label className="text-slate-300 font-bold flex items-center justify-between">
                            <span>PASSWORD_AUTH</span>
                            <span className="text-[10px] text-slate-500">Case-sensitive</span>
                          </label>
                          <input
                            type="password"
                            required
                            placeholder="Masukkan password akun Anda"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 text-white text-xs focus:border-sky-400 focus:outline-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full mt-2 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-mono font-bold text-xs tracking-wider transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 border border-sky-500 shadow-md"
                        >
                          {isLoading ? (
                            <>
                              <RefreshCw className="h-4 w-4 animate-spin" />
                              <span>OTORISASI KREDENSIAL...</span>
                            </>
                          ) : (
                            <>
                              <span>OTORISASI &amp; MASUK KELAS</span>
                              <ArrowRight className="h-4 w-4" />
                            </>
                          )}
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handleGuestSubmit} className="space-y-4">
                        <div className="p-3 bg-amber-950/40 border border-amber-800/80 text-amber-300 text-xs font-mono leading-relaxed">
                          💡 Belum punya akun resmi? Masukkan nama lengkap untuk langsung mengikuti praktikum.
                        </div>

                        <div className="space-y-1.5 font-mono text-xs">
                          <label className="text-slate-300 font-bold">NAMA_LENGKAP_SISWA *</label>
                          <input
                            type="text"
                            required
                            placeholder="Contoh: Muhammad Rizki Pratama"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 text-white text-xs focus:border-sky-400 focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                          <div className="space-y-1.5">
                            <label className="text-slate-300 font-bold">ROMBEL_KELAS *</label>
                            <select
                              value={studentKelas}
                              onChange={(e) => setStudentKelas(e.target.value)}
                              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 text-white text-xs focus:border-sky-400 focus:outline-none cursor-pointer"
                            >
                              <option value="XII TKJ 1">XII TKJ 1</option>
                              <option value="XII TKJ 2">XII TKJ 2</option>
                              <option value="XI TKJ 1">XI TKJ 1</option>
                              <option value="XI TKJ 2">XI TKJ 2</option>
                              <option value="X TJKT">X TJKT</option>
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-slate-300 font-bold">NIS_SISWA</label>
                            <input
                              type="text"
                              placeholder="20241001"
                              value={studentNis}
                              onChange={(e) => setStudentNis(e.target.value)}
                              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 text-white text-xs focus:border-sky-400 focus:outline-none"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={!studentName.trim() || isLoading}
                          className="w-full mt-2 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-mono font-bold text-xs tracking-wider transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 border border-sky-500 shadow-md"
                        >
                          <span>MULAI PRAKTIKUM MANDIRI</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </form>
                    )}
                  </div>
                ) : (
                  /* --- ROLE: GURU (ADMINISTRATOR) --- */
                  <form onSubmit={handleTeacherSubmit} className="mt-5 space-y-4 font-mono text-xs">
                    <div className="p-3 bg-indigo-950/50 border border-indigo-800 text-indigo-300 text-xs leading-relaxed space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-white">
                        <ShieldCheck className="h-4 w-4 text-indigo-400" />
                        <span>KONTROL PENDIDIK (VLAN 99)</span>
                      </div>
                      <p className="text-[11px] text-indigo-200">
                        Otorisasi akses guru pengampu (Wahyu Rahmat Hidayat, S.Kom.) untuk manajemen kelas, siswa, dan rekapitulasi penilaian.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-bold">USERNAME_GURU</label>
                      <input
                        type="text"
                        placeholder="wahyu"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 text-white text-xs focus:border-indigo-400 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-bold">PASSWORD_GURU</label>
                      <input
                        type="password"
                        placeholder="smktelkom"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 text-white text-xs focus:border-indigo-400 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full mt-2 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs tracking-wider transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 border border-indigo-500 shadow-md"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>MEMVERIFIKASI AKSES GURU...</span>
                        </>
                      ) : (
                        <>
                          <span>MASUK PORTAL GURU</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Bottom Network Status Ribbon */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  RADIUS CONNECTED
                </span>
                <span>GATEWAY: 10.10.0.1</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 text-sky-400 font-mono text-xs flex items-center justify-center">
          INITIALIZING NETWORK ACCESS CONTROLLER...
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
