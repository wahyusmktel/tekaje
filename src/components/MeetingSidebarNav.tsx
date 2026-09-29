"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  CheckCircle2,
  Lock,
  Unlock,
  BookOpen,
  Terminal,
  CheckSquare,
  Award,
  FileBadge,
  FileQuestion,
  Gamepad2,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Layers,
  ArrowLeft,
  GraduationCap,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

export interface StepItem {
  number: number;
  title: string;
  short: string;
  type: string;
  duration: string;
  icon: any;
}

interface MeetingSidebarNavProps {
  steps: StepItem[];
  currentStep: number;
  maxUnlockedStep: number;
  onSelectStep: (step: number) => void;
  meetingNumber: number;
  meetingTitle: string;
  isOpenDesktop: boolean;
  onToggleDesktop: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenMobile: () => void;
}

export default function MeetingSidebarNav({
  steps,
  currentStep,
  maxUnlockedStep,
  onSelectStep,
  meetingNumber,
  meetingTitle,
  isOpenDesktop,
  onToggleDesktop,
  isOpenMobile,
  onCloseMobile,
  onOpenMobile,
}: MeetingSidebarNavProps) {
  const { user, teacherBypassLocks, setTeacherBypassLocks } = useAuth();

  const handleStepClick = (stepNum: number) => {
    const isUnlocked = teacherBypassLocks || stepNum <= maxUnlockedStep;
    if (isUnlocked) {
      onSelectStep(stepNum);
      onCloseMobile();
    } else {
      alert(
        `🔒 Langkah ${stepNum} Masih Terkunci!\n\nSelesaikan tantangan pada Langkah ${stepNum - 1} terlebih dahulu agar langkah ini dapat terbuka secara bertahap.`
      );
    }
  };

  const effectiveMaxUnlocked = teacherBypassLocks ? steps.length : maxUnlockedStep;
  const progressPercent = Math.round(((effectiveMaxUnlocked - 1) / (steps.length - 1)) * 100);

  // Content of the sidebar (shared between desktop and mobile drawer)
  const sidebarContent = (
    <div className="flex flex-col h-full bg-white text-slate-800">
      {/* Sidebar Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200/90 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-sky-100 text-sky-800">
              Pertemuan 0{meetingNumber}
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              {steps.length} Langkah Belajar
            </span>
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={onToggleDesktop}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Sembunyikan Sidebar"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div>
          <h2 className="text-sm font-extrabold text-slate-900 line-clamp-2 leading-snug">
            {meetingTitle}
          </h2>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500 font-medium">Progres Pembelajaran</span>
            <span className="font-bold text-sky-600 font-mono">{progressPercent}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Teacher Bypass Toggle */}
        {user.role === "guru" && (
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => setTeacherBypassLocks(!teacherBypassLocks)}
              className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                teacherBypassLocks
                  ? "bg-amber-50 text-amber-900 border border-amber-300"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <div className="flex items-center gap-1.5">
                {teacherBypassLocks ? (
                  <Unlock className="h-3.5 w-3.5 text-amber-600" />
                ) : (
                  <Lock className="h-3.5 w-3.5 text-slate-500" />
                )}
                <span>Mode Guru (Akses Semua)</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                teacherBypassLocks ? "bg-amber-200 text-amber-900" : "bg-slate-200 text-slate-700"
              }`}>
                {teacherBypassLocks ? "ON" : "OFF"}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Stepper Roadmap List (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 no-scrollbar">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 pb-1">
          Daftar Isi &amp; Tahapan
        </div>

        {steps.map((st) => {
          const IconComp = st.icon;
          const isCurrent = currentStep === st.number;
          const isPassed = !teacherBypassLocks && st.number < maxUnlockedStep;
          const isUnlocked = teacherBypassLocks || st.number <= maxUnlockedStep;

          return (
            <button
              key={st.number}
              onClick={() => handleStepClick(st.number)}
              className={`w-full text-left p-2.5 sm:p-3 rounded-2xl border transition-all duration-200 flex items-start gap-3 cursor-pointer group relative ${
                isCurrent
                  ? "bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/15"
                  : isPassed
                  ? "bg-emerald-50/60 hover:bg-emerald-50 border-emerald-200/80 text-slate-800"
                  : isUnlocked
                  ? "bg-white hover:bg-slate-50 border-slate-200/90 text-slate-700"
                  : "bg-slate-50/70 border-slate-200/50 text-slate-400 cursor-not-allowed opacity-75"
              }`}
            >
              {/* Left Step Badge */}
              <div
                className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold transition-all ${
                  isCurrent
                    ? "bg-sky-500 text-white shadow-sm shadow-sky-500/30"
                    : isPassed
                    ? "bg-emerald-100 text-emerald-700"
                    : isUnlocked
                    ? "bg-slate-100 text-slate-700 group-hover:bg-slate-200"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {isPassed ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                ) : !isUnlocked ? (
                  <Lock className="h-3.5 w-3.5 text-slate-400" />
                ) : (
                  st.number
                )}
              </div>

              {/* Title & Metadata */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md ${
                      isCurrent
                        ? "bg-sky-400/20 text-sky-300"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {st.type}
                  </span>
                  <span
                    className={`text-[10px] font-mono ${
                      isCurrent ? "text-slate-400" : "text-slate-400"
                    }`}
                  >
                    {st.duration}
                  </span>
                </div>

                <div
                  className={`text-xs font-bold pt-1 leading-snug line-clamp-1 ${
                    isCurrent ? "text-white" : "text-slate-900"
                  }`}
                >
                  {st.title}
                </div>

                {isCurrent && (
                  <div className="text-[10px] text-sky-300 flex items-center gap-1 pt-0.5 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
                    <span>Sedang Dikerjakan</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Sidebar Footer: Student Profile / Silabus Link */}
      <div className="p-3 sm:p-4 border-t border-slate-200/90 bg-slate-50/70 space-y-2">
        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
          <div className="h-8 w-8 rounded-lg bg-sky-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-slate-900 truncate">
              {user.name}
            </div>
            <div className="text-[10px] text-slate-500 truncate">
              {user.kelas} &bull; NIS: {user.nis}
            </div>
          </div>
        </div>

        <Link
          href="/kelas/cloud-computing"
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 text-slate-600 hover:text-sky-600 hover:bg-white text-xs font-medium transition-all"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Silabus Modul</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. DESKTOP SIDEBAR (Visible only on lg and above when open) */}
      {/* ========================================================================= */}
      {isOpenDesktop && (
        <aside className="hidden lg:block w-80 shrink-0 sticky top-18 h-[calc(100vh-4.5rem)] border-r border-slate-200 shadow-xs z-30 animate-fade-in">
          {sidebarContent}
        </aside>
      )}

      {/* ========================================================================= */}
      {/* 2. MOBILE SLIDE-OVER DRAWER (Visible on < lg when triggered) */}
      {/* ========================================================================= */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={onCloseMobile}
          />

          {/* Drawer container */}
          <div className="relative w-[85vw] max-w-xs h-full shadow-2xl z-10 animate-slide-right flex flex-col">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
