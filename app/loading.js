export default function Loading() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen bg-[#1C1C1C]">
      <span className="loader"></span>
      <p className="text-sm font-mono text-[#C1C1C1]">Loading .....</p>
    </div>
  );
}
