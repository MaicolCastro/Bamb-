"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";

const easePremium = [0.22, 1, 0.36, 1] as const;
const STRIP_COUNT = 10;
const LOADER_MS = 1200;

type LoaderPhase = "loading" | "curtain" | "done";

export function Loader() {
  const [phase, setPhase] = useState<LoaderPhase>("loading");

  useEffect(() => {
    if (sessionStorage.getItem("bambu-visited")) {
      setPhase("done");
      return;
    }

    const timer = setTimeout(() => setPhase("curtain"), LOADER_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase !== "curtain") return;
    const timer = setTimeout(() => {
      sessionStorage.setItem("bambu-visited", "1");
      setPhase("done");
    }, 700);
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
          transition={{ duration: 0.25, ease: easePremium }}
          className="fixed inset-0 z-[100] overflow-hidden"
          role="status"
          aria-label="Cargando sitio web"
        >
          {phase === "loading" && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="film-grain relative flex h-full flex-col items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-bamboo-dark via-bamboo-dark/95 to-bamboo/90" />
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=60)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-bamboo-dark/70 via-black/40 to-bamboo-dark/85" />

              <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 8 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: easePremium }}
                className="relative z-10 flex flex-col items-center gap-8"
              >
                <div className="rounded-2xl bg-white/95 px-6 py-4 shadow-xl shadow-black/20 ring-1 ring-white/50">
                  <Logo size="lg" priority />
                </div>

                <div className="flex flex-col items-center gap-3">
                  <p className="font-playfair text-lg tracking-wide text-white/90 sm:text-xl">
                    Preparando tu próxima aventura
                  </p>
                  <div className="h-1 w-48 overflow-hidden rounded-full bg-white/15 ring-1 ring-white/10">
                    <div
                      className="loader-progress h-full rounded-full bg-gradient-to-r from-bamboo-light via-earth-light to-bamboo-light"
                      style={{ animationDuration: `${LOADER_MS}ms` }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

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
                      duration: 0.6,
                      delay: i * 0.03,
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
