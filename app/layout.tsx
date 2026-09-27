import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vantoz Events | Décor, Planning & Rentals",
  description: "Premium event décor, planning and rentals for unforgettable celebrations.",
  icons: {
    // Cache-busting query param — forces browsers to treat this as a new
    // favicon URL instead of reusing whatever they cached before, since
    // browser favicon caches (esp. Chromium) ignore normal HTTP caching
    // rules and can persist even through incognito/clear-cache.
    icon: "/favicon.ico?v=2",
    shortcut: "/favicon.ico?v=2",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}