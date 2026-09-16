import Link from "next/link";
import { Logo } from "@/components/logo";

const links = ["Services", "Packages", "Gallery", "Rentals", "About", "Contact"];

export function Footer() {
  return (
    <footer className="bg-[#10100e] px-5 py-10 text-white lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <Logo />
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/60">
          {links.map((x) => (
            <Link key={x} href={`/${x.toLowerCase()}`}>
              {x}
            </Link>
          ))}
        </div>
        <p className="text-xs text-white/35">© 2026 Vantoz Events.</p>
      </div>
    </footer>
  );
}
