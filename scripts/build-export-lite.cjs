/**
 * Запускает `next build` с STATIC_EXPORT_LITE=1 (без бандлинга Three.js — быстрая сборка на Windows).
 */
const { spawnSync } = require("child_process");
const path = require("path");

process.env.STATIC_EXPORT_LITE = "1";
process.env.NEXT_TELEMETRY_DISABLED = "1";
if (!process.env.NODE_OPTIONS?.includes("max-old-space-size")) {
  process.env.NODE_OPTIONS = `--max-old-space-size=8192 ${process.env.NODE_OPTIONS ?? ""}`.trim();
}

const nextBin = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
const r = spawnSync(process.execPath, [nextBin, "build"], {
  stdio: "inherit",
  env: process.env,
  cwd: process.cwd(),
});

process.exit(r.status === null ? 1 : r.status);
