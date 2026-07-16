"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Sun, MapPin, Sparkles } from "lucide-react";
import { DESTINATION_DETAILS, SITE } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import { Button } from "./Button";
import { WhatsAppIcon } from "./SocialIcons";

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
  useEffect(() => {
    if (!destination) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [destination, onClose]);

  const details = destination ? DESTINATION_DETAILS[destination.name] : null;

  return (
    <AnimatePresence>
      {destination && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="destination-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Cerrar"
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
          >
            <div className="relative h-48 sm:h-56">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-premium hover:bg-black/60"
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
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-base leading-relaxed text-foreground/70">
                {destination.tagline}
              </p>

              {details && (
                <div className="mt-6 grid grid-cols-2 gap-3">
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
                    <p className="mt-0.5 text-sm font-semibold text-foreground">
                      {details.bestSeason}
                    </p>
                  </div>
                </div>
              )}

              {details?.highlights && (
                <div className="mt-6">
                  <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Sparkles className="h-4 w-4 text-bamboo" aria-hidden="true" />
                    Lo que no te puedes perder
                  </p>
                  <ul className="space-y-2" role="list">
                    {details.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-foreground/70"
                      >
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-bamboo/70" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button
                href={getWhatsAppUrl(
                  SITE.whatsapp,
                  `Hola Bambú, me interesa viajar a ${destination.name}. ¿Me pueden asesorar con fechas y opciones?`
                )}
                external
                variant="whatsapp"
                size="lg"
                className="mt-8 w-full"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Cotizar {destination.name}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
