"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  sectionNumber?: string;
  highlights?: string[];
  className?: string;
}

const easePremium = [0.22, 1, 0.36, 1] as const;

function renderHighlightedTitle(
  title: string,
  highlights: string[] | undefined,
  light: boolean
) {
  if (!highlights?.length) return title;

  const escaped = highlights.map((word) =>
    word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const pattern = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = title.split(pattern).filter(Boolean);

  return parts.map((part, index) => {
    const isHighlight = highlights.some(
      (word) => word.toLowerCase() === part.toLowerCase()
    );

    if (!isHighlight) return <span key={index}>{part}</span>;

    return (
      <span key={index} className="relative inline-block">
        {part}
        <motion.span
          className={cn(
            "absolute -bottom-0.5 left-0 h-[3px] rounded-full sm:-bottom-1 sm:h-1",
            light ? "bg-bamboo-light" : "bg-earth"
          )}
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35, ease: easePremium }}
          aria-hidden="true"
        />
      </span>
    );
  });
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  sectionNumber,
  highlights,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: easePremium }}
      className={cn(
        "relative max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {sectionNumber && (
        <span
          className={cn(
            "pointer-events-none absolute -top-6 select-none font-display text-[6rem] font-bold leading-none opacity-[0.05] sm:-top-10 sm:text-[8rem] lg:text-[10rem]",
            align === "center" ? "left-1/2 -translate-x-1/2" : "left-0",
            light ? "text-white" : "text-bamboo"
          )}
          aria-hidden="true"
        >
          {sectionNumber}
        </span>
      )}

      {eyebrow && (
        <span
          className={cn(
            "relative mb-3 inline-block text-sm font-semibold uppercase tracking-widest",
            light ? "text-bamboo-light" : "text-earth"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "relative font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl",
          light ? "text-white" : "text-foreground"
        )}
      >
        {renderHighlightedTitle(title, highlights, light)}
      </h2>
      {description && (
        <p
          className={cn(
            "relative mt-4 text-lg leading-relaxed sm:text-xl",
            light ? "text-white/80" : "text-foreground/65"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
