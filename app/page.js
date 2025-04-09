import LoadingScene from "@/components/loadingScene/LoadingScene";
import ThreeScene from "@/components/ThreeScene.jsx";
import { Suspense } from "react";

export default function Home() {
  return (
    <main
      className="relative flex justify-center items-center h-[100dvh] z-0 bg-[#1C1C1C]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <Suspense fallback={<LoadingScene />}>
        <ThreeScene />
      </Suspense>
    </main>
  );
}
