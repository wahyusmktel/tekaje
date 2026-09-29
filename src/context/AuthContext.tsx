"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "siswa" | "guru";

export interface StudentProgress {
  currentStep: number;
  maxUnlockedStep: number;
  preTestScore: number | null;
  preTestCompleted: boolean;
  theoryCompleted: boolean;
  labCompleted: boolean;
  portfolioCompleted: boolean;
  postTestScore: number | null;
  postTestCompleted: boolean;
  finalGrade: number | null;
  passed: boolean;
  certifiedAt: string | null;
}

export interface UserProfile {
  name: string;
  role: UserRole;
  kelas: string;
  nis: string;
  isLoggedIn: boolean;
}

export interface StudentSubmission {
  id: string;
  name: string;
  kelas: string;
  nis: string;
  pertemuan: number;
  preTestScore: number;
  postTestScore: number;
  finalScore: number;
  passed: boolean;
  submittedAt: string;
}

interface AuthContextType {
  user: UserProfile;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  loginAsStudent: (name: string, kelas: string, nis: string) => void;
  loginAsTeacher: () => void;
  logout: () => void;
  // Progress management
  getProgress: (meetingId: string) => StudentProgress;
  unlockNextStep: (meetingId: string, currentStep: number) => void;
  setPreTestResult: (meetingId: string, score: number) => void;
  setPostTestResult: (meetingId: string, score: number) => void;
  completeTheory: (meetingId: string) => void;
  completeLab: (meetingId: string) => void;
  completePortfolio: (meetingId: string) => void;
  resetProgress: (meetingId: string) => void;
  teacherBypassLocks: boolean;
  setTeacherBypassLocks: (val: boolean) => void;
  // Submissions for teacher dashboard
  submissions: StudentSubmission[];
}

const defaultProgress: StudentProgress = {
  currentStep: 1,
  maxUnlockedStep: 1,
  preTestScore: null,
  preTestCompleted: false,
  theoryCompleted: false,
  labCompleted: false,
  portfolioCompleted: false,
  postTestScore: null,
  postTestCompleted: false,
  finalGrade: null,
  passed: false,
  certifiedAt: null,
};

const defaultSubmissions: StudentSubmission[] = [
  {
    id: "sub-1",
    name: "Ahmad Fauzan Pratama",
    kelas: "XI TKJ 1",
    nis: "2401001",
    pertemuan: 1,
    preTestScore: 60,
    postTestScore: 90,
    finalScore: 85,
    passed: true,
    submittedAt: "2026-09-28 10:15",
  },
  {
    id: "sub-2",
    name: "Siti Nurhaliza",
    kelas: "XI TKJ 1",
    nis: "2401018",
    pertemuan: 1,
    preTestScore: 70,
    postTestScore: 100,
    finalScore: 95,
    passed: true,
    submittedAt: "2026-09-28 10:45",
  },
  {
    id: "sub-3",
    name: "Budi Santoso",
    kelas: "XI TKJ 2",
    nis: "2401035",
    pertemuan: 1,
    preTestScore: 40,
    postTestScore: 80,
    finalScore: 75,
    passed: true,
    submittedAt: "2026-09-29 09:20",
  },
  {
    id: "sub-4",
    name: "Rizky Dwi Saputra",
    kelas: "XI TKJ 2",
    nis: "2401042",
    pertemuan: 1,
    preTestScore: 50,
    postTestScore: 70,
    finalScore: 65,
    passed: false,
    submittedAt: "2026-09-29 11:00",
  },
  {
    id: "sub-5",
    name: "Ahmad Fauzan Pratama",
    kelas: "XI TKJ 1",
    nis: "2401001",
    pertemuan: 2,
    preTestScore: 70,
    postTestScore: 85,
    finalScore: 82,
    passed: true,
    submittedAt: "2026-09-29 14:30",
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>({
    name: "Siswa TKJ",
    role: "siswa",
    kelas: "XI TKJ 1",
    nis: "2401000",
    isLoggedIn: false,
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [teacherBypassLocks, setTeacherBypassLocks] = useState(false);
  const [progressData, setProgressData] = useState<Record<string, StudentProgress>>({});
  const [submissions, setSubmissions] = useState<StudentSubmission[]>(defaultSubmissions);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("tekaje_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      const storedProgress = localStorage.getItem("tekaje_progress");
      if (storedProgress) {
        setProgressData(JSON.parse(storedProgress));
      }

      const storedSubs = localStorage.getItem("tekaje_submissions");
      if (storedSubs) {
        setSubmissions(JSON.parse(storedSubs));
      }
    } catch (e) {
      console.error("Failed to load local storage state", e);
    }
  }, []);

  const saveUser = (newUser: UserProfile) => {
    setUser(newUser);
    try {
      localStorage.setItem("tekaje_user", JSON.stringify(newUser));
    } catch (e) {
      console.error(e);
    }
  };

  const loginAsStudent = (name: string, kelas: string, nis: string) => {
    const newUser: UserProfile = {
      name: name.trim() || "Siswa TKJ",
      role: "siswa",
      kelas: kelas || "XI TKJ 1",
      nis: nis.trim() || "2401000",
      isLoggedIn: true,
    };
    saveUser(newUser);
    setIsLoginModalOpen(false);
  };

  const loginAsTeacher = () => {
    const newUser: UserProfile = {
      name: "Wahyu Rahmat Hidayat, S.Kom.",
      role: "guru",
      kelas: "Pengampu TKJ",
      nis: "198801012015011001",
      isLoggedIn: true,
    };
    saveUser(newUser);
    setTeacherBypassLocks(true);
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    const defaultUser: UserProfile = {
      name: "Tamu (Belum Login)",
      role: "siswa",
      kelas: "XI TKJ 1",
      nis: "0000000",
      isLoggedIn: false,
    };
    saveUser(defaultUser);
    setTeacherBypassLocks(false);
  };

  const getProgress = (meetingId: string): StudentProgress => {
    return progressData[meetingId] || { ...defaultProgress };
  };

  const updateProgress = (meetingId: string, updater: (prev: StudentProgress) => StudentProgress) => {
    setProgressData((prev) => {
      const current = prev[meetingId] || { ...defaultProgress };
      const updated = updater(current);
      const nextData = { ...prev, [meetingId]: updated };
      try {
        localStorage.setItem("tekaje_progress", JSON.stringify(nextData));
      } catch (e) {
        console.error(e);
      }
      return nextData;
    });
  };

  const unlockNextStep = (meetingId: string, currentStep: number) => {
    updateProgress(meetingId, (prev) => {
      const nextStep = currentStep + 1;
      const newMax = Math.max(prev.maxUnlockedStep, nextStep);
      return {
        ...prev,
        currentStep: nextStep <= 6 ? nextStep : prev.currentStep,
        maxUnlockedStep: newMax <= 6 ? newMax : prev.maxUnlockedStep,
      };
    });
  };

  const setPreTestResult = (meetingId: string, score: number) => {
    updateProgress(meetingId, (prev) => {
      const newMax = Math.max(prev.maxUnlockedStep, 2);
      return {
        ...prev,
        preTestScore: score,
        preTestCompleted: true,
        maxUnlockedStep: newMax,
      };
    });
  };

  const completeTheory = (meetingId: string) => {
    updateProgress(meetingId, (prev) => ({
      ...prev,
      theoryCompleted: true,
      maxUnlockedStep: Math.max(prev.maxUnlockedStep, 3),
    }));
  };

  const completeLab = (meetingId: string) => {
    updateProgress(meetingId, (prev) => ({
      ...prev,
      labCompleted: true,
      maxUnlockedStep: Math.max(prev.maxUnlockedStep, 4),
    }));
  };

  const completePortfolio = (meetingId: string) => {
    updateProgress(meetingId, (prev) => ({
      ...prev,
      portfolioCompleted: true,
      maxUnlockedStep: Math.max(prev.maxUnlockedStep, 5),
    }));
  };

  const setPostTestResult = (meetingId: string, score: number) => {
    const passed = score >= 75;
    const meetingNum = meetingId === "pertemuan-1" ? 1 : 2;

    updateProgress(meetingId, (prev) => {
      const preScore = prev.preTestScore ?? score;
      const finalGrade = Math.round(preScore * 0.3 + score * 0.7);
      const newMax = passed ? 6 : prev.maxUnlockedStep;
      const nowStr = new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      // Record submission for teacher if passed or completed
      if (user.isLoggedIn && user.role === "siswa") {
        const newSub: StudentSubmission = {
          id: `sub-${Date.now()}`,
          name: user.name,
          kelas: user.kelas,
          nis: user.nis,
          pertemuan: meetingNum,
          preTestScore: preScore,
          postTestScore: score,
          finalScore: finalGrade,
          passed: passed,
          submittedAt: nowStr,
        };

        setSubmissions((prevSubs) => {
          // Replace if already exists for this student & meeting
          const filtered = prevSubs.filter(
            (s) => !(s.nis === user.nis && s.pertemuan === meetingNum)
          );
          const nextSubs = [newSub, ...filtered];
          try {
            localStorage.setItem("tekaje_submissions", JSON.stringify(nextSubs));
          } catch (e) {
            console.error(e);
          }
          return nextSubs;
        });
      }

      return {
        ...prev,
        postTestScore: score,
        postTestCompleted: true,
        finalGrade: finalGrade,
        passed: passed,
        maxUnlockedStep: newMax,
        certifiedAt: passed ? nowStr : null,
      };
    });
  };

  const resetProgress = (meetingId: string) => {
    updateProgress(meetingId, () => ({ ...defaultProgress }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoginModalOpen,
        openLoginModal: () => setIsLoginModalOpen(true),
        closeLoginModal: () => setIsLoginModalOpen(false),
        loginAsStudent,
        loginAsTeacher,
        logout,
        getProgress,
        unlockNextStep,
        setPreTestResult,
        setPostTestResult,
        completeTheory,
        completeLab,
        completePortfolio,
        resetProgress,
        teacherBypassLocks,
        setTeacherBypassLocks,
        submissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
