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
  const featured = WHY_CHOOSE_US.find(
    (item) => "featured" in item && item.featured
  );
  const rest = WHY_CHOOSE_US.filter(
    (item) => !("featured" in item && item.featured)
  );

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
          {featured && "image" in featured && (() => {
            const FeaturedIcon = iconMap[featured.icon];
            return (
            <ScrollReveal delay={0}>
              <article className="card-shine card-surface group relative overflow-hidden rounded-3xl transition-premium hover:-translate-y-1 hover:shadow-xl hover:shadow-bamboo/10">
                <span className="editorial-number" aria-hidden="true">
                  01
                </span>
                <div className="grid lg:grid-cols-2">
                  <div className="relative min-h-[220px] overflow-hidden lg:min-h-full">
                    <Image
                      src={featured.image}
                      alt=""
                      fill
                      className="object-cover transition-premium group-hover:scale-105"
                      sizes="(max-width:1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 lg:p-10">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-bamboo-muted transition-premium group-hover:bg-bamboo">
                      <FeaturedIcon
                        className="h-6 w-6 text-bamboo transition-premium group-hover:text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-foreground lg:text-2xl">
                      {featured.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-foreground/60">
                      {featured.description}
                    </p>
                  </div>
                </div>
              </article>
            </ScrollReveal>
            );
          })()}

          <div className="relative">
            <div className="editorial-list-line hidden lg:block" aria-hidden="true" />

            <div className="space-y-4 lg:space-y-0 lg:divide-y lg:divide-bamboo/10">
              {rest.map((item, index) => {
                const Icon = iconMap[item.icon];
                const num = index + 2;
                return (
                  <ScrollReveal key={item.title} delay={(index + 1) * 0.1}>
                    <article className="card-shine card-surface group relative rounded-3xl p-6 transition-premium hover:bg-white hover:shadow-lg hover:shadow-bamboo/8 sm:p-8 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-8 lg:pl-20 lg:shadow-none lg:hover:translate-x-1">
                      <span
                        className="absolute left-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-bamboo-muted font-playfair text-sm font-bold text-bamboo ring-4 ring-earth-muted lg:left-4 lg:top-1/2 lg:-translate-y-1/2"
                        aria-hidden="true"
                      >
                        {String(num).padStart(2, "0")}
                      </span>

                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6 lg:pl-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-bamboo-muted transition-premium group-hover:bg-bamboo sm:ml-14 lg:ml-0">
                          <Icon
                            className="h-6 w-6 text-bamboo transition-premium group-hover:text-white"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="sm:ml-0">
                          <h3 className="text-lg font-bold text-foreground sm:text-xl">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-base leading-relaxed text-foreground/60">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>

        <ComparisonTable />
      </div>
    </section>
  );
}
