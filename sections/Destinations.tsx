"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { DESTINATIONS, SITE } from "@/lib/constants";
import { getWhatsAppUrl, cn } from "@/lib/utils";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useTilt } from "@/hooks/useTilt";

const spanClasses = {
  tall: "row-span-2",
  wide: "col-span-2",
  normal: "",
};

const kenBurnsClasses = [
  "ken-burns ken-burns-1",
  "ken-burns ken-burns-2",
  "ken-burns ken-burns-3",
  "ken-burns ken-burns-4",
];

function DestinationCard({
  dest,
  index,
}: {
  dest: (typeof DESTINATIONS)[number];
  index: number;
}) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt(7);

  return (
    <ScrollReveal
      delay={index * 0.06}
      className={cn(
        spanClasses[dest.span],
        dest.span === "wide" && "col-span-2"
      )}
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="h-full transition-transform duration-300 ease-out will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <a
          href={getWhatsAppUrl(
            SITE.whatsapp,
            `Hola Bambú, me interesa viajar a ${dest.name}. ¿Me pueden asesorar?`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block h-full overflow-hidden rounded-3xl shadow-lg shadow-black/10"
          aria-label={`Cotizar viaje a ${dest.name}`}
        >
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={dest.image}
              alt={`${dest.name}, ${dest.country}`}
              fill
              className={cn(
                "object-cover",
                kenBurnsClasses[index % kenBurnsClasses.length]
              )}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/80" />
          </div>

          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
            <span className="mb-1 text-sm font-medium text-white/70">
              {dest.country}
            </span>
            <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
              {dest.name}
            </h3>
            <p className="mt-1 text-sm text-white/80">{dest.tagline}</p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="mt-3 flex items-center gap-2 text-sm font-semibold text-bamboo-light opacity-0 transition-opacity group-hover:opacity-100"
            >
              Quiero cotizar este destino
              <ArrowUpRight className="h-4 w-4" />
            </motion.div>
          </div>
        </a>
      </div>
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

        <div className="mt-16 grid auto-rows-[220px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[260px] sm:gap-4 lg:grid-cols-4">
          {DESTINATIONS.map((dest, index) => (
            <DestinationCard key={dest.name} dest={dest} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
