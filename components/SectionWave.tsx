import { cn } from "@/lib/utils";

interface SectionWaveProps {
  /** Color de la sección superior */
  topColor: string;
  /** Color de la sección inferior (fill del SVG) */
  bottomColor: string;
  className?: string;
}

/** Separador orgánico con onda SVG entre bloques de color */
export function SectionWave({
  topColor,
  bottomColor,
  className,
}: SectionWaveProps) {
  return (
    <div
      className={cn("pointer-events-none leading-[0]", className)}
      style={{ backgroundColor: topColor }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="block h-10 w-full sm:h-14 lg:h-[4.5rem]"
      >
        <path
          d="M0,48 C240,80 480,16 720,48 C960,80 1200,16 1440,48 L1440,80 L0,80 Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  );
}
