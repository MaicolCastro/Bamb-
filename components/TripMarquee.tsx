"use client";

import Image from "next/image";
import { MARQUEE_DESTINATIONS, TRIP_MARQUEE } from "@/lib/constants";

export function TripMarquee() {
  const photoItems = [...MARQUEE_DESTINATIONS, ...MARQUEE_DESTINATIONS];
  const textItems = [...TRIP_MARQUEE, ...TRIP_MARQUEE];

  return (
    <div className="overflow-hidden border-y border-bamboo/10 bg-bamboo-muted py-3">
      {/* Fotos de destinos */}
      <div className="marquee-track flex w-max items-center gap-6 pb-3" aria-hidden="true">
        {photoItems.map((dest, i) => (
          <span
            key={`photo-${dest.label}-${i}`}
            className="flex shrink-0 items-center gap-2.5"
          >
            <span className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-bamboo/20">
              <Image
                src={dest.image}
                alt=""
                fill
                className="object-cover"
                sizes="36px"
              />
            </span>
            <span className="text-xs font-semibold tracking-wide text-bamboo/80">
              {dest.label}
            </span>
          </span>
        ))}
      </div>

      {/* Tipos de viaje */}
      <div
        className="marquee-track flex w-max gap-10 border-t border-bamboo/10 pt-3"
        style={{ animationDirection: "reverse", animationDuration: "35s" }}
        aria-hidden="true"
      >
        {textItems.map((label, i) => (
          <span
            key={`text-${label}-${i}`}
            className="flex shrink-0 items-center gap-10 text-sm font-semibold uppercase tracking-[0.2em] text-bamboo/55"
          >
            {label}
            <span className="h-1 w-1 rounded-full bg-earth/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
