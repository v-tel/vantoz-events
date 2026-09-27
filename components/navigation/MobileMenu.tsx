"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { navLinks } from "./NavLinks";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white focus:outline-none"
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      {/* Dark Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Right-Aligned Compact Card */}
      <aside
        className={`fixed top-3 right-3 z-60 flex w-72 max-w-[calc(100vw-1.5rem)] flex-col rounded-2xl border border-white/10 bg-[#0d0d0d] p-4 shadow-2xl transition-all duration-300 ease-in-out ${
          isOpen
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "translate-x-[110%] opacity-0 pointer-events-none"
        }`}
      >
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <Logo variant="nav" />

          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Card Links */}
        <nav className="my-2 max-h-[60vh] overflow-y-auto">
          <ul className="space-y-0.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-[#d8ad62]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom CTA */}
        <div className="border-t border-white/10 pt-3">
          <Link
            href="/quote"
            onClick={() => setIsOpen(false)}
            className="flex h-10 w-full items-center justify-center rounded-full bg-[#d8ad62] text-xs font-bold text-black shadow-sm transition-colors hover:bg-[#c99c4f]"
          >
            Get a Quote
            <ArrowRight className="ml-2" size={14} />
          </Link>
        </div>
      </aside>
    </>
  );
}