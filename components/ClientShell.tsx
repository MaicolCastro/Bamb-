"use client";

import { Loader } from "./Loader";
import { Navbar } from "./Navbar";
import { WhatsAppFloat } from "./WhatsAppFloat";
import { ScrollToTop } from "./ScrollToTop";
import { ReadingProgress } from "./ReadingProgress";
import { SkipLink } from "./SkipLink";

interface ClientShellProps {
  children: React.ReactNode;
}

/** Envuelve elementos interactivos globales de la aplicación */
export function ClientShell({ children }: ClientShellProps) {
  return (
    <>
      <SkipLink />
      <ReadingProgress />
      <Loader />
      <Navbar />
      {children}
      <WhatsAppFloat />
      <ScrollToTop />
    </>
  );
}
