"use client";

import { useState } from "react";
import Link from "next/link";
import LabImage from "@/components/LabImage";
import InteractiveLabTerminalPtm2 from "@/components/InteractiveLabTerminalPtm2";
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
  Camera,
  Key,
  Database,
  Lock,
} from "lucide-react";

interface Snippet {
  id: string;
  category: "all" | "system" | "storage" | "ssh" | "user";
  title: string;
  description: string;
  command: string;
  explanation: string;
}

export default function PertemuanDuaPage() {
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
      title: "Cek Hostname & Identitas OS",
      desc: "Menampilkan rilis Ubuntu Server 22.04 LTS dan nama static hostname yang baru dikonfigurasi",
      command: "hostnamectl",
      env: "Ubuntu Server 22.04 LTS (CLI)",
    },
    {
      title: "Inspeksi Blok Partisi Disk",
      desc: "Melihat struktur hierarki partisi storage LVM dan titik pasang root (/)",
      command: "lsblk",
      env: "Ubuntu Server 22.04 LTS (CLI)",
    },
    {
      title: "Cek Status OpenSSH Server",
      desc: "Memastikan service SSH aktif (running) pada port 22 untuk remote manajemen",
      command: "sudo systemctl status ssh",
      env: "Ubuntu Server 22.04 LTS (CLI)",
    },
    {
      title: "Cek Informasi User & Grup Sudo",
      desc: "Memverifikasi user admin non-root memiliki hak akses sudo (super user)",
      command: "id",
      env: "Ubuntu Server 22.04 LTS (CLI)",
    },
  ];

  const snippetsList: Snippet[] = [
    {
      id: "sys-1",
      category: "system",
      title: "Tampilkan Rilis & Arsitektur OS",
      description: "Menampilkan versi detail Ubuntu Jammy Jellyfish 64-bit yang terpasang.",
      command: "cat /etc/os-release",
      explanation:
        "File /etc/os-release memuat identitas distribusi Linux resmi, codename, dan versi kernel yang sedang berjalan.",
    },
    {
      id: "sys-2",
      category: "system",
      title: "Cek Waktu Uptime Sejak First Boot",
      description: "Melihat berapa lama server telah aktif dan rata-rata beban sistem (load average).",
      command: "uptime",
      explanation:
        "Output menampilkan jam saat ini, lama server hidup, jumlah user login aktif, dan load average 1, 5, dan 15 menit.",
    },
    {
      id: "stor-1",
      category: "storage",
      title: "Pemeriksaan Hierarki Partisi LVM",
      description: "Melihat skema disk sda, partisi sda1, sda2 (/boot), dan volume group LVM.",
      command: "lsblk",
      explanation:
        "Perintah 'lsblk' (list block devices) menampilkan semua media penyimpanan dalam bentuk pohon hierarki partisi.",
    },
    {
      id: "stor-2",
      category: "storage",
      title: "Cek Sisa Ruang Penyimpanan Root (/)",
      description: "Memastikan partisi root memiliki ruang kosong yang cukup untuk paket aplikasi.",
      command: "df -h /",
      explanation:
        "Opsi '-h' menampilkan ukuran dalam Megabyte (M) atau Gigabyte (G) yang mudah dianalisis oleh siswa.",
    },
    {
      id: "ssh-1",
      category: "ssh",
      title: "Pemeriksaan Status Service OpenSSH",
      description: "Memverifikasi daemon SSH berjalan lancar dan siap menerima koneksi remote.",
      command: "sudo systemctl status ssh",
      explanation:
        "Mengecek apakah unit service ssh.service berstatus 'active (running)' dan mendengarkan koneksi port 22.",
    },
    {
      id: "ssh-2",
      category: "ssh",
      title: "Restart Layanan SSH Server",
      description: "Merestart daemon SSH saat ada perubahan konfigurasi pada /etc/ssh/sshd_config.",
      command: "sudo systemctl restart ssh",
      explanation:
        "Memuat ulang service SSH secara bersih tanpa perlu mematikan atau mereboot seluruh sistem operasi server.",
    },
    {
      id: "user-1",
      category: "user",
      title: "Verifikasi ID & Keanggotaan Grup Sudo",
      description: "Membuktikan bahwa user siswa memiliki privilege administratif sudo.",
      command: "id",
      explanation:
        "Memeriksa apakah terdapat angka grup '27(sudo)' pada atribut pengguna yang baru dibuat saat instalasi.",
    },
    {
      id: "user-2",
      category: "user",
      title: "Uji Perintah Hak Akses Root Sudo",
      description: "Menampilkan daftar hak istimewa (privileges) yang diizinkan untuk akun user.",
      command: "sudo -l",
      explanation:
        "Perintah 'sudo -l' memvalidasi apakah user diizinkan menjalankan perintah root dengan memasukkan password sendiri.",
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
      desc: "Uji diagnostik mengenai konsep text installer, skema partisi LVM, dan peran SSH Server.",
      tag: "Diagnostik",
      color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    {
      step: "02",
      title: "Modul Teori",
      desc: "Mengenal arsitektur installer Subiquity, sistem file Ext4, dan konsep non-root security.",
      tag: "Pemahaman",
      color: "bg-sky-50 text-sky-700 border-sky-200",
    },
    {
      step: "03",
      title: "Hands-on Install",
      desc: "Praktik instalasi Ubuntu Server 22.04 LTS dari awal hingga proses first login di VirtualBox.",
      tag: "Praktikum",
      color: "bg-teal-50 text-teal-700 border-teal-200",
    },
    {
      step: "04",
      title: "Verifikasi Bukti",
      desc: "Pengumpulan 4 screenshot bukti (Storage layout, profile setup, OpenSSH, dan login terminal).",
      tag: "Portofolio",
      color: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      step: "05",
      title: "Post-Test Evaluasi",
      desc: "Uji evaluasi pemahaman pasca instalasi dengan target minimal skor kelulusan 75.",
      tag: "Evaluasi",
      color: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      step: "06",
      title: "Validasi Snapshot",
      desc: "Pembuatan checkpoint snapshot cadangan 'Ptm 2 - OS Installed Base System' di VirtualBox.",
      tag: "Keamanan",
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
  ];

  const faqs = [
    {
      q: "Mengapa disarankan memilih mirror arsip lokal Indonesia saat instalasi?",
      a: "Memilih alamat mirror lokal seperti 'http://id.archive.ubuntu.com/ubuntu' membuat proses unduh pembaruan paket sistem menjadi jauh lebih cepat dan hemat latensi jaringan internet di lab sekolah.",
    },
    {
      q: "Apa keuntungan memilih skema partisi LVM (Logical Volume Manager)?",
      a: "LVM memberikan fleksibilitas luar biasa di mana ukuran partisi virtual harddisk dapat diperbesar atau diperkecil secara dinamis di masa depan tanpa perlu memformat ulang sistem operasi server.",
    },
    {
      q: "Mengapa kita tidak boleh menggunakan nama user 'root' saat mengisi formulir profil?",
      a: "Di sistem operasi Linux modern, pembuatan akun user biasa (non-root) yang dimasukkan ke dalam grup 'sudo' adalah standar keamanan industri (Principle of Least Privilege) untuk mencegah salah eksekusi perintah berbahaya.",
    },
    {
      q: "Apa yang harus dilakukan jika setelah reboot muncul tulisan 'Please remove the installation medium'?",
      a: "Tekan tombol Enter pada keyboard. VirtualBox biasanya akan melepas berkas ISO secara otomatis. Jika masih looping masuk ke menu install, buka menu Devices -> Optical Drives -> Remove disk from virtual drive.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
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
                  Mata Pelajaran: Cloud Computing &bull; Wahyu Rahmat Hidayat, S.Kom.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#hands-on-terminal-2"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-all shadow-xs"
            >
              <Terminal className="h-3.5 w-3.5 text-indigo-600" />
              <span>Web Simulator Lab</span>
            </a>

            <a
              href="#panduan-praktikum"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-sm"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Panduan Instalasi</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO BANNER PERTEMUAN 2 */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200/80 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-indigo-600">
              Wahyu Rahmat Hidayat
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/kelas/cloud-computing" className="hover:text-indigo-600">
              Silabus Cloud Computing
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-indigo-600 font-semibold">Pertemuan 02</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider">
                  Pertemuan 02
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                  Alokasi: 4 JP (180 Menit)
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                  Lab Komputer Mandiri
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Instalasi Sistem Operasi Ubuntu Server 22.04 LTS (CLI Mode) &amp; Partisi Storage
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                Panduan praktikum langkah demi langkah menjalankan proses instalasi OS server nyata di VirtualBox:
                navigasi installer Subiquity, konfigurasi partisi disk LVM, pembuatan akun admin non-root,
                pemasangan paket OpenSSH Server, hingga berhasil melakukan first login ke konsol CLI.
              </p>

              {/* Guide on screenshot files for Pertemuan 2 */}
              <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 flex items-start gap-2.5">
                <FolderOpen className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <b className="font-semibold">Info Lokasi File Gambar Screenshot Pertemuan 2:</b>
                  <p className="text-[11px] text-indigo-800 mt-0.5">
                    Tangkapan layar praktikum pada halaman ini diletakkan pada direktori:{" "}
                    <code className="bg-white px-1.5 py-0.5 rounded border border-indigo-200 font-mono text-indigo-900">
                      public/images/cloud-computing/pertemuan-2/
                    </code>
                    . Jika file gambar sudah kamu letakkan di folder tersebut, gambar akan langsung muncul otomatis!
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Live Interactive Terminal Snippet */}
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
                    <span>OS Installed</span>
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
                          ? "bg-slate-900 text-indigo-400 border-t-2 border-indigo-400 font-semibold"
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
                          `hero-ptm2-${activeHeroTab}`,
                          heroSnippets[activeHeroTab].command
                        )
                      }
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                        copiedId === `hero-ptm2-${activeHeroTab}`
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700"
                      }`}
                      title="Salin ke clipboard"
                    >
                      {copiedId === `hero-ptm2-${activeHeroTab}` ? (
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
                    <span className="text-indigo-300 font-semibold">Trik Siswa:</span> Salin perintah
                    di atas untuk memverifikasi apakah instalasi Ubuntu Server di VirtualBox telah berhasil 100%.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TUJUAN PEMBELAJARAN & SPESIFIKASI */}
      <section className="py-12 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Tujuan Pembelajaran */}
            <div className="md:col-span-6 p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                <Award className="h-5 w-5" />
                <span>🎯 Tujuan Pembelajaran Pertemuan 2</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Siswa mampu menavigasi menu text-based installer Subiquity Ubuntu Server.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Siswa memahami skema partisi Logical Volume Manager (LVM) dan mount point root (/).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Siswa mampu membuat akun user administrator dengan privilege sudo secara aman.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Siswa mampu mengaktifkan paket OpenSSH Server untuk kebutuhan remote lab.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Siswa berhasil melakukan first boot, first login, dan menyimpan snapshot 'Ptm 2'.</span>
                </li>
              </ul>
            </div>

            {/* Alat & Prasyarat */}
            <div className="md:col-span-6 p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-2 text-sky-700 font-bold text-sm">
                <Laptop className="h-5 w-5" />
                <span>🛠️ Prasyarat &amp; Kelengkapan Lab Pertemuan 2</span>
              </div>
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="p-3 bg-white rounded-xl border border-slate-200/70 flex items-center justify-between">
                  <span className="font-semibold text-slate-800">Mesin Virtual Host:</span>
                  <span className="text-slate-600">VM 'Ubuntu-Server-22.04' yang dibuat pada Pertemuan 1</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200/70 flex items-center justify-between">
                  <span className="font-semibold text-slate-800">Optical Media:</span>
                  <span className="text-slate-600 font-mono">ubuntu-22.04.x-live-server-amd64.iso</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200/70 flex items-center justify-between">
                  <span className="font-semibold text-slate-800">Konektivitas Lab:</span>
                  <span className="text-slate-600">Adapter 1 (NAT) aktif untuk unduh update keamanan</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200/70 flex items-center justify-between">
                  <span className="font-semibold text-slate-800">Snapshot Awal:</span>
                  <span className="text-slate-600 font-mono">Ptm 1 - VM Ready Pre-Install</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE HANDS-ON WEB LAB TERMINAL PERTEMUAN 2 */}
      <section id="hands-on-terminal-2" className="py-14 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1 block">
              Laboratorium Interaktif Berbasis Web
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Hands-on Lab Terminal Simulator Pertemuan 2
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Praktikkan perintah verifikasi pasca-instalasi langsung di browser.
              Selesaikan 5 misi praktikum berikut untuk memvalidasi hostname, partisi LVM, dan service OpenSSH!
            </p>
          </div>

          <InteractiveLabTerminalPtm2 />
        </div>
      </section>

      {/* 5 TAHAPAN PRAKTIKUM HANDS-ON INSTALASI */}
      <section id="panduan-praktikum" className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2 block">
              Petunjuk Pelaksanaan
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              5 Tahapan Instalasi Ubuntu Server 22.04 LTS
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Nyalakan VM Anda di VirtualBox, lalu ikuti panduan formulir instalasi di bawah ini secara teliti.
            </p>
          </div>

          <div className="space-y-8">
            {/* Tahap 1 */}
            <div className="bg-slate-50/70 rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <span className="h-8 w-8 rounded-xl bg-indigo-100 text-indigo-700 font-extrabold flex items-center justify-center text-sm">
                    1
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                    Tahap 1: Inisialisasi Booting &amp; Pemilihan Bahasa (Subiquity)
                  </h3>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white text-slate-700 border border-slate-200">
                  GNU GRUB &bull; English
                </span>
              </div>

              <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li>
                  Klik tombol <b>Start (Mulai)</b> pada VM <code>Ubuntu-Server-22.04</code> di VirtualBox.
                </li>
                <li>
                  Pada menu GNU GRUB, tekan tombol <b>Enter</b> pada pilihan:{" "}
                  <code className="text-indigo-700 font-bold bg-white px-2 py-0.5 rounded border border-indigo-200">
                    Try or Install Ubuntu Server
                  </code>.
                </li>
                <li>
                  Tunggu proses loading kernel hingga muncul layar text installer <b>Subiquity</b>.
                </li>
                <li>
                  Pilih bahasa sistem: <b>English</b> &rarr; Tekan <b>Enter</b>.
                </li>
                <li>
                  Jika muncul prompt pembaruan installer <i>"Installer update available"</i>, pilih{" "}
                  <b>Continue without updating</b> agar proses praktikum lab berjalan cepat.
                </li>
                <li>
                  Pada konfigurasi Keyboard Layout, biarkan default: <b>Layout: English (US)</b> &rarr; Pilih <b>Done</b>.
                </li>
              </ol>

              {/* Screenshot / Placeholder Tahap 1 */}
              <LabImage
                src="/images/cloud-computing/pertemuan-2/gambar1_subiquity_welcome.png"
                alt="Tampilan Welcome Subiquity Installer Ubuntu Server"
                caption="Gambar 2.1: Tampilan awal pemilihan bahasa pada text installer Subiquity"
                placeholderGuide="Tangkapan layar jendela VirtualBox yang menampilkan menu awal pemilihan bahasa 'English' dan keyboard layout installer Ubuntu Server."
                suggestedFileName="gambar1_subiquity_welcome.png"
              />
            </div>

            {/* Tahap 2 */}
            <div className="bg-slate-50/70 rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <span className="h-8 w-8 rounded-xl bg-sky-100 text-sky-700 font-extrabold flex items-center justify-center text-sm">
                    2
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                    Tahap 2: Konfigurasi Jaringan &amp; Mirror Arsip Indonesia
                  </h3>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white text-slate-700 border border-slate-200">
                  DHCP (enp0s3) &bull; Archive Mirror
                </span>
              </div>

              <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li>
                  Pada menu <b>Network connections</b>, pastikan antarmuka <code>enp0s3</code> telah mendapatkan IP dari DHCP NAT (misal: <code>10.0.2.15/24</code>).
                </li>
                <li>Pilih <b>Done</b> untuk melanjutkan.</li>
                <li>Pada menu <b>Configure proxy</b>, biarkan kosong &rarr; Pilih <b>Done</b>.</li>
                <li>
                  Pada menu <b>Configure Ubuntu archive mirror</b>, pastikan alamat mirror terisi:{" "}
                  <code className="text-sky-700 font-mono bg-white px-2 py-0.5 rounded border border-sky-200">
                    http://id.archive.ubuntu.com/ubuntu
                  </code>{" "}
                  atau server mirror resmi &rarr; Pilih <b>Done</b>.
                </li>
              </ol>

              {/* Screenshot / Placeholder Tahap 2 */}
              <LabImage
                src="/images/cloud-computing/pertemuan-2/gambar2_network_mirror.png"
                alt="Konfigurasi Network and Mirror Address"
                caption="Gambar 2.2: Pemeriksaan IP DHCP NAT pada interface enp0s3 dan mirror arsip lokal"
                placeholderGuide="Tangkapan layar menu Network Connections Subiquity yang menunjukkan IP DHCP dan form konfigurasi archive mirror lokal."
                suggestedFileName="gambar2_network_mirror.png"
              />
            </div>

            {/* Tahap 3 */}
            <div className="bg-slate-50/70 rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <span className="h-8 w-8 rounded-xl bg-teal-100 text-teal-700 font-extrabold flex items-center justify-center text-sm">
                    3
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                    Tahap 3: Konfigurasi Partisi Storage (Guided Storage &amp; LVM)
                  </h3>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-100 text-teal-800">
                  LVM 25 GB VDI
                </span>
              </div>

              <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li>
                  Pada menu <b>Guided storage configuration</b>, pilih opsi:{" "}
                  <b>Use an entire disk</b>.
                </li>
                <li>
                  Pastikan disk <code>VBOX HARDDISK (25.000GB)</code> terpilih.
                </li>
                <li>
                  Pastikan opsi <b>Set up this disk as an LVM group</b> tercentang <code>[X]</code>.
                </li>
                <li>Pilih <b>Done</b>.</li>
                <li>
                  Pada ringkasan <b>Storage configuration</b>, periksa struktur partisi:
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-slate-600">
                    <li>Partisi <code>/boot</code> (~2.0 GB format ext4)</li>
                    <li>Logical Volume <code>/</code> (root mount point)</li>
                  </ul>
                </li>
                <li>Pilih <b>Done</b> &rarr; Pada kotak dialog konfirmasi <i>"Continue with destructive action?"</i>, pilih <b>Continue</b>.</li>
              </ol>

              {/* Screenshot / Placeholder Tahap 3 */}
              <LabImage
                src="/images/cloud-computing/pertemuan-2/gambar3_storage_layout_lvm.png"
                alt="Storage Configuration LVM Layout"
                caption="Gambar 2.3: Skema partisi disk LVM pada harddisk virtual 25 GB"
                placeholderGuide="Tangkapan layar halaman Guided Storage Configuration yang menampilkan opsi 'Use an entire disk' dan 'Set up as an LVM group'."
                suggestedFileName="gambar3_storage_layout_lvm.png"
              />
            </div>

            {/* Tahap 4 */}
            <div className="bg-slate-50/70 rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <span className="h-8 w-8 rounded-xl bg-purple-100 text-purple-700 font-extrabold flex items-center justify-center text-sm">
                    4
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                    Tahap 4: Pengaturan Profil Admin &amp; Pemilihan Paket OpenSSH Server
                  </h3>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-800">
                  Admin Sudo &bull; OpenSSH [X]
                </span>
              </div>

              <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li>
                  Isi formulir identitas <b>Profile setup</b> sesuai instruksi laboratorium:
                  <ul className="list-disc list-inside ml-6 mt-1.5 space-y-1 text-slate-600">
                    <li><b>Your name:</b> Nama Lengkap Siswa</li>
                    <li><b>Your server's name:</b> <code>ubuntu-server</code></li>
                    <li><b>Pick a username:</b> <code>wahyu</code> (atau nama panggilan siswa)</li>
                    <li><b>Choose a password:</b> Password kuat (misal: <code>smktelkom2026</code>)</li>
                    <li><b>Confirm your password:</b> Ketik ulang password yang sama</li>
                  </ul>
                </li>
                <li>Pilih <b>Done</b>.</li>
                <li>
                  Pada menu <b>Upgrade to Ubuntu Pro</b>, pilih <b>Skip for now</b> &rarr; Pilih <b>Done</b>.
                </li>
                <li>
                  <b className="text-indigo-700">[WAJIB]:</b> Pada menu <b>SSH Setup</b>, beri tanda centang pada opsi{" "}
                  <b>[X] Install OpenSSH server</b> menggunakan tombol Spacebar.
                </li>
                <li>Pilih <b>Done</b>.</li>
                <li>Pada menu <b>Featured Server Snaps</b>, jangan centang paket tambahan apapun &rarr; Pilih <b>Done</b>.</li>
              </ol>

              {/* Screenshot / Placeholder Tahap 4 */}
              <LabImage
                src="/images/cloud-computing/pertemuan-2/gambar4_profile_setup_ssh.png"
                alt="Profile Setup and OpenSSH Server Checkbox"
                caption="Gambar 2.4: Pengisian form profil admin server dan centang wajib paket OpenSSH server"
                placeholderGuide="Tangkapan layar halaman Profile Setup (Your name, hostname, username, password) dan halaman SSH Setup centang [X] Install OpenSSH server."
                suggestedFileName="gambar4_profile_setup_ssh.png"
              />
            </div>

            {/* Tahap 5 */}
            <div className="bg-slate-50/70 rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <span className="h-8 w-8 rounded-xl bg-emerald-100 text-emerald-700 font-extrabold flex items-center justify-center text-sm">
                    5
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                    Tahap 5: Finalisasi Instalasi, Eject ISO, Reboot, &amp; First Login
                  </h3>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  Reboot &bull; Checkpoint Snapshot
                </span>
              </div>

              <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li>
                  Tunggu proses instalasi paket dasar dan pembaruan keamanan selesai (tanda: muncul tombol <b>Reboot Now</b> di bawah).
                </li>
                <li>
                  Pilih tombol <b>Reboot Now</b>.
                </li>
                <li>
                  Jika muncul teks <i>"Please remove the installation medium, then press ENTER"</i>, tekan tombol <b>Enter</b> pada keyboard.
                </li>
                <li>
                  Sistem akan melakukan booting dari virtual harddisk. Tunggu hingga muncul login prompt:{" "}
                  <code className="text-emerald-700 font-bold bg-white px-2 py-0.5 rounded border border-emerald-200">
                    ubuntu-server login:
                  </code>.
                </li>
                <li>
                  Masukkan username dan password admin yang telah dibuat saat tahap 4.
                </li>
                <li>
                  <b>Simpan Snapshot Penting:</b> Matikan server dengan perintah <code>sudo poweroff</code> &rarr;
                  Buka tab <b>Snapshots</b> di VirtualBox &rarr; Klik <b>Take</b> &rarr; Beri nama:{" "}
                  <code className="font-bold text-indigo-700">Ptm 2 - OS Installed Base System</code>.
                </li>
              </ol>

              {/* Screenshot / Placeholder Tahap 5 */}
              <LabImage
                src="/images/cloud-computing/pertemuan-2/gambar5_first_login_prompt.png"
                alt="First Login Prompt Ubuntu Server CLI"
                caption="Gambar 2.5: Keberhasilan First Login pada konsol CLI terminal Ubuntu Server 22.04 LTS"
                placeholderGuide="Tangkapan layar jendela VirtualBox setelah berhasil login menampilkan motd 'Welcome to Ubuntu 22.04 LTS' dan prompt 'username@hostname:~$'"
                suggestedFileName="gambar5_first_login_prompt.png"
              />

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
                <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  ✅ <b>Hebat Sekali!</b> Sistem operasi Ubuntu Server 22.04 LTS Anda sudah terinstal sempurna.
                  Silakan ambil 4 screenshot bukti instalasi untuk diunggah pada lembar portofolio tugas.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SINTAKS CHEATSHEET PASCA INSTALASI */}
      <section id="cheatsheet" className="py-16 md:py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2 block">
              Library Perintah Pertemuan 2
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Cheatsheet Perintah Pasca-Instalasi Siswa
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Gunakan tombol <b>"Salin"</b> di bawah untuk menyalin sintaks perintah langsung ke clipboard.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {[
                { id: "all", label: "Semua Perintah" },
                { id: "system", label: "Sistem & Uptime" },
                { id: "storage", label: "Partisi Storage (LVM)" },
                { id: "ssh", label: "Layanan OpenSSH" },
                { id: "user", label: "User & Privilege Sudo" },
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeCategory === category.id
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-white hover:bg-slate-100 text-slate-600 border border-slate-200"
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
                className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-indigo-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {item.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">{item.description}</p>

                  <div className="rounded-xl bg-slate-900 p-3.5 border border-slate-800 text-white flex items-center justify-between gap-3">
                    <div className="font-mono text-xs overflow-x-auto text-indigo-300 py-0.5">
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
                          <Copy className="h-3.5 w-3.5 text-indigo-400" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-slate-100 text-[11px] text-slate-500 leading-normal">
                  <b className="text-slate-700">Penjelasan Teknis:</b> {item.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 ALUR BELAJAR SISWA PERTEMUAN 2 */}
      <section className="py-16 md:py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2 block">
              Kurikulum Vokasi Terstruktur
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              6 Tahapan Pembelajaran Pertemuan 2
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Selesaikan alur praktikum mandiri hingga pembuatan snapshot cadangan sistem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningSteps.map((step) => (
              <div
                key={step.step}
                className="rounded-2xl bg-slate-50 border border-slate-200 p-6 relative hover:shadow-lg transition-all flex flex-col justify-between"
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

                <div className="mt-5 pt-4 border-t border-slate-200/60 flex items-center text-xs font-semibold text-indigo-600">
                  <span>Tahap Wajib Pertemuan 2</span>
                  <CheckCircle2 className="h-4 w-4 ml-auto text-emerald-500" />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation between Meetings */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <Link
              href="/kelas/cloud-computing/pertemuan-1"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-indigo-600"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali ke Pertemuan 01</span>
            </Link>

            <Link
              href="/kelas/cloud-computing"
              className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 hover:text-indigo-500 font-medium"
            >
              <span>Lihat Silabus Lengkap Cloud Computing</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto bg-slate-950 text-slate-400 text-xs border-t border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Server className="h-4 w-4 text-indigo-400" />
            <span>Pertemuan 02 &bull; Kelas Cloud Computing &bull; Wahyu Rahmat Hidayat, S.Kom.</span>
          </div>
          <p className="text-[11px] text-slate-500">
            SMK Telkom Lampung &bull; Teknik Jaringan Komputer &amp; Telekomunikasi
          </p>
        </div>
      </footer>
    </div>
  );
}
