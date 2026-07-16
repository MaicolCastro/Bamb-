"use client";

import { Check } from "lucide-react";
import { COMPARISON_ROWS } from "@/lib/constants";
import { ScrollReveal } from "./ScrollReveal";

const OTA_LEVELS = [0.35, 0.2, 0.15, 0.25, 0.85] as const;

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

        <ul role="list" className="divide-y divide-black/[0.04]">
          {COMPARISON_ROWS.map((row, i) => {
            const otaLevel = row.ota ? OTA_LEVELS[i] ?? 0.5 : 0.08;
            return (
              <li
                key={row.feature}
                className="px-5 py-4 sm:px-8 sm:py-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm font-medium text-foreground/80 sm:text-base">
                    {row.feature}
                  </span>
                  {row.ota ? (
                    <span className="shrink-0 rounded-full bg-foreground/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground/40">
                      Parcial
                    </span>
                  ) : (
                    <span className="flex shrink-0 items-center gap-1 rounded-full bg-bamboo/10 px-2 py-0.5 text-[10px] font-semibold text-bamboo">
                      <Check className="h-3 w-3" aria-hidden="true" />
                      Bambú
                    </span>
                  )}
                </div>

                <div className="mt-3 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-12 shrink-0 text-[10px] font-semibold text-bamboo">
                      Bambú
                    </span>
                    <div className="compare-bar-track flex-1">
                      <div
                        className="compare-bar-fill-bamboo"
                        style={{ width: row.ota ? "92%" : "100%" }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12 shrink-0 text-[10px] font-semibold text-foreground/40">
                      OTAs
                    </span>
                    <div className="compare-bar-track flex-1">
                      <div
                        className="compare-bar-fill-ota"
                        style={{ width: `${otaLevel * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </ScrollReveal>
  );
}
