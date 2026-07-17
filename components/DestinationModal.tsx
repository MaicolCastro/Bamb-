"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Sun,
  MapPin,
  Sparkles,
  Users,
  Lightbulb,
  Plane,
  Check,
} from "lucide-react";
import { DESTINATION_DETAILS } from "@/lib/constants";

type Destination = {
  name: string;
  country: string;
  tagline: string;
  image: string;
  climate: string;
  objectPosition?: string;
};

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
}

export function DestinationModal({ destination, onClose }: DestinationModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!destination) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.dataset.modalOpen = "true";
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      delete document.body.dataset.modalOpen;
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [destination, onClose]);

  const details = destination ? DESTINATION_DETAILS[destination.name] : null;

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {destination && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="destination-modal-title"
        >
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <Image
              src={destination.image}
              alt=""
              fill
              className="scale-110 object-cover blur-2xl brightness-50"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-bamboo-dark/60" />
          </div>

          <button
            type="button"
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={onClose}
            aria-label="Cerrar"
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-h-[min(92dvh,820px)] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-h-[min(88dvh,820px)] sm:rounded-3xl"
          >
            <div className="relative h-44 shrink-0 sm:h-52">
              <Image
                src={destination.image}
                alt={`${destination.name}, ${destination.country}`}
                fill
                className="object-cover"
                style={
                  destination.objectPosition
                    ? { objectPosition: destination.objectPosition }
                    : undefined
                }
                sizes="512px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-premium hover:bg-black/65"
                aria-label="Cerrar detalle del destino"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-xs font-medium tracking-widest text-white/80 uppercase">
                  {destination.country}
                </p>
                <h2
                  id="destination-modal-title"
                  className="font-playfair text-2xl font-semibold text-white sm:text-3xl"
                >
                  {destination.name}
                </h2>
                <p className="mt-1 text-sm text-white/85">{destination.tagline}</p>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain scroll-smooth">
              <div className="space-y-6 p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:p-8">
                {details?.description && (
                  <p className="text-base leading-relaxed text-foreground/75">
                    {details.description}
                  </p>
                )}

                {details && (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-bamboo-muted/60 p-4">
                      <Calendar className="mb-2 h-4 w-4 text-bamboo" aria-hidden="true" />
                      <p className="text-xs font-medium text-foreground/50">Duración sugerida</p>
                      <p className="mt-0.5 text-sm font-semibold text-foreground">
                        {details.duration}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-bamboo-muted/60 p-4">
                      <Sun className="mb-2 h-4 w-4 text-bamboo" aria-hidden="true" />
                      <p className="text-xs font-medium text-foreground/50">Mejor época</p>
                      <p className="mt-0.5 text-sm font-semibold leading-snug text-foreground">
                        {details.bestSeason}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-bamboo-muted/60 p-4 sm:col-span-1">
                      <Users className="mb-2 h-4 w-4 text-bamboo" aria-hidden="true" />
                      <p className="text-xs font-medium text-foreground/50">Ideal para</p>
                      <p className="mt-0.5 text-sm font-semibold leading-snug text-foreground">
                        {details.idealFor}
                      </p>
                    </div>
                  </div>
                )}

                {details?.highlights && (
                  <div>
                    <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Sparkles className="h-4 w-4 text-bamboo" aria-hidden="true" />
                      Lo que no te puedes perder
                    </p>
                    <ul className="space-y-2.5" role="list">
                      {details.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm leading-snug text-foreground/75"
                        >
                          <MapPin
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-bamboo/80"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {details?.includes && (
                  <div>
                    <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Plane className="h-4 w-4 text-bamboo" aria-hidden="true" />
                      Lo que podemos organizar por ti
                    </p>
                    <ul className="space-y-2" role="list">
                      {details.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm leading-snug text-foreground/70"
                        >
                          <Check
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-bamboo"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {details?.tip && (
                  <div className="flex gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/90 p-4">
                    <Lightbulb
                      className="mt-0.5 h-4 w-4 shrink-0 text-amber-600"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs font-semibold tracking-wide text-amber-800 uppercase">
                        Tip de Bambú
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-amber-950/85">
                        {details.tip}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
