"use client";

import { useRef } from "react";
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
  {
    Icon: Plane,
    position: "right-[14%] bottom-[16%]",
    speed: 1.4,
    size: 24,
    rotate: -8,
    drift: -0.8,
  },
  {
    Icon: Leaf,
    position: "right-[22%] top-[45%]",
    speed: 1,
    size: 20,
    rotate: -20,
    drift: 1.2,
  },
];

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
  const y = useTransform(scrollYProgress, [0, 1], [-60 * speed, 60 * speed]);
  const x = useTransform(scrollYProgress, [0, 1], [30 * drift, -30 * drift]);
  const rotateValue = useTransform(scrollYProgress, [0, 1], [rotate, rotate + 15 * drift]);

  return (
    <motion.div
      style={{ y, x, rotate: rotateValue }}
      className={cn("absolute", position, colorClass)}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 4 + speed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Icon style={{ width: size, height: size }} strokeWidth={1.25} />
      </motion.div>
    </motion.div>
  );
}

/** Íconos decorativos con parallax para secciones claras */
export function FloatingDecor({ variant = "earth" }: FloatingDecorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const colorClass =
    variant === "earth" ? "text-bamboo/[0.12]" : "text-bamboo/[0.09]";

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {iconConfigs.map((config, index) => (
        <FloatingIcon
          key={index}
          config={config}
          scrollYProgress={scrollYProgress}
          colorClass={colorClass}
        />
      ))}
    </div>
  );
}
