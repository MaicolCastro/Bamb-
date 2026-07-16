"use client";

import { Check, X } from "lucide-react";
import { COMPARISON_ROWS } from "@/lib/constants";
import { ScrollReveal } from "./ScrollReveal";

export function ComparisonTable() {
  return (
    <ScrollReveal>
      <div className="card-surface mx-auto mt-16 max-w-3xl overflow-hidden rounded-3xl">
        <div className="border-b border-black/[0.04] bg-bamboo-muted/50 px-6 py-4 text-center sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-earth">
            ¿Por qué elegir una agencia?
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold text-foreground sm:text-2xl">
            Bambú vs. reservar por tu cuenta
          </h3>
        </div>

        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-foreground/45 sm:px-6 sm:text-sm">
          <span />
          <span className="text-center text-bamboo">Bambú</span>
          <span className="text-center">OTAs</span>
        </div>

        <ul role="list">
          {COMPARISON_ROWS.map((row, i) => (
            <li
              key={row.feature}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 border-t border-black/[0.04] px-4 py-3.5 sm:px-6 sm:py-4"
            >
              <span className="text-sm text-foreground/75 sm:text-base">
                {row.feature}
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bamboo/10">
                <Check className="h-4 w-4 text-bamboo" aria-hidden="true" />
                <span className="sr-only">Sí</span>
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/5">
                {row.ota ? (
                  <>
                    <Check className="h-4 w-4 text-foreground/35" aria-hidden="true" />
                    <span className="sr-only">Parcial</span>
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 text-foreground/25" aria-hidden="true" />
                    <span className="sr-only">No</span>
                  </>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </ScrollReveal>
  );
}
