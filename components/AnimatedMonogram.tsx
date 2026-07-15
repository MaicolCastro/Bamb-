"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const easePremium = [0.22, 1, 0.36, 1] as const;

interface AnimatedMonogramProps {
  size?: number;
  className?: string;
  /** Progreso del loader (0–1) para sincronizar el trazo */
  progress?: number;
}

/** Monograma "B" + bambú con animación de trazo SVG */
export function AnimatedMonogram({
  size = 128,
  className,
  progress = 0,
}: AnimatedMonogramProps) {
  const drawProgress = Math.min(Math.max(progress, 0), 1);
  const fillOpacity = Math.min(Math.max((drawProgress - 0.82) / 0.18, 0), 1);

  const strokeTransition = {
    pathLength: { duration: 0.15, ease: easePremium },
  };

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={cn("overflow-visible", className)}
      aria-hidden="true"
    >
      {/* Arco de vuelo */}
      <motion.path
        d="M12 28 Q28 14 44 22"
        fill="none"
        stroke="#8e9191"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: Math.min(drawProgress * 2.5, 1) }}
        transition={strokeTransition}
      />
      <motion.path
        d="M8 24 L16 30"
        fill="none"
        stroke="#8e9191"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: Math.min(drawProgress * 2.8, 1) }}
        transition={strokeTransition}
      />

      {/* Letra B — contorno */}
      <motion.path
        d="M24 18 V102 M24 18 H54 C68 18 74 26 74 36 C74 46 68 52 54 52 H24 M24 52 H56 C72 52 80 60 80 74 C80 90 68 102 52 102 H24"
        fill="none"
        stroke="#2d5a27"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: drawProgress }}
        transition={strokeTransition}
      />

      {/* Bambú — tallos */}
      <motion.path
        d="M92 32 V98 M88 98 H96 M92 48 H96 M92 64 H96"
        fill="none"
        stroke="#68a637"
        strokeWidth="3.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: Math.min(Math.max((drawProgress - 0.35) / 0.65, 0), 1) }}
        transition={strokeTransition}
      />
      <motion.path
        d="M104 42 V92 M100 92 H108 M104 58 H108"
        fill="none"
        stroke="#2d5a27"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: Math.min(Math.max((drawProgress - 0.45) / 0.55, 0), 1) }}
        transition={strokeTransition}
      />

      {/* Hojas de bambú */}
      <motion.path
        d="M92 44 Q84 40 86 48 M104 52 Q112 48 110 56"
        fill="none"
        stroke="#68a637"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: Math.min(Math.max((drawProgress - 0.6) / 0.4, 0), 1) }}
        transition={strokeTransition}
      />

      {/* Relleno suave al completar el trazo */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: fillOpacity }}
        transition={{ duration: 0.35, ease: easePremium }}
      >
        <path
          d="M24 18 H54 C68 18 74 26 74 36 C74 46 68 52 54 52 H24 V52 H56 C72 52 80 60 80 74 C80 90 68 102 52 102 H24 Z"
          fill="#2d5a27"
          opacity={0.92}
        />
        <path
          d="M90 30 C94 30 96 34 96 38 V96 C96 100 94 102 90 102 C86 102 84 98 84 94 V38 C84 34 86 30 90 30 Z"
          fill="#68a637"
          opacity={0.85}
        />
        <path
          d="M102 40 C105 40 107 43 107 46 V90 C107 93 105 95 102 95 C99 95 97 92 97 89 V46 C97 43 99 40 102 40 Z"
          fill="#2d5a27"
          opacity={0.8}
        />
      </motion.g>
    </svg>
  );
}
