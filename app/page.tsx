
import Header from "@/components/Header";
import ThreadLine from "@/components/ThreadLine";
import HeroBrainGrid from "@/components/HeroBrainGrid";
import { ValueStrip } from "@/components/ValueStrip";
import { ValueSection } from "@/components/ValueSection";
import { System820 } from "@/components/System820";
import { FounderSection } from "@/components/FounderSection";
import { PricingSection } from "@/components/PricingSection";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { FaqSection } from "@/components/FaqSection";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <main className="w-full min-w-0">
      <ThreadLine />
      <Header />
      <HeroBrainGrid />
      <ValueStrip />
      <FeaturedProjects />
      <ValueSection />
      <System820 />
      <FounderSection />
      <PricingSection />
      <FaqSection />
      <ContactForm />
      <Footer />
    </main>
  );
}
