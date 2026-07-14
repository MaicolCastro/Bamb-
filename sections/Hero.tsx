"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { WhatsAppIcon } from "@/components/SocialIcons";
import { SITE } from "@/lib/constants";
import { getWhatsAppUrl, scrollToSection } from "@/lib/utils";
import { Button } from "@/components/Button";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-label="Sección principal"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=85"
          alt="Destinos turísticos alrededor del mundo"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bamboo-dark/55 via-black/25 to-bamboo-dark/70" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-bamboo/10 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-earth/15 blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 pt-24 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="mb-6 inline-block rounded-full glass-dark px-5 py-2 text-sm font-medium text-white/90 ring-1 ring-earth/30">
            ✈️ Agencia de viajes · {SITE.city}, {SITE.region}
          </span>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {SITE.tagline}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl md:text-2xl">
            Creamos experiencias inolvidables en Colombia y el mundo. Asesoría
            personalizada, sin complicaciones.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
          </div>

          <p className="mt-8 text-sm text-white/60">
            Respuesta en menos de 2 horas · Cotización sin compromiso
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        onClick={() => scrollToSection("#por-que-bambu")}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70 transition-colors hover:text-white"
        aria-label="Desplazarse hacia abajo"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </motion.button>
    </section>
  );
}
