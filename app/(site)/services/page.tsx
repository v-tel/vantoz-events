import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Footer } from "@/components/footer";
import { services } from "@/lib/data";

export const metadata = {
  title: "Services | Vantoz Events",
  description: "Décor and planning services for weddings, birthdays, corporate events and more.",
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Our Services"
        title="Décor & planning for every occasion"
        description="From an intimate baby shower to a full corporate launch, we handle the design, setup and coordination so you don't have to."
      />

      <section className="mx-auto max-w-7xl divide-y divide-[#e8e0d2] px-5 lg:px-8">
        {services.map((s, i) => (
          <div
            key={s.title}
            id={s.title.toLowerCase().replaceAll(" ", "-")}
            className={`grid scroll-mt-28 gap-10 py-16 md:grid-cols-2 md:items-center ${
              i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
            }`}
          >
            <div className="relative h-80 overflow-hidden rounded-2xl md:h-[420px]">
              <Image src={s.image} alt={s.title} fill className="object-cover" />
            </div>
            <div>
              <h2 className="serif text-4xl">{s.title}</h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-black/55">{s.desc}</p>
              <Link
                href="/quote"
                className="mt-7 inline-flex items-center rounded-full bg-[#d8ad62] px-6 py-4 text-sm font-bold text-black"
              >
                Get a Quote for {s.title}
                <ArrowRight className="ml-2" size={15} />
              </Link>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-[#f7f3eb] px-5 py-20 text-center lg:px-8">
        <h2 className="serif text-4xl">Not sure which service fits your event?</h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-black/55">
          Tell us about your event and we'll recommend the right setup and package.
        </p>
        <Link
          href="/quote"
          className="mt-7 inline-flex items-center rounded-full bg-black px-6 py-4 text-sm font-bold text-white"
        >
          Start Your Quote
          <ArrowRight className="ml-2" size={15} />
        </Link>
      </section>

      <Footer />
    </main>
  );
}
