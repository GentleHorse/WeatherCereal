"use client";

import {
  N8AO,
  DepthOfField,
  EffectComposer,
  ToneMapping,
} from "@react-three/postprocessing";
import { useControls } from "leva";

export default function PostProcessingEffects() {
  const depthOfFieldConfig = useControls("Depth of Field", {
    focusRange: { value: 0.1, step: 0.001, min: 0, max: 0.5 },
    bokehScale: { value: 10, step: 0.001, min: 0, max: 50 },
  });

  return (
    <EffectComposer disableNormalPass>
      <N8AO aoRadius={0.5} intensity={1} />
      <DepthOfField {...depthOfFieldConfig} target={[0, 0, 0]} />
      <ToneMapping />
    </EffectComposer>
  );
}
