"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { HeroVideo } from "@/components/HeroVideo";
import { WhatsAppIcon } from "@/components/SocialIcons";
import { SITE } from "@/lib/constants";
import { getWhatsAppUrl, scrollToSection } from "@/lib/utils";
import { Button } from "@/components/Button";
import { CursorSpotlight } from "@/components/CursorSpotlight";

const easePremium = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      id="inicio"
      className="film-grain relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-label="Sección principal"
    >
      <HeroVideo />
      <CursorSpotlight size={380} intensity={0.2} />

      {/* Ambient glow — animado solo en desktop */}
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
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl md:text-2xl"
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

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="mt-8 text-sm tracking-wide text-white/55"
          >
            Respuesta en menos de 2 horas · Cotización sin compromiso
          </motion.p>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.6 }}
        onClick={() => scrollToSection("#por-que-bambu")}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/60 transition-colors hover:text-white"
        aria-label="Desplazarse hacia abajo"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-8 w-8" strokeWidth={1.5} />
        </motion.div>
      </motion.button>
    </section>
  );
}
