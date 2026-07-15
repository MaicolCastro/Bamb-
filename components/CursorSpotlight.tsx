"use client";

import { useEffect, useRef, useState } from "react";

interface CursorSpotlightProps {
  /** Tamaño del círculo de luz en px */
  size?: number;
  /** Intensidad del patrón revelado (0–1) */
  intensity?: number;
}

/** Spotlight que sigue el cursor y revela un patrón decorativo */
export function CursorSpotlight({
  size = 320,
  intensity = 0.22,
}: CursorSpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    setEnabled(!prefersReduced && !isCoarse);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const parent = ref.current?.parentElement;
    if (!parent) return;

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setActive(true);
    };

    const onLeave = () => setActive(false);

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);

    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  const mask = `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, black 0%, transparent 70%)`;

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden transition-opacity duration-300"
      style={{ opacity: active ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* Patrón de rutas / puntos */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.35)_1px,transparent_0)] bg-[size:32px_32px]"
        style={{
          opacity: intensity,
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      />
      {/* Hojas decorativas SVG como patrón */}
      <div
        className="absolute inset-0"
        style={{
          opacity: intensity * 0.7,
          WebkitMaskImage: mask,
          maskImage: mask,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5c-8 12-6 28 0 40 6-12 8-28 0-40z' fill='rgba(255,255,255,0.2)'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Halo de luz suave */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(${size * 0.6}px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 70%)`,
        }}
      />
    </div>
  );
}
