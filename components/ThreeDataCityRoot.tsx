"use client";

import dynamic from "next/dynamic";

const ThreeDataCity = dynamic(
  () => import("@/src/components/ThreeDataCity").then((m) => m.ThreeDataCity),
  { ssr: false, loading: () => null }
);

export function ThreeDataCityRoot() {
  return <ThreeDataCity />;
}
