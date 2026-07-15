import { SITE } from "@/lib/constants";

/**
 * URL pública canónica del sitio.
 * IMPORTANTE: usar VERCEL_PROJECT_PRODUCTION_URL (bamb-one.vercel.app),
 * NO VERCEL_URL (URL de deploy protegida con SSO en Vercel).
 */
export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  // Fallback conocido del proyecto en Vercel
  if (process.env.VERCEL) {
    return "https://bamb-one.vercel.app";
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return SITE.url;
}

export function getOgImageUrl() {
  return `${getSiteUrl()}/og-image.png`;
}
