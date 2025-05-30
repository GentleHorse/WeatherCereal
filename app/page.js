import LoadingScene from "@/components/loadingScene/LoadingScene.jsx";
import ThreeScene from "@/components/ThreeScene.jsx";
import { Suspense } from "react";
import RibbonLink from "@/components/ribbonLink/RibbonLink.jsx";

export default function Home() {
  return (
    <main
      className="relative flex justify-center items-center h-[100dvh] z-0 bg-[#1C1C1C]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <Suspense fallback={<LoadingScene />}>
        <ThreeScene />
      </Suspense>

      <RibbonLink
        url="https://toshihito-endo.com/weather-cereal"
        text="Case Study"
      />
    </main>
  );
}
