export default function OfflinePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#0d0d0d] px-5 text-center text-white">
      <p className="text-xs font-bold uppercase tracking-[.35em] text-[#d8ad62]">
        You're offline
      </p>
      <h1 className="serif text-3xl">Check your connection</h1>
      <p className="max-w-md text-sm text-white/60">
        This page couldn't load without an internet connection. Reconnect and
        try again.
      </p>
    </main>
  );
}