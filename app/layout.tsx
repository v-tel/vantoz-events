import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vantoz Events | Décor, Planning & Rentals",
  description: "Premium event décor, planning and rentals for unforgettable celebrations.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
