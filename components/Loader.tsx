"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";

const easePremium = [0.22, 1, 0.36, 1] as const;
const STRIP_COUNT = 10;

type LoaderPhase = "loading" | "curtain" | "done";

export function Loader() {
  const [phase, setPhase] = useState<LoaderPhase>("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2400;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const next = Math.min(elapsed / duration, 1);
      setProgress(next);
      if (next < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setPhase("curtain"), 200);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (phase !== "curtain") return;
    const timer = setTimeout(() => setPhase("done"), 900);
    return () => clearTimeout(timer);
  }, [phase]);

  const showLoader = phase !== "done";

  return (
    <AnimatePresence mode="wait">
      {showLoader && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: easePremium }}
          className="fixed inset-0 z-[100] overflow-hidden"
          role="status"
          aria-label="Cargando sitio web"
        >
          {phase === "loading" && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex h-full flex-col items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-beige via-background to-bamboo-muted/40" />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 0.15 }}
                transition={{ duration: 2.4, ease: "easeOut" }}
                className="absolute h-96 w-96 rounded-full bg-bamboo blur-3xl"
              />
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1.1, opacity: 0.12 }}
                transition={{ duration: 2.4, delay: 0.2, ease: "easeOut" }}
                className="absolute h-72 w-72 translate-x-24 translate-y-12 rounded-full bg-earth blur-3xl"
              />

              <motion.div
                initial={{ scale: 0.88, opacity: 0, y: 12 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: easePremium }}
                className="relative flex flex-col items-center gap-8"
              >
                <motion.div
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Logo size="lg" priority />
                </motion.div>

                <div className="flex flex-col items-center gap-3">
                  <p className="font-display text-lg tracking-wide text-bamboo-dark sm:text-xl">
                    Preparando tu próxima aventura
                  </p>
                  <div className="h-1 w-48 overflow-hidden rounded-full bg-beige-dark/80">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-bamboo via-bamboo-light to-earth"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Cortina de aeropuerto — franjas que se abren */}
          {phase === "curtain" && (
            <div className="absolute inset-0 flex" aria-hidden="true">
              {Array.from({ length: STRIP_COUNT }).map((_, i) => {
                const fromLeft = i < STRIP_COUNT / 2;
                return (
                  <motion.div
                    key={i}
                    initial={{ scaleX: 1 }}
                    animate={{ scaleX: 0 }}
                    transition={{
                      duration: 0.75,
                      delay: i * 0.04,
                      ease: easePremium,
                    }}
                    style={{
                      transformOrigin: fromLeft ? "left center" : "right center",
                    }}
                    className="relative h-full flex-1 overflow-hidden"
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `repeating-linear-gradient(
                          -45deg,
                          ${i % 2 === 0 ? "#1e4620" : "#2d5a27"},
                          ${i % 2 === 0 ? "#1e4620" : "#2d5a27"} 12px,
                          ${i % 2 === 0 ? "#a67c45" : "#c4a574"} 12px,
                          ${i % 2 === 0 ? "#a67c45" : "#c4a574"} 24px
                        )`,
                      }}
                    />
                    <div className="absolute inset-y-0 right-0 w-px bg-white/10" />
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
