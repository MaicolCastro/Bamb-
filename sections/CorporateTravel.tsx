"use client";

import Image from "next/image";
import { Check, Building2 } from "lucide-react";
import { CORPORATE_BENEFITS, SITE } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/Button";
import { WhatsAppIcon } from "@/components/SocialIcons";

export function CorporateTravel() {
  return (
    <section
      id="corporativo"
      className="relative overflow-hidden bg-bamboo py-24 sm:py-32"
      aria-labelledby="corporate-heading"
    >
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/images/destinations/cancun.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 ring-1 ring-white/20">
              <Building2 className="h-4 w-4" aria-hidden="true" />
              Viajes corporativos
            </div>
            <h2
              id="corporate-heading"
              className="font-display mt-6 text-3xl font-semibold text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight"
            >
              Retiros, convenciones y viajes de incentivo para tu empresa
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">
              Coordinamos grupos de cualquier tamaño con la misma atención que un
              viaje personal. Facturación empresarial, itinerarios flexibles y un
              coordinador dedicado de principio a fin.
            </p>

            <ul className="mt-8 space-y-3" role="list">
              {CORPORATE_BENEFITS.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 text-sm text-white/85 sm:text-base"
                >
                  <Check
                    className="mt-0.5 h-5 w-5 shrink-0 text-bamboo-light"
                    aria-hidden="true"
                  />
                  {benefit}
                </li>
              ))}
            </ul>

            <Button
              href={getWhatsAppUrl(
                SITE.whatsapp,
                "Hola Bambú, necesito cotizar un viaje corporativo para mi empresa. ¿Me pueden asesorar?"
              )}
              external
              variant="secondary"
              size="lg"
              className="mt-10"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Cotizar viaje corporativo
            </Button>
          </ScrollReveal>

          <ScrollReveal delay={0.1} direction="left">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/20">
              <Image
                src="/images/destinations/medellin.png"
                alt="Equipo en retiro corporativo"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bamboo-dark/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="font-playfair text-xl font-medium text-white sm:text-2xl">
                  &ldquo;Confiamos en Bambú para el retiro de nuestra empresa.&rdquo;
                </p>
                <p className="mt-2 text-sm text-white/70">
                  Coordinación impecable para grupos grandes
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
