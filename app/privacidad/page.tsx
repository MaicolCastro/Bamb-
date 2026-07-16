import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: `Política de privacidad y tratamiento de datos de ${SITE.fullName}.`,
};

export default function PrivacidadPage() {
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
          Política de privacidad
        </h1>
        <p className="mt-2 text-sm text-foreground/50">
          Última actualización: julio 2026
        </p>

        <div className="prose-bamboo mt-10 space-y-6 text-base leading-relaxed text-foreground/75">
          <section>
            <h2 className="text-lg font-semibold text-foreground">1. Responsable</h2>
            <p className="mt-2">
              {SITE.fullName}, con domicilio en {SITE.address}, es responsable del
              tratamiento de los datos personales que nos proporciones a través de
              nuestro sitio web, formulario de contacto o WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">2. Datos que recopilamos</h2>
            <p className="mt-2">
              Podemos recopilar nombre, correo electrónico, teléfono, destino de
              interés, fechas tentativas de viaje, número de viajeros y cualquier
              información adicional que nos compartas voluntariamente para cotizar
              tu viaje.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">3. Finalidad</h2>
            <p className="mt-2">
              Utilizamos tus datos para contactarte, elaborar cotizaciones,
              gestionar reservas, brindar asesoría de viaje y cumplir obligaciones
              legales relacionadas con nuestros servicios turísticos.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">4. Conservación y seguridad</h2>
            <p className="mt-2">
              Conservamos tus datos mientras sea necesario para la relación comercial
              y el cumplimiento legal. Implementamos medidas razonables para
              proteger tu información contra acceso no autorizado.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">5. Tus derechos</h2>
            <p className="mt-2">
              Puedes solicitar acceso, corrección, actualización o eliminación de tus
              datos escribiendo a{" "}
              <a href={`mailto:${SITE.email}`} className="text-bamboo hover:underline">
                {SITE.email}
              </a>
              . También puedes revocar tu consentimiento en cualquier momento.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">6. Contacto</h2>
            <p className="mt-2">
              Para consultas sobre esta política: {SITE.email} · {SITE.phoneDisplay}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
