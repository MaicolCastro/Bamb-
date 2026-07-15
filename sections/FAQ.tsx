"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircle } from "lucide-react";
import { FAQ_ITEMS, SITE } from "@/lib/constants";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/Button";
import { WhatsAppIcon } from "@/components/SocialIcons";
import { getWhatsAppUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";

const easePremium = [0.22, 1, 0.36, 1] as const;

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <ScrollReveal delay={index * 0.06}>
      <div
        className={cn(
          "overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 transition-all duration-300",
          isOpen
            ? "shadow-lg shadow-bamboo/10 ring-bamboo/15"
            : "shadow-sm hover:shadow-md"
        )}
      >
        <button
          type="button"
          id={`faq-trigger-${index}`}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${index}`}
          className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
        >
          <span className="pr-2 text-base font-semibold text-foreground sm:text-lg">
            {question}
          </span>
          <motion.span
            initial={false}
            animate={{
              rotate: isOpen ? 180 : 0,
              scale: isOpen ? 1.05 : 1,
            }}
            transition={{ duration: 0.35, ease: easePremium }}
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
              isOpen ? "bg-bamboo text-white" : "bg-bamboo-muted text-bamboo"
            )}
            aria-hidden="true"
          >
            {isOpen ? (
              <Minus className="h-5 w-5" />
            ) : (
              <Plus className="h-5 w-5" />
            )}
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-trigger-${index}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: easePremium }}
              className="overflow-hidden"
            >
              <p className="border-t border-foreground/5 px-5 pb-5 pt-4 text-base leading-relaxed text-foreground/65 sm:px-6 sm:pb-6">
                {answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="bg-gray-light py-24 sm:py-32"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Resolvemos tus dudas antes de que des el primer paso"
          description="Lo más importante es que viajes con confianza. Aquí respondemos las preguntas que nos hacen con más frecuencia."
        />

        <div className="mx-auto mt-16 max-w-3xl space-y-3 sm:space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <FaqItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
              index={index}
            />
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mx-auto mt-12 max-w-3xl rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-black/5 sm:p-8">
            <MessageCircle
              className="mx-auto h-10 w-10 text-bamboo"
              aria-hidden="true"
            />
            <p className="mt-4 font-display text-xl font-semibold text-foreground sm:text-2xl">
              ¿Tienes otra pregunta?
            </p>
            <p className="mt-2 text-foreground/60">
              Escríbenos por WhatsApp y te respondemos en menos de 2 horas.
            </p>
            <Button
              href={getWhatsAppUrl(SITE.whatsapp, SITE.whatsappMessage)}
              external
              variant="whatsapp"
              size="lg"
              className="mt-6"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Hacer una pregunta
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
