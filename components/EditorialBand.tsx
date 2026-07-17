"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { EDITORIAL_BAND, SITE } from "@/lib/constants";
import { CARD_IMAGE_QUALITY } from "@/lib/image-utils";
import { getWhatsAppUrl } from "@/lib/utils";

export function EditorialBand() {
  const whatsappHref = getWhatsAppUrl(SITE.whatsapp, EDITORIAL_BAND.whatsappMessage);

  return (
    <section
      className="relative flex min-h-[min(52vw,420px)] items-center overflow-hidden sm:min-h-[min(44vw,480px)] lg:min-h-[520px]"
      aria-label="Frase inspiracional"
    >
      <Image
        src={EDITORIAL_BAND.image}
        alt=""
        fill
        className="object-cover object-[72%_center] sm:object-[68%_center] lg:object-right"
        sizes="100vw"
        quality={CARD_IMAGE_QUALITY}
        priority={false}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/55 via-45% to-black/15 to-75% sm:from-black/78 sm:via-black/48 lg:from-black/72 lg:via-black/35"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <blockquote className="max-w-xl sm:max-w-2xl">
          <p className="font-playfair text-[clamp(1.65rem,4.5vw,2.75rem)] font-medium leading-[1.15] tracking-tight text-white">
            {EDITORIAL_BAND.quote}
          </p>
          <footer className="mt-6 sm:mt-8">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-premium hover:border-white/35 hover:bg-white/15 hover:gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-earth-light focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {EDITORIAL_BAND.cta}
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
