import { MapPin, Mail, Phone, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";

export const metadata = {
  title: "Contact | Vantoz Events",
  description: "Get in touch with Vantoz Events for décor, planning and rentals.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your event"
        description="Reach out directly, or use the quote builder if you'd like a price estimate first."
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Phone className="mt-1 text-[#a77a2d]" size={20} />
              <div>
                <p className="text-sm font-semibold">Call or WhatsApp</p>
                <a href="tel:+254700000000" className="text-sm text-black/55">
                  +254 700 000 000
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="mt-1 text-[#a77a2d]" size={20} />
              <div>
                <p className="text-sm font-semibold">Email</p>
                <a href="mailto:hello@vantozevents.com" className="text-sm text-black/55">
                  hello@vantozevents.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 text-[#a77a2d]" size={20} />
              <div>
                <p className="text-sm font-semibold">Based in</p>
                <p className="text-sm text-black/55">Nairobi, Kenya</p>
              </div>
            </div>
            <a
              href="https://wa.me/254700000000"
              className="inline-flex items-center rounded-full border border-black/15 px-6 py-4 text-sm font-semibold hover:bg-black hover:text-white"
            >
              <MessageCircle className="mr-2" size={16} />
              Chat on WhatsApp
            </a>
          </div>

          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
