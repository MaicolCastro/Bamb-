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
}: CardImageProps) {
  const resolvedSrc = src.startsWith("http") ? toAspect169Url(src) : src;

  return (
    <div
      className={cn("relative aspect-video w-full overflow-hidden", className)}
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
