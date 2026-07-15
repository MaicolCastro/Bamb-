"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { SITE } from "@/lib/constants";

interface LightboxProps {
  images: readonly { id: number; src: string; alt: string }[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const isOpen = currentIndex !== null;
  const current = isOpen ? images[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    onNavigate(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    onNavigate(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Visor de imágenes"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Cerrar galería"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-16 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:top-1/2 sm:-translate-y-1/2"
            aria-label="Imagen siguiente"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <motion.div
            initial={{ scale: 0.88, opacity: 0, rotate: -2 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.88, opacity: 0, rotate: 2 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Postal de viaje */}
            <div className="relative overflow-hidden rounded-sm bg-[#f8f4ec] p-5 shadow-2xl shadow-black/40 ring-1 ring-earth/30 sm:p-7">
              {/* Textura papel */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.35]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(166,124,69,0.03) 3px, rgba(166,124,69,0.03) 4px)",
                }}
                aria-hidden="true"
              />

              {/* Borde interior punteado */}
              <div
                className="pointer-events-none absolute inset-3 rounded-sm border border-dashed border-earth/25 sm:inset-4"
                aria-hidden="true"
              />

              {/* Sello */}
              <div
                className="absolute right-5 top-5 z-10 flex h-16 w-14 flex-col items-center justify-center rounded-sm border-2 border-dashed border-bamboo/40 bg-bamboo-muted/60 sm:right-7 sm:top-7 sm:h-[4.5rem] sm:w-16"
                aria-hidden="true"
              >
                <span className="font-display text-[10px] font-bold uppercase tracking-wider text-bamboo sm:text-xs">
                  Bambú
                </span>
                <span className="mt-0.5 text-[8px] font-semibold uppercase text-earth sm:text-[9px]">
                  Travel
                </span>
              </div>

              {/* Postmark */}
              <div
                className="absolute right-16 top-8 z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-earth/30 opacity-50 sm:right-20 sm:top-10"
                aria-hidden="true"
              >
                <span className="text-[7px] font-bold uppercase tracking-widest text-earth/70">
                  {SITE.city}
                </span>
              </div>

              {/* Imagen */}
              <div className="relative mx-auto mt-2 max-h-[50vh] overflow-hidden rounded-sm shadow-md ring-1 ring-earth/20 sm:max-h-[55vh]">
                <Image
                  src={current.src}
                  alt={current.alt}
                  width={900}
                  height={600}
                  className="max-h-[50vh] w-full object-cover sm:max-h-[55vh]"
                  priority
                />
              </div>

              {/* Pie de postal */}
              <div className="relative mt-5 border-t border-earth/20 pt-4 text-center sm:mt-6">
                <div className="flex items-center justify-center gap-1.5 text-earth/70">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="text-xs font-medium uppercase tracking-widest">
                    {SITE.city}, {SITE.region}
                  </span>
                </div>
                <p className="mt-2 font-display text-xl font-semibold text-bamboo-dark sm:text-2xl">
                  {current.alt}
                </p>
                <p className="mt-1 text-xs italic text-foreground/45">
                  Agencia de Viajes Bambú · Recuerdos que inspiran
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
