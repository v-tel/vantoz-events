"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, ArrowRight } from "lucide-react";
import { Logo } from "@/components/logo";

const links = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "Gallery", href: "/gallery" },
  { label: "Rentals", href: "/rentals" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 lg:px-8">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-white/80 transition hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <button
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-white/40 hover:text-white"
          >
            <Search size={16} />
          </button>
          <Link
            href="/quote"
            className="inline-flex items-center rounded-full bg-[#d8ad62] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#c99c4f]"
          >
            Get a Quote
            <ArrowRight className="ml-2" size={15} />
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black/95 px-5 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-4 text-sm font-medium">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-white/80"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/quote"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[#d8ad62] px-5 py-3 text-center text-sm font-bold text-black"
            >
              Get a Quote
              <ArrowRight className="ml-2" size={15} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
