"use client";

import { PARTNERS } from "@/lib/constants";

export function PartnersStrip() {
  return (
    <div className="border-t border-white/10 bg-bamboo-dark py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
          Trabajamos con los mejores proveedores
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {PARTNERS.map((name) => (
            <span
              key={name}
              className="text-sm font-bold tracking-wide text-white/35 transition-premium hover:text-white/70 sm:text-base"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
