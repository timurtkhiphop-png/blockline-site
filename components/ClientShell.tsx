"use client";

import type { ReactNode } from "react";
import { useRevealAnimations } from "@/hooks/useRevealAnimations";

export default function ClientShell({ children }: { children: ReactNode }) {
  useRevealAnimations();
  return <>{children}</>;
}
