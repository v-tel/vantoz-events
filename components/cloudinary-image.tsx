"use client";

import { CldImage, type CldImageProps } from "next-cloudinary";

/**
 * Thin client wrapper around next-cloudinary's CldImage.
 *
 * Why this exists: importing CldImage directly from "next-cloudinary" in a
 * Server Component can lose the library's internal "use client" boundary
 * when re-exported through its barrel file under Turbopack, producing
 * "useState only works in Client Components" even though nothing in our
 * own code is wrong. Wrapping it here, in a file WE mark "use client",
 * makes the boundary explicit and independent of the library's export setup.
 */
export function CloudinaryImage(props: CldImageProps) {
  return <CldImage {...props} />;
}