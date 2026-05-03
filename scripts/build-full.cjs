/**
 * Полная статическая сборка с Three.js / WebGL в бандле.
 * Убираем STATIC_EXPORT_LITE из окружения — иначе webpack подменит героя на заглушку.
 */
const { spawnSync } = require("child_process");
const path = require("path");

const env = { ...process.env };
delete env.STATIC_EXPORT_LITE;

env.NEXT_TELEMETRY_DISABLED = "1";
if (!String(env.NODE_OPTIONS ?? "").includes("max-old-space-size")) {
  env.NODE_OPTIONS = `--max-old-space-size=8192 ${env.NODE_OPTIONS ?? ""}`.trim();
}

const nextBin = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
const r = spawnSync(process.execPath, [nextBin, "build"], {
  stdio: "inherit",
  env,
  cwd: process.cwd(),
});

process.exit(r.status === null ? 1 : r.status);
