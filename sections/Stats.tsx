"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Award, MapPin, Star, type LucideIcon } from "lucide-react";
import { STATS } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/lib/utils";

const statIcons: LucideIcon[] = [Users, Award, MapPin, Star];
const easePremium = [0.22, 1, 0.36, 1] as const;

const statVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: index * 0.1,
      ease: easePremium,
    },
  }),
};

function StatItem({
  value,
  suffix,
  label,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
}) {
  const { count, ref, displayRef } = useCountUp(value, 2000);
  const Icon = statIcons[index];

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={statVariants}
      className="group flex flex-1 flex-col items-center px-4 text-center sm:px-6"
    >
      <div className="relative mb-5">
        <span
          className="absolute inset-0 rounded-full bg-bamboo-light/30 stat-pulse-ring"
          style={{ animationDelay: `${index * 0.5}s` }}
          aria-hidden="true"
        />
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 transition-premium group-hover:bg-white/15 group-hover:ring-white/35 sm:h-16 sm:w-16">
          <Icon
            className="h-6 w-6 text-bamboo-light transition-premium group-hover:scale-110 sm:h-7 sm:w-7"
            aria-hidden="true"
          />
        </div>
      </div>

      <p className="font-playfair text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
        <span ref={displayRef}>{count}</span>
        <span className="text-bamboo-light">{suffix}</span>
      </p>
      <p className="mt-2 max-w-[10rem] text-sm font-medium leading-snug text-white/70 sm:text-base">
        {label}
      </p>
    </motion.div>
  );
}

export function Stats() {
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-28"
      aria-label="Estadísticas de la agencia"
    >
      <div className="absolute inset-0 bg-bamboo-dark" aria-hidden="true">
        <Image
          src="/images/destinations/eje-cafetero.png"
          alt=""
          fill
          className="object-cover opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-bamboo-dark/96 via-bamboo-dark/92 to-bamboo/88" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] bg-[size:28px_28px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-playfair mb-12 text-center text-xl font-medium italic text-white/85 sm:mb-14 sm:text-2xl">
          Números que respaldan cada aventura.
        </p>

        <ul className="flex flex-wrap justify-center gap-y-10 lg:flex-nowrap lg:items-center lg:gap-0">
          {STATS.map((stat, index) => (
            <li
              key={stat.label}
              className={cn(
                "flex w-1/2 items-center lg:w-auto lg:flex-1",
                index % 2 === 0 && "max-lg:pr-2",
                index % 2 === 1 && "max-lg:pl-2"
              )}
            >
              <StatItem
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                index={index}
              />
              {index < STATS.length - 1 && (
                <div
                  className="hidden h-14 w-px shrink-0 bg-gradient-to-b from-transparent via-bamboo-light/35 to-transparent lg:block"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
