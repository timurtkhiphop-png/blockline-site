import ClientShell from "@/components/ClientShell";
import Header from "@/components/Header";
import ThreadLine from "@/components/ThreadLine";
import HeroBrainGrid from "@/components/HeroBrainGrid";
import { ValueStrip } from "@/components/ValueStrip";
import { WhySection } from "@/components/WhySection";
import { OfferSection } from "@/components/OfferSection";
import { PricingSection } from "@/components/PricingSection";
import { ProcessSimple } from "@/components/ProcessSimple";
import { Portfolio } from "@/components/Portfolio";
import { FaqSection } from "@/components/FaqSection";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <ClientShell>
      <main className="w-full min-w-0">
        <ThreadLine />
        <Header />
        <HeroBrainGrid />
        <ValueStrip />
        <WhySection />
        <OfferSection />
        <Portfolio />
        <ProcessSimple />
        <PricingSection />
        <FaqSection />
        <ContactForm />
        <Footer />
      </main>
    </ClientShell>
  );
}
