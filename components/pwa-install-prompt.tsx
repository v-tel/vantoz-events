"use client";

import { useEffect, useState } from "react";
import { X, Share, PlusSquare, Download } from "lucide-react";

const SNOOZE_KEY = "vantoz-install-snooze-until";
const SNOOZE_HOURS = 24; // reappears this many hours after being dismissed
const SHOW_DELAY_MS = 1800; // wait for the page to settle before popping up

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isSnoozed() {
  const until = localStorage.getItem(SNOOZE_KEY);
  return until ? Date.now() < Number(until) : false;
}

function snooze() {
  localStorage.setItem(SNOOZE_KEY, String(Date.now() + SNOOZE_HOURS * 60 * 60 * 1000));
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // iOS Safari's own flag for "already added to home screen"
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

export function PwaInstallPrompt() {
  const [platform, setPlatform] = useState<"android" | "ios" | null>(null);
  const [visible, setVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BIPEvent | null>(null);

  useEffect(() => {
    if (isStandalone() || isSnoozed()) return;

    const ua = navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);
    if (!isMobile) return;

    if (isIOS) {
      const timer = setTimeout(() => {
        setPlatform("ios");
        setVisible(true);
      }, SHOW_DELAY_MS);
      return () => clearTimeout(timer);
    }

    // Android / other Chromium mobile browsers
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BIPEvent);
      setTimeout(() => {
        setPlatform("android");
        setVisible(true);
      }, SHOW_DELAY_MS);
    };
    window.addEventListener("beforeinstallprompt", handler);

    const installedHandler = () => {
      localStorage.setItem(SNOOZE_KEY, String(Date.now() + 1000 * 60 * 60 * 24 * 365));
      setVisible(false);
    };
    window.addEventListener("appinstalled", installedHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, []);

  const dismiss = () => {
    snooze();
    setVisible(false);
  };

  const install = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome !== "accepted") snooze();
    setVisible(false);
  };

  if (!visible || !platform) return null;

  return (
    <div
      role="dialog"
      aria-label="Install Vantoz Events app"
      className="fixed inset-x-0 bottom-0 z-[70] animate-[slideUp_0.35s_ease-out] px-3 pb-3 sm:hidden"
    >
      <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-4 text-white shadow-2xl shadow-black/40">
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute right-3 top-3 rounded-full p-1 text-white/50 hover:bg-white/10 hover:text-white"
        >
          <X size={16} />
        </button>

        {platform === "android" ? (
          <div className="flex items-center gap-3 pr-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#d8ad62]/15">
              <Download className="text-[#d8ad62]" size={20} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Install Vantoz Events</p>
              <p className="text-xs text-white/55">Faster access, right from your home screen.</p>
            </div>
            <button
              onClick={install}
              className="shrink-0 rounded-full bg-[#d8ad62] px-4 py-2.5 text-xs font-bold text-black"
            >
              Install
            </button>
          </div>
        ) : (
          <div className="pr-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#d8ad62]/15">
                <Download className="text-[#d8ad62]" size={20} />
              </div>
              <p className="text-sm font-semibold">Add Vantoz Events to your Home Screen</p>
            </div>
            <div className="mt-3 space-y-1.5 text-xs text-white/70">
              <p className="flex items-center gap-1.5">
                1. Tap <Share size={14} className="inline text-[#d8ad62]" /> Share in Safari's toolbar
              </p>
              <p className="flex items-center gap-1.5">
                2. Tap <PlusSquare size={14} className="inline text-[#d8ad62]" /> Add to Home Screen
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}