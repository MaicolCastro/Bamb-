"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";

const easePremium = [0.22, 1, 0.36, 1] as const;

export function Loader() {
  const [isLoading, setIsLoading] = useState(true);
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
        setTimeout(() => setIsLoading(false), 300);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: easePremium }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          role="status"
          aria-label="Cargando sitio web"
        >
          {/* Fondo con identidad de marca */}
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
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
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
                  transition={{ ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>

          {/* Cortina de salida */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: progress >= 1 ? 1 : 0 }}
            transition={{ duration: 0.6, ease: easePremium }}
            className="absolute inset-0 origin-top bg-bamboo-dark"
            aria-hidden="true"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
