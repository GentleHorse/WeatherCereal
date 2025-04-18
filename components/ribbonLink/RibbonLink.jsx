"use client";

import { APP_STATE, useStore } from "@/stores/store.js";

export default function RibbonLink({ url, text }) {
  const { appState } = useStore((state) => state);

  return (
    <>
      {appState === APP_STATE.PLAY && (
        <div
          className="fixed left-0 top-14 flex flex-col items-center justify-center transition-all duration-200 hover:scale-110 hover:cursor-pointer shadow-2xl bg-[linear-gradient(90deg,_#690B21_0%,_#E61E4C_75%,_#910C2B_100%)] w-[48px] h-[120px]"
          onClick={() => window.open(url, "_blank")}
        >
          <div className="rotate-90 flex flex-col items-center justify-center w-[120px] h-[48px]">
            <p className="text-white font-sans text-[16px]">{text}</p>
          </div>
        </div>
      )}
    </>
  );
}
