import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Footer } from "@/components/footer";
import { packages } from "@/lib/data";

export const metadata = {
  title: "Packages | Vantoz Events",
  description: "Silver, Gold and Premium décor packages, with full customisation available.",
};

export default function PackagesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Our Packages"
        title="Starting points, not limits"
        description="Every package below can be adjusted for your guest count, venue and style — think of these as a starting price, not a ceiling."
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {packages.map((p) => (
            <div
              key={p.name}
              className="relative rounded-2xl border border-[#ded4c3] bg-white p-7"
            >
              {p.popular && (
                <span className="absolute right-6 top-6 rounded-full bg-[#d8ad62] px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                  Most Popular
                </span>
              )}
              <h3 className="serif text-3xl">{p.name}</h3>
              <p className="mt-2 text-sm text-black/50">{p.desc}</p>
              <div className="my-6 text-2xl font-bold">From KSh {p.price}</div>
              <ul className="space-y-3 text-sm">
                {p.items.map((x) => (
                  <li key={x}>
                    <Check size={16} className="mr-2 inline text-[#a77a2d]" />
                    {x}
                  </li>
                ))}
              </ul>
              <Link
                href="/quote"
                className="mt-8 block rounded-full border border-black/15 px-5 py-3 text-center text-sm font-semibold hover:bg-black hover:text-white"
              >
                Request this package
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-[#e8e0d2] bg-[#f7f3eb] p-10 text-center">
          <h2 className="serif text-3xl">Need something fully custom?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-black/55">
            Large weddings, corporate branding and multi-day events often need a package built
            from scratch. Tell us what you're planning.
          </p>
          <Link
            href="/quote"
            className="mt-6 inline-flex items-center rounded-full bg-black px-6 py-4 text-sm font-bold text-white"
          >
            Request a Custom Quote
            <ArrowRight className="ml-2" size={15} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
