import { create } from "zustand";
import { Analysis, CatProfile } from "@/types";
import { demoAnalyses, demoCat } from "@/data/mock";

type AppState = {
  isPremium: boolean;
  cat: CatProfile;
  analyses: Analysis[];
  backendStatus: string;
  setPremium: (value: boolean) => void;
  setCat: (cat: CatProfile) => void;
  setAnalyses: (items: Analysis[]) => void;
  addAnalysis: (analysis: Analysis) => void;
  setFeedback: (id: string, feedback: "correct" | "wrong") => void;
  setBackendStatus: (status: string) => void;
};

export const useAppStore = create<AppState>((set) => ({
  isPremium: false,
  cat: demoCat,
  analyses: demoAnalyses,
  backendStatus: "Kontrol edilmedi",
  setPremium: (value) => set({ isPremium: value }),
  setCat: (cat) => set({ cat }),
  setAnalyses: (items) => set({ analyses: items.length ? items : demoAnalyses }),
  addAnalysis: (analysis) => set((state) => ({ analyses: [analysis, ...state.analyses] })),
  setFeedback: (id, feedback) =>
    set((state) => ({
      analyses: state.analyses.map((item) => (item.id === id ? { ...item, user_feedback: feedback } : item))
    })),
  setBackendStatus: (status) => set({ backendStatus: status })
}));
