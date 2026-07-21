"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Send, CheckCircle, Phone, Mail, MapPin, Clock } from "lucide-react";
import { DESTINATION_OPTIONS, SITE } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/Button";
import { Confetti } from "@/components/Confetti";

interface FormData {
  name: string;
  email: string;
  phone: string;
  destination: string;
  travelers: string;
  travelDates: string;
  message: string;
  consent: boolean;
}

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  destination: "",
  travelers: "2",
  travelDates: "",
  message: "",
  consent: false,
};

function BoutiqueField({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="input-boutique-label">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormData | "consent", string>>
  >({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData | "consent", string>> = {};
    if (!form.name.trim()) newErrors.name = "Ingresa tu nombre";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Ingresa un correo válido";
    if (!form.phone.trim()) newErrors.phone = "Ingresa tu teléfono";
    if (!form.destination) newErrors.destination = "Selecciona un destino";
    if (!form.consent) newErrors.consent = "Debes aceptar la política de privacidad";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const whatsappText = `Hola Bambú, quiero cotizar mi viaje.\n\nNombre: ${form.name}\nCorreo: ${form.email}\nTeléfono: ${form.phone}\nDestino: ${form.destination}\nViajeros: ${form.travelers}\nFechas tentativas: ${form.travelDates || "Por definir"}\nMensaje: ${form.message || "Sin mensaje adicional"}`;

    window.open(getWhatsAppUrl(SITE.whatsapp, whatsappText), "_blank");
    setSubmitted(true);
  };

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors])
      setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  if (submitted) {
    return (
      <section id="contacto" className="relative overflow-hidden bg-earth-muted py-24 sm:py-32">
        <Confetti active />
        <div className="relative mx-auto max-w-xl px-4 text-center sm:px-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="card-surface relative rounded-3xl p-12"
          >
            <CheckCircle className="mx-auto h-16 w-16 text-bamboo" />
            <h2 className="mt-6 text-2xl font-bold">¡Mensaje enviado!</h2>
            <p className="mt-3 text-foreground/60">
              Te redirigimos a WhatsApp para continuar la conversación. Nuestro
              equipo te responderá en menos de 2 horas.
            </p>
            <Button
              className="mt-8"
              onClick={() => {
                setSubmitted(false);
                setForm(initialForm);
              }}
            >
              Enviar otra consulta
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contacto"
      className="texture-dots relative overflow-hidden bg-earth-muted py-24 sm:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          sectionNumber="08"
          highlights={["sueño"]}
          eyebrow="Contacto"
          title="Cuéntanos tu sueño de viaje"
          description="Completa el formulario y te contactamos con una propuesta personalizada. Sin compromiso, sin presión — solo asesoría de calidad."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ScrollReveal>
            <form
              onSubmit={handleSubmit}
              className="card-surface rounded-3xl p-8 sm:p-10"
              noValidate
            >
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <BoutiqueField id="name" label="Nombre completo *" error={errors.name}>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="input-boutique"
                      placeholder="Tu nombre"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                  </BoutiqueField>
                </div>

                <div className="sm:col-span-1">
                  <BoutiqueField id="email" label="Correo electrónico *" error={errors.email}>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="input-boutique"
                      placeholder="tu@correo.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                  </BoutiqueField>
                </div>

                <div className="sm:col-span-1">
                  <BoutiqueField id="phone" label="Teléfono / WhatsApp *" error={errors.phone}>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="input-boutique"
                      placeholder="+57 300 000 0000"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                  </BoutiqueField>
                </div>

                <div className="sm:col-span-1">
                  <BoutiqueField id="destination" label="Destino de interés *" error={errors.destination}>
                    <select
                      id="destination"
                      value={form.destination}
                      onChange={(e) => updateField("destination", e.target.value)}
                      className="input-boutique cursor-pointer"
                      aria-invalid={!!errors.destination}
                      aria-describedby={errors.destination ? "destination-error" : undefined}
                    >
                      <option value="">Selecciona un destino</option>
                      {DESTINATION_OPTIONS.map((dest) => (
                        <option key={dest} value={dest}>
                          {dest}
                        </option>
                      ))}
                    </select>
                  </BoutiqueField>
                </div>

                <div className="sm:col-span-1">
                  <BoutiqueField id="travelers" label="Número de viajeros">
                    <select
                      id="travelers"
                      value={form.travelers}
                      onChange={(e) => updateField("travelers", e.target.value)}
                      className="input-boutique cursor-pointer"
                    >
                      {["1", "2", "3", "4", "5", "6+"].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === "1" ? "persona" : "personas"}
                        </option>
                      ))}
                    </select>
                  </BoutiqueField>
                </div>

                <div className="sm:col-span-1">
                  <BoutiqueField id="travelDates" label="Fechas tentativas">
                    <input
                      id="travelDates"
                      type="text"
                      value={form.travelDates}
                      onChange={(e) => updateField("travelDates", e.target.value)}
                      className="input-boutique"
                      placeholder="Ej. 15–22 dic 2026"
                    />
                  </BoutiqueField>
                </div>

                <div className="sm:col-span-2">
                  <BoutiqueField id="message" label="Cuéntanos más sobre tu viaje ideal">
                    <textarea
                      id="message"
                      rows={3}
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      className="input-boutique resize-none"
                      placeholder="Tipo de hotel, actividades, presupuesto aproximado..."
                    />
                  </BoutiqueField>
                </div>

                <div className="sm:col-span-2">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => updateField("consent", e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-foreground/20 text-bamboo focus:ring-bamboo"
                      aria-invalid={!!errors.consent}
                    />
                    <span className="text-sm leading-relaxed text-foreground/65">
                      Acepto la{" "}
                      <a
                        href="/privacidad"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-bamboo hover:underline"
                      >
                        política de privacidad
                      </a>{" "}
                      y autorizo el contacto para cotizar mi viaje. *
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="mt-1 text-sm text-red-500" role="alert">
                      {errors.consent}
                    </p>
                  )}
                </div>
              </div>

              <Button type="submit" size="lg" className="mt-10 w-full">
                <Send className="h-5 w-5" />
                Quiero cotizar mi viaje
              </Button>

              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-foreground/50">
                <Clock className="h-3.5 w-3.5 text-bamboo" aria-hidden="true" />
                Respuesta en menos de 2 horas
              </p>
            </form>
          </ScrollReveal>

          <ScrollReveal delay={0.1} direction="left">
            <div className="flex h-full flex-col">
              <div className="relative min-h-[220px] flex-1 overflow-hidden rounded-3xl ring-1 ring-black/[0.04] sm:min-h-[280px]">
                <Image
                  src="/images/destinations/eje-cafetero.png"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bamboo-dark/80 via-bamboo-dark/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="font-playfair text-2xl font-medium text-white sm:text-3xl">
                    Te esperamos en el corazón del Eje Cafetero.
                  </p>
                  <p className="mt-2 text-sm text-white/75">
                    {SITE.city}, {SITE.region} — {SITE.nearbyAirport}
                  </p>
                </div>
              </div>

              <ul className="mt-6 space-y-4" role="list">
                <li className="flex items-start gap-3 text-sm text-foreground/70">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-bamboo" aria-hidden="true" />
                  {SITE.businessHours}
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground/70">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-bamboo" aria-hidden="true" />
                  {SITE.address}
                </li>
                <li>
                  <a
                    href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-sm text-foreground/70 transition-premium hover:text-bamboo"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-bamboo" aria-hidden="true" />
                    {SITE.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-center gap-3 text-sm text-foreground/70 transition-premium hover:text-bamboo"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-bamboo" aria-hidden="true" />
                    {SITE.email}
                  </a>
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
