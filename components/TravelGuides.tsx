"use client";

import Image from "next/image";
import { TRAVEL_GUIDES } from "@/lib/constants";
import { SectionHeading } from "./SectionHeading";
import { ScrollReveal } from "./ScrollReveal";

export function TravelGuides() {
  return (
    <section
      className="bg-background py-24 sm:py-32"
      aria-labelledby="guides-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Guías de viaje"
          title="Consejos para planear mejor"
          description="Pequeñas guías de nuestro equipo para que tomes decisiones con confianza."
          highlights={["mejor"]}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TRAVEL_GUIDES.map((guide, index) => (
            <ScrollReveal key={guide.title} delay={index * 0.08}>
              <article className="card-surface flex h-full flex-col overflow-hidden rounded-2xl">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={guide.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <span className="text-xs font-semibold uppercase tracking-widest text-earth">
                    {guide.category}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                    {guide.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/60">
                    {guide.excerpt}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
