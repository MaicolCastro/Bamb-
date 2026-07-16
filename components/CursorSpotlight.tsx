"use client";

import { useEffect, useRef } from "react";

interface CursorSpotlightProps {
  size?: number;
  intensity?: number;
}

/** Spotlight que sigue el cursor — actualiza DOM vía rAF, sin re-renders */
export function CursorSpotlight({
  size = 320,
  intensity = 0.22,
}: CursorSpotlightProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<HTMLDivElement>(null);
  const leavesRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const activeRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const isNarrow = window.matchMedia("(max-width: 1024px)").matches;
    if (prefersReduced || isCoarse || isNarrow) return;

    const parent = rootRef.current?.parentElement;
    if (!parent) return;

    const applyPosition = () => {
      rafRef.current = 0;
      const { x, y } = posRef.current;
      const mask = `radial-gradient(${size}px circle at ${x}px ${y}px, black 0%, transparent 70%)`;
      const halo = `radial-gradient(${size * 0.6}px circle at ${x}px ${y}px, rgba(255,255,255,0.06), transparent 70%)`;

      if (patternRef.current) {
        patternRef.current.style.webkitMaskImage = mask;
        patternRef.current.style.maskImage = mask;
      }
      if (leavesRef.current) {
        leavesRef.current.style.webkitMaskImage = mask;
        leavesRef.current.style.maskImage = mask;
      }
      if (haloRef.current) {
        haloRef.current.style.background = halo;
      }
      if (rootRef.current) {
        rootRef.current.style.opacity = activeRef.current ? "1" : "0";
      }
    };

    const scheduleUpdate = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(applyPosition);
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      posRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      activeRef.current = true;
      scheduleUpdate();
    };

    const onLeave = () => {
      activeRef.current = false;
      scheduleUpdate();
    };

    parent.addEventListener("mousemove", onMove, { passive: true });
    parent.addEventListener("mouseleave", onLeave);

    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [size]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden opacity-0 transition-opacity duration-300"
      aria-hidden="true"
    >
      <div
        ref={patternRef}
        className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.35)_1px,transparent_0)] bg-[size:32px_32px]"
        style={{ opacity: intensity }}
      />
      <div
        ref={leavesRef}
        className="absolute inset-0"
        style={{
          opacity: intensity * 0.7,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5c-8 12-6 28 0 40 6-12 8-28 0-40z' fill='rgba(255,255,255,0.2)'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />
      <div ref={haloRef} className="absolute inset-0" />
    </div>
  );
}
