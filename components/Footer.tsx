"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from "./SocialIcons";
import { Logo } from "./Logo";
import { SITE, NAV_LINKS } from "@/lib/constants";
import { getWhatsAppUrl, scrollToSection } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bamboo-dark text-white" aria-label="Pie de página">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo size="md" className="drop-shadow-sm" />
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Agencia de viajes en {SITE.city}, {SITE.region}. Transformamos
              sueños en experiencias inolvidables con asesoría humana y
              profesional.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition-colors hover:bg-earth/30"
                aria-label="Instagram de Bambú"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition-colors hover:bg-earth/30"
                aria-label="Facebook de Bambú"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-earth-light">
              Navegación
            </h3>
            <ul className="space-y-2" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-sm text-white/70 transition-colors hover:text-bamboo-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-earth-light">
              Contacto
            </h3>
            <ul className="space-y-3" role="list">
              <li>
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-bamboo-light" />
                  {SITE.address}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-bamboo-light" />
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl(SITE.whatsapp, SITE.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25D366]" />
                  {SITE.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-bamboo-light" />
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-earth-light">
              Ubicación
            </h3>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-2xl ring-1 ring-white/10 transition-all hover:ring-bamboo-light/40"
              aria-label="Ver ubicación de Bambú en Google Maps"
            >
              <div className="flex h-[180px] flex-col items-center justify-center gap-3 bg-white/5 px-4 transition-colors group-hover:bg-white/10">
                <MapPin className="h-10 w-10 text-bamboo-light transition-transform group-hover:scale-110" />
                <span className="text-center text-sm font-medium text-white/80 group-hover:text-white">
                  Ver en Google Maps
                </span>
                <span className="text-center text-xs text-white/50">
                  {SITE.address}
                </span>
              </div>
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/50">
            © {currentYear} {SITE.fullName}. Todos los derechos reservados.
          </p>
          <p className="text-sm text-earth-light/80">
            Hecho con pasión en el Eje Cafetero ☕
          </p>
        </div>
      </div>
    </footer>
  );
}
