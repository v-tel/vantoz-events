import { PageHero } from "@/components/page-hero";
import { Footer } from "@/components/footer";
import { RentalCatalog } from "@/components/rental-catalog";

export const metadata = {
  title: "Rentals | Vantoz Events",
  description: "Rent chairs, tables, tents, backdrops, lighting and more for your event.",
};

export default function RentalsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Rentals"
        title="Everything you need, by the item"
        description="Mix and match individual pieces, or pair rentals with one of our décor packages."
      />

      <section className="mx-auto max-w-7xl px-5 pb-28 pt-16 lg:px-8">
        <RentalCatalog />
      </section>

      <Footer />
    </main>
  );
}
