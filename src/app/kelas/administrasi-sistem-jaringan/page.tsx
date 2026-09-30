"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import UserNavPill from "@/components/UserNavPill";
import {
  Server,
  Layers,
  ArrowLeft,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
  Lock,
  ArrowRight,
  GraduationCap,
  FileText,
  UserCheck,
  Globe,
  Terminal,
  ShieldCheck,
  Cpu,
} from "lucide-react";

export default function AdministrasiSistemJaringanPage() {
  const { user, openLoginModal } = useAuth();
  const router = useRouter();

  const handleOpenMeeting = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (!user.isLoggedIn) {
      router.push(`/login?redirect=${encodeURIComponent(href)}`);
      return;
    }
    router.push(href);
  };

  const syllabusList = [
    {
      pertemuan: 1,
      title: "Instalasi & Konfigurasi Web Server Apache2 di Linux Server",
      alokasi: "4 JP (180 Menit)",
      status: "Aktif & Siap Praktikum",
      statusColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      description:
        "Mempelajari arsitektur layanan web HTTP di Linux, instalasi paket Apache2 via APT, manajemen service systemd, konfigurasi firewall UFW port 80, pembuatan index.html kustom di /var/www/html/, serta pengujian respon HTTP 200 OK via cURL dan Live Browser.",
      href: "/kelas/administrasi-sistem-jaringan/pertemuan-1",
      topics: [
        "Arsitektur Protokol HTTP/HTTPS & Port 80/443",
        "Instalasi Paket Apache2 via APT Package Manager",
        "Manajemen Service (systemctl start, status, enable)",
        "Konfigurasi Firewall UFW Port 80 'Apache'",
        "Kustomisasi DocumentRoot /var/www/html/index.html",
        "Simulasi Live Web Browser & Uji cURL HTTP 200 OK",
      ],
      active: true,
    },
    {
      pertemuan: 2,
      title: "Konfigurasi Virtual Host & Multi-Domain pada Apache2",
      alokasi: "4 JP (180 Menit)",
      status: "Segera Hadir",
      statusColor: "bg-slate-100 text-slate-600 border-slate-200",
      description:
        "Membuat dan mengelola beberapa situs web independen dalam satu server fisik/VM menggunakan direktif VirtualHost di /etc/apache2/sites-available/, perintah a2ensite, dan pemetaan ServerName lokal.",
      href: "#",
      topics: [
        "Struktur Konfigurasi /etc/apache2/sites-available/",
        "Direktif ServerName, ServerAlias & DocumentRoot",
        "Manajemen VirtualHost dengan a2ensite dan a2dissite",
        "Pemetaan File /etc/hosts pada Komputer Client",
      ],
      active: false,
    },
    {
      pertemuan: 3,
      title: "Integrasi PHP 8.x Engine & Modul Web Dinamis",
      alokasi: "4 JP (180 Menit)",
      status: "Segera Hadir",
      statusColor: "bg-slate-100 text-slate-600 border-slate-200",
      description:
        "Menghubungkan web server Apache2 dengan modul eksekusi PHP (libapache2-mod-php), penulisan skrip PHP info, serta penyesuaian DirectoryIndex pada dir.conf.",
      href: "#",
      topics: [
        "Instalasi PHP & Ekstensi Umum di Linux",
        "Konfigurasi /etc/apache2/mods-enabled/dir.conf",
        "Uji Eksekusi Skrip phpinfo() di Web Browser",
        "Manajemen Hak Akses User www-data",
      ],
      active: false,
    },
    {
      pertemuan: 4,
      title: "Penerapan Enkripsi SSL/TLS (HTTPS Port 443) Mandiri",
      alokasi: "4 JP (180 Menit)",
      status: "Segera Hadir",
      statusColor: "bg-slate-100 text-slate-600 border-slate-200",
      description:
        "Membangun koneksi web yang aman dan terenkripsi menggunakan modul ssl Apache, generate Self-Signed Certificate dengan OpenSSL, dan konfigurasi default-ssl.conf.",
      href: "#",
      topics: [
        "Konsep Sertifikat Digital Kunci Publik & Privat",
        "Generate Sertifikat Self-Signed Menggunakan OpenSSL",
        "Aktivasi Modul SSL (a2enmod ssl)",
        "Konfigurasi Port 443 HTTPS & Redirect HTTP ke HTTPS",
      ],
      active: false,
    },
    {
      pertemuan: 5,
      title: "Domain Name System (DNS Server BIND9) untuk Web Server",
      alokasi: "4 JP (180 Menit)",
      status: "Segera Hadir",
      statusColor: "bg-slate-100 text-slate-600 border-slate-200",
      description:
        "Konfigurasi DNS Server BIND9 untuk menerjemahkan nama domain web kustom (misal: www.smktelkom.sch.id) ke alamat IP server lokal, Forward & Reverse Zone.",
      href: "#",
      topics: [
        "Arsitektur Resolusi Nama DNS (Root, TLD, Authoritative)",
        "Konfigurasi File named.conf.local & named.conf.options",
        "Pembuatan File Forward Zone (db.domain) & Record A/CNAME",
        "Pengujian Resolusi Nama dengan nslookup & dig",
      ],
      active: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900 pb-20">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-amber-600 transition-colors mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Beranda Portal</span>
            </Link>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-sm shadow-amber-500/20">
                <Server className="h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm sm:text-base tracking-tight">
                  Administrasi Sistem Jaringan
                </span>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  Silabus &bull; Hermawan Rijal Arasy, S.Kom. &bull; SMK Telkom Lampung
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <UserNavPill />
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-white via-amber-50/20 to-slate-50 border-b border-slate-200/80 pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold tracking-wide">
                <Globe className="h-3.5 w-3.5 text-amber-700" />
                <span>Mata Pelajaran Produktif TJKT / TKJ</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Administrasi Sistem Jaringan <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  (ASJ — Linux Server &amp; Web Service)
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                Kurikulum praktikum terpadu untuk penguasaan sistem operasi server Linux (Debian/Ubuntu),
                arsitektur Web Server Apache2, DocumentRoot, VirtualHost, DNS BIND9, dan keamanan sistem
                berbasis simulasi interaktif terminal serta pengujian browser nyata.
              </p>

              {/* Teacher Info Card */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-400 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    HR
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Hermawan Rijal Arasy, S.Kom.
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Guru Pengampu Mata Pelajaran ASJ
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-slate-100 border border-slate-200/80 text-xs text-slate-600 font-medium">
                  <Clock className="h-4 w-4 text-amber-600" />
                  <span>Total 5 Modul &bull; 20 Jam Pelajaran</span>
                </div>
              </div>
            </div>

            {/* Quick Action Card */}
            <div className="lg:w-80 p-6 rounded-3xl bg-white border border-slate-200 shadow-lg space-y-4 shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Status Siswa
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    user.isLoggedIn
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {user.isLoggedIn ? "Terdaftar Aktif" : "Belum Login"}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">
                  {user.isLoggedIn ? user.name : "Siswa Tamu (Guest)"}
                </h3>
                <p className="text-xs text-slate-500">
                  {user.isLoggedIn
                    ? `${user.kelas} • NIS: ${user.nis}`
                    : "Masuk untuk mencatat skor dan membuka sertifikat"}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <Link
                  href="/kelas/administrasi-sistem-jaringan/pertemuan-1"
                  className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Mulai Pertemuan 01</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SYLLABUS LIST */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              Daftar Alur Pertemuan Praktikum
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Setiap pertemuan dilengkapi dengan Uji Diagnostik, Teori, Simulator Terminal, Checklist Fisik, Gamifikasi, dan Sertifikat Kelulusan.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {syllabusList.map((item) => (
            <div
              key={item.pertemuan}
              className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                item.active
                  ? "bg-white border-amber-200/90 shadow-sm hover:shadow-md"
                  : "bg-slate-50/70 border-slate-200/80 opacity-80"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-black">
                      Pertemuan 0{item.pertemuan}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-xl border text-xs font-bold ${item.statusColor}`}
                    >
                      {item.status}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>{item.alokasi}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                    {item.description}
                  </p>

                  {/* Topic Badges */}
                  <div className="pt-2 flex flex-wrap items-center gap-1.5">
                    {item.topics.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200/60"
                      >
                        &bull; {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="shrink-0 flex items-center">
                  {item.active ? (
                    <Link
                      href={item.href}
                      onClick={(e) => handleOpenMeeting(e, item.href)}
                      className="w-full lg:w-auto px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <span>Buka Modul Praktikum</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-400 text-xs font-bold border border-slate-200">
                      <Lock className="h-3.5 w-3.5" />
                      <span>Segera Rilis</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
