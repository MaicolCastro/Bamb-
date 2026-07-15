"use client";

import {
  HeartHandshake,
  Map,
  ShieldCheck,
  Award,
  type LucideIcon,
} from "lucide-react";
import { WHY_CHOOSE_US } from "@/lib/constants";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";
import { FloatingDecor } from "@/components/FloatingDecor";

const iconMap: Record<string, LucideIcon> = {
  HeartHandshake,
  Map,
  ShieldCheck,
  Award,
};

export function WhyChooseUs() {
  return (
    <section
      id="por-que-bambu"
      className="relative overflow-hidden bg-earth-muted py-24 sm:py-32"
      aria-labelledby="why-heading"
    >
      <FloatingDecor variant="earth" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          sectionNumber="01"
          highlights={["confiar"]}
          eyebrow="¿Por qué elegir Bambú?"
          title="Viajar bien empieza con confiar en quien te acompaña"
          description="No vendemos paquetes enlatados. Diseñamos experiencias únicas con el cuidado que mereces, porque tu viaje es personal y nosotros lo tratamos así."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE_US.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <article
                  className="card-shine group relative h-full rounded-3xl bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-bamboo/10"
                  style={
                    { "--shine-delay": `${index * 1.2}s` } as React.CSSProperties
                  }
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-bamboo-muted transition-colors group-hover:bg-bamboo group-hover:shadow-lg group-hover:shadow-bamboo/30">
                    <Icon
                      className="h-7 w-7 text-bamboo transition-colors group-hover:text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-foreground/60">
                    {item.description}
                  </p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
