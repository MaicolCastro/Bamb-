import { ClientShell } from "@/components/ClientShell";
import { Footer } from "@/components/Footer";
import { Hero } from "@/sections/Hero";
import { WhyChooseUs } from "@/sections/WhyChooseUs";
import { Destinations } from "@/sections/Destinations";
import { HowWeWork } from "@/sections/HowWeWork";
import { Testimonials } from "@/sections/Testimonials";
import { Stats } from "@/sections/Stats";
import { Gallery } from "@/sections/Gallery";
import { ContactForm } from "@/sections/ContactForm";

export default function HomePage() {
  return (
    <ClientShell>
      <main>
        <Hero />
        <WhyChooseUs />
        <Destinations />
        <HowWeWork />
        <Testimonials />
        <Stats />
        <Gallery />
        <ContactForm />
      </main>
      <Footer />
    </ClientShell>
  );
}
