"use client";

import { motion } from "framer-motion";
import { PULL_QUOTE } from "@/lib/constants";

export function PullQuote() {
  return (
    <section
      className="texture-dots relative overflow-hidden border-y border-bamboo/10 bg-white py-20 sm:py-28"
      aria-label="Cita inspiradora"
    >
      <div className="pointer-events-none absolute -left-8 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-bamboo/5 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-8 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-earth/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-5xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[auto_1fr] lg:gap-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex lg:items-center lg:justify-center"
          aria-hidden="true"
        >
          <span className="font-display text-[8rem] font-bold leading-none text-bamboo/10">
            &ldquo;
          </span>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center lg:text-left"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-bamboo-muted px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-bamboo">
            <span className="h-1.5 w-1.5 rounded-full bg-bamboo-light" aria-hidden="true" />
            Inspiración
          </div>
          <p className="font-playfair text-2xl font-medium leading-snug text-foreground sm:text-3xl lg:text-[2rem] lg:leading-tight">
            {PULL_QUOTE.text}
          </p>
          <footer className="mt-6 flex items-center justify-center gap-3 lg:justify-start">
            <span className="h-px w-8 bg-earth/40" aria-hidden="true" />
            <cite className="not-italic text-sm font-medium tracking-wide text-foreground/45">
              {PULL_QUOTE.author}
            </cite>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
