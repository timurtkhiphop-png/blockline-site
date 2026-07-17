"use client";

import { useState, useEffect } from "react";

export function useTouch() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // A reliable way to detect touch capabilities across iOS/Android devices
    const mq = window.matchMedia("(pointer: coarse)");
    const checkTouch = () => {
      setIsTouch(mq.matches || navigator.maxTouchPoints > 0);
    };

    checkTouch();
    mq.addEventListener("change", checkTouch);
    return () => mq.removeEventListener("change", checkTouch);
  }, []);

  return isTouch;
}
