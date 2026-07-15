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

const polaroidRotations = [-2.5, 2, -1.5, 3, -2, 1.5, -3, 2.5, -1, 2, -2.5, 1];

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

        <div className="mt-16 grid auto-rows-auto grid-flow-dense grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
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
                className="polaroid-tilt group relative h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bamboo focus-visible:ring-offset-2"
                style={{
                  transform: `rotate(${polaroidRotations[index % polaroidRotations.length]}deg)`,
                }}
                aria-label={`Ver imagen: ${image.alt}`}
              >
                <div className="flex h-full flex-col bg-white p-3 pb-4 shadow-xl shadow-black/15 ring-1 ring-black/5 sm:p-4 sm:pb-5">
                  <div
                    className={cn(
                      "relative w-full overflow-hidden bg-gray-light",
                      image.span === "tall" ? "aspect-[3/4]" : "aspect-[4/3]"
                    )}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="gallery-duotone object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-bamboo/55 mix-blend-multiply opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-earth/35 mix-blend-color opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-lg">
                        <ZoomIn className="h-5 w-5 text-bamboo" />
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 line-clamp-2 text-center font-display text-xs leading-snug text-foreground/55 sm:text-sm">
                    {image.alt}
                  </p>
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
