import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
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
    <html lang="id" className={plusJakarta.variable}>
      <body className="min-h-screen flex flex-col antialiased font-sans selection:bg-sky-100 selection:text-sky-900">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
