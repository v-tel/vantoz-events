import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { LoginForm } from "@/components/admin/login-form";

export default async function AdminLoginPage() {
  const session = await auth();
  if (session) {
    redirect("/admin/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#10100e] px-5">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#161613] p-8 text-white">
        <div className="mb-8 text-center">
          <div className="tracking-[.28em]">VANTOZ</div>
          <div className="mt-1 text-[9px] tracking-[.45em] text-[#d8ad62]">EVENTS ADMIN</div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
