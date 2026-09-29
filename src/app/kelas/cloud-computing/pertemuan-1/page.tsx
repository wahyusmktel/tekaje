"use client";

import { useState } from "react";
import Link from "next/link";
import LabImage from "@/components/LabImage";
import InteractiveLabTerminal from "@/components/InteractiveLabTerminal";
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
  Code2,
  Laptop,
  CheckSquare,
  FileText,
  AlertTriangle,
  Info,
  CheckCircle,
  FolderOpen,
  Camera,
} from "lucide-react";

interface Snippet {
  id: string;
  category: "all" | "prep" | "network" | "package" | "system";
  title: string;
  description: string;
  command: string;
  explanation: string;
}

export default function PertemuanSatuPage() {
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
      desc: "Menyinkronkan daftar katalog paket terbaru dari server mirror resmi Ubuntu",
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
      title: "Uji Koneksi Internet Lab",
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
      title: "Perintah Matikan Server Bersih",
      description: "Mematikan sistem operasi server secara aman sebelum mengambil snapshot checkpoint.",
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-sky-100 selection:text-sky-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
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
                  Mata Pelajaran: Cloud Computing &bull; Wahyu Rahmat Hidayat, S.Kom.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#hands-on-terminal"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-all shadow-xs"
            >
              <Terminal className="h-3.5 w-3.5 text-sky-600" />
              <span>Web Simulator Lab</span>
            </a>

            <a
              href="#panduan-praktikum"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 transition-all shadow-sm"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Panduan Hands-on</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO BANNER PERTEMUAN 1 */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200/80 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-sky-600">
              Wahyu Rahmat Hidayat
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/kelas/cloud-computing" className="hover:text-sky-600">
              Silabus Cloud Computing
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-sky-600 font-semibold">Pertemuan 01</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
                  Pertemuan 01
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                  Alokasi: 4 JP (180 Menit)
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                  Lab Komputer Mandiri
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Pengenalan Virtualisasi &amp; Persiapan Mesin Virtual Ubuntu Server 22.04 LTS
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                Modul ajar praktikum laboratorium komputer SMK Telkom Lampung.
                Siswa dibimbing untuk memahami arsitektur virtualisasi server, mengonfigurasi
                Oracle VM VirtualBox 7.x, menyiapkan file ISO Ubuntu Server 22.04 LTS,
                serta mengatur mode jaringan NAT dan pembuatan snapshot cadangan.
              </p>

              {/* Guide on screenshot files */}
              <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-900 flex items-start gap-2.5">
                <FolderOpen className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <b className="font-semibold">Info Lokasi File Gambar Tangkapan Layar (Screenshot):</b>
                  <p className="text-[11px] text-sky-800 mt-0.5">
                    Seluruh tangkapan layar praktikum di halaman ini tersimpan pada folder:{" "}
                    <code className="bg-white px-1.5 py-0.5 rounded border border-sky-200 font-mono text-sky-900">
                      public/images/cloud-computing/pertemuan-1/
                    </code>
                    . Jika file gambar tersedia, sistem otomatis menampilkannya secara langsung!
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Live Interactive Terminal */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-700/20 bg-slate-900 text-white shadow-xl shadow-slate-900/20 overflow-hidden">
                <div className="bg-slate-800/90 px-4 py-3 flex items-center justify-between border-b border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-500 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-amber-500 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500 inline-block" />
                    <span className="ml-2 font-mono text-xs text-slate-400">
                      wahyu@ubuntu-server: ~
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live Snippet</span>
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

                  <div className="rounded-lg bg-slate-950/60 p-3 text-[11px] text-slate-400 border border-slate-800/50">
                    <span className="text-sky-300 font-semibold">Trik Praktikum:</span> Siswa cukup
                    klik tombol <b>Salin</b> di atas, lalu tempelkan (paste) langsung ke konsol terminal
                    tanpa takut kesalahan ketik spasi atau tanda baca.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TUJUAN PEMBELAJARAN & SPESIFIKASI ALAT */}
      <section className="py-12 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Tujuan Pembelajaran */}
            <div className="md:col-span-6 p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-2 text-sky-700 font-bold text-sm">
                <Award className="h-5 w-5" />
                <span>🎯 Tujuan Pembelajaran Praktikum</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Siswa memahami konsep dasar Cloud Computing, Virtualisasi, dan peran Type-2 Hypervisor.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Siswa mampu menginstal dan mengonfigurasi software Oracle VM VirtualBox di komputer lab.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Siswa mampu menyiapkan file image ISO Ubuntu Server 22.04 LTS (64-bit).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Siswa mampu membuat VM baru dengan alokasi resource optimal (RAM 2GB, 2 CPU, Storage 25GB).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Siswa memahami karakteristik mode jaringan NAT dan Bridged Adapter pada server lab.</span>
                </li>
              </ul>
            </div>

            {/* Alat & Bahan */}
            <div className="md:col-span-6 p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                <Laptop className="h-5 w-5" />
                <span>🛠️ Alat dan Bahan Laboratorium Komputer</span>
              </div>
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="p-3 bg-white rounded-xl border border-slate-200/70 flex items-center justify-between">
                  <span className="font-semibold text-slate-800">Hardware Fisik:</span>
                  <span className="text-slate-600">Laptop / PC Lab (RAM min. 8GB disarankan, disk 30GB free)</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200/70 flex items-center justify-between">
                  <span className="font-semibold text-slate-800">Hypervisor Software:</span>
                  <span className="text-slate-600">Oracle VM VirtualBox versi 7.x + Extension Pack</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200/70 flex items-center justify-between">
                  <span className="font-semibold text-slate-800">Sistem Operasi:</span>
                  <span className="text-slate-600 font-mono">ubuntu-22.04.x-live-server-amd64.iso</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200/70 flex items-center justify-between">
                  <span className="font-semibold text-slate-800">Koneksi Lab:</span>
                  <span className="text-slate-600">Jaringan LAN / Wi-Fi Lab SMK Telkom Lampung</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DASAR TEORI & ARSITEKTUR VIRTUALISASI */}
      <section className="py-12 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Layers className="h-5 w-5 text-sky-600" />
              <span>💡 Dasar Teori: Mengapa Virtualisasi &amp; Ubuntu Server?</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Di dunia industri <b>Cloud Computing</b>, penyedia layanan (seperti AWS EC2, Google Cloud, atau DigitalOcean) membagi
              satu komputer server fisik besar menjadi ratusan server virtual mandiri menggunakan teknologi <b>Virtualisasi</b>.
              Dengan menggunakan <b>Oracle VirtualBox</b> di komputer lab kita, kita sedang menciptakan simulasi server cloud privat di komputer lokal.
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <b>Ubuntu Server 22.04 LTS</b> dipilih karena merupakan sistem operasi standar industri yang sangat stabil,
              didukung pembaruan jangka panjang (LTS), dan sangat efisien karena beroperasi tanpa antarmuka grafis desktop (CLI-only / Headless).
            </p>

            {/* Real Screenshot / Fallback Placeholder for Architecture */}
            <LabImage
              src="/images/cloud-computing/pertemuan-1/gambar1_arsitektur_virtualisasi.png"
              alt="Diagram Arsitektur Virtualisasi Type-2 Hypervisor"
              caption="Gambar 1.1: Diagram Arsitektur Virtualisasi Type-2 Hypervisor pada OS Host"
              placeholderGuide="Screenshot diagram arsitektur virtualisasi yang membedakan Host OS, Hypervisor VirtualBox, dan Guest OS Ubuntu Server."
              suggestedFileName="gambar1_arsitektur_virtualisasi.png"
            />
          </div>
        </div>
      </section>

      {/* INTERACTIVE HANDS-ON LAB WEB TERMINAL */}
      <section id="hands-on-terminal" className="py-14 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-1 block">
              Laboratorium Interaktif Berbasis Web
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Hands-on Lab Terminal Simulator
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Siswa dapat mempraktikkan perintah Ubuntu Server secara langsung di browser ini tanpa perlu instalasi awal.
              Selesaikan 5 misi praktikum berikut dan perhatikan validasi otomatisnya!
            </p>
          </div>

          <InteractiveLabTerminal />
        </div>
      </section>

      {/* 4 TAHAPAN PRAKTIKUM HANDS-ON DENGAN SCREENSHOT REAL */}
      <section id="panduan-praktikum" className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-2 block">
              Petunjuk Pelaksanaan
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Instruksi Praktikum Langkah demi Langkah
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Lakukan konfigurasi sesuai urutan tahap di bawah ini pada komputer laboratorium Anda.
            </p>
          </div>

          <div className="space-y-8">
            {/* Tahap 1 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="h-8 w-8 rounded-xl bg-sky-100 text-sky-700 font-extrabold flex items-center justify-center text-sm">
                    1
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                    Tahap 1: Verifikasi Fitur Virtualisasi CPU di Windows
                  </h3>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                  Task Manager &bull; BIOS VT-x / AMD-V
                </span>
              </div>

              <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li>
                  Tekan kombinasi tombol keyboard <code>Ctrl + Shift + Esc</code> untuk membuka <b>Task Manager</b>.
                </li>
                <li>
                  Pilih tab <b>Performance</b>, lalu klik menu <b>CPU</b> pada panel sebelah kiri.
                </li>
                <li>
                  Perhatikan informasi di pojok kanan bawah: Pastikan tertulis{" "}
                  <b className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Virtualization: Enabled
                  </b>.
                </li>
              </ol>

              {/* Screenshot / Placeholder Tahap 1 */}
              <LabImage
                src="/images/cloud-computing/pertemuan-1/gambar2_task_manager_vtx.png"
                alt="Screenshot Task Manager Virtualization Enabled"
                caption="Gambar 1.2: Memastikan status Virtualization: Enabled pada tab CPU Task Manager Windows"
                placeholderGuide="Tangkapan layar jendela Task Manager tab Performance -> CPU yang menunjukkan status 'Virtualization: Enabled' di pojok kanan bawah."
                suggestedFileName="gambar2_task_manager_vtx.png"
              />

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  ⚠️ <b>Catatan Guru:</b> Jika tertulis <b>Disabled</b>, segera laporkan ke guru pembimbing untuk
                  mengaktifkan fitur <b>Intel VT-x</b> atau <b>AMD-V</b> pada menu BIOS/UEFI laptop.
                </span>
              </div>
            </div>

            {/* Tahap 2 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="h-8 w-8 rounded-xl bg-indigo-100 text-indigo-700 font-extrabold flex items-center justify-center text-sm">
                    2
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                    Tahap 2: Pembuatan Mesin Virtual (VM) Baru
                  </h3>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-100 text-rose-800">
                  Wajib: Skip Unattended Install!
                </span>
              </div>

              <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li>Buka aplikasi <b>Oracle VM VirtualBox</b> di komputer lab.</li>
                <li>Klik tombol ikon <b>New (Baru)</b> pada toolbar atas.</li>
                <li>
                  Konfigurasikan formulir identitas VM:
                  <ul className="list-disc list-inside ml-6 mt-1.5 space-y-1 text-slate-600">
                    <li><b>Name:</b> <code>Ubuntu-Server-22.04</code></li>
                    <li><b>ISO Image:</b> Arahkan ke file <code>ubuntu-22.04.x-live-server-amd64.iso</code>.</li>
                    <li><b>Type:</b> <code>Linux</code> | <b>Version:</b> <code>Ubuntu (64-bit)</code></li>
                    <li>
                      <b className="text-rose-600">[WAJIB]:</b> Beri tanda centang pada opsi{" "}
                      <b>'Skip Unattended Installation'</b>!
                    </li>
                  </ul>
                </li>
                <li>
                  Alokasi Hardware:
                  <ul className="list-disc list-inside ml-6 mt-1.5 space-y-1 text-slate-600">
                    <li><b>Base Memory (RAM):</b> <code>2048 MB (2 GB)</code> (Zona hijau aman).</li>
                    <li><b>Processors (CPU):</b> <code>2 CPUs</code>.</li>
                  </ul>
                </li>
                <li>
                  Alokasi Penyimpanan:
                  <ul className="list-disc list-inside ml-6 mt-1.5 space-y-1 text-slate-600">
                    <li>Pilih <b>Create a Virtual Harddisk Now</b>.</li>
                    <li>Ukuran: <b>25.00 GB</b> (Dynamically Allocated VDI).</li>
                  </ul>
                </li>
                <li>Klik <b>Finish</b>.</li>
              </ol>

              {/* Screenshot / Placeholder Tahap 2 */}
              <LabImage
                src="/images/cloud-computing/pertemuan-1/gambar2_panduan_wizard_vm.png"
                alt="Form Wizard VM Ubuntu Server"
                caption="Gambar 1.3: Rincian Konfigurasi Formulir Wizard VM Ubuntu Server (VirtualBox 7.x)"
                placeholderGuide="Tangkapan layar form wizard pembuatan New VM di VirtualBox yang menunjukkan alokasi RAM 2048MB, 2 CPU, dan centang Skip Unattended."
                suggestedFileName="gambar2_panduan_wizard_vm.png"
              />
            </div>

            {/* Tahap 3 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="h-8 w-8 rounded-xl bg-teal-100 text-teal-700 font-extrabold flex items-center justify-center text-sm">
                    3
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                    Tahap 3: Pengecekan Pengaturan Storage &amp; Jaringan
                  </h3>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                  Settings &bull; Storage &bull; Network
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700">
                Klik kanan nama VM <code>Ubuntu-Server-22.04</code> &rarr; pilih <b>Settings (Pengaturan)</b>:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-xs mb-1">
                    💾 Menu Storage (Penyimpanan)
                  </h4>
                  <p className="text-xs text-slate-600">
                    Pastikan Controller IDE/SATA memuat icon optical disc yang mengarah pada berkas ISO installer Ubuntu Server.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-xs mb-1">
                    🌐 Menu Network (Jaringan)
                  </h4>
                  <p className="text-xs text-slate-600">
                    Pada <b>Adapter 1</b>, default adalah mode <b>NAT</b>. Mode ini memungkinkan VM langsung mengakses internet untuk kebutuhan download update apt.
                  </p>
                </div>
              </div>

              {/* Screenshot / Placeholder Tahap 3 */}
              <LabImage
                src="/images/cloud-computing/pertemuan-1/gambar3_konfigurasi_jaringan.png"
                alt="Skema Mode Jaringan NAT vs Bridged"
                caption="Gambar 1.4: Karakteristik Mode Jaringan NAT vs Bridged Adapter pada VirtualBox"
                placeholderGuide="Diagram atau screenshot menu Network Settings VirtualBox yang menampilkan opsi 'Attached to: NAT'."
                suggestedFileName="gambar3_konfigurasi_jaringan.png"
              />
            </div>

            {/* Tahap 4 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="h-8 w-8 rounded-xl bg-emerald-100 text-emerald-700 font-extrabold flex items-center justify-center text-sm">
                    4
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                    Tahap 4: Uji Coba Boot Pertama &amp; Pembuatan Snapshot
                  </h3>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  Checkpoint Selesai
                </span>
              </div>

              <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li>
                  Pilih VM <code>Ubuntu-Server-22.04</code> lalu klik tombol <b>Start (Mulai)</b>.
                </li>
                <li>
                  Pastikan jendela VM terbuka dan menampilkan menu bootloader <b>GNU GRUB</b> dengan opsi:{" "}
                  <code className="text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                    &gt; Try or Install Ubuntu Server
                  </code>.
                </li>
                <li>
                  <b>Checkpoint Selesai:</b> Tutup jendela VM &rarr; pilih <b>Power off the machine</b>.
                </li>
                <li>
                  Di menu VirtualBox, klik tab <b>Snapshots</b> &rarr; klik <b>Take</b> &rarr; Beri nama:{" "}
                  <code className="font-bold text-emerald-700">Ptm 1 - VM Ready Pre-Install</code>.
                </li>
              </ol>

              {/* Screenshot / Placeholder Tahap 4 */}
              <LabImage
                src="/images/cloud-computing/pertemuan-1/gambar5_grub_boot_snapshot.png"
                alt="Booting GNU GRUB dan Snapshot"
                caption="Gambar 1.5: Tampilan Bootloader GNU GRUB Ubuntu Server & Pengambilan Checkpoint Snapshot"
                placeholderGuide="Tangkapan layar jendela VM yang menampilkan menu GNU GRUB (> Try or Install Ubuntu Server) dan tab Snapshot di VirtualBox."
                suggestedFileName="gambar5_grub_boot_snapshot.png"
              />

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
                <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  ✅ <b>Luar Biasa!</b> Lingkungan virtualisasi Ubuntu Server Anda sudah 100% siap. Silakan ambil 4
                  screenshot bukti praktikum untuk diverifikasi pada penilaian tugas.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SINTAKS CHEATSHEET UBUNTU DENGAN TOMBOL SALIN */}
      <section id="cheatsheet" className="py-16 md:py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-2 block">
              Library Perintah Siswa
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Cheatsheet Perintah CLI Ubuntu Server
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Gunakan tombol <b>"Salin"</b> di bawah untuk menyalin sintaks perintah langsung ke clipboard.
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

      {/* 6 ALUR BELAJAR SISWA */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2 block">
              Kurikulum Standar Industri
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              6 Tahapan Pembelajaran Mandiri
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Alur belajar mandiri terstruktur dari Pre-Test hingga penerbitan sertifikat digital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningSteps.map((step) => (
              <div
                key={step.step}
                className="rounded-2xl bg-white border border-slate-200 p-6 relative hover:shadow-lg transition-all flex flex-col justify-between"
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
                  <span>Tahap Wajib Pertemuan 1</span>
                  <CheckCircle2 className="h-4 w-4 ml-auto text-emerald-500" />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation to Syllabus / Back */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/kelas/cloud-computing"
              className="inline-flex items-center gap-2 text-xs font-semibold text-sky-600 hover:text-sky-500"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali ke Silabus Lengkap Cloud Computing</span>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-700"
            >
              <span>Halaman Utama Portal Guru</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto bg-slate-950 text-slate-400 text-xs border-t border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Cloud className="h-4 w-4 text-sky-400" />
            <span>Pertemuan 01 &bull; Kelas Cloud Computing &bull; Wahyu Rahmat Hidayat, S.Kom.</span>
          </div>
          <p className="text-[11px] text-slate-500">
            SMK Telkom Lampung &bull; Teknik Jaringan Komputer &amp; Telekomunikasi
          </p>
        </div>
      </footer>
    </div>
  );
}
