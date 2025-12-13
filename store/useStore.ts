import { create } from "zustand";

interface AppState {
    introFinished: boolean;
    introKey: number; // New: A version counter
    setIntroFinished: (status: boolean) => void;
    resetIntro: () => void; // New: One function to handle the entire reset
}

export const useStore = create<AppState>((set) => ({
    introFinished: false,
    introKey: 0,
    setIntroFinished: (status) => set({ introFinished: status }),
    resetIntro: () =>
        set((state) => ({
            introFinished: false,
            introKey: state.introKey + 1, // Increment version to force re-render
        })),
}));
