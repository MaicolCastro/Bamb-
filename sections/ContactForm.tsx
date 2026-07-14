"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { WhatsAppIcon } from "@/components/SocialIcons";
import { DESTINATION_OPTIONS, SITE } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/Button";

interface FormData {
  name: string;
  email: string;
  phone: string;
  destination: string;
  message: string;
}

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  destination: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = "Ingresa tu nombre";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Ingresa un correo válido";
    if (!form.phone.trim()) newErrors.phone = "Ingresa tu teléfono";
    if (!form.destination) newErrors.destination = "Selecciona un destino";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const whatsappText = `Hola Bambú, quiero cotizar mi viaje.\n\nNombre: ${form.name}\nCorreo: ${form.email}\nTeléfono: ${form.phone}\nDestino: ${form.destination}\nMensaje: ${form.message || "Sin mensaje adicional"}`;

    window.open(getWhatsAppUrl(SITE.whatsapp, whatsappText), "_blank");
    setSubmitted(true);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  if (submitted) {
    return (
      <section id="contacto" className="bg-earth-muted py-24 sm:py-32">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-3xl bg-white p-12 shadow-xl"
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
      className="bg-earth-muted py-24 sm:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contacto"
          title="Cuéntanos tu sueño de viaje"
          description="Completa el formulario y te contactamos con una propuesta personalizada. Sin compromiso, sin presión — solo asesoría de calidad."
        />

        <div className="mx-auto mt-16 max-w-2xl">
          <ScrollReveal>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-white p-8 shadow-xl shadow-black/5 sm:p-10"
              noValidate
            >
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Nombre */}
                <div className="sm:col-span-1">
                  <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    Nombre completo *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="w-full rounded-xl border border-foreground/10 bg-gray-light px-4 py-3 text-foreground transition-colors focus:border-bamboo focus:outline-none focus:ring-2 focus:ring-bamboo/20"
                    placeholder="Tu nombre"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-500" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Correo */}
                <div className="sm:col-span-1">
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Correo electrónico *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full rounded-xl border border-foreground/10 bg-gray-light px-4 py-3 text-foreground transition-colors focus:border-bamboo focus:outline-none focus:ring-2 focus:ring-bamboo/20"
                    placeholder="tu@correo.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Teléfono */}
                <div className="sm:col-span-1">
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="w-full rounded-xl border border-foreground/10 bg-gray-light px-4 py-3 text-foreground transition-colors focus:border-bamboo focus:outline-none focus:ring-2 focus:ring-bamboo/20"
                    placeholder="+57 300 000 0000"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1 text-sm text-red-500" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Destino */}
                <div className="sm:col-span-1">
                  <label htmlFor="destination" className="mb-2 block text-sm font-medium">
                    Destino de interés *
                  </label>
                  <select
                    id="destination"
                    value={form.destination}
                    onChange={(e) => updateField("destination", e.target.value)}
                    className="w-full rounded-xl border border-foreground/10 bg-gray-light px-4 py-3 text-foreground transition-colors focus:border-bamboo focus:outline-none focus:ring-2 focus:ring-bamboo/20"
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
                  {errors.destination && (
                    <p id="destination-error" className="mt-1 text-sm text-red-500" role="alert">
                      {errors.destination}
                    </p>
                  )}
                </div>

                {/* Mensaje */}
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    Cuéntanos más sobre tu viaje ideal
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    className="w-full resize-none rounded-xl border border-foreground/10 bg-gray-light px-4 py-3 text-foreground transition-colors focus:border-bamboo focus:outline-none focus:ring-2 focus:ring-bamboo/20"
                    placeholder="Fechas aproximadas, número de viajeros, tipo de experiencia..."
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="mt-8 w-full">
                <Send className="h-5 w-5" />
                Quiero cotizar mi viaje
              </Button>

              <p className="mt-4 text-center text-sm text-foreground/50">
                También puedes escribirnos directamente por{" "}
                <a
                  href={getWhatsAppUrl(SITE.whatsapp, SITE.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-bamboo hover:underline"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
              </p>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
