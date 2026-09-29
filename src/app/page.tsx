"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Server,
  Cloud,
  Layers,
  Cpu,
  ShieldCheck,
  Award,
  ChevronRight,
  Sparkles,
  Mail,
  MapPin,
  Clock,
  Terminal,
  Network,
  CheckCircle2,
  ExternalLink,
  Laptop,
  ArrowRight,
  Code2,
  Briefcase,
  UserCheck,
  Send,
  Sliders,
} from "lucide-react";

export default function HomePage() {
  const classesList = [
    {
      id: "cloud-computing",
      title: "Administrasi Cloud Computing & Virtualisasi",
      subtitle: "Mata Pelajaran Produktif TKJ",
      status: "Tersedia & Aktif",
      statusColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      description:
        "Mempelajari arsitektur virtualisasi server, Type-2 Hypervisor menggunakan Oracle VM VirtualBox, instalasi Ubuntu Server 22.04 LTS, dan konfigurasi jaringan NAT/Bridged.",
      href: "/kelas/cloud-computing",
      active: true,
      highlights: [
        "Pertemuan 1: Setup VM Ubuntu Server 22.04 LTS",
        "Interactive 1-Click Copy CLI Terminal",
        "Alokasi 4 JP (180 Menit) Praktikum Mandiri",
      ],
      icon: Cloud,
      badge: "Kelas Unggulan",
    },
    {
      id: "asj",
      title: "Administrasi Sistem Jaringan (ASJ - Linux Server)",
      subtitle: "Mata Pelajaran Produktif TKJ",
      status: "Segera Rilis",
      statusColor: "bg-amber-100 text-amber-800 border-amber-200",
      description:
        "Konfigurasi layanan server mandiri berbasis Debian/Ubuntu: DNS Server (BIND9), Web Server (Nginx & Apache), Database Server (MariaDB), dan Mail Server.",
      href: "#",
      active: false,
      highlights: [
        "Instalasi & Hardening Layanan Linux",
        "Manajemen Virtual Host & Domain Lokal",
        "Praktikum Berbasis Command Line Interface (CLI)",
      ],
      icon: Server,
      badge: "Semester Genap",
    },
    {
      id: "aij",
      title: "Administrasi Infrastruktur Jaringan (AIJ)",
      subtitle: "Mata Pelajaran Produktif TKJ",
      status: "Segera Rilis",
      statusColor: "bg-sky-100 text-sky-800 border-sky-200",
      description:
        "Perancangan topologi jaringan skala enterprise: Routing Dinamis (OSPF & BGP), VLAN Trunking, Firewall Filter Rule, dan Manajemen Bandwidth pada Router MikroTik & Cisco.",
      href: "#",
      active: false,
      highlights: [
        "Konfigurasi RouterBOARD MikroTik & Switch",
        "VLAN & Inter-VLAN Routing",
        "Manajemen Keamanan Jaringan Lab",
      ],
      icon: Network,
      badge: "Semester Ganjil",
    },
    {
      id: "cyber-security",
      title: "Dasar Keamanan Jaringan & Cyber Security",
      subtitle: "Mata Pelajaran Produktif TKJ",
      status: "Segera Rilis",
      statusColor: "bg-purple-100 text-purple-800 border-purple-200",
      description:
        "Konsep perlindungan infrastruktur jaringan: Port Scanning, SSH Hardening dengan Public Key, Firewall Policy IPTables/UFW, dan Implementasi VPN Wireguard.",
      href: "#",
      active: false,
      highlights: [
        "Audit Keamanan Port dan Layanan",
        "Konfigurasi Enkripsi & Akses Remote Aman",
        "Simulasi Pertahanan Jaringan Server",
      ],
      icon: ShieldCheck,
      badge: "Kelas Pilihan",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-sky-100 selection:text-sky-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight">
                  Wahyu Rahmat Hidayat
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-sky-100/80 text-sky-700 border border-sky-200/60 hidden sm:inline-block">
                  Guru Produktif TKJ
                </span>
              </div>
              <p className="text-xs text-slate-500">
                SMK Telkom Lampung &bull; Portal Pembelajaran &amp; Kelas Online
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#profil" className="hover:text-sky-600 transition-colors">
              Profil &amp; Biodata
            </a>
            <a href="#keahlian" className="hover:text-sky-600 transition-colors">
              Kompetensi
            </a>
            <a href="#daftar-kelas" className="hover:text-sky-600 transition-colors">
              Daftar Kelas
            </a>
            <a href="#metode" className="hover:text-sky-600 transition-colors">
              Metode Belajar
            </a>
            <a href="#kontak" className="hover:text-sky-600 transition-colors">
              Kontak
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#daftar-kelas"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-sky-600 transition-all duration-200 shadow-sm"
            >
              <BookOpen className="h-4 w-4" />
              <span>Masuk Kelas</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION: BIODATA & PROFIL PENDIDIK */}
      <section
        id="profil"
        className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200/60"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#e0f2fe_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Bio & Greeting */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200/80 text-sky-800 text-xs font-semibold shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-sky-600" />
                <span>Portal Resmi Pengajar &bull; SMK Telkom Lampung</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.2]">
                Wahyu Rahmat Hidayat,{" "}
                <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-teal-600 bg-clip-text text-transparent">
                  S.Kom.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
                Guru Produktif Teknik Jaringan Komputer &amp; Telekomunikasi (TJKT / TKJ)
                di <b>SMK Telkom Lampung</b>.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Selamat datang di website pribadi dan portal edukasi saya. Di sini, siswa dapat mengakses
                modul pembelajaran terstruktur, petunjuk praktikum hands-on langkah demi langkah,
                serta panduan kode terminal untuk mempermudah pelaksanaan pembelajaran di laboratorium komputer.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <a
                  href="#daftar-kelas"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white bg-sky-600 hover:bg-sky-500 shadow-lg shadow-sky-600/25 transition-all duration-200"
                >
                  <BookOpen className="h-4.5 w-4.5" />
                  <span>Lihat Kelas yang Saya Ajar</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                <Link
                  href="/kelas/cloud-computing"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs hover:border-slate-300 transition-all duration-200"
                >
                  <Cloud className="h-4.5 w-4.5 text-sky-600" />
                  <span>Buka Kelas Cloud Computing</span>
                </Link>
              </div>

              {/* Quick Profile Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-200/80 text-left">
                <div className="p-3 rounded-xl bg-white border border-slate-200/70">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">Unit Sekolah</div>
                  <div className="text-xs font-bold text-slate-800">SMK Telkom Lampung</div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200/70">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">Jurusan Keahlian</div>
                  <div className="text-xs font-bold text-slate-800">Teknik Komputer &amp; Jaringan</div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200/70">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">Fokus Pengajaran</div>
                  <div className="text-xs font-bold text-slate-800">Cloud, Linux &amp; Networking</div>
                </div>
              </div>
            </div>

            {/* Right Column: Instructor Profile Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 sm:p-8 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-100 rounded-bl-full opacity-60 pointer-events-none" />

                {/* Avatar & Header */}
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-teal-500 p-0.5 shadow-md">
                    <div className="h-full w-full rounded-[14px] bg-slate-900 flex flex-col items-center justify-center text-white">
                      <UserCheck className="h-9 w-9 text-sky-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg">
                      Wahyu Rahmat Hidayat
                    </h3>
                    <p className="text-xs font-medium text-sky-600">
                      Pendidik Vokasi &bull; Guru Produktif
                    </p>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span>Lampung, Indonesia</span>
                    </div>
                  </div>
                </div>

                {/* Bio Quote */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600 italic leading-relaxed">
                  "Tujuan saya adalah mendampingi siswa agar tidak ragu bereksperimen dengan server dan jaringan.
                  Kesalahan sintaks saat praktikum adalah bagian alami dari proses belajar seorang engineer."
                </div>

                {/* Info List */}
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Email Institusi:</span>
                    <a
                      href="mailto:wahyu@smktelkom-lpg.sch.id"
                      className="font-mono text-sky-600 hover:underline"
                    >
                      wahyu@smktelkom-lpg.sch.id
                    </a>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Status Pengajar:</span>
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Aktif Mengajar
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Pendekatan:</span>
                    <span className="font-semibold text-slate-800">
                      Praktik Mandiri &amp; Copyable Snippet
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-500 font-medium">Platform Lab:</span>
                    <span className="font-semibold text-slate-800">
                      VirtualBox 7.x &bull; Ubuntu Server CLI
                    </span>
                  </div>
                </div>

                {/* CTA inside Card */}
                <Link
                  href="/kelas/cloud-computing"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 hover:bg-sky-600 text-white font-semibold text-xs transition-colors"
                >
                  <Cloud className="h-4 w-4" />
                  <span>Kunjungi Kelas Cloud Computing</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BIDANG KEAHLIAN & KOMPETENSI */}
      <section id="keahlian" className="py-14 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-2 block">
              Bidang Kompetensi Produktif
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Keahlian &amp; Ruang Lingkup Materi Vokasi
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Materi yang diajarkan berfokus pada keterampilan terapan yang relevan dengan kebutuhan dunia kerja industri IT saat ini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-sky-300 hover:shadow-md transition-all">
              <div className="h-11 w-11 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-4">
                <Cloud className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1.5 text-base">
                Cloud &amp; Virtualisasi
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hypervisor Type-1 &amp; Type-2, instalasi server virtual, isolasi hardware, manajemen snapshot, dan arsitektur cloud lokal.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all">
              <div className="h-11 w-11 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <Server className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1.5 text-base">
                Linux Server Administration
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Penguasaan Ubuntu Server CLI, manajemen paket apt, hak akses permission, partisi disk, dan konfigurasi server headless.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 hover:shadow-md transition-all">
              <div className="h-11 w-11 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center mb-4">
                <Network className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1.5 text-base">
                Jaringan Komputer Lanjut
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Desain subnetting IPv4, NAT, Bridged mode, DHCP Server, Dynamic Routing OSPF, dan konfigurasi perangkat MikroTik/Cisco.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-purple-300 hover:shadow-md transition-all">
              <div className="h-11 w-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1.5 text-base">
                Keamanan &amp; SysAdmin
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Manajemen firewall UFW/IPTables, SSH Key Authentication, pengamanan port layanan, dan disaster recovery via snapshot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DAFTAR KELAS YANG DIAMPU */}
      <section id="daftar-kelas" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-2 block">
              Ruang Belajar Siswa
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Katalog Kelas Mata Pelajaran Produktif
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Pilih kelas yang sedang kamu tempuh untuk mengakses modul praktikum mandiri, petunjuk hands-on lab, dan evaluasi hasil belajar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {classesList.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  className={`rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                    item.active
                      ? "bg-white border-sky-300 shadow-xl shadow-sky-100/50 hover:border-sky-500"
                      : "bg-white/70 border-slate-200 opacity-90 hover:opacity-100"
                  }`}
                >
                  <div className="p-7 space-y-5">
                    {/* Header Card */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-12 w-12 rounded-2xl flex items-center justify-center ${
                            item.active
                              ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          <IconComp className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                            {item.subtitle}
                          </div>
                          <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      <span
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border shrink-0 ${item.statusColor}`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                        Fitur &amp; Materi Pembelajaran:
                      </div>
                      <ul className="space-y-1.5">
                        {item.highlights.map((h, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-xs text-slate-600"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500">
                      {item.badge}
                    </span>

                    {item.active ? (
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs shadow-md shadow-sky-600/20 transition-all"
                      >
                        <span>Buka Ruang Kelas Cloud</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-200 text-slate-500 font-semibold text-xs cursor-not-allowed"
                      >
                        <span>Modul Disiapkan</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* METODE & PENDEKATAN BELAJAR */}
      <section id="metode" className="py-16 md:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200/60">
                <Sliders className="h-3.5 w-3.5" />
                <span>Pendekatan Pedagogi Modern</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                Bagaimana Sistem Pembelajaran Ini Membantu Siswa?
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Sebagai guru produktif di SMK Telkom Lampung, saya melihat kendala utama siswa
                dalam belajar server adalah rasa cemas salah mengetik perintah terminal atau merusak sistem host.
                Oleh karena itu, kelas online ini dirancang dengan prinsip:
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-sky-100 text-sky-700 mt-0.5">
                    <Terminal className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      1-Click Copy Snippet Perintah
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Siswa tidak perlu repot mengetik ulang manual perintah panjang yang rawan salah spasi atau tanda baca.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 mt-0.5">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      Eksplorasi Aman dengan Snapshot
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Setiap praktikum selalu dimulai dengan pembuatan checkpoint snapshot sehingga siswa bebas mencoba tanpa takut OS rusak.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-purple-100 text-purple-700 mt-0.5">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      Evaluasi &amp; Validasi Mandiri
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Lengkap dengan Pre-Test diagnostik, lembar pengumpulan portofolio screenshot, dan Post-Test untuk validasi kompetensi.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Featured Preview Cloud Class Card */}
            <div className="lg:col-span-6">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 text-white shadow-2xl relative overflow-hidden space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono text-sky-300">
                      Kelas Tersedia Saat Ini
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/10 text-slate-200">
                    4 JP &bull; 180 Menit
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    Modul Praktikum Siap Akses
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Cloud Computing &bull; Pertemuan 01
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Pengenalan Virtualisasi &amp; Persiapan Mesin Virtual Ubuntu Server 22.04 LTS
                    dengan Oracle VM VirtualBox di Komputer Lab.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 font-mono text-xs text-sky-300 flex items-center justify-between">
                  <span>$ sudo apt update &amp;&amp; sudo apt upgrade -y</span>
                  <span className="text-[11px] text-slate-400">Ubuntu 22.04</span>
                </div>

                <Link
                  href="/kelas/cloud-computing"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs sm:text-sm shadow-md transition-all"
                >
                  <span>Masuk ke Halaman Kelas Cloud Computing</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KONTAK GURU */}
      <section id="kontak" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 block">
              Konsultasi &amp; Bantuan Belajar
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Ada Kendala Saat Praktikum di Laboratorium?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Siswa dapat langsung berdiskusi dengan saya di ruang guru / lab komputer SMK Telkom Lampung
              atau menghubungi via email sekolah resmi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="h-10 w-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-3">
                <Mail className="h-5 w-5" />
              </div>
              <div className="text-xs text-slate-500 font-semibold uppercase">Email Resmi</div>
              <a
                href="mailto:wahyu@smktelkom-lpg.sch.id"
                className="text-sm font-bold text-slate-900 hover:text-sky-600 font-mono"
              >
                wahyu@smktelkom-lpg.sch.id
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-3">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="text-xs text-slate-500 font-semibold uppercase">Lokasi Mengajar</div>
              <div className="text-sm font-bold text-slate-900">
                Laboratorium TKJ &bull; SMK Telkom Lampung
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto bg-slate-950 text-slate-400 text-xs border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <GraduationCap className="h-5 w-5 text-sky-400" />
                <span>Wahyu Rahmat Hidayat &bull; SMK Telkom Lampung</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                Portal pembelajaran mandiri dan panduan praktikum bagi siswa Teknik Jaringan Komputer &amp; Telekomunikasi.
              </p>
            </div>

            <div>
              <div className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">
                Navigasi
              </div>
              <ul className="space-y-2">
                <li>
                  <a href="#profil" className="hover:text-white transition-colors">
                    Biodata Guru
                  </a>
                </li>
                <li>
                  <a href="#keahlian" className="hover:text-white transition-colors">
                    Bidang Keahlian
                  </a>
                </li>
                <li>
                  <a href="#daftar-kelas" className="hover:text-white transition-colors">
                    Daftar Kelas
                  </a>
                </li>
                <li>
                  <Link
                    href="/kelas/cloud-computing"
                    className="text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    Kelas Cloud Computing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">
                Mata Pelajaran
              </div>
              <ul className="space-y-2 text-slate-400">
                <li>&bull; Cloud Computing (VirtualBox)</li>
                <li>&bull; Administrasi Sistem Jaringan (Linux)</li>
                <li>&bull; Administrasi Infrastruktur (MikroTik/Cisco)</li>
                <li>&bull; Keamanan Jaringan Komputer</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} Wahyu Rahmat Hidayat, S.Kom. &bull; SMK Telkom Lampung.
            </p>
            <p>Dibangun dengan Next.js &amp; Tailwind CSS &bull; Siap Deploy di Vercel</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
