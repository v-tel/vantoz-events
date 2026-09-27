"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "Gallery", href: "/gallery" },
  { label: "Rentals", href: "/rentals" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-7">
        {navLinks.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`group relative py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-[#d8ad62]" : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}

                <span
                  className={`absolute -bottom-0.5 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[#d8ad62] transition-all duration-300 ease-out ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export { navLinks };