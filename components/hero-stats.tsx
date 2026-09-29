"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Sparkles, UsersRound, Clock3, Check, type LucideIcon } from "lucide-react";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

type Stat = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const stats: Stat[] = [
  { icon: Sparkles, title: "Premium Décor", description: "Elegant, stylish designs" },
  { icon: UsersRound, title: "Professional Team", description: "Experienced & reliable" },
  { icon: Clock3, title: "On-Time Delivery", description: "We keep our promise" },
  { icon: Check, title: "Affordable Packages", description: "Quality within your budget" },
];

export function HeroStats() {
  const [paginationEl, setPaginationEl] = useState<HTMLDivElement | null>(null);

  return (
    <section className="border-b border-white/10 bg-[#0d0d0d] pt-4 pb-6 sm:pt-5 sm:pb-7 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 lg:px-10">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={2}
          spaceBetween={12}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          onBeforeInit={(swiper) => {
            if (typeof swiper.params.pagination !== "boolean" && swiper.params.pagination) {
              swiper.params.pagination.el = paginationEl;
            }
          }}
          pagination={{
            clickable: true,
            el: paginationEl,
            bulletClass: "stat-bullet",
            bulletActiveClass: "stat-bullet-active",
          }}
          breakpoints={{
            1024: {
              slidesPerView: 4,
              spaceBetween: 0,
              allowTouchMove: false,
            },
          }}
          className="relative pb-6 lg:pb-0"
        >
          {stats.map((stat, index) => (
            <SwiperSlide key={stat.title}>
              <div
                className={`
                  group flex flex-col items-center justify-center rounded-xl bg-white/5 px-3 py-4 text-center transition-all duration-300 lg:rounded-none lg:px-4 lg:py-2
                  ${index < stats.length - 1 ? "lg:border-r lg:border-white/10" : ""}
                `}
              >
                <stat.icon
                  className="mb-1.5 text-[#d8ad62] transition-transform duration-300 group-hover:-translate-y-1"
                  size={22}
                />
                <h3 className="text-xs font-semibold text-white sm:text-sm">{stat.title}</h3>
                <p className="mt-0.5 text-[11px] text-white/55 sm:text-xs">{stat.description}</p>
              </div>
            </SwiperSlide>
          ))}

          {/* Pagination dots — mobile/tablet only */}
          <div
            ref={(node) => setPaginationEl(node)}
            className="absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 lg:hidden"
          />
        </Swiper>
      </div>

      <style jsx global>{`
        .stat-bullet {
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.25);
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block;
        }
        .stat-bullet-active {
          width: 18px;
          background: #d8ad62;
        }
      `}</style>
    </section>
  );
}