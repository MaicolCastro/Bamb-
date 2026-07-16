"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { MessageSquare, PenTool, CalendarCheck, Plane } from "lucide-react";
import { PROCESS_STEPS } from "@/lib/constants";
import { SectionHeading } from "@/components/SectionHeading";

const stepIcons = [MessageSquare, PenTool, CalendarCheck, Plane];
const easePremium = [0.22, 1, 0.36, 1] as const;

const stepVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      delay: index * 0.15,
      ease: easePremium,
    },
  }),
};

export function HowWeWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.5"],
  });
  const lineProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="proceso"
      ref={sectionRef}
      className="relative overflow-hidden bg-bamboo py-24 sm:py-32"
      aria-labelledby="process-heading"
    >
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-white blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-white blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          sectionNumber="04"
          highlights={["mejor viaje"]}
          eyebrow="Cómo trabajamos"
          title="De tu idea a tu mejor viaje en 4 pasos"
          description="Un proceso simple, transparente y humano. Tú sueñas, nosotros nos encargamos de todo lo demás."
          light
        />

        <div className="relative mt-20 lg:mt-24">
          {/* Línea horizontal — desktop */}
          <div
            className="absolute top-[3.25rem] right-[12.5%] left-[12.5%] hidden h-1 overflow-hidden rounded-full bg-white/15 lg:block"
            aria-hidden="true"
          >
            <motion.div
              style={{ width: lineProgress }}
              className="h-full rounded-full bg-gradient-to-r from-bamboo-light via-white to-earth-light shadow-[0_0_12px_rgba(104,166,55,0.6)]"
            />
          </div>

          {/* Línea vertical — móvil */}
          <div
            className="absolute top-8 bottom-8 left-1/2 w-1 -translate-x-1/2 overflow-hidden rounded-full bg-white/15 lg:hidden"
            aria-hidden="true"
          >
            <motion.div
              style={{ height: lineProgress }}
              className="w-full rounded-full bg-gradient-to-b from-bamboo-light via-white to-earth-light"
            />
          </div>

          <div className="grid gap-12 sm:gap-10 lg:grid-cols-4 lg:gap-6">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = stepIcons[index];
              return (
                <motion.article
                  key={step.step}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={stepVariants}
                  className="group relative text-center"
                >
                  {/* Nodo del timeline */}
                  <div className="relative z-10 mx-auto mb-8 flex flex-col items-center">
                    <div className="relative mb-4 h-16 w-28 overflow-hidden rounded-xl ring-2 ring-white/30 shadow-lg sm:h-[4.5rem] sm:w-32">
                      <Image
                        src={step.image}
                        alt=""
                        fill
                        className="object-cover transition-premium group-hover:scale-105"
                        sizes="128px"
                      />
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.06 }}
                      transition={{ type: "spring", stiffness: 320, damping: 22 }}
                      className="relative"
                    >
                      {/* Anillo pulsante */}
                      <motion.span
                        animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0, 0.35] }}
                        transition={{
                          duration: 2.8,
                          repeat: Infinity,
                          delay: index * 0.4,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 rounded-full bg-bamboo-light"
                        aria-hidden="true"
                      />

                      {/* Número del paso */}
                      <div className="absolute -top-3 -right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-bamboo-light text-base font-bold text-white shadow-lg ring-4 ring-bamboo">
                        {step.step}
                      </div>

                      {/* Círculo principal */}
                      <div className="relative flex h-[6.5rem] w-[6.5rem] items-center justify-center rounded-full bg-white/10 ring-2 ring-white/25 backdrop-blur-sm transition-all duration-500 group-hover:bg-white/20 group-hover:ring-white/50 sm:h-28 sm:w-28">
                        <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-white shadow-2xl shadow-black/20 transition-transform duration-500 group-hover:scale-105 sm:h-20 sm:w-20">
                          <Icon
                            className="h-8 w-8 text-bamboo transition-colors duration-300 group-hover:text-bamboo-light sm:h-9 sm:w-9"
                            aria-hidden="true"
                          />
                        </div>
                      </div>

                      {/* Punto en la línea — desktop */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + index * 0.15, type: "spring" }}
                        className="absolute -bottom-7 left-1/2 hidden h-4 w-4 -translate-x-1/2 rounded-full bg-bamboo-light ring-4 ring-bamboo lg:block"
                        aria-hidden="true"
                      />
                    </motion.div>
                  </div>

                  {/* Contenido */}
                  <div className="rounded-2xl bg-white/5 px-4 py-5 ring-1 ring-white/10 transition-all duration-500 group-hover:bg-white/10 group-hover:ring-white/25 sm:px-5">
                    <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
