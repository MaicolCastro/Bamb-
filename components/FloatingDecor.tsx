"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Plane, Luggage, Leaf, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingDecorProps {
  variant?: "earth" | "light";
}

interface IconConfig {
  Icon: LucideIcon;
  position: string;
  speed: number;
  size: number;
  rotate: number;
  drift: number;
}

const iconConfigs: IconConfig[] = [
  {
    Icon: Plane,
    position: "left-[6%] top-[14%]",
    speed: 1.2,
    size: 32,
    rotate: -15,
    drift: 1,
  },
  {
    Icon: Luggage,
    position: "right-[8%] top-[20%]",
    speed: 1.8,
    size: 36,
    rotate: 10,
    drift: -1,
  },
  {
    Icon: Leaf,
    position: "left-[12%] bottom-[20%]",
    speed: 0.8,
    size: 28,
    rotate: 25,
    drift: 0.6,
  },
];

function StaticIcon({
  config,
  colorClass,
}: {
  config: IconConfig;
  colorClass: string;
}) {
  const { Icon, position, size, rotate } = config;
  return (
    <div
      className={cn("absolute", position, colorClass)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <Icon style={{ width: size, height: size }} strokeWidth={1.25} />
    </div>
  );
}

function FloatingIcon({
  config,
  scrollYProgress,
  colorClass,
}: {
  config: IconConfig;
  scrollYProgress: MotionValue<number>;
  colorClass: string;
}) {
  const { Icon, position, speed, size, rotate, drift } = config;
  const y = useTransform(scrollYProgress, [0, 1], [-40 * speed, 40 * speed]);
  const x = useTransform(scrollYProgress, [0, 1], [20 * drift, -20 * drift]);
  const rotateValue = useTransform(
    scrollYProgress,
    [0, 1],
    [rotate, rotate + 10 * drift]
  );

  return (
    <motion.div
      style={{ y, x, rotate: rotateValue }}
      className={cn("absolute", position, colorClass)}
    >
      <Icon style={{ width: size, height: size }} strokeWidth={1.25} />
    </motion.div>
  );
}

/** Íconos decorativos — parallax solo en desktop */
export function FloatingDecor({ variant = "earth" }: FloatingDecorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [motionEnabled, setMotionEnabled] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isNarrow = window.matchMedia("(max-width: 1024px)").matches;
    setMotionEnabled(!prefersReduced && !isNarrow);
  }, []);

  const colorClass =
    variant === "earth" ? "text-bamboo/[0.12]" : "text-bamboo/[0.09]";

  const icons = motionEnabled ? iconConfigs : iconConfigs.slice(0, 3);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {icons.map((config, index) =>
        motionEnabled ? (
          <FloatingIcon
            key={index}
            config={config}
            scrollYProgress={scrollYProgress}
            colorClass={colorClass}
          />
        ) : (
          <StaticIcon key={index} config={config} colorClass={colorClass} />
        )
      )}
    </div>
  );
}
