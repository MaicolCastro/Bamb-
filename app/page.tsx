import { ClientShell } from "@/components/ClientShell";
import { Footer } from "@/components/Footer";
import { SectionWave } from "@/components/SectionWave";
import { Hero } from "@/sections/Hero";
import { WhyChooseUs } from "@/sections/WhyChooseUs";
import { Destinations } from "@/sections/Destinations";
import { HowWeWork } from "@/sections/HowWeWork";
import { Testimonials } from "@/sections/Testimonials";
import { Stats } from "@/sections/Stats";
import { Gallery } from "@/sections/Gallery";
import { FAQ } from "@/sections/FAQ";
import { ContactForm } from "@/sections/ContactForm";

const COLORS = {
  bambooDark: "#1e4620",
  earthMuted: "#f3ede4",
  background: "#f9f9f9",
  bamboo: "#2d5a27",
  grayLight: "#f2f2f2",
} as const;

export default function HomePage() {
  return (
    <ClientShell>
      <main>
        <Hero />
        <SectionWave topColor={COLORS.bambooDark} bottomColor={COLORS.earthMuted} />
        <WhyChooseUs />
        <SectionWave topColor={COLORS.earthMuted} bottomColor={COLORS.background} />
        <div className="section-deferred">
          <Destinations />
        </div>
        <SectionWave topColor={COLORS.background} bottomColor={COLORS.bamboo} />
        <div className="section-deferred">
          <HowWeWork />
        </div>
        <SectionWave topColor={COLORS.bamboo} bottomColor={COLORS.grayLight} />
        <div className="section-deferred">
          <Testimonials />
        </div>
        <SectionWave topColor={COLORS.grayLight} bottomColor={COLORS.bambooDark} />
        <Stats />
        <SectionWave topColor={COLORS.bambooDark} bottomColor={COLORS.background} />
        <div className="section-deferred">
          <Gallery />
        </div>
        <SectionWave topColor={COLORS.background} bottomColor={COLORS.earthMuted} />
        <div className="section-deferred">
          <FAQ />
        </div>
        <SectionWave topColor={COLORS.earthMuted} bottomColor={COLORS.earthMuted} />
        <ContactForm />
        <SectionWave topColor={COLORS.earthMuted} bottomColor={COLORS.bambooDark} />
      </main>
      <Footer />
    </ClientShell>
  );
}
