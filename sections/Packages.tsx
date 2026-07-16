"use client";

import { Check, ArrowRight } from "lucide-react";
import { PACKAGES, SITE } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/Button";
import { WhatsAppIcon } from "@/components/SocialIcons";

export function Packages() {
  return (
    <section
      id="paquetes"
      className="bg-background py-24 sm:py-32"
      aria-labelledby="packages-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          sectionNumber="03"
          highlights={["medida"]}
          eyebrow="Experiencias curadas"
          title="Paquetes diseñados a tu medida"
          description="Estos son puntos de partida inspiradores. Cada paquete se adapta a tus fechas, presupuesto y preferencias — sin fórmulas rígidas."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {PACKAGES.map((pkg, index) => (
            <ScrollReveal key={pkg.id} delay={index * 0.08}>
              <article className="card-surface group flex h-full flex-col rounded-3xl p-7 transition-premium hover:shadow-xl hover:shadow-bamboo/10 sm:p-8">
                <span className="inline-flex w-fit rounded-full bg-bamboo-muted px-3 py-1 text-xs font-semibold text-bamboo">
                  {pkg.tag}
                </span>

                <h3 className="font-playfair mt-4 text-xl font-semibold text-foreground sm:text-2xl">
                  {pkg.title}
                </h3>

                <p className="mt-1 text-sm text-foreground/50">
                  {pkg.destination} · {pkg.duration}
                </p>

                <ul className="mt-6 flex-1 space-y-2.5" role="list">
                  {pkg.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-foreground/70"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-bamboo"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <Button
                  href={getWhatsAppUrl(SITE.whatsapp, pkg.whatsappMessage)}
                  external
                  variant="primary"
                  size="md"
                  className="mt-8 w-full group-hover:shadow-bamboo/30"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Solicitar cotización
                  <ArrowRight className="h-4 w-4 opacity-60" aria-hidden="true" />
                </Button>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <p className="mt-10 text-center text-sm text-foreground/50">
            ¿Buscas otro destino o duración?{" "}
            <a
              href={getWhatsAppUrl(SITE.whatsapp, SITE.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-bamboo transition-premium hover:underline"
            >
              Cuéntanos tu idea y la diseñamos juntos
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
