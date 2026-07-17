"use client";

import Image from "next/image";
import { EDITORIAL_BAND, SITE } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

/** Banner recortado, upscaled 2× y sin recomprimir en Next.js */
const BANNER_WIDTH = 2048;
const BANNER_HEIGHT = 626;

export function EditorialBand() {
  const whatsappHref = getWhatsAppUrl(SITE.whatsapp, EDITORIAL_BAND.whatsappMessage);

  return (
    <section className="relative w-full bg-bamboo-dark" aria-label="Frase inspiracional">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="group block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-earth-light"
        aria-label={`${EDITORIAL_BAND.quote} ${EDITORIAL_BAND.cta}`}
      >
        <Image
          src={EDITORIAL_BAND.image}
          alt={`${EDITORIAL_BAND.quote} ${EDITORIAL_BAND.cta}`}
          width={BANNER_WIDTH}
          height={BANNER_HEIGHT}
          className="block h-auto w-full"
          sizes="100vw"
          unoptimized
          priority={false}
        />
      </a>
    </section>
  );
}
