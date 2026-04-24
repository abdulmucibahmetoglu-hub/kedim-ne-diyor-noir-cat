import { create } from "zustand";
import { Analysis, CatProfile } from "@/types";
import { demoAnalyses, demoCat } from "@/data/mock";
import { activateMockPremium, getPremiumStatus, getRemainingDailyAnalyses, recordDailyAnalysis, restorePurchases } from "@/services/premiumService";

type AppState = {
  isPremium: boolean;
  premiumLoaded: boolean;
  remainingDailyAnalyses: number | null;
  cat: CatProfile;
  analyses: Analysis[];
  backendStatus: string;
  loadPremiumState: () => Promise<void>;
  setPremium: (value: boolean) => Promise<void>;
  restorePremium: () => Promise<void>;
  refreshDailyAnalyses: () => Promise<void>;
  consumeDailyAnalysis: () => Promise<number | null>;
  setCat: (cat: CatProfile) => void;
  setAnalyses: (items: Analysis[]) => void;
  addAnalysis: (analysis: Analysis) => void;
  setFeedback: (id: string, feedback: "correct" | "wrong") => void;
  setBackendStatus: (status: string) => void;
};

export const useAppStore = create<AppState>((set) => ({
  isPremium: false,
  premiumLoaded: false,
  remainingDailyAnalyses: 3,
  cat: demoCat,
  analyses: demoAnalyses,
  backendStatus: "Kontrol edilmedi",
  loadPremiumState: async () => {
    const isPremium = await getPremiumStatus();
    const remainingDailyAnalyses = await getRemainingDailyAnalyses();
    set({ isPremium, remainingDailyAnalyses, premiumLoaded: true });
  },
  setPremium: async (value) => {
    if (value) await activateMockPremium();
    const remainingDailyAnalyses = await getRemainingDailyAnalyses();
    set({ isPremium: value, remainingDailyAnalyses, premiumLoaded: true });
  },
  restorePremium: async () => {
    const isPremium = await restorePurchases();
    const remainingDailyAnalyses = await getRemainingDailyAnalyses();
    set({ isPremium, remainingDailyAnalyses, premiumLoaded: true });
  },
  refreshDailyAnalyses: async () => {
    const remainingDailyAnalyses = await getRemainingDailyAnalyses();
    set({ remainingDailyAnalyses });
  },
  consumeDailyAnalysis: async () => {
    const remainingDailyAnalyses = await recordDailyAnalysis();
    set({ remainingDailyAnalyses });
    return remainingDailyAnalyses;
  },
  setCat: (cat) => set({ cat }),
  setAnalyses: (items) => set({ analyses: items.length ? items : demoAnalyses }),
  addAnalysis: (analysis) => set((state) => ({ analyses: [analysis, ...state.analyses] })),
  setFeedback: (id, feedback) =>
    set((state) => ({
      analyses: state.analyses.map((item) => (item.id === id ? { ...item, user_feedback: feedback } : item))
    })),
  setBackendStatus: (status) => set({ backendStatus: status })
}));
