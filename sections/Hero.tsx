"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { HeroVideo } from "@/components/HeroVideo";
import { WhatsAppIcon } from "@/components/SocialIcons";
import {
  HERO_DESTINATION_STRIP,
  HERO_ROTATING_DESTINATIONS,
  HERO_TRUST,
  SITE,
} from "@/lib/constants";
import { getWhatsAppUrl, scrollToSection } from "@/lib/utils";
import { Button } from "@/components/Button";
import { CursorSpotlight } from "@/components/CursorSpotlight";

const easePremium = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const [destIndex, setDestIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDestIndex((i) => (i + 1) % HERO_ROTATING_DESTINATIONS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="inicio"
      className="film-grain relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-label="Sección principal"
    >
      <HeroVideo />
      <CursorSpotlight size={380} intensity={0.2} />

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-bamboo/12 lg:hidden" />
        <div className="absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-earth/15 lg:hidden" />
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 top-1/4 hidden h-64 w-64 rounded-full bg-bamboo/15 blur-3xl lg:block"
        />
        <motion.div
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-20 bottom-1/4 hidden h-80 w-80 rounded-full bg-earth/20 blur-3xl lg:block"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 pt-24 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: easePremium }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.1, ease: easePremium }}
            className="mb-6 inline-block rounded-full glass-dark px-5 py-2 text-sm font-medium tracking-wide text-white/90 ring-1 ring-earth/40"
          >
            Agencia de viajes · {SITE.city}, {SITE.region}
          </motion.span>

          <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {SITE.tagline}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2, ease: easePremium }}
            className="font-playfair mx-auto mt-4 max-w-xl text-lg italic text-white/80 sm:text-xl"
          >
            Experiencias únicas, asesoría de corazón.
          </motion.p>

          <p className="mx-auto mt-3 flex flex-wrap items-center justify-center gap-x-1.5 text-base text-white/75 sm:text-lg">
            <span>Tu próximo destino:</span>
            <span className="inline-flex min-w-[8rem] justify-center font-semibold text-earth-light">
              <AnimatePresence mode="wait">
                <motion.span
                  key={HERO_ROTATING_DESTINATIONS[destIndex]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: easePremium }}
                  className="font-playfair italic"
                >
                  {HERO_ROTATING_DESTINATIONS[destIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.25, ease: easePremium }}
            className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl md:text-2xl"
          >
            Creamos experiencias inolvidables en Colombia y el mundo. Asesoría
            personalizada, sin complicaciones.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.35, ease: easePremium }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              href={getWhatsAppUrl(SITE.whatsapp, SITE.whatsappMessage)}
              external
              variant="whatsapp"
              size="lg"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Cotizar por WhatsApp
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("#destinos")}
            >
              Descubrir destinos
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
            aria-label="Garantías de la agencia"
          >
            {HERO_TRUST.map((item) => (
              <li
                key={item}
                className="flex items-center gap-1.5 text-xs font-medium text-white/70 sm:text-sm"
              >
                <Check className="h-3.5 w-3.5 shrink-0 text-bamboo-light" aria-hidden="true" />
                {item}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      {/* Franja postal de destinos */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.7, ease: easePremium }}
        className="absolute bottom-20 left-0 right-0 z-10 hidden sm:block"
        aria-hidden="true"
      >
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-3 px-4">
          {HERO_DESTINATION_STRIP.map((dest) => (
            <button
              key={dest.name}
              type="button"
              onClick={() => scrollToSection("#destinos")}
              className="group flex flex-col items-center gap-1.5 transition-premium hover:-translate-y-1"
              title={dest.name}
            >
              <span className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-white/40 transition-premium group-hover:ring-earth-light sm:h-12 sm:w-12">
                <Image
                  src={dest.image}
                  alt=""
                  fill
                  className="object-cover transition-premium group-hover:scale-110"
                  sizes="48px"
                />
              </span>
              <span className="text-[9px] font-medium tracking-wide text-white/60 uppercase group-hover:text-white/90">
                {dest.name}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.6 }}
        onClick={() => scrollToSection("#por-que-bambu")}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60 transition-premium hover:text-white"
        aria-label="Desplazarse hacia abajo"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">
          Explorar
        </span>
        <div className="h-10 w-px bg-gradient-to-b from-white/70 to-transparent" aria-hidden="true" />
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" strokeWidth={1.5} />
        </motion.div>
      </motion.button>
    </section>
  );
}
