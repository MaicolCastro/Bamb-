"use client";

import { motion } from "framer-motion";
import { PULL_QUOTE } from "@/lib/constants";

export function PullQuote() {
  return (
    <section
      className="relative overflow-hidden bg-beige py-20 sm:py-28"
      aria-label="Cita inspiradora"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]">
        <span className="font-display text-[20rem] font-bold leading-none text-bamboo select-none">
          &ldquo;
        </span>
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-playfair text-2xl font-medium leading-snug text-foreground sm:text-3xl lg:text-4xl lg:leading-tight">
            &ldquo;{PULL_QUOTE.text}&rdquo;
          </p>
          <footer className="mt-6">
            <cite className="not-italic text-sm font-medium tracking-widest text-foreground/45 uppercase">
              {PULL_QUOTE.author}
            </cite>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
