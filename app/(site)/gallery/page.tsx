import Image from "next/image";
import Link from "next/link";
import { desc } from "drizzle-orm";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Footer } from "@/components/footer";
import { gallery as staticGallery } from "@/lib/data";
import { db } from "@/lib/db";
import { galleryImages } from "@/lib/db/schema";

export const metadata = {
  title: "Gallery | Vantoz Events",
  description: "A look at the events and spaces Vantoz has decorated.",
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const uploaded = await db.select().from(galleryImages).orderBy(desc(galleryImages.createdAt));

  // Fall back to the static curated set until the team uploads real photos
  // from /admin/gallery.
  const images = uploaded.length > 0 ? uploaded.map((img) => img.url) : staticGallery;

  return (
    <main>
      <PageHero
        eyebrow="Our Gallery"
        title="Moments we've decorated"
        description="A selection of weddings, birthdays and corporate events we've helped bring to life."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {images.map((src, i) => (
            <div
              key={src}
              className={`relative overflow-hidden rounded-2xl ${
                i === 0 ? "col-span-2 h-80 md:col-span-2 md:h-[520px]" : "h-56 md:h-64"
              }`}
            >
              <Image
                src={src}
                alt="Vantoz event décor"
                fill
                className="object-cover transition duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f7f3eb] px-5 py-20 text-center lg:px-8">
        <h2 className="serif text-4xl">Want your event featured here?</h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-black/55">
          Let's start planning something worth photographing.
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
