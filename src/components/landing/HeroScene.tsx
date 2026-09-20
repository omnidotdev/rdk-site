import { ScreenQuad } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color } from "three";

import type { ShaderMaterial } from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    // derive screen UV from the clip-space position (ScreenQuad has no usable uv)
    vUv = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Classic 2D metaballs: each blob contributes an inverse-square field; where the
// summed field crosses a threshold we draw gooey, merging surfaces. Teal cores
// bleed into violet at the seams = RDK in the Reality realm.
const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uAspect;
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  void main() {
    vec2 p = vUv;
    p.x *= uAspect;
    float cx = 0.5 * uAspect;

    float field = 0.0;
    for (int i = 0; i < 9; i++) {
      float fi = float(i);
      vec2 c = vec2(
        cx + sin(uTime * (0.35 + fi * 0.05) + fi * 1.7) * 0.34 * uAspect,
        0.5 + cos(uTime * (0.28 + fi * 0.045) + fi * 2.1) * 0.30
      );
      float r = 0.10 + 0.03 * sin(fi * 1.3);
      vec2 d = p - c;
      field += (r * r) / (dot(d, d) + 0.0006);
    }

    float mask = smoothstep(0.5, 1.0, field);
    // violet at the fringes, RDK teal in the dense cores
    float core = smoothstep(0.7, 2.4, field);
    vec3 col = mix(uColorB, uColorA, core);
    gl_FragColor = vec4(col, mask * 0.6);
  }
`;

const Metaballs = () => {
  const mat = useRef<ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAspect: { value: 1 },
      uColorA: { value: new Color("#00bdbf") },
      uColorB: { value: new Color("#8b5cf6") },
    }),
    [],
  );

  useFrame(({ clock, size }) => {
    if (!mat.current) return;
    mat.current.uniforms.uTime.value = clock.getElapsedTime();
    mat.current.uniforms.uAspect.value = size.width / size.height;
  });

  return (
    <ScreenQuad>
      <shaderMaterial
        ref={mat}
        transparent
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </ScreenQuad>
  );
};

/**
 * 3D hero scene for the RDK landing page: an animated teal/violet metaball
 * field rendered with a fullscreen shader, the site's signature spatial motif.
 */
const HeroScene = () => (
  <div className="pointer-events-none absolute inset-0">
    <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <Metaballs />
    </Canvas>
  </div>
);

export default HeroScene;
