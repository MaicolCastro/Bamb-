"use client";

import Image from "next/image";
import { EDITORIAL_BAND, SITE } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

export function EditorialBand() {
  const whatsappHref = getWhatsAppUrl(SITE.whatsapp, EDITORIAL_BAND.whatsappMessage);

  return (
    <section
      className="relative flex min-h-[280px] items-center overflow-hidden sm:min-h-[340px] lg:min-h-[420px]"
      aria-label="Frase inspiracional"
    >
      <Image
        src={EDITORIAL_BAND.image}
        alt=""
        fill
        className="ken-burns ken-burns-1 object-cover object-[center_40%]"
        sizes="100vw"
        priority={false}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10" aria-hidden="true" />

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-earth-light"
        aria-label={`${EDITORIAL_BAND.quote} ${EDITORIAL_BAND.cta}`}
      >
        <span className="sr-only">
          {EDITORIAL_BAND.quote} — {EDITORIAL_BAND.cta}
        </span>
      </a>
    </section>
  );
}
