import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { galleryImages } from "@/lib/db/schema";
import { GalleryManager } from "@/components/admin/gallery-manager";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const images = await db.select().from(galleryImages).orderBy(desc(galleryImages.createdAt));

  return (
    <div>
      <h1 className="serif text-3xl">Gallery</h1>
      <p className="mt-2 text-sm text-black/50">
        Images uploaded here appear on the public gallery page. Star an image to feature it in
        the homepage hero slideshow.
      </p>

      <div className="mt-8">
        <GalleryManager
          initialImages={images.map((img) => ({
            id: img.id,
            url: img.url,
            publicId: img.publicId,
            category: img.category,
            featured: img.featured,
          }))}
        />
      </div>
    </div>
  );
}
