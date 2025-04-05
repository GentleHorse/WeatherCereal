import { Html } from "@react-three/drei";

export default function LoadingScene() {
  return (
    <>
      <Html fullscreen>
        <div className="flex flex-col gap-10 items-center justify-center h-screen bg-[#1C1C1C]">
          <span className="loader threeD"></span>
          <p className="w-[200px] text-center text-[10px] xl:text-sm font-mono text-[#FEDFE1]">Loading .....</p>
        </div>
      </Html>
    </>
  );
}
