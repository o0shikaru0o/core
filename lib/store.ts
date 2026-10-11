"use client";

import { create } from "zustand";
import type { Analysis, Design } from "./schema";

type FlowState = {
  demo: boolean;
  occasion: string | null;
  date: string | null;
  photos: string[];
  liked: string[];
  passed: string[];
  analysis: Analysis | null;
  designs: Design[];

  setDemo: (demo: boolean) => void;
  setOccasion: (occasion: string) => void;
  setDate: (date: string | null) => void;
  addPhoto: (dataUrl: string) => void;
  removePhoto: (index: number) => void;
  swipe: (styleId: string, love: boolean) => void;
  setAnalysis: (analysis: Analysis) => void;
  setDesigns: (designs: Design[]) => void;
  reset: () => void;
};

const initial = {
  demo: false,
  occasion: null,
  date: null,
  photos: [],
  liked: [],
  passed: [],
  analysis: null,
  designs: [],
};

export const useFlow = create<FlowState>((set) => ({
  ...initial,
  setDemo: (demo) => set({ demo }),
  setOccasion: (occasion) => set({ occasion }),
  setDate: (date) => set({ date }),
  addPhoto: (dataUrl) => set((s) => ({ photos: [...s.photos, dataUrl].slice(0, 3) })),
  removePhoto: (index) => set((s) => ({ photos: s.photos.filter((_, i) => i !== index) })),
  swipe: (styleId, love) =>
    set((s) =>
      love ? { liked: [...s.liked, styleId] } : { passed: [...s.passed, styleId] },
    ),
  setAnalysis: (analysis) => set({ analysis }),
  setDesigns: (designs) => set({ designs }),
  reset: () => set(initial),
}));
