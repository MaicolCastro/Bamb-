"use client";

import { STATS } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";
import { ScrollReveal } from "@/components/ScrollReveal";

function StatItem({
  value,
  suffix,
  label,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
}) {
  const { count, ref } = useCountUp(value, 2000);

  return (
    <ScrollReveal delay={index * 0.1}>
      <div ref={ref} className="text-center">
        <p className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
          {count}
          {suffix}
        </p>
        <p className="mt-2 text-sm font-medium text-white/70 sm:text-base">
          {label}
        </p>
      </div>
    </ScrollReveal>
  );
}

export function Stats() {
  return (
    <section
      className="bg-bamboo-dark py-20 sm:py-24"
      aria-label="Estadísticas de la agencia"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {STATS.map((stat, index) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
