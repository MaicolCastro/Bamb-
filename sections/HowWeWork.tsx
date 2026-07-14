"use client";

import { motion } from "framer-motion";
import { MessageSquare, PenTool, CalendarCheck, Plane } from "lucide-react";
import { PROCESS_STEPS } from "@/lib/constants";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";

const stepIcons = [MessageSquare, PenTool, CalendarCheck, Plane];

export function HowWeWork() {
  return (
    <section
      id="proceso"
      className="relative overflow-hidden bg-bamboo py-24 sm:py-32"
      aria-labelledby="process-heading"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-white blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-white blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Cómo trabajamos"
          title="De tu idea a tu mejor viaje en 4 pasos"
          description="Un proceso simple, transparente y humano. Tú sueñas, nosotros nos encargamos de todo lo demás."
          light
        />

        <div className="relative mt-20">
          {/* Timeline line — desktop */}
          <div
            className="absolute left-0 right-0 top-12 hidden h-0.5 bg-white/20 lg:block"
            aria-hidden="true"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="h-full origin-left bg-white/60"
            />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = stepIcons[index];
              return (
                <ScrollReveal key={step.step} delay={index * 0.15}>
                  <article className="relative text-center">
                    {/* Step circle */}
                    <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm" />
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-xl">
                        <Icon className="h-7 w-7 text-bamboo" aria-hidden="true" />
                      </div>
                      <span className="absolute -top-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-bamboo-light text-sm font-bold text-white shadow-lg">
                        {step.step}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
                      {step.description}
                    </p>

                    {/* Mobile connector */}
                    {index < PROCESS_STEPS.length - 1 && (
                      <div
                        className="mx-auto mt-6 h-8 w-0.5 bg-white/20 lg:hidden"
                        aria-hidden="true"
                      />
                    )}
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
