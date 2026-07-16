import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  CARD_IMAGE_QUALITY,
  CARD_IMAGE_SIZES,
  toAspect169Url,
} from "@/lib/image-utils";

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  /** Punto focal para smart crop visual (object-position) */
  objectPosition?: string;
  priority?: boolean;
  /** Ocupa toda la altura del contenedor (galería bento, tarjetas destacadas) */
  fillHeight?: boolean;
}

/**
 * Imagen 16:9 uniforme para tarjetas y banners.
 * object-cover mantiene proporción sin deformar.
 */
export function CardImage({
  src,
  alt,
  className,
  imageClassName,
  objectPosition = "center",
  priority = false,
  fillHeight = false,
}: CardImageProps) {
  const resolvedSrc = src.startsWith("http") ? toAspect169Url(src) : src;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        fillHeight ? "h-full min-h-[160px]" : "aspect-video",
        className
      )}
    >
      <Image
        src={resolvedSrc}
        alt={alt}
        fill
        quality={CARD_IMAGE_QUALITY}
        sizes={CARD_IMAGE_SIZES}
        priority={priority}
        className={cn("object-cover", imageClassName)}
        style={{ objectPosition }}
      />
    </div>
  );
}
