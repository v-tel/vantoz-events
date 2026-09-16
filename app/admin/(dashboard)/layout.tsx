import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/sidebar";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Defense in depth — middleware already handles this, but a direct RSC
  // render should never trust the edge check alone.
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-[#f7f3eb]">
      <AdminSidebar email={session.user?.email} />
      <main className="flex-1 overflow-y-auto px-8 py-10">{children}</main>
    </div>
  );
}
