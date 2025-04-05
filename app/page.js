import ThreeScene from "@/components/ThreeScene.jsx";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="relative flex justify-center items-center h-screen z-0 bg-[#1C1C1C]">
      <Suspense
        fallback={
          <div className="flex flex-col gap-10 items-center justify-center">
            <span className="loader"></span>
            <p className="text-sm font-mono text-[#C1C1C1]">Loading .....</p>
          </div>
        }
      >
        <ThreeScene />
      </Suspense>
    </main>
  );
}
