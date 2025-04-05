import ThreeScene from "@/components/ThreeScene.jsx";
import { resolve } from "styled-jsx/css";

export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return (
    <main className="relative flex justify-center items-center h-screen z-0 bg-[#1C1C1C]">
      <ThreeScene />
    </main>
  );
}
