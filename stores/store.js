import { create } from "zustand";

export const APP_STATE = {
  LOADING: "LOADING",
  CITY: "CITY",
  PLAY: "PLAY",
  DATA_48H: "DATA_48H",
};

export const useStore = create((set) => ({
  appState: APP_STATE.LOADING,
  changeAppState: (newState) => set({ appState: newState }),
}));
