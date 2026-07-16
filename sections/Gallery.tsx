"use client";

import { useState } from "react";
import { ZoomIn } from "lucide-react";
import { GALLERY_IMAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Lightbox } from "@/components/Lightbox";
import { CardImage } from "@/components/CardImage";

const BENTO_LAYOUT = [
  "gallery-bento-hero",
  "",
  "",
  "gallery-bento-wide",
  "gallery-bento-tall",
  "",
  "gallery-bento-wide",
  "",
  "gallery-bento-tall",
  "",
  "",
  "gallery-bento-wide",
] as const;

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section
      id="galeria"
      className="bg-background py-24 sm:py-32"
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          sectionNumber="06"
          highlights={["inspiran"]}
          eyebrow="Galería"
          title="Momentos que inspiran tu próximo viaje"
          description="Cada imagen cuenta una historia. ¿Cuál será la tuya?"
        />

        <div className="gallery-bento-grid mt-16">
          {GALLERY_IMAGES.map((image, index) => (
            <ScrollReveal
              key={image.id}
              delay={index * 0.04}
              className={cn(BENTO_LAYOUT[index] ?? "", "h-full min-h-0")}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="polaroid-hover group relative h-full w-full overflow-hidden rounded-2xl ring-1 ring-black/[0.04] transition-premium hover:shadow-lg hover:shadow-bamboo/10 focus-visible:ring-2 focus-visible:ring-bamboo focus-visible:ring-offset-2"
                aria-label={`Ver imagen: ${image.destination}, ${image.country}`}
              >
                <CardImage
                  src={image.src}
                  alt={image.alt}
                  fillHeight
                  imageClassName="gallery-duotone"
                  className="h-full rounded-2xl"
                />

                <div
                  className="gallery-overlay-duo pointer-events-none absolute inset-0 opacity-0 transition-premium group-hover:opacity-100"
                  aria-hidden="true"
                />

                <div
                  className="gallery-caption-gradient pointer-events-none absolute inset-0 opacity-0 transition-premium group-hover:opacity-100"
                  aria-hidden="true"
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3.5 opacity-0 transition-premium group-hover:opacity-100 sm:p-4">
                  <p className="text-[10px] font-medium tracking-[0.1em] text-white/80 uppercase text-shadow-premium sm:text-[11px]">
                    {image.country}
                  </p>
                  <p className="font-playfair mt-0.5 text-base font-semibold text-white text-shadow-premium sm:text-lg">
                    {image.destination}
                  </p>
                </div>

                <div className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-md transition-premium group-hover:opacity-100 sm:h-10 sm:w-10">
                  <ZoomIn className="h-4 w-4 text-bamboo" aria-hidden="true" />
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <Lightbox
        images={GALLERY_IMAGES}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
