"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { NavLinks } from "@/components/navigation/NavLinks";
import { MobileMenu } from "@/components/navigation/MobileMenu";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-4">
      <div
        className={`relative mx-auto max-w-6xl rounded-2xl border transition-all duration-300 ${
          isScrolled
            ? "border-white/10 bg-black/50 shadow-lg shadow-black/20 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:h-20">
          {/* Brand */}
          <Link
            href="/"
            aria-label="Vantoz Events home"
            className="flex h-full shrink-0 items-center py-2"
          >
            <Logo variant="nav" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            <NavLinks />

            <Link
              href="/quote"
              className="flex h-10 items-center rounded-full bg-[#d8ad62] px-5 text-sm font-bold text-black shadow-sm transition-all duration-200 hover:bg-[#c99c4f] hover:shadow-md"
            >
              Get a Quote
              <ArrowRight className="ml-2" size={15} />
            </Link>
          </div>

          {/* Mobile: Get a Quote + Hamburger Menu */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/quote"
              className="flex h-10 items-center rounded-full bg-[#d8ad62] px-4 text-xs font-bold text-black shadow-sm transition-all duration-200 hover:bg-[#c99c4f]"
            >
              Get a Quote
            </Link>

            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}