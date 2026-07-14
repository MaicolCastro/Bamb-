"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon } from "./SocialIcons";
import { SITE } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={getWhatsAppUrl(SITE.whatsapp, SITE.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.5, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 sm:h-16 sm:w-16"
      aria-label="Contactar por WhatsApp"
    >
      <motion.span
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-[#25D366]/40"
        aria-hidden="true"
      />
      <WhatsAppIcon className="relative h-8 w-8 sm:h-9 sm:w-9" />
    </motion.a>
  );
}
