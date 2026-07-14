import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SITE } from "@/lib/constants";
import { getTravelAgencySchema } from "@/lib/seo";
import "@/styles/globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.fullName} | Agencia de Viajes en ${SITE.city}, ${SITE.region}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "agencia de viajes",
    "viajes Colombia",
    "viajes internacionales",
    "Armenia Quindío",
    "Eje Cafetero",
    "cotizar viaje",
    "turismo",
    "vacaciones",
    "Bambú viajes",
  ],
  authors: [{ name: SITE.fullName }],
  creator: SITE.fullName,
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.fullName,
    title: `${SITE.tagline} | ${SITE.fullName}`,
    description: SITE.description,
    images: [
      {
        url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=630&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: `${SITE.fullName} — Agencia de viajes en Colombia`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.tagline} | ${SITE.fullName}`,
    description: SITE.description,
    images: [
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=630&fit=crop&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE.url,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = getTravelAgencySchema();

  return (
    <html lang="es" className={`${jakarta.variable} h-full scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
