"use client";

import Image from "next/image";
import { useState } from "react";
import { CldUploadWidget, type CloudinaryUploadWidgetResults } from "next-cloudinary";
import { UploadCloud, Trash2, Loader2, Star } from "lucide-react";

type GalleryImage = {
  id: number;
  url: string;
  publicId: string;
  category: string | null;
  featured: boolean;
};

export function GalleryManager({ initialImages }: { initialImages: GalleryImage[] }) {
  const [images, setImages] = useState(initialImages);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleUploadSuccess(result: CloudinaryUploadWidgetResults) {
    if (typeof result.info === "string" || !result.info) return;
    const { secure_url, public_id } = result.info;

    setError(null);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: secure_url, publicId: public_id }),
      });
      if (!res.ok) throw new Error("Failed to save the uploaded image.");
      const saved: GalleryImage = await res.json();
      setImages((prev) => [saved, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save the uploaded image.");
    }
  }

  async function handleDelete(id: number) {
    setDeletingId(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete image.");
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete image.");
    } finally {
      setDeletingId(null);
    }
  }

  async function toggleFeatured(id: number, current: boolean) {
    setUpdatingId(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !current }),
      });
      if (!res.ok) throw new Error("Failed to update image.");
      setImages((prev) =>
        prev.map((img) => (img.id === id ? { ...img, featured: !current } : img))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update image.");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-black/50">
          {images.length} image{images.length === 1 ? "" : "s"} ·{" "}
          {images.filter((i) => i.featured).length} featured on homepage
        </p>
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          onSuccess={handleUploadSuccess}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-bold text-white"
            >
              <UploadCloud size={16} />
              Upload Image
            </button>
          )}
        </CldUploadWidget>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      <p className="mt-4 text-xs text-black/40">
        Star an image to feature it in the homepage hero slideshow. Un-starred images still show on the public gallery page.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((img) => (
          <div key={img.id} className="group relative overflow-hidden rounded-xl border border-[#e8e0d2]">
            <div className="relative h-40">
              <Image src={img.url} alt="" fill className="object-cover" />
            </div>

            {img.featured && (
              <span className="absolute left-2 top-2 rounded-full bg-[#d8ad62] px-2 py-1 text-[10px] font-bold text-black">
                Featured
              </span>
            )}

            <div className="absolute right-2 top-2 flex gap-1.5 opacity-0 transition group-hover:opacity-100">
              <button
                onClick={() => toggleFeatured(img.id, img.featured)}
                disabled={updatingId === img.id}
                className={`rounded-full p-2 text-white transition disabled:opacity-60 ${
                  img.featured ? "bg-[#d8ad62] text-black" : "bg-black/70"
                }`}
                aria-label={img.featured ? "Remove from hero" : "Feature in hero"}
              >
                {updatingId === img.id ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Star size={14} fill={img.featured ? "currentColor" : "none"} />
                )}
              </button>
              <button
                onClick={() => handleDelete(img.id)}
                disabled={deletingId === img.id}
                className="rounded-full bg-black/70 p-2 text-white disabled:opacity-100"
                aria-label="Delete image"
              >
                {deletingId === img.id ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Trash2 size={14} />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <p className="mt-10 text-center text-sm text-black/40">
          No images yet — click "Upload Image" to add your first one.
        </p>
      )}
    </div>
  );
}
