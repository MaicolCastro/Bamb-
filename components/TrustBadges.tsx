"use client";

import { ShieldCheck, Award } from "lucide-react";
import { TRUST_BADGES } from "@/lib/constants";

const icons = [ShieldCheck, Award];

export function TrustBadges() {
  return (
    <div className="border-y border-black/[0.04] bg-background py-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-4 sm:gap-12 sm:px-6 lg:px-8">
        {TRUST_BADGES.map((badge, i) => {
          const Icon = icons[i] ?? ShieldCheck;
          return (
            <div
              key={badge.label}
              className="flex items-center gap-3 transition-premium hover:opacity-80"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-bamboo-muted ring-1 ring-black/[0.04]">
                <Icon className="h-5 w-5 text-bamboo" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold tracking-wide text-bamboo-dark">
                  {badge.label}
                </p>
                <p className="text-xs text-foreground/50">{badge.sublabel}</p>
              </div>
            </div>
          );
        })}
        <p className="text-center text-xs text-foreground/40 sm:max-w-[200px] sm:text-left">
          Agencia legalmente constituida en Colombia
        </p>
      </div>
    </div>
  );
}
