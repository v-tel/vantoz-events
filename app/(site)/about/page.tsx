import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "About | Vantoz Events",
  description: "The team behind Vantoz Events décor, planning and rentals.",
};

const values = [
  {
    title: "Detail-obsessed",
    desc: "Every centerpiece, drape and light is placed with intention — nothing feels generic.",
  },
  {
    title: "On your budget",
    desc: "We design within what you've told us, and we're upfront if something costs more.",
  },
  {
    title: "On time, every time",
    desc: "Setup and takedown run on a schedule you can rely on, so your event starts on time.",
  },
];

const stats = [
  { value: "300+", label: "Events decorated" },
  { value: "6", label: "Years in business" },
  { value: "40+", label: "Rental item types" },
  { value: "98%", label: "Clients who rebook" },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About Vantoz"
        title="We build the room your event deserves"
        description="Vantoz Events started with a simple idea: décor should feel personal, not rented off a shelf. That's still true today, whether we're setting up a backyard birthday or a 500-guest wedding."
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="relative h-80 overflow-hidden rounded-2xl md:h-[440px]">
            <Image
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"
              alt="Vantoz Events team setting up décor"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="serif text-4xl">Our story</h2>
            <p className="mt-4 text-sm leading-7 text-black/55">
              What began as a small décor service for weddings in Nairobi has grown into a full
              planning and rental operation. As the requests got bigger — more guests, tighter
              timelines, more moving parts — we built the team, the inventory and the process to
              match.
            </p>
            <p className="mt-4 text-sm leading-7 text-black/55">
              Today we handle décor, planning and rentals for weddings, birthdays, corporate
              events, graduations, traditional ceremonies and baby showers, with an in-house team
              that manages everything from the first quote to the final takedown.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f3eb] px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="serif text-4xl">What guides how we work</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-[#e8e0d2] bg-white p-7">
                <h3 className="text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-6 text-black/55">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="serif text-4xl text-[#a77a2d]">{s.value}</div>
              <p className="mt-2 text-xs uppercase tracking-wide text-black/50">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-black px-5 py-20 text-center text-white lg:px-8">
        <h2 className="serif text-4xl">Let's plan your event together</h2>
        <Link
          href="/quote"
          className="mt-7 inline-flex items-center rounded-full bg-[#d8ad62] px-6 py-4 text-sm font-bold text-black"
        >
          Get a Quote
          <ArrowRight className="ml-2" size={15} />
        </Link>
      </section>

      <Footer />
    </main>
  );
}
