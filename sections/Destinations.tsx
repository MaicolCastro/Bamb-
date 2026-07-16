"use client";

import {
  Sun,
  Mountain,
  Building2,
  TreePine,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { DESTINATIONS, SITE } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CardImage } from "@/components/CardImage";

const climateConfig: Record<
  (typeof DESTINATIONS)[number]["climate"],
  { Icon: LucideIcon; label: string }
> = {
  beach: { Icon: Sun, label: "Playa y sol" },
  mountain: { Icon: Mountain, label: "Montaña y aventura" },
  city: { Icon: Building2, label: "Ciudad y cultura" },
  nature: { Icon: TreePine, label: "Naturaleza" },
  family: { Icon: Sparkles, label: "Familia y diversión" },
};

function DestinationCard({
  dest,
  index,
}: {
  dest: (typeof DESTINATIONS)[number];
  index: number;
}) {
  const { Icon: ClimateIcon, label: climateLabel } = climateConfig[dest.climate];

  return (
    <ScrollReveal delay={index * 0.06}>
      <a
        href={getWhatsAppUrl(
          SITE.whatsapp,
          `Hola Bambú, me interesa viajar a ${dest.name}. ¿Me pueden asesorar?`
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block overflow-hidden rounded-3xl shadow-lg shadow-black/10 ring-1 ring-black/5 transition-shadow duration-300 ease-out hover:shadow-xl hover:shadow-black/20"
        aria-label={`Cotizar viaje a ${dest.name}`}
      >
        <CardImage
          src={dest.image}
          alt={`${dest.name}, ${dest.country}`}
          objectPosition={
            "objectPosition" in dest ? dest.objectPosition : undefined
          }
          imageClassName="transition-transform duration-300 ease-out group-hover:scale-[1.04]"
          className="rounded-3xl"
        />

        <div
          className="destination-card-gradient pointer-events-none absolute inset-0 transition-[background] duration-300 ease-out"
          aria-hidden="true"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 sm:p-5">
          <div className="flex w-full min-w-0 flex-col items-start text-left">
            <div
              className="mb-2 inline-flex max-w-full items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-shadow-premium backdrop-blur-md"
              title={climateLabel}
            >
              <ClimateIcon
                className="h-3 w-3 shrink-0 text-white/95"
                aria-hidden="true"
              />
              <span className="truncate text-[10px] font-medium tracking-wide text-white/95 sm:text-[11px]">
                {climateLabel}
              </span>
            </div>

            <p className="mb-1.5 text-[11px] font-medium tracking-[0.1em] text-white/85 uppercase text-shadow-premium sm:text-xs">
              {dest.country}
            </p>

            <h3 className="font-playfair mb-2 line-clamp-2 text-lg font-semibold leading-tight tracking-tight text-white text-shadow-premium sm:text-xl">
              {dest.name}
            </h3>

            <p className="line-clamp-2 text-xs leading-snug text-white/90 text-shadow-premium sm:text-sm sm:leading-normal">
              {dest.tagline}
            </p>
          </div>
        </div>
      </a>
    </ScrollReveal>
  );
}

export function Destinations() {
  return (
    <section
      id="destinos"
      className="bg-background py-24 sm:py-32"
      aria-labelledby="destinations-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          sectionNumber="02"
          highlights={["realidad"]}
          eyebrow="Destinos destacados"
          title="Inspírate. Nosotros hacemos realidad el resto."
          description="Estos son algunos de los destinos que nuestros viajeros aman. ¿Cuál despierta tu curiosidad? Escríbenos y diseñamos tu experiencia ideal."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {DESTINATIONS.map((dest, index) => (
            <DestinationCard key={dest.name} dest={dest} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
