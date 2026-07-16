"use client";

import Image from "next/image";
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
import { ComparisonTable } from "@/components/ComparisonTable";

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

        <div className="mt-16 grid gap-6">
          {WHY_CHOOSE_US.map((item, index) => {
            const Icon = iconMap[item.icon];
            const isFeatured = "featured" in item && item.featured;

            if (isFeatured && "image" in item) {
              return (
                <ScrollReveal key={item.title} delay={0}>
                  <article className="card-shine card-surface group relative overflow-hidden rounded-3xl transition-premium hover:-translate-y-1 hover:shadow-xl hover:shadow-bamboo/10">
                    <span className="editorial-number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="grid lg:grid-cols-2">
                      <div className="relative min-h-[220px] overflow-hidden lg:min-h-full">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          className="object-cover transition-premium group-hover:scale-105"
                          sizes="(max-width:1024px) 100vw, 50vw"
                        />
                      </div>
                      <div className="flex flex-col justify-center p-8 lg:p-10">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-bamboo-muted transition-premium group-hover:bg-bamboo">
                          <Icon
                            className="h-6 w-6 text-bamboo transition-premium group-hover:text-white"
                            aria-hidden="true"
                          />
                        </div>
                        <h3 className="text-xl font-bold text-foreground lg:text-2xl">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-base leading-relaxed text-foreground/60">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            }
            return null;
          })}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_CHOOSE_US.filter(
              (item) => !("featured" in item && item.featured)
            ).map((item, index) => {
              const Icon = iconMap[item.icon];
              const num = WHY_CHOOSE_US.indexOf(item) + 1;
              return (
                <ScrollReveal key={item.title} delay={(index + 1) * 0.1}>
                  <article
                    className="card-shine card-surface group relative h-full rounded-3xl p-8 transition-premium hover:-translate-y-1 hover:shadow-xl hover:shadow-bamboo/10"
                    style={
                      { "--shine-delay": `${index * 1.2}s` } as React.CSSProperties
                    }
                  >
                    <span className="editorial-number" aria-hidden="true">
                      {String(num).padStart(2, "0")}
                    </span>
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-bamboo-muted transition-premium group-hover:bg-bamboo group-hover:shadow-lg group-hover:shadow-bamboo/30">
                      <Icon
                        className="h-7 w-7 text-bamboo transition-premium group-hover:text-white"
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

        <ComparisonTable />
      </div>
    </section>
  );
}
