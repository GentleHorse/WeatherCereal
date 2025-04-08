import LoadingScene from "@/components/loadingScene/LoadingScene";
import ThreeScene from "@/components/ThreeScene.jsx";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="relative flex justify-center items-center h-screen z-0 bg-[#1C1C1C]">
      <Suspense fallback={<LoadingScene />}>
        <ThreeScene />
      </Suspense>
    </main>
  );
}
