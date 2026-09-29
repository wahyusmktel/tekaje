import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TEKAJE LABS — Platform Pembelajaran & Praktikum Cloud Computing | Wahyu Rahmat Hidayat",
  description:
    "Portal kelas online dan panduan praktikum mandiri Teknik Komputer & Jaringan, Virtualisasi Ubuntu Server, dan Cloud Computing oleh Wahyu Rahmat Hidayat.",
  keywords: [
    "Cloud Computing",
    "Ubuntu Server",
    "VirtualBox",
    "Praktikum TKJ",
    "Wahyu Rahmat Hidayat",
    "SMK Telkom Lampung",
    "Modul Ajar Cloud",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col antialiased selection:bg-sky-100 selection:text-sky-900">
        <AuthProvider>
          {children}
          <LoginModal />
        </AuthProvider>
      </body>
    </html>
  );
}
