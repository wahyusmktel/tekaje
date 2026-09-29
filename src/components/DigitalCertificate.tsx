"use client";

import { useRef } from "react";
import {
  Award,
  CheckCircle2,
  Printer,
  ShieldCheck,
  GraduationCap,
  Calendar,
} from "lucide-react";

interface CertificateProps {
  studentName: string;
  studentClass: string;
  studentNis: string;
  meetingNumber: number;
  meetingTitle: string;
  finalScore: number;
  certifiedAt: string;
}

export default function DigitalCertificate({
  studentName,
  studentClass,
  studentNis,
  meetingNumber,
  meetingTitle,
  finalScore,
  certifiedAt,
}: CertificateProps) {
  const getPredicate = (score: number) => {
    if (score >= 90) return "Sangat Memuaskan (A)";
    if (score >= 80) return "Memuaskan (B+)";
    if (score >= 75) return "Baik (B)";
    return "Cukup";
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Certificate Frame */}
      <div
        id="certificate-print-area"
        className="relative bg-white border-8 border-double border-slate-300 rounded-3xl p-6 sm:p-12 shadow-2xl text-center space-y-6 overflow-hidden max-w-4xl mx-auto"
        style={{ minHeight: "520px" }}
      >
        {/* Subtle decorative corners */}
        <div className="absolute top-3 left-3 w-16 h-16 border-t-4 border-l-4 border-amber-500/40 rounded-tl-xl pointer-events-none" />
        <div className="absolute top-3 right-3 w-16 h-16 border-t-4 border-r-4 border-amber-500/40 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-16 h-16 border-b-4 border-l-4 border-amber-500/40 rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-16 h-16 border-b-4 border-r-4 border-amber-500/40 rounded-br-xl pointer-events-none" />

        {/* School & Brand Header */}
        <div className="space-y-1 border-b-2 border-slate-100 pb-4">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
            <GraduationCap className="h-4 w-4 text-sky-600" />
            <span>SMK TELKOM LAMPUNG &bull; BIDANG KEAHLIAN TJKT / TKJ</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            TEKAJE<span className="text-sky-600">LABS</span> ACADEMY
          </div>
          <p className="text-[11px] text-slate-400">
            Sistem Pembelajaran &amp; Validasi Kompetensi Praktikum Mandiri
          </p>
        </div>

        {/* Title */}
        <div className="space-y-1 pt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold uppercase tracking-wider">
            <Award className="h-3.5 w-3.5 text-amber-600" />
            <span>Sertifikat Kelulusan Praktikum</span>
          </div>
          <h2 className="text-xs sm:text-sm text-slate-500 uppercase tracking-widest pt-2">
            Diberikan dengan bangga kepada:
          </h2>
          <div className="text-2xl sm:text-4xl font-extrabold text-slate-900 underline decoration-sky-400 decoration-2 underline-offset-8 py-2">
            {studentName || "Siswa Teladan TKJ"}
          </div>
          <div className="text-xs sm:text-sm text-slate-600 font-medium">
            Kelas: <b>{studentClass || "XI TKJ"}</b> &bull; NIS: <b>{studentNis || "2401000"}</b>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed pt-2">
          Telah berhasil menyelesaikan seluruh rangkaian tahapan pembelajaran, uji diagnostik,
          panduan hands-on lab, dan evaluasi hasil belajar mandiri pada materi:
        </p>

        {/* Meeting Box */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 max-w-xl mx-auto space-y-1">
          <div className="text-xs font-bold text-sky-600 uppercase tracking-wider">
            Mata Pelajaran: Cloud Computing &bull; Pertemuan {meetingNumber}
          </div>
          <div className="text-sm sm:text-base font-bold text-slate-900">
            {meetingTitle}
          </div>
        </div>

        {/* Score & Predicate */}
        <div className="flex items-center justify-center gap-6 pt-2">
          <div className="text-center p-3 rounded-xl bg-emerald-50 border border-emerald-200 min-w-[120px]">
            <div className="text-[10px] uppercase font-bold text-emerald-700">Nilai Akhir</div>
            <div className="text-2xl font-black text-emerald-800 font-mono">
              {finalScore} <span className="text-xs font-normal">/ 100</span>
            </div>
          </div>

          <div className="text-center p-3 rounded-xl bg-sky-50 border border-sky-200 min-w-[140px]">
            <div className="text-[10px] uppercase font-bold text-sky-700">Predikat</div>
            <div className="text-sm font-bold text-sky-900 mt-1">
              {getPredicate(finalScore)}
            </div>
          </div>
        </div>

        {/* Signature & Date */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-2xl mx-auto">
          <div className="text-left text-xs text-slate-500 space-y-1">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>Tanggal Terbit: <b>{certifiedAt}</b></span>
            </div>
            <div>Verifikasi Digital: <b>VALID &bull; SMK Telkom</b></div>
          </div>

          <div className="text-center sm:text-right space-y-1">
            <div className="text-xs text-slate-500">Guru Pengampu Mata Pelajaran,</div>
            <div className="font-script text-base text-sky-700 font-bold italic pt-1">
              Wahyu Rahmat Hidayat
            </div>
            <div className="font-bold text-xs text-slate-900">
              Wahyu Rahmat Hidayat, S.Kom.
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              NIP: 198801012015011001
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
        >
          <Printer className="h-4 w-4" />
          <span>Cetak / Simpan PDF Sertifikat</span>
        </button>
      </div>
    </div>
  );
}
