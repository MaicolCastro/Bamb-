"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { GALLERY_IMAGES } from "@/lib/constants";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Lightbox } from "@/components/Lightbox";
import { cn } from "@/lib/utils";

const spanClasses = {
  tall: "row-span-2",
  wide: "col-span-2",
  normal: "",
};

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
          eyebrow="Galería"
          title="Momentos que inspiran tu próximo viaje"
          description="Cada imagen cuenta una historia. ¿Cuál será la tuya?"
        />

        <div className="mt-16 grid auto-rows-[200px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 lg:grid-cols-4">
          {GALLERY_IMAGES.map((image, index) => (
            <ScrollReveal
              key={image.id}
              delay={index * 0.05}
              className={cn(
                spanClasses[image.span],
                image.span === "wide" && "col-span-2"
              )}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="group relative h-full w-full overflow-hidden rounded-2xl focus-visible:ring-2 focus-visible:ring-bamboo focus-visible:ring-offset-2"
                aria-label={`Ver imagen: ${image.alt}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30" />
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
