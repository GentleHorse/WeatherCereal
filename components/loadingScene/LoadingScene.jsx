export default function LoadingScene() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      <span className="loader"></span>
      <p className="text-sm font-mono text-[#C1C1C1]">Loading .....</p>
    </div>
  );
}
