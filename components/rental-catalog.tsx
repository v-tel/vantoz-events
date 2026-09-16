"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Check, Plus } from "lucide-react";
import { rentalCategories, rentalItems, type RentalCategory } from "@/lib/data";

export function RentalCatalog() {
  const [activeCategory, setActiveCategory] = useState<RentalCategory | "All">("All");
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? rentalItems
        : rentalItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  const selectedCount = Object.values(selected).filter(Boolean).length;

  function toggle(name: string) {
    setSelected((prev) => ({ ...prev, [name]: !prev[name] }));
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory("All")}
          className={`rounded-full px-4 py-2 text-xs font-semibold ${
            activeCategory === "All"
              ? "bg-black text-white"
              : "border border-black/15 text-black/60"
          }`}
        >
          All
        </button>
        {rentalCategories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`rounded-full px-4 py-2 text-xs font-semibold ${
              activeCategory === c
                ? "bg-black text-white"
                : "border border-black/15 text-black/60"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((item) => {
          const isSelected = !!selected[item.name];
          return (
            <div
              key={item.name}
              className="overflow-hidden rounded-2xl border border-[#e8e0d2] bg-white"
            >
              <div className="relative h-40">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold">{item.name}</h3>
                <p className="mt-1 text-xs text-black/45">
                  KSh {item.price} · {item.unit}
                </p>
                <button
                  onClick={() => toggle(item.name)}
                  className={`mt-4 flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold transition ${
                    isSelected
                      ? "bg-[#d8ad62] text-black"
                      : "border border-black/15 text-black/70 hover:bg-black hover:text-white"
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check size={14} /> Added
                    </>
                  ) : (
                    <>
                      <Plus size={14} /> Add
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedCount > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 px-5 py-4 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <p className="text-sm font-semibold">
              {selectedCount} item{selectedCount > 1 ? "s" : ""} selected
            </p>
            <Link
              href="/quote"
              className="inline-flex items-center rounded-full bg-black px-5 py-3 text-sm font-bold text-white"
            >
              Request Rental Quote
              <ArrowRight className="ml-2" size={15} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
