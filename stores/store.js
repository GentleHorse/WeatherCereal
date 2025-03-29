import { create } from "zustand";

export const APP_STATE = {
  LOADING: "LOADING",
  MENU: "MENU",
  PLAY: "PLAY",
  TEMP: "TEMP",
  PRECIPITATION: "PRECIPITATION",
};

export const useStore = create((set) => ({
  appState: APP_STATE.PLAY,
  changeAppState: (newState) => set({ appState: newState }),
}));
