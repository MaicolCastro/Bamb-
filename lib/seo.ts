import { SITE } from "./constants";

export function getTravelAgencySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE.fullName,
    description: SITE.description,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    image: `${SITE.url}/logo.png`,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: "CO",
    },
    areaServed: {
      "@type": "Country",
      name: "Colombia",
    },
    priceRange: "$$",
    sameAs: Object.values(SITE.social),
  };
}
