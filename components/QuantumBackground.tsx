"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import {
  useMemo,
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
  type RefObject,
} from "react";
import * as THREE from "three";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useReducedMotion } from "framer-motion";
import { swellVert, swellFrag, MAX_RIPPLES } from "@/components/quantum/swellShaders";
import { BlendFunction } from "postprocessing";
import type { HeroSwellRef } from "@/components/heroSwellState";

function nowMs() {
  if (typeof performance !== "undefined" && typeof performance.now === "function") {
    return performance.now();
  }
  return Date.now();
}

type Props = {
  className?: string;
  parentRef?: RefObject<HTMLDivElement | null>;
  swellStateRef: HeroSwellRef;
};

function useSwellSegments() {
  const [seg, setSeg] = useState(256);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const up = () => {
      setSeg(window.innerWidth < 700 ? 112 : window.innerWidth < 1100 ? 192 : 256);
    };
    up();
    window.addEventListener("resize", up);
    return () => window.removeEventListener("resize", up);
  }, []);
  return seg;
}

function SwellMesh({
  reducedMotion,
  swellStateRef,
}: {
  reducedMotion: boolean;
  swellStateRef: HeroSwellRef;
}) {
  const seg = useSwellSegments();
  const LERP = 0.12;
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const timeRef = useRef(0);
  const currentRippleIndex = useRef(0);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseNow = useRef({ x: 0, y: 0 });
  const { viewport, size, gl } = useThree();
  const loadStartMs = useRef<number | null>(null);
  useLayoutEffect(() => {
    loadStartMs.current = nowMs();
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouseEased: { value: new THREE.Vector2(0, 0) },
      uForceRadius: { value: 0.18 },
      uSwellIntensity: { value: 0 },
      uFlatBlend: { value: 0 },
      uMeshZoom: { value: 0.97 },
      uInvAspect: { value: 1 },
      uJitter: { value: 0 },
      uEps: { value: 0.00064 },
      uFbmScale: { value: 2.6 },
      uDipPull: { value: 0.58 },
      uRippleData: {
        value: Array.from(
          { length: MAX_RIPPLES },
          () => new THREE.Vector4(0, 0, 0, -1e3)
        ),
      },
      uGrain: { value: 0.006 },
      uBootT: { value: 0 },
      uIntroScale: { value: 1 },
    }),
    []
  );

  const onPointer = useCallback((e: PointerEvent) => {
    const el = e.currentTarget as HTMLCanvasElement;
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return;
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    mouseTarget.current.x = nx * 2 - 1;
    mouseTarget.current.y = -(ny * 2 - 1);
  }, []);

  useEffect(() => {
    const el = gl.domElement;
    const h = (ev: PointerEvent) => onPointer(ev);
    el.addEventListener("pointermove", h);
    return () => el.removeEventListener("pointermove", h);
  }, [gl, onPointer]);

  const onPointerDown = useCallback((e: PointerEvent) => {
    if (e.button !== 0) return;
    const m = matRef.current;
    if (!m) return;
    const el = e.currentTarget as HTMLCanvasElement;
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return;
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    const u = nx * 2 - 1;
    const v = -(ny * 2 - 1);
    const mz = m.uniforms.uMeshZoom.value;
    const ia = m.uniforms.uInvAspect.value;
    const tNow = m.uniforms.uTime.value;
    const idx = currentRippleIndex.current;
    const ripples = m.uniforms.uRippleData.value as THREE.Vector4[];
    ripples[idx].set(u * 0.5 * mz * ia, v * 0.5 * mz, 0, tNow);
    currentRippleIndex.current = (idx + 1) % MAX_RIPPLES;
  }, []);

  useEffect(() => {
    const el = gl.domElement;
    const h = (ev: PointerEvent) => onPointerDown(ev);
    el.addEventListener("pointerdown", h);
    return () => el.removeEventListener("pointerdown", h);
  }, [gl, onPointerDown]);

  useFrame((state) => {
    const m = matRef.current;
    if (!m) return;
    const t = reducedMotion ? 0.2 : state.clock.getElapsedTime();
    timeRef.current = t;
    const st = swellStateRef.current;
    const p = st.scrollP;
    const g = st.awakenG;
    const baseD = st.awakenD;
    const flatB = Math.min(1, Math.max(0, (p - 0.16) / 0.64));
    const uForceR = 0.14 + p * 1.9;
    const uSwell =
      2.0 *
      baseD *
      (1 - Math.pow(p, 0.82) * 0.92) *
      (1 - flatB * 0.4) *
      (0.15 + 0.85 * g);
    const tx = mouseTarget.current.x;
    const ty = mouseTarget.current.y;
    const k = LERP;
    mouseNow.current.x += (tx - mouseNow.current.x) * k;
    mouseNow.current.y += (ty - mouseNow.current.y) * k;

    m.uniforms.uTime.value = t;
    m.uniforms.uMouseEased.value.set(mouseNow.current.x, mouseNow.current.y);
    m.uniforms.uForceRadius.value = uForceR;
    m.uniforms.uSwellIntensity.value = uSwell;
    m.uniforms.uFlatBlend.value = flatB;
    m.uniforms.uMeshZoom.value = st.meshZoom;
    m.uniforms.uInvAspect.value = size.width / Math.max(size.height, 1);
    m.uniforms.uJitter.value = g;
    m.uniforms.uGrain.value = 0.006;
    const ls = loadStartMs.current;
    m.uniforms.uBootT.value = ls == null ? 0 : (nowMs() - ls) * 0.001;
    m.uniforms.uIntroScale.value = reducedMotion ? 0.22 : 1;
  });

  /* Небольшой оверскан: убирает чёрные щели по краям кадра (масштаб/постпроцесс). */
  const overscan = 1.035;
  const sw = Math.max(viewport.width, 1) * overscan;
  const sh = Math.max(viewport.height, 1) * overscan;

  return (
    <mesh position={[0, 0, 0]} scale={[sw, sh, 1]}>
      <planeGeometry args={[1, 1, seg, seg]} />
      <shaderMaterial
        ref={matRef}
        attach="material"
        vertexShader={swellVert}
        fragmentShader={swellFrag}
        uniforms={uniforms}
        toneMapped={false}
        depthTest
        depthWrite
      />
    </mesh>
  );
}

function SwellPost({ lowPower }: { lowPower: boolean }) {
  return (
    <EffectComposer
      autoClear
      enableNormalPass={false}
      multisampling={lowPower ? 0 : 1}
      resolutionScale={lowPower ? 0.75 : 1}
    >
      <Bloom
        intensity={lowPower ? 0.22 : 0.34}
        luminanceThreshold={lowPower ? 0.52 : 0.6}
        luminanceSmoothing={0.28}
        mipmapBlur
        levels={2}
        radius={0.1}
        blendFunction={BlendFunction.SCREEN}
      />
      <Vignette offset={0.36} darkness={0.32} blendFunction={BlendFunction.NORMAL} />
    </EffectComposer>
  );
}

function useLowPowerPost() {
  const [m, setM] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const q = window.matchMedia("(max-width: 700px), (prefers-reduced-data: reduce)");
    const fn = () => setM(q.matches);
    setM(q.matches);
    q.addEventListener("change", fn);
    return () => q.removeEventListener("change", fn);
  }, []);
  return m;
}

function SwellScene({
  reducedMotion,
  swellStateRef,
}: {
  reducedMotion: boolean;
  swellStateRef: HeroSwellRef;
}) {
  const low = useLowPowerPost();
  return (
    <>
      <color attach="background" args={["#051a1a"]} />
      <SwellMesh reducedMotion={reducedMotion} swellStateRef={swellStateRef} />
      <SwellPost lowPower={low} />
    </>
  );
}

type QuantumProps = {
  className?: string;
  parentRef?: RefObject<HTMLDivElement | null>;
  swellStateRef: HeroSwellRef;
};

export function QuantumBackground({ className, parentRef, swellStateRef }: QuantumProps) {
  const reduceMotion = useReducedMotion();
  return (
    <div
      ref={parentRef}
      className={["pointer-events-auto absolute inset-0 z-0", className].filter(Boolean).join(" ")}
      style={{ minHeight: "100dvh" }}
    >
      <Canvas
        className="!absolute inset-0 h-full w-full"
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.9,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x051a1a, 1);
        }}
        camera={{ position: [0, 0, 4.2], fov: 45, near: 0.1, far: 32 }}
        onPointerMove={(e) => {
          (e.target as HTMLCanvasElement).style.cursor = "none";
        }}
      >
        <AdaptiveDpr />
        <SwellScene reducedMotion={!!reduceMotion} swellStateRef={swellStateRef} />
      </Canvas>
    </div>
  );
}

export default QuantumBackground;
