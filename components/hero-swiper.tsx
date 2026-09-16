"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function HeroSwiper({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="absolute inset-0">
      {images.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt="Vantoz event décor"
            fill
            priority={i === 0}
            className="object-cover"
          />
        </div>
      ))}

      {/* Just enough of a scrim on the left for text to stay legible —
          the image itself stays clear, not washed out. */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent" />

      {images.length > 1 && (
        <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-2.5 md:flex">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "h-7 w-2 bg-[#d8ad62]" : "w-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
