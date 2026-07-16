/** Estándar de imágenes en tarjetas 16:9 */
export const CARD_IMAGE_QUALITY = 90;
export const CARD_IMAGE_SIZES =
  "(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw";

export const ASPECT_169_WIDTH = 2560;
export const ASPECT_169_HEIGHT = 1440;

/** Recorta URLs de Unsplash a 16:9 con crop inteligente (entropy) */
export function toAspect169Url(
  url: string,
  width = ASPECT_169_WIDTH
): string {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("unsplash.com")) return url;

    const height = Math.round((width * 9) / 16);
    parsed.searchParams.set("w", String(width));
    parsed.searchParams.set("h", String(height));
    parsed.searchParams.set("fit", "crop");
    parsed.searchParams.set("crop", "entropy");
    parsed.searchParams.set("auto", "format");
    parsed.searchParams.set("q", "90");
    return parsed.toString();
  } catch {
    return url;
  }
}
