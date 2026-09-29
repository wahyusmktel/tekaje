"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import UserNavPill from "@/components/UserNavPill";
import { useAuth } from "@/context/AuthContext";
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
  Menu,
  X,
  Smartphone,
  Check,
  MessageCircle,
  Video,
  Globe,
  Play,
  Share2,
} from "lucide-react";

// Custom SVG Icons for Brands
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
    </svg>
  );
}

// Authentic 3D LEGO Style "TEKAJE" Banner Component
function LegoTekajeBanner() {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 select-none flex justify-center">
      <svg
        viewBox="0 0 1000 220"
        className="w-full h-auto drop-shadow-[0_15px_25px_rgba(0,0,0,0.35)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Lego Stud Gradient */}
          <linearGradient id="studRed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff4d4d" />
            <stop offset="50%" stopColor="#d91b1b" />
            <stop offset="100%" stopColor="#9e0c0c" />
          </linearGradient>
          <linearGradient id="studBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4da6ff" />
            <stop offset="50%" stopColor="#0066cc" />
            <stop offset="100%" stopColor="#004080" />
          </linearGradient>
          <linearGradient id="studYellow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff066" />
            <stop offset="50%" stopColor="#f5cd14" />
            <stop offset="100%" stopColor="#b39200" />
          </linearGradient>
          <linearGradient id="studGreen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5cd65c" />
            <stop offset="50%" stopColor="#28a745" />
            <stop offset="100%" stopColor="#19692c" />
          </linearGradient>
          <linearGradient id="studOrange" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffaa44" />
            <stop offset="50%" stopColor="#f37021" />
            <stop offset="100%" stopColor="#b84700" />
          </linearGradient>

          {/* Lego Brick Filter for 3D extrusion */}
          <filter id="legoShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="3" dy="6" stdDeviation="3" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* --- LETTER T (RED) --- */}
        <g transform="translate(30, 20)" filter="url(#legoShadow)">
          {/* Horizontal Top Bar (120 x 44) */}
          <rect x="0" y="0" width="130" height="44" rx="6" fill="#d91b1b" stroke="#ff6b6b" strokeWidth="2" />
          <circle cx="20" cy="18" r="10" fill="url(#studRed)" stroke="#ff8080" strokeWidth="1.5" />
          <circle cx="50" cy="18" r="10" fill="url(#studRed)" stroke="#ff8080" strokeWidth="1.5" />
          <circle cx="80" cy="18" r="10" fill="url(#studRed)" stroke="#ff8080" strokeWidth="1.5" />
          <circle cx="110" cy="18" r="10" fill="url(#studRed)" stroke="#ff8080" strokeWidth="1.5" />

          {/* Vertical Stem (46 x 130) */}
          <rect x="42" y="44" width="46" height="130" rx="6" fill="#b81414" stroke="#ff4d4d" strokeWidth="1.5" />
          <circle cx="65" cy="70" r="10" fill="url(#studRed)" stroke="#ff8080" strokeWidth="1.5" />
          <circle cx="65" cy="105" r="10" fill="url(#studRed)" stroke="#ff8080" strokeWidth="1.5" />
          <circle cx="65" cy="140" r="10" fill="url(#studRed)" stroke="#ff8080" strokeWidth="1.5" />
        </g>

        {/* --- LETTER E (YELLOW) --- */}
        <g transform="translate(190, 20)" filter="url(#legoShadow)">
          {/* Vertical Spine */}
          <rect x="0" y="0" width="44" height="174" rx="6" fill="#d4ad00" stroke="#fff066" strokeWidth="1.5" />
          <circle cx="22" cy="22" r="10" fill="url(#studYellow)" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="22" cy="62" r="10" fill="url(#studYellow)" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="22" cy="102" r="10" fill="url(#studYellow)" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="22" cy="142" r="10" fill="url(#studYellow)" stroke="#ffffff" strokeWidth="1.5" />

          {/* Top Arm */}
          <rect x="44" y="0" width="80" height="42" rx="5" fill="#f5cd14" stroke="#fff066" strokeWidth="1.5" />
          <circle cx="70" cy="18" r="10" fill="url(#studYellow)" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="104" cy="18" r="10" fill="url(#studYellow)" stroke="#ffffff" strokeWidth="1.5" />

          {/* Middle Arm */}
          <rect x="44" y="68" width="68" height="38" rx="5" fill="#f5cd14" stroke="#fff066" strokeWidth="1.5" />
          <circle cx="70" cy="84" r="10" fill="url(#studYellow)" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="98" cy="84" r="10" fill="url(#studYellow)" stroke="#ffffff" strokeWidth="1.5" />

          {/* Bottom Arm */}
          <rect x="44" y="132" width="80" height="42" rx="5" fill="#f5cd14" stroke="#fff066" strokeWidth="1.5" />
          <circle cx="70" cy="150" r="10" fill="url(#studYellow)" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="104" cy="150" r="10" fill="url(#studYellow)" stroke="#ffffff" strokeWidth="1.5" />
        </g>

        {/* --- LETTER K (BLUE) --- */}
        <g transform="translate(345, 20)" filter="url(#legoShadow)">
          {/* Vertical Spine */}
          <rect x="0" y="0" width="44" height="174" rx="6" fill="#0052a3" stroke="#4da6ff" strokeWidth="1.5" />
          <circle cx="22" cy="22" r="10" fill="url(#studBlue)" stroke="#80bfff" strokeWidth="1.5" />
          <circle cx="22" cy="62" r="10" fill="url(#studBlue)" stroke="#80bfff" strokeWidth="1.5" />
          <circle cx="22" cy="102" r="10" fill="url(#studBlue)" stroke="#80bfff" strokeWidth="1.5" />
          <circle cx="22" cy="142" r="10" fill="url(#studBlue)" stroke="#80bfff" strokeWidth="1.5" />

          {/* Diagonal Upper Arm */}
          <polygon points="44,80 115,10 135,26 65,96" fill="#0066cc" stroke="#4da6ff" strokeWidth="1.5" />
          <circle cx="80" cy="46" r="10" fill="url(#studBlue)" stroke="#80bfff" strokeWidth="1.5" />
          <circle cx="115" cy="25" r="10" fill="url(#studBlue)" stroke="#80bfff" strokeWidth="1.5" />

          {/* Diagonal Lower Arm */}
          <polygon points="54,84 125,160 105,174 38,102" fill="#0066cc" stroke="#4da6ff" strokeWidth="1.5" />
          <circle cx="82" cy="125" r="10" fill="url(#studBlue)" stroke="#80bfff" strokeWidth="1.5" />
          <circle cx="110" cy="155" r="10" fill="url(#studBlue)" stroke="#80bfff" strokeWidth="1.5" />
        </g>

        {/* --- LETTER A (GREEN) --- */}
        <g transform="translate(515, 20)" filter="url(#legoShadow)">
          {/* Left Leg */}
          <polygon points="50,0 74,0 26,174 0,174" fill="#218838" stroke="#5cd65c" strokeWidth="1.5" />
          <circle cx="48" cy="40" r="10" fill="url(#studGreen)" stroke="#85e085" strokeWidth="1.5" />
          <circle cx="32" cy="95" r="10" fill="url(#studGreen)" stroke="#85e085" strokeWidth="1.5" />
          <circle cx="16" cy="150" r="10" fill="url(#studGreen)" stroke="#85e085" strokeWidth="1.5" />

          {/* Right Leg */}
          <polygon points="50,0 74,0 124,174 98,174" fill="#28a745" stroke="#5cd65c" strokeWidth="1.5" />
          <circle cx="76" cy="40" r="10" fill="url(#studGreen)" stroke="#85e085" strokeWidth="1.5" />
          <circle cx="92" cy="95" r="10" fill="url(#studGreen)" stroke="#85e085" strokeWidth="1.5" />
          <circle cx="108" cy="150" r="10" fill="url(#studGreen)" stroke="#85e085" strokeWidth="1.5" />

          {/* Top Stud */}
          <circle cx="62" cy="10" r="9" fill="url(#studGreen)" stroke="#85e085" strokeWidth="1.5" />

          {/* Horizontal Crossbar */}
          <rect x="28" y="96" width="68" height="34" rx="4" fill="#1e7e34" stroke="#5cd65c" strokeWidth="1.5" />
          <circle cx="48" cy="110" r="9" fill="url(#studGreen)" stroke="#85e085" strokeWidth="1.5" />
          <circle cx="76" cy="110" r="9" fill="url(#studGreen)" stroke="#85e085" strokeWidth="1.5" />
        </g>

        {/* --- LETTER J (ORANGE) --- */}
        <g transform="translate(680, 20)" filter="url(#legoShadow)">
          {/* Top Bar */}
          <rect x="25" y="0" width="95" height="42" rx="5" fill="#f37021" stroke="#ffaa44" strokeWidth="1.5" />
          <circle cx="45" cy="18" r="10" fill="url(#studOrange)" stroke="#ffd480" strokeWidth="1.5" />
          <circle cx="75" cy="18" r="10" fill="url(#studOrange)" stroke="#ffd480" strokeWidth="1.5" />
          <circle cx="105" cy="18" r="10" fill="url(#studOrange)" stroke="#ffd480" strokeWidth="1.5" />

          {/* Vertical Stem */}
          <rect x="76" y="42" width="44" height="98" rx="5" fill="#d95e14" stroke="#ffaa44" strokeWidth="1.5" />
          <circle cx="98" cy="65" r="10" fill="url(#studOrange)" stroke="#ffd480" strokeWidth="1.5" />
          <circle cx="98" cy="105" r="10" fill="url(#studOrange)" stroke="#ffd480" strokeWidth="1.5" />

          {/* Bottom Hook Curve */}
          <path d="M120,135 C120,174 90,174 70,174 C35,174 15,160 15,135 L48,135 C48,148 58,150 70,150 C80,150 88,148 88,135 Z" fill="#b84700" stroke="#ffaa44" strokeWidth="1.5" />
          <circle cx="70" cy="155" r="9" fill="url(#studOrange)" stroke="#ffd480" strokeWidth="1.5" />
          <circle cx="35" cy="142" r="9" fill="url(#studOrange)" stroke="#ffd480" strokeWidth="1.5" />
        </g>

        {/* --- LETTER E (RED) --- */}
        <g transform="translate(835, 20)" filter="url(#legoShadow)">
          {/* Vertical Spine */}
          <rect x="0" y="0" width="44" height="174" rx="6" fill="#b81414" stroke="#ff4d4d" strokeWidth="1.5" />
          <circle cx="22" cy="22" r="10" fill="url(#studRed)" stroke="#ff8080" strokeWidth="1.5" />
          <circle cx="22" cy="62" r="10" fill="url(#studRed)" stroke="#ff8080" strokeWidth="1.5" />
          <circle cx="22" cy="102" r="10" fill="url(#studRed)" stroke="#ff8080" strokeWidth="1.5" />
          <circle cx="22" cy="142" r="10" fill="url(#studRed)" stroke="#ff8080" strokeWidth="1.5" />

          {/* Top Arm */}
          <rect x="44" y="0" width="80" height="42" rx="5" fill="#d91b1b" stroke="#ff6b6b" strokeWidth="1.5" />
          <circle cx="70" cy="18" r="10" fill="url(#studRed)" stroke="#ff8080" strokeWidth="1.5" />
          <circle cx="104" cy="18" r="10" fill="url(#studRed)" stroke="#ff8080" strokeWidth="1.5" />

          {/* Middle Arm */}
          <rect x="44" y="68" width="68" height="38" rx="5" fill="#d91b1b" stroke="#ff6b6b" strokeWidth="1.5" />
          <circle cx="70" cy="84" r="10" fill="url(#studRed)" stroke="#ff8080" strokeWidth="1.5" />
          <circle cx="98" cy="84" r="10" fill="url(#studRed)" stroke="#ff8080" strokeWidth="1.5" />

          {/* Bottom Arm */}
          <rect x="44" y="132" width="80" height="42" rx="5" fill="#d91b1b" stroke="#ff6b6b" strokeWidth="1.5" />
          <circle cx="70" cy="150" r="10" fill="url(#studRed)" stroke="#ff8080" strokeWidth="1.5" />
          <circle cx="104" cy="150" r="10" fill="url(#studRed)" stroke="#ff8080" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

export default function HomePage() {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSkillIndex, setActiveSkillIndex] = useState(0);
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0);

  // Quick message state
  const [contactName, setContactName] = useState("");
  const [contactClass, setContactClass] = useState("XII TKJ 1");
  const [contactMessage, setContactMessage] = useState("");

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;
    const text = `Halo Pak Wahyu, perkenalkan saya ${contactName || "Siswa"} dari kelas ${contactClass}. Pesan: ${contactMessage}`;
    const url = `https://wa.me/6282185903635?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  // Keahlian & Ruang Lingkup Materi Vokasi
  const skillsData = [
    {
      id: "cloud",
      title: "Administrasi Cloud Computing & Virtualisasi",
      category: "Infrastruktur Cloud",
      image: "/images/cloud-datacenter.jpg",
      icon: Cloud,
      description:
        "Penguasaan teknologi virtualisasi server industri, hypervisor type-1 dan type-2 (KVM, Proxmox VE, VirtualBox), manajemen instance cloud IaaS, serta alokasi resource vCPU, vRAM, dan virtual storage secara efisien.",
      competencies: [
        "Arsitektur Hypervisor & Virtual Machine Orchestration",
        "Setup VM Ubuntu Server 22.04 LTS Headless",
        "Virtual Storage Partitioning & Snapshot Checkpoint",
        "Topologi Jaringan Virtual NAT, Bridged & Internal Network",
      ],
      link: "/kelas/cloud-computing",
      ctaText: "Pelajari Modul Cloud",
    },
    {
      id: "linux",
      title: "Administrasi Sistem Jaringan (Linux Server ASJ)",
      category: "Sistem Operasi Server",
      image: "/images/linux-sysadmin.jpg",
      icon: Server,
      description:
        "Konfigurasi dan pemeliharaan layanan server mandiri berbasis distro Debian dan Ubuntu Server: DNS Server (BIND9), Web Server (Nginx & Apache), Database Server (MariaDB), serta otomasi script Bash CLI.",
      competencies: [
        "Manajemen User, Permission chmod/chown & Sudoers",
        "Konfigurasi Web Server Nginx & Multi Virtual Host",
        "Setup Database MariaDB & Manajemen Privilese SQL",
        "Pemantauan Beban Sistem (top, htop, systemd service)",
      ],
      link: "#daftar-kelas",
      ctaText: "Lihat Silabus ASJ",
    },
    {
      id: "network",
      title: "Infrastruktur Jaringan & Routing Dinamis (AIJ)",
      category: "Routing & Switching Enterprise",
      image: "/images/network-routing.jpg",
      icon: Network,
      description:
        "Perancangan topologi jaringan skala enterprise menggunakan RouterBOARD MikroTik dan switch manageable: implementasi routing dinamis OSPF dan BGP, VLAN Trunking 802.1Q, Firewall Filter, dan Quality of Service (QoS).",
      competencies: [
        "VLAN Trunking, Inter-VLAN Routing & Bridge Port",
        "Routing Dinamis OSPF Single & Multi Area",
        "Mangle, NAT Rule, & Firewall Filtering Policy",
        "Bandwidth Management Queue Tree & Simple Queue",
      ],
      link: "#daftar-kelas",
      ctaText: "Lihat Silabus AIJ",
    },
    {
      id: "security",
      title: "Keamanan Jaringan & Cyber Security",
      category: "Defensive Security",
      image: "/images/cyber-security.jpg",
      icon: ShieldCheck,
      description:
        "Penerapan standar keamanan sistem jaringan vokasi: hardening akses remote SSH menggunakan Public Key Encryption, proteksi port scanning, audit integritas server, dan implementasi tunnel VPN WireGuard terenkripsi.",
      competencies: [
        "SSH Hardening & Autentikasi Kunci Kriptografi",
        "Konfigurasi Firewall UFW & Port Security Rules",
        "Audit Vulnerability Port Scanning via Nmap",
        "Enkripsi Jalur Remote dengan VPN WireGuard",
      ],
      link: "#daftar-kelas",
      ctaText: "Lihat Silabus Keamanan",
    },
  ];

  // Bagaimana Sistem Pembelajaran Ini Membantu Siswa
  const workflowData = [
    {
      step: 1,
      title: "Pembelajaran Terarah & Berbasis Tantangan (Guided Stepper)",
      subtitle: "Setiap langkah dirancang urut agar siswa terpandu",
      image: "/images/stepper-roadmap.jpg",
      icon: Layers,
      description:
        "Siswa mengikuti alur pembelajaran langkah demi langkah mulai dari Pre-Test diagnostik, pendalaman materi teori, praktikum laboratorium, unggah portofolio tugas, hingga Post-Test evaluasi. Tahap berikutnya terbuka otomatis setelah siswa menyelesaikan tantangan.",
      points: [
        "Gembok otomatis untuk memastikan siswa mengikuti alur berurutan",
        "Soal pre-test & post-test interaktif dengan kalkulasi skor otomatis",
        "Checklist checkpoint portofolio praktikum mandiri",
      ],
    },
    {
      step: 2,
      title: "Hands-on Virtual Linux Terminal (Langsung di Browser)",
      subtitle: "Bebas bereksperimen perintah tanpa takut merusak sistem",
      image: "/images/student-lab.jpg",
      icon: Terminal,
      description:
        "Siswa tidak perlu repot melakukan instalasi software berat di laptop masing-masing. Website ini menyediakan terminal simulator interaktif dengan fitur salin perintah 1-klik, respons feedback otomatis, dan output real-time menyerupai server Ubuntu asli.",
      points: [
        "Tombol salin 1-klik untuk seluruh baris perintah Ubuntu",
        "Simulator CLI interaktif dengan umpan balik perintah langsung",
        "Dapat digunakan di laptop spek standar laboratorium sekolah",
      ],
    },
    {
      step: 3,
      title: "Responsif & Mobile-Friendly (Bisa dari Smartphone)",
      subtitle: "Fleksibel dipelajari di mana saja dan kapan saja",
      image: "/images/mobile-learning.jpg",
      icon: Smartphone,
      description:
        "Memahami kendala bahwa tidak semua siswa memiliki laptop di rumah, seluruh tampilan website, modul teori, materi bacaan, dan quiz interaktif dirancang responsif serta sangat nyaman diakses dari layar smartphone.",
      points: [
        "Tata letak luas (full-page) yang nyaman dibaca di smartphone & PC",
        "Akses materi dan persiapan pre-test dari mana saja",
        "Navigasi praktis dengan tombol langkah sebelumnya dan selanjutnya",
      ],
    },
    {
      step: 4,
      title: "Sertifikat Digital Kompetensi Terverifikasi",
      subtitle: "Bukti kelulusan resmi dengan nilai dan nama lengkap siswa",
      image: "/images/digital-certificate.jpg",
      icon: Award,
      description:
        "Siswa yang berhasil menyelesaikan seluruh tahapan dan mencapai nilai di atas standar KKM (75) otomatis memperoleh Sertifikat Digital resmi bertaraf vokasi yang dapat dicetak (Ctrl + P) untuk arsip portofolio kejuruan.",
      points: [
        "Pencantuman otomatis Nama Siswa, NIS, Kelas, dan Nilai Akhir",
        "Predikat kelulusan dan tanggal penyelesaian praktikum",
        "Siap dicetak dengan format cetak profesional ramah kertas",
      ],
    },
  ];

  // Kelas yang diampu
  const classesList = [
    {
      id: "cloud-computing",
      title: "Administrasi Cloud Computing & Virtualisasi",
      subtitle: "Mata Pelajaran Produktif TKJ",
      status: "Tersedia & Aktif",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      description:
        "Mempelajari arsitektur virtualisasi server, Type-2 Hypervisor menggunakan Oracle VM VirtualBox, instalasi Ubuntu Server 22.04 LTS, dan konfigurasi jaringan NAT/Bridged.",
      href: "/kelas/cloud-computing",
      active: true,
      highlights: [
        "Pertemuan 1: Setup VM Ubuntu Server 22.04 LTS",
        "Pertemuan 2: Instalasi OS CLI & Partisi Storage",
        "Interactive 1-Click Copy CLI Terminal",
        "Alokasi 4 JP (180 Menit) Praktikum Mandiri",
      ],
      icon: Cloud,
    },
    {
      id: "asj",
      title: "Administrasi Sistem Jaringan (ASJ - Linux Server)",
      subtitle: "Mata Pelajaran Produktif TKJ",
      status: "Segera Rilis",
      statusColor: "bg-amber-50 text-amber-700 border-amber-200",
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
    },
    {
      id: "aij",
      title: "Administrasi Infrastruktur Jaringan (AIJ)",
      subtitle: "Mata Pelajaran Produktif TKJ",
      status: "Segera Rilis",
      statusColor: "bg-sky-50 text-sky-700 border-sky-200",
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
    },
    {
      id: "cyber-security",
      title: "Dasar Keamanan Jaringan & Cyber Security",
      subtitle: "Mata Pelajaran Produktif TKJ",
      status: "Segera Rilis",
      statusColor: "bg-purple-50 text-purple-700 border-purple-200",
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
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-sky-100 selection:text-sky-900">
      {/* ========================================================================= */}
      {/* 1. TOP MENU / FULLPAGE INTERACTIVE NAVBAR */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">
          {/* Left: Official Logo + Title */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative h-12 w-12 sm:h-13 sm:w-13 rounded-2xl bg-white p-1 border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
              <Image
                src="/logo-tekaje.png"
                alt="Logo TEKAJE"
                width={52}
                height={52}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight group-hover:text-sky-600 transition-colors">
                  TEKAJE LABS
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200 hidden sm:inline-block">
                  SMK Telkom Lampung
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Portal Pembelajaran &bull; Wahyu Rahmat Hidayat, S.Kom.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#profil" className="hover:text-sky-600 transition-colors">
              Profil
            </a>
            <a href="#keahlian" className="hover:text-sky-600 transition-colors">
              Keahlian Vokasi
            </a>
            <a href="#alur-belajar" className="hover:text-sky-600 transition-colors">
              Alur Belajar
            </a>
            <a href="#daftar-kelas" className="hover:text-sky-600 transition-colors">
              Daftar Kelas
            </a>
            <a href="#konsultasi" className="hover:text-sky-600 transition-colors">
              Konsultasi
            </a>

            {/* HANYA MUNCUL JIKA GURU SUDAH LOGIN */}
            {user.isLoggedIn && user.role === "guru" && (
              <Link
                href="/manajemen-guru"
                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200/80 transition-colors"
              >
                Kelola Siswa
              </Link>
            )}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <UserNavPill />

            <a
              href="#daftar-kelas"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-sky-600 transition-all shadow-sm"
            >
              <BookOpen className="h-4 w-4" />
              <span>Lihat Kelas</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
              title="Menu Navigasi"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Fullpage Overlay Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-slate-900/95 backdrop-blur-xl z-50 p-6 flex flex-col justify-between text-white animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                <Image
                  src="/logo-tekaje.png"
                  alt="Logo TEKAJE"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <div>
                  <h4 className="font-bold text-white">TEKAJE LABS</h4>
                  <p className="text-xs text-slate-400">SMK Telkom Lampung</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 text-base font-semibold">
                <a
                  href="#profil"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl hover:bg-white/10 transition-colors"
                >
                  Profil Pendidik
                </a>
                <a
                  href="#keahlian"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl hover:bg-white/10 transition-colors"
                >
                  Keahlian Vokasi TKJ
                </a>
                <a
                  href="#alur-belajar"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl hover:bg-white/10 transition-colors"
                >
                  Alur Pembelajaran
                </a>
                <a
                  href="#daftar-kelas"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl hover:bg-white/10 transition-colors"
                >
                  Daftar Kelas Pembelajaran
                </a>
                <a
                  href="#konsultasi"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl hover:bg-white/10 transition-colors"
                >
                  Konsultasi &amp; Bantuan
                </a>

                {/* HANYA MUNCUL DI MOBILE JIKA GURU SUDAH LOGIN */}
                {user.isLoggedIn && user.role === "guru" && (
                  <Link
                    href="/manajemen-guru"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 rounded-xl bg-indigo-600/30 text-indigo-300 border border-indigo-500/40"
                  >
                    Portal Manajemen Guru
                  </Link>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 text-center">
              &copy; {new Date().getFullYear()} TEKAJE LABS &bull; Wahyu Rahmat Hidayat, S.Kom.
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION: MASKOT TANPA KOTAK PUTIH (BESAR & MENYATU) + BIODATA */}
      {/* ========================================================================= */}
      <section id="profil" className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 py-12 md:py-20 border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* HERO KIRI: MASKOT BESAR & MENYATU TANPA BINGKAI KOTAK PUTIH */}
            <div className="lg:col-span-5 flex justify-center items-center relative order-2 lg:order-1">
              {/* Ambient radial soft glow menyatu alami dengan halaman */}
              <div className="absolute w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] bg-gradient-to-tr from-sky-200/50 via-indigo-150/30 to-teal-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

              <div className="relative w-full max-w-[460px] sm:max-w-[520px] aspect-square flex items-center justify-center">
                <Image
                  src="/maskot-tekaje.png"
                  alt="Maskot TEKAJE SMK Telkom Lampung"
                  width={520}
                  height={520}
                  className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(15,23,42,0.14)] transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>
            </div>

            {/* HERO KANAN: TENTANG SINGKAT PAK WAHYU & TOMBOL CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-semibold shadow-xs">
                <GraduationCap className="h-4 w-4 text-sky-600" />
                <span>Portal Resmi Guru Produktif &bull; SMK Telkom Lampung</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  Wahyu Rahmat Hidayat,{" "}
                  <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-teal-600 bg-clip-text text-transparent">
                    S.Kom.
                  </span>
                </h1>
                <p className="text-base sm:text-lg font-bold text-sky-700">
                  Guru Produktif Teknik Komputer &amp; Jaringan (TKJ)
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Selamat datang di platform pembelajaran vokasi digital. Website ini dirancang khusus untuk memandu siswa SMK Telkom Lampung dalam menguasai keterampilan nyata di bidang <b>Cloud Computing</b>, <b>Linux Server Administration</b>, <b>Infrastruktur Routing</b>, dan <b>Keamanan Jaringan</b> melalui praktikum terarah (guided step-by-step) dan simulator terminal interaktif.
              </p>

              {/* Action Buttons: Lihat Daftar Kelas & Mulai Praktikum */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#daftar-kelas"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-lg shadow-sky-600/25 transition-all cursor-pointer transform hover:-translate-y-0.5"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Lihat Daftar Kelas</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                <Link
                  href="/kelas/cloud-computing"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-sm transition-all"
                >
                  <Cloud className="h-4 w-4 text-sky-600" />
                  <span>Modul Cloud Computing</span>
                </Link>
              </div>

              {/* Stats Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">8+ Modul</div>
                  <div className="text-[11px] font-semibold text-slate-500">Praktikum Lab</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="text-xl sm:text-2xl font-black text-sky-600 font-mono">100%</div>
                  <div className="text-[11px] font-semibold text-slate-500">Hands-on CLI</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="text-xl sm:text-2xl font-black text-indigo-600 font-mono">24/7</div>
                  <div className="text-[11px] font-semibold text-slate-500">Akses Belajar</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="text-xl sm:text-2xl font-black text-emerald-600 font-mono">Vokasi</div>
                  <div className="text-[11px] font-semibold text-slate-500">Standar Industri</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. KEAHLIAN & RUANG LINGKUP MATERI VOKASI: VERTICAL SLIDER MODULAR TECH */}
      {/* ========================================================================= */}
      <section id="keahlian" className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
          {/* Section Header (Clean tanpa badge box) */}
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Keahlian &amp; Ruang Lingkup Materi Vokasi
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Materi pembelajaran disusun selaras dengan kebutuhan dunia kerja telekomunikasi, administrasi server Linux, perancangan jaringan, dan komputasi awan industri.
            </p>
          </div>

          {/* Vertical Slider Component (Modular Square Tech UI) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Tight, Square Navigation List */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {/* Terminal-style header bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-700">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-sky-600"></span>
                  PILIH DISIPLIN PRAKTIKUM
                </span>
                <span className="text-slate-500 font-semibold">0{activeSkillIndex + 1} / 04</span>
              </div>

              {/* Compact Square Buttons (Tight Spacing, No Stretched Gaps) */}
              <div className="flex flex-col gap-2">
                {skillsData.map((item, index) => {
                  const IconComponent = item.icon;
                  const isSelected = activeSkillIndex === index;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSkillIndex(index)}
                      className={`text-left p-3.5 sm:p-4 border transition-all cursor-pointer relative ${
                        isSelected
                          ? "bg-sky-50/70 border-sky-500 border-l-4 border-l-sky-600 shadow-xs"
                          : "bg-white hover:bg-slate-50 border-slate-200 border-l-4 border-l-transparent text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Square Index / Icon Box */}
                        <div
                          className={`h-10 w-10 flex items-center justify-center shrink-0 border ${
                            isSelected
                              ? "bg-sky-600 text-white border-sky-600 shadow-xs"
                              : "bg-slate-50 text-slate-500 border-slate-200"
                          }`}
                        >
                          <IconComponent className="h-5 w-5" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-mono text-[10px] font-bold text-slate-400">
                              0{index + 1}
                            </span>
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider truncate ${
                                isSelected ? "text-sky-700" : "text-slate-500"
                              }`}
                            >
                              {item.category}
                            </span>
                          </div>
                          <h3
                            className={`font-bold text-xs sm:text-sm leading-snug truncate ${
                              isSelected ? "text-slate-900 font-extrabold" : "text-slate-700"
                            }`}
                          >
                            {item.title}
                          </h3>
                        </div>

                        <ChevronRight
                          className={`h-4 w-4 shrink-0 transition-transform ${
                            isSelected ? "text-sky-600 translate-x-1" : "text-slate-300"
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Architectural Info Card */}
              <div className="border border-slate-200 bg-slate-50/80 p-4 text-xs text-slate-600 space-y-2">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="font-bold text-slate-700">KURIKULUM VOKASI TKJ</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-500"></span>
                    STANDAR INDUSTRI
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-500">
                  Selaras dengan standar kompetensi kerja nasional (SKKNI) bidang Jaringan Komputer, Server Administrator, dan Cloud Computing.
                </p>
              </div>
            </div>

            {/* Right Column: Active Showcase Panel (Square Tech Box) */}
            <div className="lg:col-span-7">
              {(() => {
                const current = skillsData[activeSkillIndex];
                return (
                  <div className="bg-white border border-slate-200 shadow-sm flex flex-col animate-fade-in">
                    {/* Top Console Bar */}
                    <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 text-white font-mono text-xs border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-400"></span>
                        <span className="text-slate-300">LAB://TEKAJE/{current.id.toUpperCase()}</span>
                      </div>
                      <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider">
                        STATUS: READY TO PRACTICE
                      </span>
                    </div>

                    {/* Image Header with Square Frame */}
                    <div className="relative w-full aspect-[16/9] max-h-[340px] overflow-hidden bg-slate-950 border-b border-slate-200">
                      <Image
                        src={current.image}
                        alt={current.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-102"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3">
                        <span className="text-[11px] font-mono font-bold px-3 py-1 bg-slate-900/90 text-white border border-slate-700 shadow-xs">
                          {current.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 sm:p-7 space-y-6 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                          {current.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {current.description}
                        </p>
                      </div>

                      {/* Competencies Badges in Square Grid */}
                      <div className="space-y-2.5">
                        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                          Target Kompetensi Siswa:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {current.competencies.map((comp, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2.5 p-2.5 bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium hover:border-slate-300 transition-colors"
                            >
                              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                              <span className="truncate">{comp}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action CTA with Square Borders */}
                      <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                        <div className="font-mono text-xs text-slate-500">
                          VER: 2026.1 &bull; HANDS-ON TERMINAL CLI
                        </div>
                        <Link
                          href={current.link}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-all shadow-xs cursor-pointer border border-sky-600"
                        >
                          <span>{current.ctaText}</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. BAGAIMANA SISTEM INI MEMBANTU SISWA: VERTICAL SLIDER MODULAR TECH */}
      {/* ========================================================================= */}
      <section id="alur-belajar" className="py-16 md:py-24 bg-slate-50/80 border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
          {/* Header (Clean tanpa badge box) */}
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Bagaimana Sistem Pembelajaran Ini Membantu Siswa?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Dirancang untuk mengatasi kendala belajar teknis di sekolah kejuruan, memastikan setiap siswa terpandu dari awal hingga teruji kompeten.
            </p>
          </div>

          {/* Clean Modular Square Vertical Slider */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Nav: Vertical Step Buttons with Square Border & Tight Spacing */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {/* Header bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-white border border-slate-200 text-xs font-mono font-bold text-slate-700">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-sky-600"></span>
                  ALUR PEMBELAJARAN
                </span>
                <span className="text-slate-500 font-semibold">TAHAP 0{activeWorkflowIndex + 1} / 04</span>
              </div>

              {/* Tight Step Stack (No Stretched Gaps) */}
              <div className="flex flex-col gap-2">
                {workflowData.map((item, idx) => {
                  const isSelected = activeWorkflowIndex === idx;
                  return (
                    <button
                      key={item.step}
                      onClick={() => setActiveWorkflowIndex(idx)}
                      className={`text-left p-3.5 sm:p-4 border transition-all cursor-pointer relative ${
                        isSelected
                          ? "bg-white border-sky-500 border-l-4 border-l-sky-600 shadow-xs"
                          : "bg-white/70 hover:bg-white border-slate-200 border-l-4 border-l-transparent text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`h-9 w-9 border flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                            isSelected
                              ? "bg-sky-600 text-white border-sky-600 shadow-xs"
                              : "bg-slate-100 text-slate-600 border-slate-200"
                          }`}
                        >
                          0{item.step}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                            {item.subtitle}
                          </p>
                        </div>

                        <ChevronRight
                          className={`h-4 w-4 shrink-0 transition-transform ${
                            isSelected ? "text-sky-600 translate-x-1" : "text-slate-300"
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Architectural Card */}
              <div className="border border-slate-200 bg-white p-4 text-xs text-slate-600 space-y-2">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="font-bold text-slate-700">SISTEM KELULUSAN MANDIRI</span>
                  <span className="text-sky-700 font-bold">100% TERARAH</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-500">
                  Guru dapat memonitor progres siswa secara real-time melalui dashboard manajemen kelas dan log pengerjaan lab.
                </p>
              </div>
            </div>

            {/* Right Display: Active Showcase Card with Square Borders */}
            <div className="lg:col-span-7">
              {(() => {
                const curr = workflowData[activeWorkflowIndex];
                return (
                  <div className="bg-white border border-slate-200 p-5 sm:p-7 flex flex-col justify-between space-y-6 shadow-sm animate-fade-in">
                    {/* Active Image with Square Frame */}
                    <div className="relative w-full aspect-[16/9] max-h-[340px] overflow-hidden border border-slate-200 bg-slate-900">
                      <Image
                        src={curr.image}
                        alt={curr.title}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white font-mono text-xs">
                        <span className="font-bold px-3 py-1 bg-sky-600 text-white border border-sky-500">
                          TAHAP {curr.step} DARI 4
                        </span>
                        <span className="text-slate-200 hidden sm:inline text-[11px]">
                          PLATFORM PRAKTIKUM VOKASI
                        </span>
                      </div>
                    </div>

                    {/* Step Description & Key Points */}
                    <div className="space-y-4">
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                        {curr.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {curr.description}
                      </p>

                      <div className="space-y-2 pt-1">
                        {curr.points.map((pt, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2.5 p-2.5 bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium"
                          >
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. DAFTAR KELAS PEMBELAJARAN */}
      {/* ========================================================================= */}
      <section id="daftar-kelas" className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Daftar Kelas yang Diampu
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Pilih kelas di bawah ini untuk mengakses daftar silabus, panduan modul teori, dan praktikum hands-on lab virtual.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {classesList.map((c) => {
              const IconComp = c.icon;
              return (
                <div
                  key={c.id}
                  className={`p-7 rounded-3xl border transition-all flex flex-col justify-between ${
                    c.active
                      ? "bg-white border-sky-300 shadow-md hover:border-sky-400 hover:shadow-xl"
                      : "bg-slate-50/70 border-slate-200 opacity-80"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-2xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center">
                        <IconComp className="h-6 w-6" />
                      </div>
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${c.statusColor}`}>
                        {c.status}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-slate-400">{c.subtitle}</span>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                        {c.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {c.description}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      {c.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="h-3.5 w-3.5 text-sky-600 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-4">
                    {c.active ? (
                      <Link
                        href={c.href}
                        className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all cursor-pointer"
                      >
                        <span>Buka Silabus &amp; Praktikum</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 text-slate-400 font-semibold text-xs cursor-not-allowed"
                      >
                        <span>Dalam Tahap Pengembangan</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. KONSULTASI & BANTUAN BELAJAR: 6 SALURAN RESMI + QUICK FORM */}
      {/* ========================================================================= */}
      <section id="konsultasi" className="py-16 md:py-24 bg-slate-50/70 border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
          {/* Header (Clean tanpa badge box) */}
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Konsultasi &amp; Bantuan Belajar Siswa
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Siswa dapat berkonsultasi seputar kendala praktikum lab, penugasan, maupun materi kejuruan melalui saluran resmi Pak Wahyu di bawah ini.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: 6 Official Contact Channels */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-extrabold text-base text-slate-900">
                  Saluran Komunikasi Resmi:
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* 1. Email */}
                  <a
                    href="mailto:wahyu@smktelkom-lpg.sch.id"
                    className="p-4 rounded-2xl bg-slate-50 hover:bg-sky-50/60 border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all flex items-start gap-3 group"
                  >
                    <div className="h-10 w-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase text-slate-400">1. Email Resmi</span>
                      <p className="font-bold text-xs text-slate-900 truncate">
                        wahyu@smktelkom-lpg.sch.id
                      </p>
                      <span className="text-[11px] text-sky-600 font-semibold">Kirim Email &rarr;</span>
                    </div>
                  </a>

                  {/* 2. WhatsApp */}
                  <a
                    href="https://wa.me/6282185903635"
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all flex items-start gap-3 group"
                  >
                    <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase text-slate-400">2. WhatsApp Guru</span>
                      <p className="font-bold text-xs text-slate-900">0821-8590-3635</p>
                      <span className="text-[11px] text-emerald-600 font-semibold">Chat Langsung &rarr;</span>
                    </div>
                  </a>

                  {/* 3. GitHub */}
                  <a
                    href="https://github.com/wahyusmkte"
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all flex items-start gap-3 group"
                  >
                    <div className="h-10 w-10 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center shrink-0 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      <GithubIcon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase text-slate-400">3. GitHub Repo</span>
                      <p className="font-bold text-xs text-slate-900">github.com/wahyusmkte</p>
                      <span className="text-[11px] text-slate-600 font-semibold">Lihat Source Code &rarr;</span>
                    </div>
                  </a>

                  {/* 4. Instagram */}
                  <a
                    href="https://www.instagram.com/wahyurahmat55/"
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-2xl bg-slate-50 hover:bg-pink-50/60 border border-slate-200 hover:border-pink-300 hover:shadow-md transition-all flex items-start gap-3 group"
                  >
                    <div className="h-10 w-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                      <InstagramIcon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase text-slate-400">4. Instagram</span>
                      <p className="font-bold text-xs text-slate-900">@wahyurahmat55</p>
                      <span className="text-[11px] text-pink-600 font-semibold">Ikuti Kegiatan &rarr;</span>
                    </div>
                  </a>

                  {/* 5. Facebook */}
                  <a
                    href="https://www.facebook.com/wahyurahmat.hidayat.399"
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex items-start gap-3 group"
                  >
                    <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <FacebookIcon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase text-slate-400">5. Facebook</span>
                      <p className="font-bold text-xs text-slate-900 truncate">Wahyu Rahmat Hidayat</p>
                      <span className="text-[11px] text-blue-600 font-semibold">Profil Facebook &rarr;</span>
                    </div>
                  </a>

                  {/* 6. YouTube */}
                  <a
                    href="https://www.youtube.com/@WahyuRahmatHidayat-f3h"
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-2xl bg-slate-50 hover:bg-red-50/60 border border-slate-200 hover:border-red-300 hover:shadow-md transition-all flex items-start gap-3 group"
                  >
                    <div className="h-10 w-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <YoutubeIcon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase text-slate-400">6. YouTube Channel</span>
                      <p className="font-bold text-xs text-slate-900 truncate">@WahyuRahmatHidayat-f3h</p>
                      <span className="text-[11px] text-red-600 font-semibold">Tonton Video Lab &rarr;</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Direct Quick Message Form */}
            <div className="lg:col-span-5">
              <form onSubmit={handleSendWhatsApp} className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Kirim Pesan Cepat ke Guru
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Isi pertanyaan Anda dan langsung terhubung ke WhatsApp Pak Wahyu.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Nama Siswa *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Muhammad Rizki"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50 focus:bg-white font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Kelas TKJ *</label>
                  <select
                    value={contactClass}
                    onChange={(e) => setContactClass(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50 focus:bg-white font-medium"
                  >
                    <option value="XII TKJ 1">XII TKJ 1</option>
                    <option value="XII TKJ 2">XII TKJ 2</option>
                    <option value="XI TKJ 1">XI TKJ 1</option>
                    <option value="XI TKJ 2">XI TKJ 2</option>
                    <option value="X TJKT">X TJKT</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Pesan / Pertanyaan Praktikum *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Contoh: Pak, saya ingin bertanya tentang cara partisi LVM pada Pertemuan 2..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50 focus:bg-white font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Kirim via WhatsApp Pak Wahyu</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FOOTER: LOGO KIRI, SOFT BACKGROUND, & LEGO-STYLE "TEKAJE" BANNER */}
      {/* ========================================================================= */}
      <footer className="bg-slate-800 text-slate-300 text-xs border-t border-slate-700 pt-16 pb-8 overflow-hidden relative">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
          {/* Main Footer Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
            {/* Paling Kiri: Logo TEKAJE + Identitas Sekolah */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-2xl bg-white p-1 border border-slate-600 shadow-sm flex items-center justify-center overflow-hidden">
                  <Image
                    src="/logo-tekaje.png"
                    alt="Logo TEKAJE"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-white tracking-tight">
                    TEKAJE LABS
                  </h4>
                  <p className="text-xs text-sky-400 font-medium">
                    SMK Telkom Lampung
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
                Portal pembelajaran dan praktikum virtual mandiri Teknik Komputer &amp; Jaringan. Membina generasi teknisi andal berbasis standar industri teknologi cloud dan telekomunikasi.
              </p>

              <div className="text-[11px] text-slate-300 space-y-1 font-medium">
                <p>📍 Jl. Raya Gadingrejo, Kab. Pringsewu, Lampung</p>
                <p>✉️ wahyu@smktelkom-lpg.sch.id &bull; 📞 0821-8590-3635</p>
              </div>
            </div>

            {/* Navigasi Cepat */}
            <div className="lg:col-span-3 space-y-3">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider">
                Navigasi Cepat
              </h5>
              <ul className="space-y-2 text-xs text-slate-300">
                <li>
                  <a href="#profil" className="hover:text-white transition-colors">
                    Profil Pendidik
                  </a>
                </li>
                <li>
                  <a href="#keahlian" className="hover:text-white transition-colors">
                    Keahlian Vokasi TKJ
                  </a>
                </li>
                <li>
                  <a href="#alur-belajar" className="hover:text-white transition-colors">
                    Alur Pembelajaran
                  </a>
                </li>
                <li>
                  <a href="#daftar-kelas" className="hover:text-white transition-colors">
                    Daftar Kelas Praktikum
                  </a>
                </li>
                {user.isLoggedIn && user.role === "guru" && (
                  <li>
                    <Link href="/manajemen-guru" className="hover:text-white transition-colors text-indigo-400 font-bold">
                      Portal Manajemen Guru
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            {/* Kelas & Praktikum */}
            <div className="lg:col-span-4 space-y-3">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider">
                Kelas Unggulan
              </h5>
              <div className="space-y-2 text-xs">
                <Link
                  href="/kelas/cloud-computing"
                  className="block p-3 rounded-2xl bg-slate-700/60 border border-slate-600 hover:border-sky-400 transition-colors"
                >
                  <div className="font-bold text-white">Cloud Computing (Aktif)</div>
                  <div className="text-[11px] text-slate-300">
                    Virtualisasi KVM, VirtualBox, &amp; Ubuntu Server 22.04 LTS
                  </div>
                </Link>
                <div className="p-3 rounded-2xl bg-slate-700/30 border border-slate-700 text-slate-400">
                  <div className="font-semibold">Administrasi Server (ASJ) &bull; Segera Hadir</div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright bar */}
          <div className="pt-6 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <div>
              &copy; {new Date().getFullYear()} TEKAJE LABS &bull; SMK Telkom Lampung &bull; Pendidik: Wahyu Rahmat Hidayat, S.Kom.
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com/wahyusmkte" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                GitHub
              </a>
              <a href="https://instagram.com/wahyurahmat55" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                Instagram
              </a>
              <a href="https://youtube.com/@WahyuRahmatHidayat-f3h" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                YouTube
              </a>
            </div>
          </div>

          {/* LEGO STYLE "TEKAJE" FOOTER BANNER */}
          <div className="pt-4 border-t border-slate-700/50">
            <LegoTekajeBanner />
          </div>
        </div>
      </footer>
    </div>
  );
}
