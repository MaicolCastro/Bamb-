"use client";

import { Phone } from "lucide-react";
import { WhatsAppIcon } from "./SocialIcons";
import { SITE } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

/** Barra fija inferior en móvil — WhatsApp + Llamar */
export function MobileActionBar() {
  return (
    <div
      className="shell-chrome fixed inset-x-0 bottom-0 z-50 border-t border-black/[0.06] bg-white/95 p-3 shadow-[0_-8px_32px_rgba(0,0,0,0.08)] supports-[backdrop-filter]:backdrop-blur-md lg:hidden"
      role="navigation"
      aria-label="Acciones rápidas"
    >
      <div className="mx-auto flex max-w-lg gap-3">
        <a
          href={getWhatsAppUrl(SITE.whatsapp, SITE.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/25 transition-premium active:scale-[0.98]"
        >
          <WhatsAppIcon className="h-5 w-5" />
          WhatsApp
        </a>
        <a
          href={`tel:${SITE.phone.replace(/\s/g, "")}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-bamboo/25 bg-bamboo-muted py-3.5 text-sm font-semibold text-bamboo-dark transition-premium active:scale-[0.98]"
        >
          <Phone className="h-5 w-5" />
          Llamar
        </a>
      </div>
    </div>
  );
}
