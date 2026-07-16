"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { EDITORIAL_BAND, SITE } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

export function EditorialBand() {
  return (
    <section
      className="relative flex min-h-[280px] items-center overflow-hidden sm:min-h-[340px]"
      aria-label="Frase inspiracional"
    >
      <Image
        src={EDITORIAL_BAND.image}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-bamboo-dark/88 via-bamboo-dark/65 to-bamboo-dark/40" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <blockquote className="max-w-2xl">
          <p className="font-playfair text-2xl font-medium leading-snug text-white sm:text-3xl lg:text-4xl">
            {EDITORIAL_BAND.quote}
          </p>
          <footer className="mt-6">
            <a
              href={getWhatsAppUrl(SITE.whatsapp, EDITORIAL_BAND.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-earth-light transition-premium hover:gap-3 hover:text-white"
            >
              {EDITORIAL_BAND.cta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
