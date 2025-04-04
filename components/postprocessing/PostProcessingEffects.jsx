"use client";

import {
  N8AO,
  DepthOfField,
  EffectComposer,
  ToneMapping,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { useControls } from "leva";

export default function PostProcessingEffects({ depthOfField = true }) {
  // const depthOfFieldConfig = useControls("Depth of Field", {
  //   focusRange: { value: 0.075, step: 0.001, min: 0, max: 0.5 },
  //   bokehScale: { value: 10, step: 0.001, min: 0, max: 50 },
  // });

  return (
    <EffectComposer disableNormalPass>
      <N8AO aoRadius={0.5} intensity={1} />
      {!!depthOfField && (
        <DepthOfField
          // {...depthOfFieldConfig}
          focusRange={0.075}
          bokehScale={10}
          target={[0, 0, 0]}
        />
      )}
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
