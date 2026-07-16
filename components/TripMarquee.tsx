"use client";

import { TRIP_MARQUEE } from "@/lib/constants";

export function TripMarquee() {
  const items = [...TRIP_MARQUEE, ...TRIP_MARQUEE];

  return (
    <div
      className="overflow-hidden border-y border-bamboo/10 bg-bamboo-muted py-4"
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max gap-10">
        {items.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="flex shrink-0 items-center gap-10 text-sm font-semibold uppercase tracking-[0.2em] text-bamboo/70"
          >
            {label}
            <span className="h-1 w-1 rounded-full bg-earth/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
