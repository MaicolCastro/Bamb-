import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
}

/** Alturas en pantalla — PNG fuente 1024px servido sin compresión */
const heights = { sm: 38, md: 50, lg: 64 };

export function Logo({
  className,
  size = "md",
  priority = false,
}: LogoProps) {
  const displayHeight = heights[size];

  return (
    <Image
      src="/logo-transparent.png"
      alt="Bambú Agencia de Viajes"
      width={1024}
      height={662}
      quality={100}
      unoptimized
      className={cn("block object-contain object-left", className)}
      style={{ height: displayHeight, width: "auto", maxWidth: "none" }}
      priority={priority}
    />
  );
}
