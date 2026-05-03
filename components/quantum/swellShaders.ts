/**
 * Quantum Matter — fBm(UV) + dip; UV искажаются интерференционными ripples в вершине (сумма sin(ωt−κr)).
 * Цвет: один проход — scalar g (рельеф) → gradient map #051a1a … #00ffff, без слоёв поверх шума.
 * Wow: uBootT — амплитуда в вершине + контраст g во фрагменте, ~2–3 с затухание.
 */

export const MAX_RIPPLES = 8;

export const swellVert = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uBootT;
uniform float uIntroScale;
uniform vec2 uMouseEased;
uniform float uForceRadius;
uniform float uSwellIntensity;
uniform float uFlatBlend;
uniform float uMeshZoom;
uniform float uInvAspect;
uniform float uJitter;
uniform float uEps;
uniform float uFbmScale;
uniform float uDipPull;
uniform vec4 uRippleData[8];

varying vec3 vViewPos;
varying vec3 vNormalV;
varying vec2 vBaseXY;
varying float vHeight;

vec3 mod289_3s(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec2 mod289_2s(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec3 permuteS(vec3 x) {
  return mod289_3s(((x * 34.0) + 1.0) * x);
}

float snoise2(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289_2s(i);
  vec3 p = permuteS(permuteS(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm6simplex(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.64, 0.76, -0.76, 0.64);
  for (int i = 0; i < 6; i++) {
    v += a * snoise2(p);
    p = rot * p * 2.03;
    a *= 0.48;
  }
  return v;
}

vec2 forceCenter() {
  vec2 m = uMouseEased * 0.5;
  m.x *= uInvAspect;
  return m;
}

float fieldE(vec2 c) {
  vec2 o = forceCenter();
  float d2 = dot(c - o, c - o);
  float R = max(uForceRadius, 0.0002);
  float s = R * R * 0.5;
  return exp(-d2 / s);
}

/* Интерференция: сумма sin(ω·t − κ·dist) + вторая гармоника; смещение входа fBm, не «круги» во фрагменте. */
vec2 rippleUvWarp(vec2 c) {
  vec2 acc = vec2(0.0);
  const float omega = 2.75;
  const float kappa = 10.6;
  for (int i = 0; i < 8; i++) {
    vec4 rd = uRippleData[i];
    float t0 = rd.w;
    float inUse = step(-50.0, t0);
    float age = uTime - t0;
    vec2 pc = rd.xy;
    vec2 delta = c - pc;
    float dist = length(delta);
    vec2 radial = dist > 1e-4 ? delta / dist : vec2(1.0, 0.0);
    vec2 tang = vec2(-radial.y, radial.x);
    float env = exp(-dist * 0.7) * exp(-age * 0.23) * (1.0 - smoothstep(0.0, 10.8, age));
    float ph = uTime * omega - dist * kappa;
    float w1 = sin(ph);
    float w2 = sin(ph * 1.58 + 1.1) * 0.42;
    float wT = sin(ph * 1.22 + dist * 0.48 + age * 0.5);
    acc += radial * (w1 + w2) * env * 0.024 * inUse;
    acc += tang * wT * env * 0.017 * inUse;
  }
  return acc;
}

vec2 liquidSampleXY(vec2 c) {
  float E = fieldE(c) * (1.0 - uFlatBlend);
  vec2 o = forceCenter();
  vec2 cWarp = c + (o - c) * E * uDipPull;
  return cWarp + rippleUvWarp(c);
}

float totalH(vec2 c) {
  float t = uTime;
  float E = fieldE(c) * (1.0 - uFlatBlend);
  vec2 cRip = liquidSampleXY(c);
  vec2 pN = cRip * uFbmScale + t * 0.0165;
  float n = fbm6simplex(pN);
  float base = 0.11;
  float boot =
    1.0 +
    (1.45 * exp(-2.85 * uBootT) + 0.48 * abs(sin(uBootT * 17.5)) * exp(-1.0 * uBootT)) * uIntroScale;
  float amp =
    (base + uSwellIntensity * E) * (0.12 + 0.88 * uJitter) * (1.0 - uFlatBlend * 0.45) * boot;
  n += 0.012 * uJitter * sin(t * 0.28 + cRip.x * 4.0 + cRip.y * 3.0) * (0.2 + 0.8 * E);
  return n * amp;
}

void main() {
  vec2 c0 = position.xy * uMeshZoom;
  c0.x *= uInvAspect;
  vBaseXY = c0;
  float e = uEps;
  float dhx = (totalH(c0 + vec2(e, 0.0)) - totalH(c0 - vec2(e, 0.0))) / (2.0 * e);
  float dhy = (totalH(c0 + vec2(0.0, e)) - totalH(c0 - vec2(0.0, e))) / (2.0 * e);
  vec3 nLocal = normalize(vec3(-dhx, -dhy, 1.0));
  float z = totalH(c0);
  vHeight = z;
  vec3 p = vec3(position.xy * uMeshZoom, 0.0);
  p.z = z;
  vNormalV = normalize(normalMatrix * nLocal);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vViewPos = mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`;

export const swellFrag = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uGrain;
uniform float uBootT;
uniform float uIntroScale;

varying vec3 vViewPos;
varying vec3 vNormalV;
varying vec2 vBaseXY;
varying float vHeight;

const vec3 C_LO = vec3(0.0196078, 0.1019608, 0.1019608);
const vec3 C_HI = vec3(0.04, 0.72, 0.78);

float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  vec3 N = normalize(vNormalV);
  vec3 V = normalize(-vViewPos);
  float ndv = max(dot(N, V), 0.0);
  float g = vHeight * 3.85 + 0.48 + (1.0 - ndv) * 0.095;

  float uB = uBootT;
  float introC =
    1.0 +
    (0.95 * exp(-2.55 * uB) + 0.36 * abs(sin(uB * 18.0)) * exp(-0.95 * uB)) * uIntroScale;
  g = (g - 0.5) * introC + 0.5;
  g = clamp(g, 0.0, 1.0);

  float d = hash21(gl_FragCoord.xy * 0.5 + uTime * 0.008) * 0.5 + hash21(vBaseXY * 88.0) * 0.5;
  g = clamp(g + (d - 0.5) * uGrain * 1.35, 0.0, 1.0);

  g = pow(g, 0.92);
  float t = smoothstep(0.015, 0.985, g);
  vec3 col = mix(C_LO, C_HI, t);
  col *= 0.9;

  gl_FragColor = vec4(col, 1.0);
}
`;
