"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { SectionHeading } from "@/components/SectionHeading";

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonial = TESTIMONIALS[current];

  return (
    <section
      id="testimonios"
      className="bg-gray-light py-24 sm:py-32"
      aria-labelledby="testimonials-heading"
      aria-live="polite"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonios"
          title="Historias reales de viajeros felices"
          description="La confianza de quienes ya viajaron con nosotros es nuestra mejor carta de presentación."
        />

        <div className="relative mx-auto mt-16 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.article
              key={testimonial.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl bg-white p-8 shadow-xl shadow-black/5 sm:p-12"
            >
              <Quote
                className="absolute right-8 top-8 h-12 w-12 text-bamboo/10"
                aria-hidden="true"
              />

              <div className="flex gap-1" aria-label={`${testimonial.rating} de 5 estrellas`}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-amber-400 text-amber-400"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote className="mt-6 text-lg leading-relaxed text-foreground/80 sm:text-xl">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>

              <footer className="mt-8 flex items-center gap-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={56}
                  height={56}
                  className="rounded-full object-cover ring-2 ring-bamboo-muted"
                />
                <div>
                  <cite className="not-italic">
                    <p className="font-bold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-foreground/50">
                      {testimonial.location} · {testimonial.trip}
                    </p>
                  </cite>
                </div>
              </footer>
            </motion.article>
          </AnimatePresence>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2" role="tablist" aria-label="Testimonios">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={i === current}
                aria-label={`Testimonio de ${t.name}`}
                onClick={() => setCurrent(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-bamboo"
                    : "w-2.5 bg-bamboo/20 hover:bg-bamboo/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
