"use client";

import { useRef, useMemo, useEffect, useLayoutEffect, useState, type ReactElement } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { useMouseParallax } from "@/components/MouseParallaxProvider";

/* --- Генерация: многоуровневые 3D-сетки (рекурсия по уровням) → «мегаполис» на 250 узлов --- */

const COMPLEXITY = 3;
const DENSITY = 250;
const MAX_EDGE_SEGMENTS = 520;
const K_NEIGHBORS = 4;
const MAX_LINK_DIST = 12;

const CAMERA_FAR = 60;
/** Медленный «дрейф» вперёд (было 0.05 — слишком шустро на фоне hero без картинки) */
const CAMERA_SPEED = 0.012;
const BOUNDS = 18;
/** Сила влияния мыши на камеру; курсор уже сглажен в MouseParallaxProvider */
const MOUSE_PAN = { x: 18, y: 14 };

function generateFractalNodePositions(
  complexity: number,
  count: number
): Float32Array {
  const out: number[] = [];

  const addShell = (scale: number, cx: number, cy: number, cz: number, seg: number) => {
    for (let i = 0; i <= seg; i++) {
      for (let j = 0; j <= seg; j++) {
        for (let k = 0; k <= seg; k++) {
          if (out.length >= count * 3) return;
          const u = (i / seg - 0.5) * 2;
          const v = (j / seg - 0.5) * 2;
          const w = (k / seg - 0.5) * 2;
          const jx = (Math.random() - 0.5) * 0.08 * scale;
          const jy = (Math.random() - 0.5) * 0.08 * scale;
          const jz = (Math.random() - 0.5) * 0.08 * scale;
          out.push(
            u * scale * 0.5 + cx + jx,
            v * scale * 0.5 + cy + jy,
            w * scale * 0.5 + cz + jz
          );
        }
      }
    }
  };

  const centers: [number, number, number, number, number][] = [
    [0, 0, 0, BOUNDS, 5],
    [BOUNDS * 0.25, -BOUNDS * 0.2, BOUNDS * 0.15, BOUNDS * 0.55, 4],
    [-BOUNDS * 0.3, BOUNDS * 0.2, -BOUNDS * 0.1, BOUNDS * 0.4, 4],
  ];

  for (let pass = 0; pass < complexity; pass++) {
    const c = Math.min(pass, centers.length - 1);
    const [cx, cy, cz, scale, seg] = centers[c]!;
    addShell(scale, cx * (0.2 + pass * 0.15), cy, cz - pass * 2.2, seg);
  }

  while (out.length < count * 3) {
    out.push(
      (Math.random() - 0.5) * BOUNDS,
      (Math.random() - 0.5) * BOUNDS,
      (Math.random() - 0.5) * BOUNDS
    );
  }

  return new Float32Array(out.slice(0, count * 3));
}

function distSq(
  a: Float32Array,
  ai: number,
  b: Float32Array,
  bi: number
): number {
  const ax = a[ai * 3]!,
    ay = a[ai * 3 + 1]!,
    az = a[ai * 3 + 2]!;
  const bx = b[bi * 3]!,
    by = b[bi * 3 + 1]!,
    bz = b[bi * 3 + 2]!;
  const dx = ax - bx,
    dy = ay - by,
    dz = az - bz;
  return dx * dx + dy * dy + dz * dz;
}

function buildKnnEdgeGeometry(nodePos: Float32Array): {
  geometry: THREE.BufferGeometry;
  segmentCount: number;
} {
  const n = nodePos.length / 3;
  const pairs: [number, number][] = [];
  const seen = new Set<string>();

  for (let i = 0; i < n; i++) {
    const near: { j: number; d: number }[] = [];
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      const d2 = distSq(nodePos, i, nodePos, j);
      if (d2 < MAX_LINK_DIST * MAX_LINK_DIST) {
        near.push({ j, d: d2 });
      }
    }
    near.sort((a, b) => a.d - b.d);
    for (let k = 0; k < Math.min(K_NEIGHBORS, near.length); k++) {
      const j = near[k]!.j;
      const a = i < j ? i : j;
      const b = i < j ? j : i;
      const key = `${a}-${b}`;
      if (seen.has(key)) continue;
      seen.add(key);
      pairs.push([a, b]);
      if (pairs.length >= MAX_EDGE_SEGMENTS) break;
    }
    if (pairs.length >= MAX_EDGE_SEGMENTS) break;
  }

  const segCount = pairs.length;
  const positions = new Float32Array(segCount * 2 * 3);
  const lineT = new Float32Array(segCount * 2);

  for (let e = 0; e < segCount; e++) {
    const [ia, ib] = pairs[e]!;
    for (let c = 0; c < 3; c++) {
      positions[e * 6 + c] = nodePos[ia * 3 + c]!;
      positions[e * 6 + 3 + c] = nodePos[ib * 3 + c]!;
    }
    lineT[e * 2] = 0;
    lineT[e * 2 + 1] = 1;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("lineT", new THREE.BufferAttribute(lineT, 1));

  return { geometry, segmentCount: segCount };
}

/* --- Shaders: пульсация/«течение» на GPU, uniform uTime --- */

const LINE_VERT = /* glsl */ `
attribute float lineT;
varying float vAlong;
varying float vViewZ;

void main() {
  vAlong = lineT;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewZ = -mvPosition.z;
  gl_Position = projectionMatrix * mvPosition;
}
`;

const LINE_FRAG = /* glsl */ `
precision highp float;
uniform float uTime;
varying float vAlong;
varying float vViewZ;

void main() {
  float t = uTime;
  float wave = 0.5 + 0.5 * sin(t * 2.8 + vAlong * 18.0);
  float flow = fract(vAlong * 2.0 - t * 0.35);
  float intensity = 0.25 + 0.75 * wave * (0.4 + 0.6 * flow);
  vec3 c1 = vec3(0.15, 0.55, 0.95);
  vec3 c2 = vec3(0.35, 0.95, 1.0);
  vec3 col = mix(c1, c2, wave);
  float depthFade = smoothstep(48.0, 6.0, vViewZ);
  float alpha = (0.15 + 0.85 * intensity) * depthFade;
  if (alpha < 0.02) discard;
  gl_FragColor = vec4(col * depthFade, alpha);
}
`;

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const q = window.matchMedia("(max-width: 768px), (max-height: 500px)");
    setM(q.matches);
    const fn = () => setM(q.matches);
    q.addEventListener("change", fn);
    return () => q.removeEventListener("change", fn);
  }, []);
  return m;
}

function useDisposableResource<T extends { dispose: () => void } | null | undefined>(r: T) {
  useEffect(
    () => () => {
      r?.dispose();
    },
    [r]
  );
}

function DataFlowLines({
  geometry,
  segmentCount,
}: {
  geometry: THREE.BufferGeometry;
  segmentCount: number;
}) {
  const mat = useMemo(() => {
    const m = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: LINE_VERT,
      fragmentShader: LINE_FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    return m;
  }, []);

  useDisposableResource(geometry);
  useDisposableResource(mat);

  useFrame((state) => {
    mat.uniforms.uTime!.value = state.clock.elapsedTime;
  });

  if (segmentCount === 0) return null;
  return <lineSegments frustumCulled={false} geometry={geometry} material={mat} />;
}

function InstancedDataNodes({ positions }: { positions: Float32Array }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = positions.length / 3;

  const baseGeo = useMemo(() => new THREE.IcosahedronGeometry(0.34, 1), []);
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(0.35, 0.82, 1.0),
        transparent: true,
        opacity: 0.95,
        toneMapped: false,
        depthWrite: true,
      }),
    []
  );

  useDisposableResource(baseGeo);
  useDisposableResource(mat);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    for (let i = 0; i < count; i++) {
      const x = positions[i * 3] ?? 0;
      const y = positions[i * 3 + 1] ?? 0;
      const z = positions[i * 3 + 2] ?? 0;
      const s = 0.55 + (i % 6) * 0.05;
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [count, positions, dummy]);

  if (count === 0) return null;
  return (
    <instancedMesh
      ref={meshRef}
      args={[baseGeo, mat, count]}
      frustumCulled
    />
  );
}

function RigCamera() {
  const { camera } = useThree();
  const { mx, my } = useMouseParallax();
  const zRef = useRef(28);

  useFrame((state) => {
    const cam = camera as THREE.PerspectiveCamera;
    const t = state.clock.elapsedTime;
    zRef.current -= CAMERA_SPEED;
    if (zRef.current < -BOUNDS) {
      zRef.current = 32;
    }
    const nmx = mx.get();
    const nmy = my.get();
    const driftX = Math.sin(t * 0.09) * 2.1;
    const driftY = Math.cos(t * 0.07) * 1.5;
    cam.position.x = driftX + nmx * MOUSE_PAN.x;
    cam.position.y = driftY + nmy * MOUSE_PAN.y;
    cam.position.z = zRef.current;
    const lookZ = zRef.current - 32;
    cam.lookAt(0, 0, lookZ);
  });

  return null;
}

function PostFx({ lowPower }: { lowPower: boolean }) {
  return (
    <EffectComposer
      autoClear
      enableNormalPass={false}
      resolutionScale={lowPower ? 0.5 : 0.75}
      multisampling={lowPower ? 0 : 2}
    >
      <Bloom
        intensity={lowPower ? 0.32 : 0.55}
        luminanceThreshold={0.15}
        luminanceSmoothing={0.9}
        mipmapBlur
        levels={3}
        radius={0.45}
        opacity={0.85}
      />
    </EffectComposer>
  );
}

function Scene() {
  const isMobile = useIsMobile();
  const nodePos = useMemo(
    () => generateFractalNodePositions(COMPLEXITY, DENSITY),
    []
  );
  const { geometry: lineGeo, segmentCount } = useMemo(
    () => buildKnnEdgeGeometry(nodePos),
    [nodePos]
  );

  return (
    <>
      <AdaptiveDpr />
      <color attach="background" args={["#03040a"]} />
      <fog attach="fog" args={["#03040a", 8, 52]} />
      <RigCamera />
      <DataFlowLines geometry={lineGeo} segmentCount={segmentCount} />
      <InstancedDataNodes positions={nodePos} />
      <PostFx lowPower={isMobile} />
    </>
  );
}

/**
 * Персистентный 3D-фон: генеративный «город данных».
 * Снаружи — только <Canvas> (см. className: fixed, z[-1]).
 */
export function ThreeDataCity(): ReactElement {
  return (
    <Canvas
      role="presentation"
      aria-hidden
      className="pointer-events-none fixed inset-0 h-full w-full [z-index:-1]"
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        depth: true,
        stencil: false,
      }}
      dpr={[1, 1.5]}
      camera={{
        fov: 58,
        near: 0.1,
        far: CAMERA_FAR,
        position: [0, 0, 28] as [number, number, number],
      }}
      onCreated={({ gl }) => {
        gl.setClearColor("#03040a", 1);
      }}
    >
      <Scene />
    </Canvas>
  );
}
