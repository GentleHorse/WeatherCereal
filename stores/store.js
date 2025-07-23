import { create } from "zustand";

export const APP_STATE = {
  LOADING: "LOADING",
  CITY: "CITY",
  PLAY: "PLAY",
  DATA_48H: "DATA_48H",
};

export const useStore = create((set) => ({
  appState: APP_STATE.LOADING,
  audioEnabled: false,
  hasInteracted: false,
  isDepthOfField: true,
  changeAppState: (newState) => set({ appState: newState }),
  changeAudioEnabled: (newState) => set({ audioEnabled: newState }),
  setHasInteracted: (newState) => set({ hasInteracted: newState }),
  changeIsDepthOfField: (newState) => set({ isDepthOfField: newState }),
}));
