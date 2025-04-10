export default function LoadingScene() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center bg-[#000000]">
      <video
        src="/videos/loading.mp4"
        loop
        autoPlay
        muted
        playsInline
        className="mx-auto w-[320px] h-[320px] object-cover pointer-events-none"
      />
      {/* <span className="loader"></span> */}
      <p className="text-sm font-mono text-[#C1C1C1]">Loading .....</p>
    </div>
  );
}
