"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn, getWhatsAppUrl, scrollToSection } from "@/lib/utils";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { Button } from "./Button";
import { Logo } from "./Logo";

export function Navbar() {
  const scrolled = useScrollPosition(60);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    scrollToSection(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "py-3" : "bg-transparent py-4"
        )}
      >
        <nav
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8",
            scrolled &&
              "glass mx-4 rounded-full border border-white/60 px-5 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:mx-6 lg:mx-8"
          )}
          aria-label="Navegación principal"
        >
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#inicio");
            }}
            className={cn(
              "group shrink-0 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]",
              !scrolled &&
                "glass rounded-full px-4 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.10)] backdrop-blur-xl sm:px-5 sm:py-2.5"
            )}
            aria-label={`${SITE.fullName} — Inicio`}
          >
            <Logo size="md" priority />
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-colors xl:px-4",
                    scrolled
                      ? "text-foreground/75 hover:bg-white/40 hover:text-bamboo"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Button
              href={getWhatsAppUrl(SITE.whatsapp, SITE.whatsappMessage)}
              external
              variant="whatsapp"
              size="sm"
            >
              Cotizar ahora
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              "rounded-full p-2.5 transition-colors lg:hidden",
              scrolled
                ? "text-bamboo hover:bg-white/40"
                : "text-white hover:bg-white/10"
            )}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bamboo-dark/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 flex h-full w-[min(320px,85vw)] flex-col rounded-l-3xl bg-background p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-8 flex justify-start">
                <Logo size="md" />
              </div>

              <ul className="flex flex-col gap-1" role="list">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className="block rounded-full px-4 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-bamboo-muted hover:text-bamboo"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                <Button
                  href={getWhatsAppUrl(SITE.whatsapp, SITE.whatsappMessage)}
                  external
                  variant="whatsapp"
                  size="md"
                  className="w-full"
                >
                  Cotizar por WhatsApp
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
