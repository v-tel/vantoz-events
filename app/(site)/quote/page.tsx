import { PageHero } from "@/components/page-hero";
import { Footer } from "@/components/footer";
import { QuoteBuilder } from "@/components/quote-builder";

export const metadata = {
  title: "Get a Quote | Vantoz Events",
  description: "Tell us about your event and get a tailored décor and rental quote.",
};

export default function QuotePage() {
  return (
    <main>
      <PageHero
        eyebrow="Get a Quote"
        title="Let's price out your event"
        description="Five quick steps — no account needed. We'll follow up with a tailored quote within 24 hours."
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <QuoteBuilder />
      </section>

      <Footer />
    </main>
  );
}
