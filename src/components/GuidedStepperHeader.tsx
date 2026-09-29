"use client";

import { useAuth } from "@/context/AuthContext";
import {
  CheckCircle2,
  Lock,
  Sparkles,
  Unlock,
  AlertCircle,
  FileQuestion,
  BookOpen,
  Terminal,
  CheckSquare,
  Award,
  FileBadge,
} from "lucide-react";

interface GuidedStepperHeaderProps {
  currentStep: number;
  maxUnlockedStep: number;
  onSelectStep: (step: number) => void;
  meetingNumber: number;
  meetingTitle: string;
}

export default function GuidedStepperHeader({
  currentStep,
  maxUnlockedStep,
  onSelectStep,
  meetingNumber,
  meetingTitle,
}: GuidedStepperHeaderProps) {
  const { user, teacherBypassLocks, setTeacherBypassLocks } = useAuth();

  const steps = [
    { number: 1, title: "Pre-Test Awal", short: "Pre-Test", icon: FileQuestion },
    { number: 2, title: "Teori & Konsep", short: "Teori", icon: BookOpen },
    { number: 3, title: "Hands-on Lab", short: "Simulator", icon: Terminal },
    { number: 4, title: "Checklist Bukti", short: "Portofolio", icon: CheckSquare },
    { number: 5, title: "Post-Test Evaluasi", short: "Post-Test", icon: Award },
    { number: 6, title: "Sertifikat Digital", short: "Sertifikat", icon: FileBadge },
  ];

  const handleStepClick = (stepNum: number) => {
    const isUnlocked = teacherBypassLocks || stepNum <= maxUnlockedStep;
    if (isUnlocked) {
      onSelectStep(stepNum);
    } else {
      alert(
        `🔒 Langkah ${stepNum} masih terkunci!\n\nSiswa harus menyelesaikan tantangan pada Langkah ${stepNum - 1} terlebih dahulu agar langkah berikutnya dapat terbuka secara bertahap.`
      );
    }
  };

  const effectiveMaxUnlocked = teacherBypassLocks ? 6 : maxUnlockedStep;
  const progressPercent = Math.round(((effectiveMaxUnlocked - 1) / 5) * 100);

  return (
    <div className="sticky top-18 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 space-y-2.5">
        {/* Mobile / Desktop Top Bar */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 shrink-0">
              Ptm {meetingNumber}
            </span>
            <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
              {meetingTitle}
            </h2>
          </div>

          {/* Teacher Bypass Toggle */}
          {user.role === "guru" && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setTeacherBypassLocks(!teacherBypassLocks)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  teacherBypassLocks
                    ? "bg-amber-100 text-amber-900 border border-amber-300"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
                }`}
                title="Buka semua gembok tahap untuk demo mengajar"
              >
                {teacherBypassLocks ? (
                  <>
                    <Unlock className="h-3.5 w-3.5 text-amber-600" />
                    <span>Mode Guru (Semua Terbuka)</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-3.5 w-3.5 text-slate-500" />
                    <span>Mode Siswa (Terkunci)</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Stepper Buttons (Horizontal Scrollable for Smartphones) */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 text-xs">
          {steps.map((st) => {
            const IconComp = st.icon;
            const isCurrent = currentStep === st.number;
            const isPassed = !teacherBypassLocks && st.number < maxUnlockedStep;
            const isUnlocked = teacherBypassLocks || st.number <= maxUnlockedStep;

            return (
              <button
                key={st.number}
                onClick={() => handleStepClick(st.number)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                  isCurrent
                    ? "bg-slate-900 text-white font-bold shadow-md shadow-slate-900/10 scale-102"
                    : isPassed
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-medium"
                    : isUnlocked
                    ? "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 font-medium"
                    : "bg-slate-100 text-slate-400 border border-slate-200/60 cursor-not-allowed opacity-75"
                }`}
              >
                {isPassed ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                ) : !isUnlocked ? (
                  <Lock className="h-3 w-3 text-slate-400 shrink-0" />
                ) : (
                  <IconComp
                    className={`h-3.5 w-3.5 shrink-0 ${
                      isCurrent ? "text-sky-400" : "text-slate-500"
                    }`}
                  />
                )}

                <span>
                  {st.number}. <span className="hidden sm:inline">{st.title}</span>
                  <span className="sm:hidden">{st.short}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Thin Progress line */}
      <div className="w-full h-1 bg-slate-100 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 transition-all duration-500"
          style={{ width: `${Math.min(100, Math.max(10, (currentStep / 6) * 100))}%` }}
        />
      </div>
    </div>
  );
}
