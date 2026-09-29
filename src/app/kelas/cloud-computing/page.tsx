"use client";

import Link from "next/link";
import {
  Cloud,
  Layers,
  Server,
  ArrowLeft,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
  Laptop,
  Lock,
  ArrowRight,
  GraduationCap,
  Sparkles,
  FileText,
  UserCheck,
} from "lucide-react";

export default function CloudComputingSyllabusPage() {
  const syllabusList = [
    {
      pertemuan: 1,
      title: "Pengenalan Virtualisasi & Persiapan VM Ubuntu Server 22.04 LTS",
      alokasi: "4 JP (180 Menit)",
      status: "Aktif",
      statusColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      description:
        "Memahami dasar arsitektur Cloud Computing industri, konsep Type-2 Hypervisor, pembuatan VM baru di Oracle VirtualBox (RAM 2GB, 2 CPU, Disk 25GB), trik Skip Unattended, mode jaringan NAT, serta pengujian boot GRUB dan snapshot checkpoint.",
      href: "/kelas/cloud-computing/pertemuan-1",
      topics: [
        "Dasar Teori Virtualisasi & Type-2 Hypervisor",
        "Pemeriksaan Intel VT-x / AMD-V di Task Manager",
        "Formulir Wizard VM VirtualBox 7.x",
        "Analisis Karakteristik Jaringan NAT vs Bridged",
        "Uji Coba First Boot & Checkpoint Snapshot",
      ],
      active: true,
    },
    {
      pertemuan: 2,
      title: "Instalasi Sistem Operasi Ubuntu Server 22.04 LTS (CLI Mode) & Partisi",
      alokasi: "4 JP (180 Menit)",
      status: "Aktif",
      statusColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      description:
        "Langkah demi langkah instalasi OS Ubuntu Server headless tanpa GUI, pemilihan konfigurasi bahasa, partisi disk (LVM vs Standard), pembuatan akun admin server, dan instalasi paket dasar OpenSSH.",
      href: "/kelas/cloud-computing/pertemuan-2",
      topics: [
        "Navigasi Text-based Installer Ubuntu Subiquity",
        "Skema Partisi Penyimpanan Root (/) & Swap",
        "Pengaturan Akun Non-Root & Sudoers",
        "First Login ke Command Line Interface (CLI)",
      ],
      active: true,
    },
    {
      pertemuan: 3,
      title: "Konfigurasi Jaringan Server (Static IP, Netplan & DNS Resolver)",
      alokasi: "4 JP (180 Menit)",
      status: "Segera Hadir",
      statusColor: "bg-slate-100 text-slate-600 border-slate-200",
      description:
        "Manajemen antarmuka jaringan Linux modern menggunakan Netplan (format YAML), penetapan IP statis lab, konfigurasi gateway default, serta pengujian resolusi nama DNS.",
      href: "#",
      topics: [
        "Struktur File Konfigurasi Netplan (/etc/netplan/)",
        "Sintaks YAML Indentasi & Format IP CIDR",
        "Perintah 'netplan apply' & Troubleshooting",
        "Verifikasi Konektivitas Menggunakan Ping & Tracepath",
      ],
      active: false,
    },
    {
      pertemuan: 4,
      title: "Remote Management Server dengan OpenSSH & Hardening Keamanan",
      alokasi: "4 JP (180 Menit)",
      status: "Segera Hadir",
      statusColor: "bg-slate-100 text-slate-600 border-slate-200",
      description:
        "Mengelola server Linux dari jarak jauh menggunakan terminal SSH, pembuatan Key Pair (Public & Private Key), konfigurasi port SSH non-standar, serta menonaktifkan autentikasi password root.",
      href: "#",
      topics: [
        "Arsitektur Remote Protocol OpenSSH",
        "Generate Kunci SSH (ssh-keygen ed25519)",
        "Konfigurasi File /etc/ssh/sshd_config",
        "Firewall UFW untuk Proteksi Akses Masuk Port",
      ],
      active: false,
    },
    {
      pertemuan: 5,
      title: "Implementasi Web Server Nginx & Analisis Layanan HTTP/HTTPS",
      alokasi: "4 JP (180 Menit)",
      status: "Segera Hadir",
      statusColor: "bg-slate-100 text-slate-600 border-slate-200",
      description:
        "Instalasi dan konfigurasi server web performa tinggi Nginx, pembuatan Server Block (Virtual Host), manajemen direktori web `/var/www/`, dan deployment halaman web statis pertama.",
      href: "#",
      topics: [
        "Instalasi Nginx via APT Package Manager",
        "Manajemen Service (systemctl start, enable, status)",
        "Konfigurasi Virtual Host & DocumentRoot",
        "Pengujian Akses Web melalui Browser Komputer Host",
      ],
      active: false,
    },
    {
      pertemuan: 6,
      title: "Database Server MariaDB & Manajemen Basis Data Relasional",
      alokasi: "4 JP (180 Menit)",
      status: "Segera Hadir",
      statusColor: "bg-slate-100 text-slate-600 border-slate-200",
      description:
        "Instalasi sistem basis data MariaDB, pengamanan instalasi dengan mysql_secure_installation, pembuatan database, hak akses user, serta pencadangan berkas basis data (mysqldump).",
      href: "#",
      topics: [
        "Instalasi MariaDB Server & Hardening Awal",
        "Perintah SQL Dasar (CREATE, GRANT, FLUSH PRIVILEGES)",
        "Manajemen Akses User Khusus Aplikasi",
        "Backup & Restore Database SQL di Terminal",
      ],
      active: false,
    },
    {
      pertemuan: 7,
      title: "Review Praktikum & Evaluasi Tengah Semester (UTS) Cloud Lab",
      alokasi: "4 JP (180 Menit)",
      status: "Segera Hadir",
      statusColor: "bg-slate-100 text-slate-600 border-slate-200",
      description:
        "Sesi uji performa dan kemampuan troubleshooting mandiri di laboratorium: diagnosa server down, pemulihan snapshot cadangan, dan validasi seluruh layanan jaringan yang telah dibangun.",
      href: "#",
      topics: [
        "Simulasi Troubleshooting Kasus Server Crash",
        "Uji Kinerja Jaringan & Response Time Web Server",
        "Penilaian Kinerja Portofolio Lab Mandiri",
      ],
      active: false,
    },
    {
      pertemuan: 8,
      title: "Pengenalan Containerization & Docker Engine pada Cloud Server",
      alokasi: "4 JP (180 Menit)",
      status: "Segera Hadir",
      statusColor: "bg-slate-100 text-slate-600 border-slate-200",
      description:
        "Mengenal teknologi komputasi awan modern: perbedaan mendasar Virtual Machine vs Docker Container, instalasi Docker CE di Ubuntu Server, serta menjalankan container pertama.",
      href: "#",
      topics: [
        "Konsep Kontainer & Ekosistem Docker Hub",
        "Instalasi Docker Engine & Docker Compose",
        "Menjalankan Container Nginx Port Mapping",
        "Manajemen Lifecycle Container (run, stop, ps, rm)",
      ],
      active: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-sky-100 selection:text-sky-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-sky-600 transition-colors mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Portal Guru</span>
            </Link>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-sky-500 flex items-center justify-center text-white shadow-sm shadow-sky-500/20">
                <Cloud className="h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm sm:text-base tracking-tight">
                  Kelas Cloud Computing
                </span>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  SMK Telkom Lampung &bull; Wahyu Rahmat Hidayat, S.Kom.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/kelas/cloud-computing/pertemuan-1"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 transition-all shadow-sm"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Buka Pertemuan 1</span>
            </Link>
          </div>
        </div>
      </header>

      {/* HEADER SILABUS KELAS */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200/80 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-sky-600">
              Wahyu Rahmat Hidayat
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-400">Kelas yang Diampu</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-sky-600 font-semibold">Silabus Cloud Computing</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/70 border border-sky-200 text-sky-800 text-xs font-semibold">
                <Sparkles className="h-3.5 w-3.5 text-sky-600" />
                <span>Kurikulum Berbasis Vokasi &amp; Standar Industri</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Silabus &amp; Daftar Pertemuan: Cloud Computing
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                Mata pelajaran produktif Teknik Komputer &amp; Jaringan yang membekali siswa dengan
                kompetensi perancangan, pengelolaan, dan pengamanan server virtual berbasis
                Linux Ubuntu Server dan teknologi Hypervisor. Materi disajikan secara bertahap
                mulai dari dasar virtualisasi hingga penerapan web service dan kontainer.
              </p>

              {/* Class Info Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 font-medium text-slate-700">
                  <UserCheck className="h-4 w-4 text-sky-600" />
                  <span>Pengampu: <b>Wahyu Rahmat Hidayat, S.Kom.</b></span>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 font-medium text-slate-700">
                  <Clock className="h-4 w-4 text-indigo-600" />
                  <span>Total: <b>8 Pertemuan Praktikum (32 JP)</b></span>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 font-medium text-slate-700">
                  <GraduationCap className="h-4 w-4 text-emerald-600" />
                  <span>Jurusan: <b>Teknik Komputer &amp; Jaringan</b></span>
                </div>
              </div>
            </div>

            {/* Right Card: Quick Start Pertemuan 1 */}
            <div className="lg:col-span-4">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-sky-950 text-white shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
                    Modul Saat Ini
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    Siap Dipelajari
                  </span>
                </div>

                <h3 className="font-bold text-base text-white">
                  Pertemuan 01: Setup VM Ubuntu Server 22.04 LTS
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Lengkap dengan panduan hands-on lab, screenshot aplikasi, dan tombol salin 1-klik untuk perintah Linux.
                </p>

                <Link
                  href="/kelas/cloud-computing/pertemuan-1"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs transition-all shadow-md"
                >
                  <span>Mulai Belajar Pertemuan 1</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DAFTAR SILABUS PERTEMUAN */}
      <section className="py-16 md:py-20 bg-slate-50 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-1 block">
                Struktur Mata Pelajaran
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Daftar Isi &amp; Pertemuan Pembelajaran
              </h2>
            </div>

            <p className="text-xs text-slate-500">
              *Materi dikembangkan secara bertahap oleh guru pengampu
            </p>
          </div>

          {/* List of Meetings */}
          <div className="space-y-5">
            {syllabusList.map((item) => (
              <div
                key={item.pertemuan}
                className={`rounded-3xl border transition-all duration-200 overflow-hidden ${
                  item.active
                    ? "bg-white border-sky-300 shadow-md hover:border-sky-400 hover:shadow-lg"
                    : "bg-white/70 border-slate-200 opacity-80"
                }`}
              >
                <div className="p-6 sm:p-7 space-y-4">
                  {/* Top Bar Item */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-10 w-10 rounded-2xl flex items-center justify-center font-extrabold text-sm ${
                          item.active
                            ? "bg-sky-500 text-white shadow-sm shadow-sky-500/30"
                            : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {item.pertemuan}
                      </span>
                      <div>
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Pertemuan {item.pertemuan} &bull; {item.alokasi}
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <span
                      className={`text-[11px] font-semibold px-3 py-1 rounded-full border ${item.statusColor}`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Topics Pills */}
                  <div className="pt-2">
                    <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-2">
                      Pokok Bahasan &bull; Hands-on:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.topics.map((topic, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 text-[11px] text-slate-600 font-medium"
                        >
                          &bull; {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      Laboratorium Komputer TKJ SMK Telkom Lampung
                    </span>

                    {item.active ? (
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs shadow-sm transition-all"
                      >
                        <span>Buka Materi Pertemuan {item.pertemuan}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                        <Lock className="h-3.5 w-3.5" />
                        <span>Tahap Pengembangan</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto bg-slate-950 text-slate-400 text-xs border-t border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Cloud className="h-4 w-4 text-sky-400" />
            <span>Kelas Cloud Computing &bull; Wahyu Rahmat Hidayat, S.Kom.</span>
          </div>
          <p className="text-[11px] text-slate-500">
            SMK Telkom Lampung &bull; Teknik Jaringan Komputer &amp; Telekomunikasi
          </p>
        </div>
      </footer>
    </div>
  );
}
