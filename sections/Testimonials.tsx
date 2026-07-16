"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { GOOGLE_REVIEWS, TESTIMONIALS } from "@/lib/constants";
import { SectionHeading } from "@/components/SectionHeading";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

type Testimonial = (typeof TESTIMONIALS)[number];

function GoogleBadge() {
  return (
    <motion.a
      href={GOOGLE_REVIEWS.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mt-10 inline-flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-md shadow-black/5 ring-1 ring-black/5 transition-premium hover:shadow-lg hover:ring-bamboo/20 sm:gap-4 sm:px-6"
      aria-label="Ver reseñas en Google"
    >
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        <span className="text-sm font-semibold text-foreground/80">
          Google Reviews
        </span>
      </div>

      <div className="hidden h-5 w-px bg-foreground/10 sm:block" aria-hidden="true" />

      <div className="flex items-center gap-2">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < Math.floor(GOOGLE_REVIEWS.rating)
                  ? "fill-amber-400 text-amber-400"
                  : "fill-amber-200 text-amber-200"
              )}
              aria-hidden="true"
            />
          ))}
        </div>
        <span className="text-sm font-bold text-foreground">
          {GOOGLE_REVIEWS.rating}
        </span>
        <span className="text-sm text-foreground/50">
          · {GOOGLE_REVIEWS.count} reseñas
        </span>
      </div>
    </motion.a>
  );
}

function TestimonialCard({
  testimonial,
  compact = false,
}: {
  testimonial: Testimonial;
  compact?: boolean;
}) {
  return (
    <article
      className={cn(
        "postcard relative flex h-full flex-col overflow-hidden rounded-sm bg-white",
        compact ? "p-6 sm:p-7" : "p-8 sm:p-10"
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url(${testimonial.backdrop})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-white/95 to-white/88" aria-hidden="true" />

      <span className="postcard-stamp" aria-hidden="true">
        Bambú
      </span>

      <div className="relative z-[1]">
        <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-bamboo-muted/80 px-3 py-1 ring-1 ring-black/[0.04] backdrop-blur-sm">
          <span className="text-xs font-semibold text-bamboo">{testimonial.trip}</span>
          <span className="text-[10px] text-foreground/40">·</span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-foreground/45">
            {testimonial.year}
          </span>
        </div>

        <Quote
          className={cn(
            "absolute text-bamboo/10",
            compact ? "right-5 top-14 h-8 w-8" : "right-8 top-16 h-12 w-12"
          )}
          aria-hidden="true"
        />

        <div
          className="flex gap-1"
          aria-label={`${testimonial.rating} de 5 estrellas`}
        >
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "fill-amber-400 text-amber-400",
                compact ? "h-4 w-4" : "h-5 w-5"
              )}
              aria-hidden="true"
            />
          ))}
        </div>

        <blockquote
          className={cn(
            "mt-4 flex-1 leading-relaxed text-foreground/80",
            compact ? "text-sm sm:text-base" : "text-lg sm:text-xl"
          )}
        >
          &ldquo;{testimonial.text}&rdquo;
        </blockquote>

        <footer className="mt-6 flex items-center gap-3 border-t border-foreground/5 pt-5">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            width={compact ? 48 : 56}
            height={compact ? 48 : 56}
            className="rounded-full object-cover ring-2 ring-bamboo-muted"
          />
          <div>
            <cite className="not-italic">
              <p
                className={cn(
                  "font-bold text-foreground",
                  compact && "text-sm sm:text-base"
                )}
              >
                {testimonial.name}
              </p>
              <p className="text-xs text-foreground/50 sm:text-sm">
                {testimonial.location} · {testimonial.trip}
              </p>
            </cite>
          </div>
        </footer>
      </div>
    </article>
  );
}

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const isLg = useMediaQuery("(min-width: 1024px)");
  const isXl = useMediaQuery("(min-width: 1280px)");
  const cardsPerView = isXl ? 3 : isLg ? 2 : 1;

  const goTo = useCallback(
    (index: number) => {
      setCurrent(
        ((index % TESTIMONIALS.length) + TESTIMONIALS.length) %
          TESTIMONIALS.length
      );
    },
    []
  );

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const interval = setInterval(goNext, 6000);
    return () => clearInterval(interval);
  }, [goNext]);

  const visibleTestimonials = Array.from({ length: cardsPerView }, (_, i) =>
    TESTIMONIALS[(current + i) % TESTIMONIALS.length]
  );

  return (
    <section
      id="testimonios"
      className="bg-gray-light py-24 sm:py-32"
      aria-labelledby="testimonials-heading"
      aria-live="polite"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          sectionNumber="05"
          highlights={["felices"]}
          eyebrow="Testimonios"
          title="Historias reales de viajeros felices"
          description="La confianza de quienes ya viajaron con nosotros es nuestra mejor carta de presentación."
        />

        <GoogleBadge />

        <div className="relative mt-12 lg:mt-16">
          {/* Flechas — desktop */}
          {cardsPerView > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute -left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2.5 shadow-lg ring-1 ring-black/5 transition-colors hover:bg-bamboo-muted lg:flex"
                aria-label="Testimonio anterior"
              >
                <ChevronLeft className="h-5 w-5 text-bamboo" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2.5 shadow-lg ring-1 ring-black/5 transition-colors hover:bg-bamboo-muted lg:flex"
                aria-label="Testimonio siguiente"
              >
                <ChevronRight className="h-5 w-5 text-bamboo" />
              </button>
            </>
          )}

          {/* Carrusel múltiple — desktop / tablet */}
          {cardsPerView > 1 ? (
            <div className="overflow-hidden xl:-mr-[6%]">
              <div
                className={cn(
                  "grid gap-5 lg:gap-6",
                  cardsPerView === 3 ? "xl:grid-cols-3" : "lg:grid-cols-2"
                )}
              >
              <AnimatePresence mode="popLayout">
                {visibleTestimonials.map((testimonial, i) => (
                  <motion.div
                    key={`${testimonial.id}-${current}-${i}`}
                    initial={{ opacity: 0, y: 24, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -16, scale: 0.96 }}
                    transition={{
                      duration: 0.45,
                      delay: i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="h-full"
                  >
                    <TestimonialCard testimonial={testimonial} compact />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            </div>
          ) : (
            /* Carrusel simple — móvil */
            <div className="relative mx-auto max-w-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={TESTIMONIALS[current].id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <TestimonialCard testimonial={TESTIMONIALS[current]} />
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Indicadores */}
          <div
            className="mt-8 flex justify-center gap-2"
            role="tablist"
            aria-label="Testimonios"
          >
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={i === current}
                aria-label={`Testimonio de ${t.name}`}
                onClick={() => goTo(i)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  i === current
                    ? "w-8 bg-bamboo"
                    : "w-2.5 bg-bamboo/20 hover:bg-bamboo/40"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
