import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combina clases de Tailwind sin conflictos */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Genera enlace de WhatsApp con mensaje predefinido */
export function getWhatsAppUrl(
  phone: string,
  message: string = "Hola, me gustaría más información"
) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/** Desplazamiento suave hacia un ancla */
export function scrollToSection(id: string) {
  const element = document.getElementById(id.replace("#", ""));
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
