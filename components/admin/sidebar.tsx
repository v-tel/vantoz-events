"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, FileText, MessageSquare, Images, LogOut } from "lucide-react";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/quotes", label: "Quote Requests", icon: FileText },
  { href: "/admin/contacts", label: "Messages", icon: MessageSquare },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
];

export function AdminSidebar({ email }: { email?: string | null }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col justify-between border-r border-black/10 bg-[#10100e] px-5 py-8 text-white">
      <div>
        <Link href="/admin/dashboard" className="mb-10 block">
          <div className="tracking-[.28em]">VANTOZ</div>
          <div className="mt-1 text-[9px] tracking-[.45em] text-[#d8ad62]">EVENTS ADMIN</div>
        </Link>

        <nav className="space-y-1">
          {links.map((l) => {
            const Icon = l.icon;
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active ? "bg-[#d8ad62] text-black" : "text-white/70 hover:bg-white/5"
                }`}
              >
                <Icon size={16} />
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div>
        {email && <p className="mb-3 truncate text-xs text-white/40">{email}</p>}
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
