import { Html } from "@react-three/drei";

export default function LoadingScene3D() {
  return (
    <>
      <Html fullscreen>
        <div className="flex flex-col gap-10 items-center justify-center h-screen bg-[#000000]">
          <video
            src="/videos/loading.mp4"
            loop
            autoPlay
            muted
            playsInline
            className="mx-auto w-[320px] h-[320px] object-cover pointer-events-none"
          />
          {/* <span className="loader"></span> */}
          <p className="loaderText w-[200px] text-center text-[10px] xl:text-sm font-mono text-[#FEDFE1]">
            Loading .....
          </p>
        </div>
      </Html>
    </>
  );
}
