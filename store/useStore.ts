import { create } from "zustand";

interface AppState {
    introFinished: boolean;
    setIntroFinished: (status: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
    introFinished: false,
    setIntroFinished: (status) => set({ introFinished: status }),
}));
