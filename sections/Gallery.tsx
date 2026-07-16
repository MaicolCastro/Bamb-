"use client";

import { useState } from "react";
import { ZoomIn } from "lucide-react";
import { GALLERY_IMAGES } from "@/lib/constants";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Lightbox } from "@/components/Lightbox";
import { CardImage } from "@/components/CardImage";

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
          sectionNumber="05"
          highlights={["inspiran"]}
          eyebrow="Galería"
          title="Momentos que inspiran tu próximo viaje"
          description="Cada imagen cuenta una historia. ¿Cuál será la tuya?"
        />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {GALLERY_IMAGES.map((image, index) => (
            <ScrollReveal key={image.id} delay={index * 0.05}>
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="group relative w-full overflow-hidden rounded-2xl focus-visible:ring-2 focus-visible:ring-bamboo focus-visible:ring-offset-2"
                aria-label={`Ver imagen: ${image.alt}`}
              >
                <CardImage
                  src={image.src}
                  alt={image.alt}
                  imageClassName="gallery-duotone transition-transform duration-700 group-hover:scale-105"
                  className="rounded-2xl"
                />
                <div className="absolute inset-0 bg-bamboo/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg">
                    <ZoomIn className="h-5 w-5 text-bamboo" />
                  </div>
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
