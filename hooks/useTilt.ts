"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Efecto tilt 3D siguiendo el cursor */
export function useTilt(maxTilt = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    setEnabled(!prefersReduced && !isCoarse);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enabled) return;
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      el.style.transform = `perspective(900px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) scale3d(1.02, 1.02, 1.02)`;
    },
    [enabled, maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)";
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}
