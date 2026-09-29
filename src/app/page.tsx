"use client";

import { useState } from "react";
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
  ExternalLink,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Clock,
  Award,
  HardDrive,
  Network,
  ArrowRight,
  Code2,
  Laptop,
  CheckSquare,
  UserCheck,
} from "lucide-react";

interface Snippet {
  id: string;
  category: "all" | "prep" | "network" | "package" | "system";
  title: string;
  description: string;
  command: string;
  explanation: string;
}

export default function Home() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeHeroTab, setActiveHeroTab] = useState<number>(0);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const heroSnippets = [
    {
      title: "Update Repositori Server",
      desc: "Menyinkronkan daftar paket terbaru dari server mirror resmi Ubuntu",
      command: "sudo apt update && sudo apt upgrade -y",
      env: "Ubuntu Server 22.04 LTS (CLI)",
    },
    {
      title: "Cek Alamat IP & Interface",
      desc: "Melihat konfigurasi antarmuka jaringan dan IP address yang didapat dari NAT / DHCP",
      command: "ip -brief address show",
      env: "Ubuntu Server 22.04 LTS (CLI)",
    },
    {
      title: "Uji Konektivitas Internet",
      desc: "Melakukan ping uji koneksi ke Public DNS Google sebanyak 4 paket",
      command: "ping -c 4 8.8.8.8",
      env: "Ubuntu Server 22.04 LTS (CLI)",
    },
    {
      title: "Cek Alokasi Memori RAM",
      desc: "Memverifikasi apakah alokasi RAM 2GB (2048 MB) terbaca dengan tepat di Linux",
      command: "free -h",
      env: "Ubuntu Server 22.04 LTS (CLI)",
    },
  ];

  const snippetsList: Snippet[] = [
    {
      id: "pkg-1",
      category: "package",
      title: "Pembaruan Paket Sistem Lengkap",
      description: "Perintah wajib saat pertama kali mengonfigurasi Ubuntu Server baru.",
      command: "sudo apt update && sudo apt upgrade -y",
      explanation:
        "'apt update' memperbarui indeks katalog paket, sedangkan 'apt upgrade -y' memasang pembaruan terkini tanpa menunggu konfirmasi manual.",
    },
    {
      id: "net-1",
      category: "network",
      title: "Pemeriksaan IP Address Ringkas",
      description: "Menampilkan status interface jaringan (UP/DOWN) beserta IP Address lokal.",
      command: "ip -brief address show",
      explanation:
        "Opsi '-brief' membuat output lebih bersih dan rapi dibandingkan 'ifconfig' atau 'ip a' standar.",
    },
    {
      id: "net-2",
      category: "network",
      title: "Uji Konektivitas Internet Lab",
      description: "Mengirim 4 paket ICMP Echo ke DNS Google untuk memvalidasi gateway NAT.",
      command: "ping -c 4 8.8.8.8",
      explanation:
        "Parameter '-c 4' membatasi proses ping hanya 4 kali sehingga terminal tidak terus-menerus berjalan di Linux.",
    },
    {
      id: "sys-1",
      category: "system",
      title: "Monitoring Penggunaan RAM",
      description: "Melihat alokasi RAM total, terpakai, dan sisa dalam format yang mudah dibaca (Human Readable).",
      command: "free -h",
      explanation:
        "Opsi '-h' mengonversi byte menjadi Megabyte (MB) atau Gigabyte (GB) sehingga mudah dianalisis oleh siswa.",
    },
    {
      id: "sys-2",
      category: "system",
      title: "Cek Kapasitas Disk Root (/) 25GB",
      description: "Memastikan partisi virtual harddisk VDI 25 GB terpasang secara optimal.",
      command: "df -h /",
      explanation:
        "Menampilkan kapasitas ruang penyimpanan pada titik pasang root (/) beserta persentase penggunaannya.",
    },
    {
      id: "prep-1",
      category: "prep",
      title: "Verifikasi Hypervisor Virtualisasi",
      description: "Mendeteksi apakah sistem operasi saat ini berjalan di dalam mesin virtual (VM).",
      command: "systemd-detect-virt",
      explanation:
        "Akan menghasilkan output 'oracle' jika dijalankan di dalam VirtualBox, membuktikan bahwa isolasi hypervisor aktif.",
    },
    {
      id: "prep-2",
      category: "prep",
      title: "Cek Hostname & Spesifikasi Kernel",
      description: "Melihat identitas server, versi arsitektur kernel 64-bit, dan rilis Ubuntu.",
      command: "hostnamectl",
      explanation:
        "Menampilkan Static hostname, Operating System (Ubuntu 22.04 LTS), Kernel Linux, dan jenis Arsitektur CPU.",
    },
    {
      id: "sys-3",
      category: "system",
      title: "Perintah Matikan Server Aman",
      description: "Mematikan sistem operasi server secara bersih sebelum mengambil checkpoint snapshot.",
      command: "sudo poweroff",
      explanation:
        "Memastikan seluruh proses daemon dan I/O filesystem disinkronkan ke disk sebelum VM dimatikan.",
    },
  ];

  const filteredSnippets =
    activeCategory === "all"
      ? snippetsList
      : snippetsList.filter((s) => s.category === activeCategory);

  const learningSteps = [
    {
      step: "01",
      title: "Pre-Test Awal",
      desc: "10 soal uji diagnostik awal untuk mengukur pemahaman konsep dasar sebelum praktikum.",
      tag: "Diagnostik",
      color: "bg-sky-50 text-sky-700 border-sky-200",
    },
    {
      step: "02",
      title: "Modul Teori",
      desc: "Fondasi arsitektur cloud, Type-2 Hypervisor, dan karakteristik OS Ubuntu Server 22.04.",
      tag: "Pemahaman",
      color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    {
      step: "03",
      title: "Hands-on Lab",
      desc: "Panduan interaktif pembuatan VM di VirtualBox dengan konfigurasi hardware optimal.",
      tag: "Praktikum",
      color: "bg-teal-50 text-teal-700 border-teal-200",
    },
    {
      step: "04",
      title: "Verifikasi & Tugas",
      desc: "Pengumpulan 4 bukti tangkapan layar (screenshot) hasil konfigurasi mesin virtual siswa.",
      tag: "Portofolio",
      color: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      step: "05",
      title: "Post-Test Evaluasi",
      desc: "Uji evaluasi pemahaman akhir materi praktikum dengan target kelulusan minimal skor 75.",
      tag: "Evaluasi",
      color: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      step: "06",
      title: "Sertifikat Digital",
      desc: "Pemberian validasi kompetensi kelulusan modul praktikum yang dapat dicetak langsung.",
      tag: "Capaian",
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
  ];

  const faqs = [
    {
      q: "Mengapa wajib mencentang opsi 'Skip Unattended Installation' pada VirtualBox?",
      a: "Jika opsi ini tidak dicentang, VirtualBox akan memasang Ubuntu Server secara otomatis dengan pengaturan bawaan pihak ketiga yang sering kali mengabaikan konfigurasi partisi khusus dan akun admin yang dibutuhkan pada instruksi laboratorium sekolah.",
    },
    {
      q: "Bagaimana jika pada Task Manager tertulis 'Virtualization: Disabled'?",
      a: "Artinya fitur virtualisasi perangkat keras (Intel VT-x atau AMD-V) belum diaktifkan pada sistem BIOS/UEFI komputer/laptop Anda. Laporkan kepada guru pembimbing laboratorium untuk panduan mengaktifkannya.",
    },
    {
      q: "Mengapa kita menggunakan Ubuntu Server versi CLI (tanpa tampilan grafis GUI)?",
      a: "Di dunia industri nyata dan penyedia cloud (AWS, GCP, Azure), server dikelola secara 'headless' melalui antarmuka baris perintah (CLI). Cara ini menghemat alokasi RAM secara drastis (hanya butuh ~150-300MB RAM saat idle) dan jauh lebih aman serta stabil.",
    },
    {
      q: "Kapan kita menggunakan mode jaringan NAT dan kapan Bridged Adapter?",
      a: "Mode NAT (Network Address Translation) digunakan saat VM hanya memerlukan akses internet keluar (misalnya mengunduh paket) dan terlindung dari akses luar. Mode Bridged Adapter digunakan jika VM ingin mendapatkan IP satu segmen dengan jaringan LAN fisik sekolah agar bisa diakses oleh komputer lain di lab.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-sky-100 selection:text-sky-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight">
                  TEKAJE<span className="text-sky-600">LABS</span>
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-100/70 text-sky-700 border border-sky-200/60">
                  E-Learning
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Ruang Praktikum & Kelas Online &bull; Wahyu Rahmat Hidayat
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#beranda" className="text-sky-600 transition-colors">
              Beranda
            </a>
            <a href="#modul-utama" className="hover:text-sky-600 transition-colors">
              Modul Praktikum
            </a>
            <a href="#snippet-perintah" className="hover:text-sky-600 transition-colors">
              Perintah Cepat
            </a>
            <a href="#alur-belajar" className="hover:text-sky-600 transition-colors">
              Alur Belajar
            </a>
            <a href="#tentang-guru" className="hover:text-sky-600 transition-colors">
              Profil Guru
            </a>
            <a href="#faq" className="hover:text-sky-600 transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#modul-utama"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-sky-600 transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-sky-600/20"
            >
              <BookOpen className="h-4 w-4" />
              <span>Mulai Praktikum</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        id="beranda"
        className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200/60"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#e0f2fe_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200/80 text-sky-800 text-xs font-semibold shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-sky-600" />
                <span>Kelas Online & Laboratorium Mandiri TKJ</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.18]">
                Belajar Praktikum{" "}
                <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-teal-600 bg-clip-text text-transparent">
                  Cloud Computing
                </span>{" "}
                & Linux Server Jadi Mudah & Terarah.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Selamat datang di portal belajar mandiri siswa Teknik Komputer dan Jaringan.
                Dirancang khusus dengan panduan interaktif layaknya platform modern (Dicoding &amp; Coursera)
                untuk memudahkan praktikum virtualisasi, sistem operasi Ubuntu Server, dan teknologi cloud.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <a
                  href="#modul-utama"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white bg-sky-600 hover:bg-sky-500 shadow-lg shadow-sky-600/25 transition-all duration-200"
                >
                  <Server className="h-4.5 w-4.5" />
                  <span>Buka Modul Pertemuan 1</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href="#snippet-perintah"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs hover:border-slate-300 transition-all duration-200"
                >
                  <Terminal className="h-4.5 w-4.5 text-sky-600" />
                  <span>Cheatsheet Perintah CLI</span>
                </a>
              </div>

              {/* Feature Badges */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-200/80 max-w-lg mx-auto lg:mx-0 text-left">
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 rounded-md p-1 bg-emerald-100 text-emerald-700">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">4 JP Praktikum</div>
                    <div className="text-[11px] text-slate-500">180 Menit Mandiri</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 rounded-md p-1 bg-sky-100 text-sky-700">
                    <Copy className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">1-Click Copy</div>
                    <div className="text-[11px] text-slate-500">Anti Typo Sintaks</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 rounded-md p-1 bg-indigo-100 text-indigo-700">
                    <Award className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Standar Industri</div>
                    <div className="text-[11px] text-slate-500">Ubuntu 22.04 LTS</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Terminal Widget */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-700/20 bg-slate-900 text-white shadow-2xl shadow-slate-900/20 overflow-hidden">
                {/* Terminal Header */}
                <div className="bg-slate-800/90 px-4 py-3 flex items-center justify-between border-b border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-500 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-amber-500 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500 inline-block" />
                    <span className="ml-2 font-mono text-xs text-slate-400">
                      wahyu@ubuntu-server-2204: ~
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>NAT Active</span>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-slate-800 bg-slate-950/60 px-2 pt-2 gap-1 overflow-x-auto text-xs font-medium">
                  {heroSnippets.map((tab, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveHeroTab(idx)}
                      className={`px-3 py-2 rounded-t-lg transition-all text-xs whitespace-nowrap cursor-pointer ${
                        activeHeroTab === idx
                          ? "bg-slate-900 text-sky-400 border-t-2 border-sky-400 font-semibold"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
                      }`}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>

                {/* Terminal Body */}
                <div className="p-5 font-mono text-xs sm:text-sm space-y-4 bg-slate-900/95">
                  <div className="text-slate-400 text-xs italic">
                    # {heroSnippets[activeHeroTab].desc}
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800/80 flex items-center justify-between gap-3 group">
                    <div className="flex items-center gap-2 overflow-x-auto py-1">
                      <span className="text-emerald-400 font-bold">$</span>
                      <span className="text-slate-100 font-semibold tracking-wide">
                        {heroSnippets[activeHeroTab].command}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        handleCopy(
                          `hero-${activeHeroTab}`,
                          heroSnippets[activeHeroTab].command
                        )
                      }
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                        copiedId === `hero-${activeHeroTab}`
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700"
                      }`}
                      title="Salin ke clipboard"
                    >
                      {copiedId === `hero-${activeHeroTab}` ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          <span>Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Output Preview Simulation */}
                  <div className="rounded-lg bg-slate-950/60 p-3 text-[11px] text-slate-400 border border-slate-800/50 space-y-1">
                    <div className="text-slate-500 font-semibold">
                      [INFO] Target Environment:
                    </div>
                    <div className="text-sky-300/90">
                      &bull; {heroSnippets[activeHeroTab].env}
                    </div>
                    <div className="text-slate-500">
                      &bull; Klik tombol di atas untuk langsung paste ke jendela VM siswa (VirtualBox).
                    </div>
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="bg-slate-950 px-4 py-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>RAM: 2048 MB | 2 vCPU</span>
                  <span>Disk: 25 GB VDI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY THIS PORTAL (KEUNGGULAN BELAJAR) */}
      <section className="py-14 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-2">
              Pengalaman Belajar Interaktif
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Didesain Khusus Memandu Siswa Praktikum Mandiri
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-sky-300 hover:shadow-md transition-all duration-200">
              <div className="h-11 w-11 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-4">
                <Code2 className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-slate-900 mb-1.5 text-base">
                1-Click Copy Snippet
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tinggal satu klik untuk menyalin perintah Ubuntu Server. Siswa terbebas dari kesalahan ketik (typo spasi atau tanda hubung).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-indigo-300 hover:shadow-md transition-all duration-200">
              <div className="h-11 w-11 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <Layers className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-slate-900 mb-1.5 text-base">
                Step-by-step Terstruktur
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Materi disusun berurutan dari persiapan hardware, wizard VirtualBox, hingga pengujian mode jaringan NAT &amp; Bridged.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-teal-300 hover:shadow-md transition-all duration-200">
              <div className="h-11 w-11 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-slate-900 mb-1.5 text-base">
                Eksplorasi Bebas Risiko
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dilengkapi teknik pembuatan Checkpoint Snapshot agar siswa dapat mengembalikan kondisi VM kapan saja bila terjadi error.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-purple-300 hover:shadow-md transition-all duration-200">
              <div className="h-11 w-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <Award className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-slate-900 mb-1.5 text-base">
                Validasi &amp; Penugasan
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tersedia Pre-Test diagnostik, lembar verifikasi bukti screenshot, dan Post-Test untuk validasi kompetensi akhir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COURSE MODULE (MODUL UTAMA PERTEMUAN 1) */}
      <section id="modul-utama" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold mb-2.5">
                <Cloud className="h-3.5 w-3.5" />
                <span>Kelas Utama &bull; Semester Ganjil</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Materi Praktikum Cloud Computing
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Panduan praktikum laboratorium komputer untuk siswa Teknik Komputer dan Jaringan.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200">
                Status: Modul Aktif &bull; Siap Praktikum
              </span>
            </div>
          </div>

          {/* Main Course Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
            {/* Top Banner Gradient Header */}
            <div className="bg-gradient-to-r from-sky-700 via-indigo-700 to-sky-800 p-6 sm:p-8 text-white relative">
              <div className="max-w-3xl space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-sky-100">
                    Pertemuan 01
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-sky-100">
                    Alokasi: 4 Jam Pelajaran (180 Menit)
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/25 border border-emerald-300/30 text-xs font-semibold text-emerald-200">
                    Hands-on Lab Mandiri
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white leading-snug">
                  Pengenalan Virtualisasi &amp; Persiapan Mesin Virtual Ubuntu Server 22.04 LTS
                </h3>

                <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed">
                  Memahami dasar arsitektur Cloud Computing industri, peranan Type-2 Hypervisor, dan
                  membangun simulasi server cloud privat di komputer lokal menggunakan Oracle VM VirtualBox 7.x.
                </p>
              </div>
            </div>

            {/* Content Details Grid */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Specs & Requirements Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white text-sky-600 border border-slate-200 shadow-xs">
                    <Laptop className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase text-slate-500">Hardware Host</div>
                    <div className="text-xs font-bold text-slate-800">PC / Laptop (RAM 8GB+)</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white text-indigo-600 border border-slate-200 shadow-xs">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase text-slate-500">Virtual Machine</div>
                    <div className="text-xs font-bold text-slate-800">2 CPU &bull; 2048 MB RAM</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white text-teal-600 border border-slate-200 shadow-xs">
                    <HardDrive className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase text-slate-500">Storage VDI</div>
                    <div className="text-xs font-bold text-slate-800">25.00 GB Dynamic Disk</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white text-emerald-600 border border-slate-200 shadow-xs">
                    <Network className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase text-slate-500">Network Mode</div>
                    <div className="text-xs font-bold text-slate-800">NAT &amp; Bridged Adapter</div>
                  </div>
                </div>
              </div>

              {/* 4 Practical Stages */}
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-sky-600" />
                  <span>4 Tahapan Praktikum Laboratorium:</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Tahap 1 */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-sm transition-all space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold px-2.5 py-1 rounded-md bg-sky-100 text-sky-800">
                        Tahap 1
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">Task Manager &bull; BIOS</span>
                    </div>
                    <h5 className="font-bold text-slate-900 text-sm">
                      Verifikasi Virtualisasi CPU di Windows
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Memastikan status <b>Virtualization: Enabled</b> pada Task Manager (Ctrl + Shift + Esc &rarr; Performance &rarr; CPU) untuk mengaktifkan Intel VT-x atau AMD-V.
                    </p>
                  </div>

                  {/* Tahap 2 */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-sm transition-all space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-800">
                        Tahap 2
                      </span>
                      <span className="text-[11px] text-rose-600 font-semibold">Wajib Skip Unattended!</span>
                    </div>
                    <h5 className="font-bold text-slate-900 text-sm">
                      Pembuatan Mesin Virtual Baru di VirtualBox
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Membuat VM dengan identitas <code>Ubuntu-Server-22.04</code>, memasang berkas ISO, mengalokasikan RAM 2GB, 2 CPU, dan partisi harddisk 25 GB.
                    </p>
                  </div>

                  {/* Tahap 3 */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-sm transition-all space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold px-2.5 py-1 rounded-md bg-teal-100 text-teal-800">
                        Tahap 3
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">Settings &bull; Network</span>
                    </div>
                    <h5 className="font-bold text-slate-900 text-sm">
                      Pengecekan Storage &amp; Jaringan (NAT vs Bridged)
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Memverifikasi optical drive ISO terpasang dan mengonfigurasi Adapter Jaringan mode NAT untuk kebutuhan koneksi internet keluar otomatis.
                    </p>
                  </div>

                  {/* Tahap 4 */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-sm transition-all space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800">
                        Tahap 4
                      </span>
                      <span className="text-[11px] text-emerald-700 font-semibold">Checkpoint Aman</span>
                    </div>
                    <h5 className="font-bold text-slate-900 text-sm">
                      Uji Booting Pertama &amp; Pembuatan Snapshot
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Memulai VM hingga muncul bootloader GNU GRUB (<code>&gt; Try or Install Ubuntu Server</code>), lalu mengambil Snapshot: <code>Ptm 1 - VM Ready Pre-Install</code>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Learning Roadmap CTA Bar */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-sky-950 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center md:text-left">
                  <div className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                    Sistem Pembelajaran Terintegrasi
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    Siap Memulai Praktikum Mandiri di Laboratorium?
                  </h4>
                  <p className="text-xs text-slate-300 max-w-xl">
                    Selesaikan Pre-Test diagnostik, ikuti langkah hands-on, kumpulkan 4 tangkapan layar bukti, dan raih sertifikat kelulusan modul Pertemuan 1!
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href="#alur-belajar"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                  >
                    <span>Lihat Alur Belajar (6 Tahap)</span>
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE CHEATSHEET & SNIPPET LIBRARY */}
      <section
        id="snippet-perintah"
        className="py-16 md:py-24 bg-white border-y border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-3 border border-teal-200/60">
              <Terminal className="h-3.5 w-3.5" />
              <span>Library Sintaks CLI Siswa</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Cheatsheet Perintah Cepat Ubuntu Server
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Kumpulan perintah penting untuk praktikum. Siswa cukup menekan tombol{" "}
              <b>"Salin"</b> untuk menyalin perintah ke clipboard dan menempelkannya (paste)
              langsung di terminal Linux tanpa risiko salah ketik.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {[
                { id: "all", label: "Semua Perintah" },
                { id: "prep", label: "Persiapan & Hypervisor" },
                { id: "network", label: "Jaringan (NAT / IP)" },
                { id: "package", label: "Paket (APT)" },
                { id: "system", label: "Sistem & Resource" },
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeCategory === category.id
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Snippet Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredSnippets.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 hover:bg-white hover:border-sky-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-700">
                      {item.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">{item.description}</p>

                  {/* Code Box with Copy Button */}
                  <div className="rounded-xl bg-slate-900 p-3.5 border border-slate-800 text-white flex items-center justify-between gap-3">
                    <div className="font-mono text-xs overflow-x-auto text-sky-300 py-0.5">
                      <span className="text-emerald-400 select-none mr-2 font-bold">$</span>
                      {item.command}
                    </div>

                    <button
                      onClick={() => handleCopy(item.id, item.command)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                        copiedId === item.id
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                      }`}
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-white" />
                          <span>Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-sky-400" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-slate-200/70 text-[11px] text-slate-500 leading-normal">
                  <b className="text-slate-700">Penjelasan Teknis:</b> {item.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6-STEP LEARNING PATH (ALUR BELAJAR MODEL DICODING/COURSERA) */}
      <section id="alur-belajar" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2 block">
              Kurikulum Berstandar
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              6 Tahapan Pembelajaran Siswa
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Alur belajar komprehensif dari awal hingga mendapatkan sertifikat penyelesaian modul praktikum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningSteps.map((step) => (
              <div
                key={step.step}
                className="rounded-2xl bg-white border border-slate-200 p-6 relative hover:shadow-lg hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-slate-200 font-mono">
                      {step.step}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${step.color}`}
                    >
                      {step.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-sky-600">
                  <span>Tahap Wajib Praktikum</span>
                  <CheckCircle2 className="h-4 w-4 ml-auto text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEACHER PROFILE SECTION */}
      <section
        id="tentang-guru"
        className="py-16 md:py-24 bg-white border-y border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Avatar / Photo placeholder */}
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-3xl bg-gradient-to-tr from-sky-400 to-indigo-600 p-1 shadow-xl">
                  <div className="h-full w-full rounded-[22px] bg-slate-900 flex flex-col items-center justify-center p-3 text-center">
                    <UserCheck className="h-14 w-14 text-sky-400 mb-2" />
                    <span className="text-[11px] font-semibold text-slate-300">
                      Instruktur Lab
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-bold text-white">Wahyu Rahmat Hidayat</h3>
                  <p className="text-xs text-sky-300">
                    Guru Teknik Komputer &amp; Jaringan
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    SMK Telkom &bull; Pengampu Cloud Computing
                  </p>
                </div>
              </div>

              {/* Bio & Vision */}
              <div className="lg:col-span-8 space-y-4 text-slate-200 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-semibold">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Dedikasi Pembelajaran Vokasi</span>
                </div>

                <h4 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  "Praktikum Server Bukan untuk Ditakuti, Tapi untuk Dieksplorasi."
                </h4>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Platform ini saya dedikasikan untuk seluruh siswa saya di jurusan Teknik Komputer
                  dan Jaringan. Tujuannya adalah mendobrak batas rasa takut salah dalam mengetik
                  perintah terminal dan memberi ruang eksplorasi mandiri dengan panduan yang jelas,
                  teruji, dan ramah pemula.
                </p>

                {/* Skill Badges */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
                  <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300 border border-slate-700">
                    Linux Administration (Ubuntu Server)
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300 border border-slate-700">
                    Type-2 Virtualization (VirtualBox)
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300 border border-slate-700">
                    Cloud Computing Architecture
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300 border border-slate-700">
                    Computer Network &amp; Routing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-2 block">
              Bantuan &amp; Solusi
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Pertanyaan yang Sering Diajukan Siswa (FAQ)
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs hover:border-sky-300 transition-all"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      {faq.q}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto bg-slate-950 text-slate-400 text-xs border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Layers className="h-5 w-5 text-sky-400" />
                <span>TEKAJE LABS &bull; Wahyu Rahmat Hidayat</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                Portal edukasi dan modul praktikum mandiri Teknik Komputer &amp; Jaringan.
                Fokus pada penguasaan sistem operasi server dan infrastruktur cloud computing modern.
              </p>
            </div>

            <div>
              <div className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">
                Navigasi Cepat
              </div>
              <ul className="space-y-2">
                <li>
                  <a href="#beranda" className="hover:text-white transition-colors">
                    Beranda
                  </a>
                </li>
                <li>
                  <a href="#modul-utama" className="hover:text-white transition-colors">
                    Modul Pertemuan 1
                  </a>
                </li>
                <li>
                  <a href="#snippet-perintah" className="hover:text-white transition-colors">
                    Cheatsheet Sintaks CLI
                  </a>
                </li>
                <li>
                  <a href="#alur-belajar" className="hover:text-white transition-colors">
                    Alur Belajar 6 Tahap
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">
                Lingkungan Lab
              </div>
              <ul className="space-y-2 text-slate-400">
                <li>&bull; Oracle VM VirtualBox 7.x</li>
                <li>&bull; Ubuntu Server 22.04 LTS</li>
                <li>&bull; Type-2 Hypervisor Lab</li>
                <li>&bull; Jaringan NAT &amp; Bridged</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} TEKAJE LABS by Wahyu Rahmat Hidayat. All rights reserved.
            </p>
            <p>Dibuat dengan Next.js, Tailwind CSS &bull; Siap Deploy di Vercel.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
