export type Service = {
  title: string;
  desc: string;
  image: string;
};

export const services: Service[] = [
  {
    title: "Weddings",
    desc: "Full décor, styling and coordination for your ceremony and reception, from backdrop to last table setting.",
    image: "https://res.cloudinary.com/hts8vnok/image/upload/v1789290374/WhatsApp_Image_2026-09-10_at_22.13.51_hild39.jpg",
  },
  {
    title: "Birthdays",
    desc: "Themed setups and balloon design that turn any milestone into a celebration worth remembering.",
    image: "https://res.cloudinary.com/hts8vnok/image/upload/v1789290140/WhatsApp_Image_2026-09-10_at_22.13.50_2_wtxaoi.jpg",
  },
  {
    title: "Corporate Events",
    desc: "Branded staging, seating and lighting for launches, conferences and end-of-year functions.",
    image: "https://res.cloudinary.com/hts8vnok/image/upload/v1789290392/WhatsApp_Image_2026-09-10_at_22.13.51_2_dylj72.jpg",
  },
  {
    title: "Graduations",
    desc: "Photo-ready backdrops and table styling to mark the achievement in style.",
    image: "https://res.cloudinary.com/hts8vnok/image/upload/v1789289969/WhatsApp_Image_2026-09-10_at_22.13.48_1_dyhiw2.jpg",
  },
  {
    title: "Traditional Ceremonies",
    desc: "Décor rooted in culture and colour, tailored to the customs of your ceremony.",
    image: "https://res.cloudinary.com/hts8vnok/image/upload/v1789289632/WhatsApp_Image_2026-09-10_at_22.13.45_apejct.jpg",
  },
  {
    title: "Baby Showers",
    desc: "Soft, elegant setups with balloon arches and centerpieces for a gentle celebration.",
    image: "https://res.cloudinary.com/hts8vnok/image/upload/v1789289262/WhatsApp_Image_2026-09-10_at_22.13.43_d4iuee.jpg",
  },
];

export type Package = {
  name: string;
  desc: string;
  price: string;
  items: string[];
  popular?: boolean;
};

export const packages: Package[] = [
  {
    name: "Silver",
    desc: "A clean, elegant setup for smaller gatherings.",
    price: "25,000",
    items: ["Backdrop", "Chairs & tables", "Basic centerpieces", "Setup & takedown"],
  },
  {
    name: "Gold",
    desc: "Our most requested package, with a fuller décor treatment.",
    price: "45,000",
    items: [
      "Premium backdrop",
      "Chairs & tables",
      "Floral centerpieces",
      "Ambient lighting",
      "Setup & takedown",
    ],
    popular: true,
  },
  {
    name: "Premium",
    desc: "A complete, high-end décor experience for standout events.",
    price: "80,000",
    items: [
      "Signature backdrop & staging",
      "Chairs & tables",
      "Premium floral design",
      "Full lighting design",
      "Tent (if required)",
      "Dedicated on-site team",
    ],
  },
];

export const gallery: string[] = [
  "https://res.cloudinary.com/hts8vnok/image/upload/v1789306851/WhatsApp_Image_2026-09-10_at_22.09.00_wtnny3.jpg",
  "https://res.cloudinary.com/hts8vnok/image/upload/v1789290118/WhatsApp_Image_2026-09-10_at_22.13.50_1_tuzzcx.jpg",
  "https://res.cloudinary.com/hts8vnok/image/upload/v1789290041/WhatsApp_Image_2026-09-10_at_22.13.49_2_ivilnh.jpg",
  "https://res.cloudinary.com/hts8vnok/image/upload/v1789289943/WhatsApp_Image_2026-09-10_at_22.13.47_3_pwhbna.jpg",
  "https://res.cloudinary.com/hts8vnok/image/upload/v1789289782/WhatsApp_Image_2026-09-10_at_22.13.47_siofpc.jpg",
  "https://res.cloudinary.com/hts8vnok/image/upload/v1789289632/WhatsApp_Image_2026-09-10_at_22.13.45_apejct.jpg",
  "https://res.cloudinary.com/hts8vnok/image/upload/v1789289210/WhatsApp_Image_2026-09-10_at_22.13.42_pgqtdt.jpg",
  "https://res.cloudinary.com/hts8vnok/image/upload/v1789307414/WhatsApp_Image_2026-09-13_at_12.37.56_jt3qq7.jpg",
  "https://res.cloudinary.com/hts8vnok/image/upload/v1789290414/WhatsApp_Image_2026-09-10_at_22.13.52_v21p6o.jpg",
];

export type RentalCategory =
  | "Chairs"
  | "Tables"
  | "Tents"
  | "Backdrops"
  | "Centerpieces"
  | "Lighting"
  | "Sound"
  | "Photo Booths";

export const rentalCategories: RentalCategory[] = [
  "Chairs",
  "Tables",
  "Tents",
  "Backdrops",
  "Centerpieces",
  "Lighting",
  "Sound",
  "Photo Booths",
];

export type RentalItem = {
  name: string;
  category: RentalCategory;
  price: string;
  unit: string;
  image: string;
};

export const rentalItems: RentalItem[] = [
  {
    name: "Gold Chiavari Chair",
    category: "Chairs",
    price: "150",
    unit: "per day",
    image:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "White Chiavari Chair",
    category: "Chairs",
    price: "120",
    unit: "per day",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Round Banquet Table",
    category: "Tables",
    price: "500",
    unit: "per day",
    image:
      "https://images.unsplash.com/photo-1478146059778-26028b07395a?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Long Head Table",
    category: "Tables",
    price: "700",
    unit: "per day",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Clear Span Tent (6x9m)",
    category: "Tents",
    price: "15,000",
    unit: "per event",
    image:
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Floral Wall Backdrop",
    category: "Backdrops",
    price: "8,000",
    unit: "per event",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Sequin Backdrop",
    category: "Backdrops",
    price: "4,500",
    unit: "per event",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Gold Centerpiece Set",
    category: "Centerpieces",
    price: "600",
    unit: "per table",
    image:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Fairy Light Canopy",
    category: "Lighting",
    price: "6,000",
    unit: "per event",
    image:
      "https://images.unsplash.com/photo-1470753323753-3f8091bb0230?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Uplighting Set (8 units)",
    category: "Lighting",
    price: "5,000",
    unit: "per event",
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "PA Sound System",
    category: "Sound",
    price: "7,500",
    unit: "per event",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Photo Booth + Props",
    category: "Photo Booths",
    price: "10,000",
    unit: "per event",
    image:
      "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=800&q=80",
  },
];