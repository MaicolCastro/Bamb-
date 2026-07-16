"use client";

import { Users, Calendar, Headphones } from "lucide-react";
import { TEAM } from "@/lib/constants";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";

const iconMap = {
  Users,
  Calendar,
  Headphones,
} as const;

export function Team() {
  return (
    <section
      id="equipo"
      className="bg-background py-24 sm:py-32"
      aria-labelledby="team-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          highlights={["humano"]}
          eyebrow="Quiénes somos"
          title="Un equipo humano detrás de cada viaje"
          description="No somos un algoritmo ni un call center lejano. Somos personas del Eje Cafetero apasionadas por conectar viajeros con experiencias auténticas."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {TEAM.map((member, index) => {
            const Icon = iconMap[member.icon];
            return (
              <ScrollReveal key={member.role} delay={index * 0.08}>
                <article className="card-surface group rounded-3xl p-8 transition-premium hover:shadow-lg hover:shadow-bamboo/10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-bamboo-muted transition-premium group-hover:bg-bamboo group-hover:text-white">
                    <Icon className="h-7 w-7 text-bamboo group-hover:text-white" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold text-foreground">
                    {member.role}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/65">
                    {member.description}
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
