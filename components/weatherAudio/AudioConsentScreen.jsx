import { useStore } from "@/stores/store.js";

export default function AudioConsentScreen() {
  const { changeAudioEnabled, hasInteracted, setHasInteracted } = useStore(
    (state) => state
  );

  if (!hasInteracted) {
    return (
      <div
        className="absolute m-auto px-10 py-[10vh] w-[90vw] h-[90dvh] inset-0 flex flex-col items-center justify-center gap-10 rounded-2xl backdrop-blur-md bg-[#333333]/45 text-white z-50"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <img
          src="/images/play-state/audio-on.svg"
          className="w-[95px] h-[95px] opacity-90"
        />

        <div className="flex flex-col items-center">
          <h1 className="mx-8 mb-6 text-md text-center">
            Would you like to enable ambient sound?
          </h1>
          <div className="flex gap-4 text-sm">
            <button
              onClick={() => {
                changeAudioEnabled(true);
                setHasInteracted(true);
              }}
              className="px-4 py-2 bg-linear-to-r/hsl from-[#D0104C] to-[#F75C2F] shadow-lg rounded-lg"
            >
              Yes, with sound
            </button>
            <button
              onClick={() => {
                changeAudioEnabled(false);
                setHasInteracted(true);
              }}
              className="px-4 py-2 bg-linear-to-r/hsl from-[#707C74] to-[#72636E] shadow-lg rounded-lg"
            >
              No, silent
            </button>
          </div>
        </div>
      </div>
    );
  }
}
