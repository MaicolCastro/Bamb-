import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: `Términos y condiciones de uso del sitio web de ${SITE.fullName}.`,
};

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <Link
          href="/"
          className="text-sm font-medium text-bamboo transition-premium hover:underline"
        >
          ← Volver al inicio
        </Link>

        <h1 className="font-display mt-8 text-3xl font-semibold text-foreground sm:text-4xl">
          Términos y condiciones
        </h1>
        <p className="mt-2 text-sm text-foreground/50">
          Última actualización: julio 2026
        </p>

        <div className="prose-bamboo mt-10 space-y-6 text-base leading-relaxed text-foreground/75">
          <section>
            <h2 className="text-lg font-semibold text-foreground">1. Aceptación</h2>
            <p className="mt-2">
              Al usar el sitio web de {SITE.fullName} y solicitar cotizaciones o
              servicios, aceptas estos términos. Si no estás de acuerdo, te
              recomendamos no utilizar nuestros canales digitales.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">2. Servicios</h2>
            <p className="mt-2">
              {SITE.fullName} actúa como agencia intermediaria en la contratación de
              servicios turísticos (vuelos, hoteles, traslados, seguros, etc.) con
              proveedores terceros. Las condiciones finales de cada reserva dependen
              de las políticas de dichos proveedores.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">3. Cotizaciones</h2>
            <p className="mt-2">
              Las cotizaciones enviadas tienen carácter informativo y pueden variar
              según disponibilidad, tipo de cambio y tarifas vigentes al momento de
              confirmar y pagar. Una propuesta no constituye reserva hasta su
              confirmación expresa y pago acordado.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">4. Pagos y cancelaciones</h2>
            <p className="mt-2">
              Los plazos de pago, cuotas y políticas de cancelación o cambio se
              informan por escrito antes de confirmar cada servicio. Estas condiciones
              pueden diferir según destino, aerolínea u operador.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">5. Responsabilidad del viajero</h2>
            <p className="mt-2">
              El viajero es responsable de contar con documentación válida (pasaporte,
              visa, vacunas, seguro de viaje, etc.) según los requisitos del destino.
              Bambú orienta, pero la verificación final es responsabilidad del cliente.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">6. Propiedad intelectual</h2>
            <p className="mt-2">
              El contenido de este sitio (textos, imágenes, marca) pertenece a{" "}
              {SITE.fullName} o se usa con licencia. No está permitida su reproducción
              sin autorización previa.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">7. Contacto</h2>
            <p className="mt-2">
              {SITE.fullName} · {SITE.address} · {SITE.email} · {SITE.phoneDisplay}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
