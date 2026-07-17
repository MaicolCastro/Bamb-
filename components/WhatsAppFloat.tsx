"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { WhatsAppIcon } from "./SocialIcons";
import { SITE } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

export function WhatsAppFloat() {
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("bambu-wa-tip")) return;
    const timer = setTimeout(() => setShowTip(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const dismissTip = () => {
    setShowTip(false);
    sessionStorage.setItem("bambu-wa-tip", "1");
  };

  return (
    <div className="shell-chrome fixed bottom-24 right-6 z-50 hidden sm:bottom-8 sm:block">
      {showTip && (
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-2xl bg-white px-4 py-2.5 text-sm font-medium text-foreground shadow-lg ring-1 ring-black/[0.06]"
          role="tooltip"
        >
          ¿Dudas? Escríbenos
          <span
            className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 bg-white ring-1 ring-black/[0.04]"
            aria-hidden="true"
          />
        </motion.div>
      )}

      <motion.a
        href={getWhatsAppUrl(SITE.whatsapp, SITE.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={dismissTip}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/35 sm:h-16 sm:w-16"
        aria-label="Contactar por WhatsApp"
      >
        <span
          className="wa-pulse-ring absolute inset-0 rounded-full bg-[#25D366]/35"
          aria-hidden="true"
        />
        <WhatsAppIcon className="relative h-8 w-8 sm:h-9 sm:w-9" />
      </motion.a>
    </div>
  );
}
