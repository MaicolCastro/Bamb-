"use client";

import { Loader } from "./Loader";
import { Navbar } from "./Navbar";
import { WhatsAppFloat } from "./WhatsAppFloat";
import { ScrollToTop } from "./ScrollToTop";
import { MobileActionBar } from "./MobileActionBar";

interface ClientShellProps {
  children: React.ReactNode;
}

/** Envuelve elementos interactivos globales de la aplicación */
export function ClientShell({ children }: ClientShellProps) {
  return (
    <>
      <Loader />
      <Navbar />
      {children}
      <WhatsAppFloat />
      <MobileActionBar />
      <ScrollToTop />
    </>
  );
}
