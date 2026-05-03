import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const quantumStatic = path.join(projectRoot, "components", "QuantumBackgroundStatic.tsx");

/**
 * Статический экспорт в `out/` для FTP.
 *
 * `npm run build:export` ставит STATIC_EXPORT_LITE=1 → подмена QuantumBackground на статический слой
 * без Three.js (иначе webpack на Windows часто «висит» десятки минут).
 *
 * Шрифты: см. `<link>` в `app/layout.tsx` (не next/font/google).
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export" as const,
  outputFileTracingRoot: projectRoot,
  turbopack: { root: projectRoot },
  eslint: { ignoreDuringBuilds: true },
  images: {
    unoptimized: true,
    qualities: [75, 85, 88, 90],
    formats: ["image/avif", "image/webp"],
  },
  webpack: (config, { webpack }) => {
    if (process.env.STATIC_EXPORT_LITE === "1") {
      config.plugins = [
        ...(config.plugins ?? []),
        new webpack.NormalModuleReplacementPlugin(
          /components[/\\]QuantumBackground\.tsx$/,
          quantumStatic
        ),
      ];
    }
    return config;
  },
};

export default nextConfig;
