"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Mountain,
  Building2,
  TreePine,
  Sparkles,
  LayoutGrid,
  Flame,
  type LucideIcon,
} from "lucide-react";
import { DESTINATIONS, DESTINATION_DETAILS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CardImage } from "@/components/CardImage";
import { DestinationModal } from "@/components/DestinationModal";

type ClimateKey = (typeof DESTINATIONS)[number]["climate"];
type FilterKey = "all" | ClimateKey;
type Destination = (typeof DESTINATIONS)[number];

const climateConfig: Record<
  ClimateKey,
  { Icon: LucideIcon; label: string }
> = {
  beach: { Icon: Sun, label: "Playa y sol" },
  mountain: { Icon: Mountain, label: "Montaña y aventura" },
  city: { Icon: Building2, label: "Ciudad y cultura" },
  nature: { Icon: TreePine, label: "Naturaleza" },
  family: { Icon: Sparkles, label: "Familia y diversión" },
};

const FILTER_OPTIONS: { id: FilterKey; label: string; Icon: LucideIcon }[] = [
  { id: "all", label: "Todos", Icon: LayoutGrid },
  { id: "beach", label: "Playa y sol", Icon: Sun },
  { id: "nature", label: "Naturaleza", Icon: TreePine },
  { id: "city", label: "Ciudad y cultura", Icon: Building2 },
  { id: "mountain", label: "Montaña y aventura", Icon: Mountain },
  { id: "family", label: "Familia y diversión", Icon: Sparkles },
];

function DestinationCard({
  dest,
  index,
  onSelect,
}: {
  dest: Destination;
  index: number;
  onSelect: (dest: Destination) => void;
}) {
  const { Icon: ClimateIcon, label: climateLabel } = climateConfig[dest.climate];
  const details = DESTINATION_DETAILS[dest.name];
  const isPopular = details?.popular;

  return (
    <ScrollReveal delay={index * 0.05}>
      <button
        type="button"
        onClick={() => onSelect(dest)}
        className="group relative block w-full overflow-hidden rounded-3xl text-left shadow-lg shadow-black/10 ring-1 ring-black/[0.04] transition-premium hover:shadow-xl hover:shadow-bamboo/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bamboo focus-visible:ring-offset-2"
        aria-label={`Ver detalles de ${dest.name}, ${dest.country}`}
      >
        <CardImage
          src={dest.image}
          alt={`${dest.name}, ${dest.country}`}
          objectPosition={
            "objectPosition" in dest ? dest.objectPosition : undefined
          }
          imageClassName="transition-premium group-hover:scale-[1.04]"
          className="rounded-3xl"
        />

        <div
          className="destination-card-gradient pointer-events-none absolute inset-0 transition-premium"
          aria-hidden="true"
        />

        {isPopular && (
          <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-amber-500/90 px-2 py-0.5 text-[9px] font-bold tracking-wide text-white uppercase backdrop-blur-sm sm:text-[10px]">
            <Flame className="h-2.5 w-2.5" aria-hidden="true" />
            Popular
          </span>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3.5 transition-premium group-hover:-translate-y-0.5 sm:p-4">
          <div className="flex w-full min-w-0 flex-col items-start text-left">
            <div
              className="mb-1.5 inline-flex max-w-full items-center gap-1 rounded-full border border-white/20 bg-black/35 px-2 py-0.5 text-shadow-premium"
              title={climateLabel}
            >
              <ClimateIcon
                className="h-2.5 w-2.5 shrink-0 text-white/95"
                aria-hidden="true"
              />
              <span className="truncate text-[9px] font-medium tracking-wide text-white/95 sm:text-[10px]">
                {climateLabel}
              </span>
            </div>

            <p className="mb-1 text-[10px] font-medium tracking-[0.1em] text-white/85 uppercase text-shadow-premium sm:text-[11px]">
              {dest.country}
            </p>

            <h3 className="font-playfair mb-1.5 line-clamp-2 text-base font-semibold leading-tight tracking-tight text-white text-shadow-premium sm:text-lg">
              {dest.name}
            </h3>

            <p className="line-clamp-2 text-[11px] leading-snug text-white/90 text-shadow-premium sm:text-xs sm:leading-normal">
              {dest.tagline}
            </p>

            {details?.duration && (
              <p className="mt-1.5 text-[10px] font-medium text-white/75 text-shadow-premium sm:text-[11px]">
                {details.duration}
              </p>
            )}
          </div>
        </div>
      </button>
    </ScrollReveal>
  );
}

export function Destinations() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(
    null
  );

  const filteredDestinations = useMemo(
    () =>
      activeFilter === "all"
        ? DESTINATIONS
        : DESTINATIONS.filter((d) => d.climate === activeFilter),
    [activeFilter]
  );

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
          description="Estos son algunos de los destinos que nuestros viajeros aman. ¿Cuál despierta tu curiosidad? Toca una tarjeta para ver detalles y cotizar."
        />

        <div
          className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-2.5"
          role="tablist"
          aria-label="Filtrar destinos por categoría"
        >
          {FILTER_OPTIONS.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={activeFilter === id}
              onClick={() => setActiveFilter(id)}
              className={cn(
                "filter-pill",
                activeFilter === id && "filter-pill-active"
              )}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredDestinations.map((dest, index) => (
              <DestinationCard
                key={dest.name}
                dest={dest}
                index={index}
                onSelect={setSelectedDestination}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredDestinations.length === 0 && (
          <p className="mt-10 text-center text-foreground/50">
            No hay destinos en esta categoría por ahora.
          </p>
        )}
      </div>

      <DestinationModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />
    </section>
  );
}
