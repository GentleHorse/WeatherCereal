import { useStore } from "@/stores/store.js";

export default function AudioConsentScreen() {
  const { changeAudioEnabled, hasInteracted, setHasInteracted } = useStore(
    (state) => state
  );

  if (!hasInteracted) {
    return (
      <div className="absolute m-auto inset-0 flex flex-col items-center justify-center w-[90vw] h-[90vh] pt-[5vh] rounded-2xl backdrop-blur-md  bg-[#333333]/70 text-white z-50">
        <h1 className="text-xl mb-4">
          Would you like to enable ambient sound?
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => {
              changeAudioEnabled(true);
              setHasInteracted(true);
            }}
            className="px-4 py-2 bg-emerald-600 rounded-lg"
          >
            Yes, with sound
          </button>
          <button
            onClick={() => {
              changeAudioEnabled(false);
              setHasInteracted(true);
            }}
            className="px-4 py-2 bg-slate-500 rounded-lg"
          >
            No, silent
          </button>
        </div>
      </div>
    );
  }
}
