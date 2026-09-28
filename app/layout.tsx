import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PwaRegister } from "@/components/pwa-register";

export const metadata: Metadata = {
  title: "Vantoz Events | Décor, Planning & Rentals",
  description: "Premium event décor, planning and rentals for unforgettable celebrations.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Vantoz Events",
  },
};

export const viewport: Viewport = {
  themeColor: "#d8ad62",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <PwaRegister />
      </body>
    </html>
  );
}