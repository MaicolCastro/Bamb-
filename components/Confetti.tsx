"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = ["#2d5a27", "#68a637", "#a67c45", "#c4a574", "#e8f0e4"];

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  delay: number;
  shape: "circle" | "rect";
}

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    x: (Math.random() - 0.5) * 360,
    y: Math.random() * -280 - 40,
    color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? COLORS[0],
    size: Math.random() * 7 + 4,
    rotation: Math.random() * 540,
    delay: Math.random() * 0.15,
    shape: Math.random() > 0.5 ? "circle" : "rect",
  }));
}

interface ConfettiProps {
  active: boolean;
}

/** Burst breve de partículas en colores de marca */
export function Confetti({ active }: ConfettiProps) {
  const particles = useMemo(() => createParticles(48), []);

  return (
    <AnimatePresence>
      {active && (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          {particles.map((particle) => (
            <motion.span
              key={particle.id}
              initial={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
              animate={{
                opacity: [1, 1, 0],
                x: particle.x,
                y: particle.y,
                scale: [1, 1.1, 0.3],
                rotate: particle.rotation,
              }}
              transition={{
                duration: 1.4,
                delay: particle.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute left-1/2 top-1/3"
              style={{
                width: particle.size,
                height: particle.shape === "circle" ? particle.size : particle.size * 0.5,
                backgroundColor: particle.color,
                borderRadius: particle.shape === "circle" ? "50%" : "2px",
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
