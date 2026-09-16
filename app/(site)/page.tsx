import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Sparkles, Clock3, UsersRound, MessageCircle } from "lucide-react";
import { SectionTitle } from "@/components/section-title";
import { HeroSwiper } from "@/components/hero-swiper";
import { gallery, packages, services } from "@/lib/data";
import { heroImages } from "@/lib/hero-images";

export default function Home() {
  return (
    <main>
      <section className="relative min-h-[760px] overflow-hidden bg-black text-white">
        <HeroSwiper images={heroImages} />
        <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-end px-5 pb-28 pt-36 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[.35em] text-[#d8ad62]">Dream · Plan · Celebrate</p>
            <h1 className="serif text-6xl leading-[.92] md:text-8xl">Make Your Event <em>Unforgettable</em></h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/75">Premium décor, planning and rentals designed around your vision — from intimate gatherings to grand celebrations.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/quote" className="rounded-full bg-[#d8ad62] px-6 py-4 text-sm font-bold text-black">Get a Quote <ArrowRight className="ml-2 inline" size={15}/></Link>
              <a href="https://wa.me/254700000000" className="rounded-full border border-white/30 px-6 py-4 text-sm font-semibold"><MessageCircle className="mr-2 inline" size={16}/> WhatsApp Us</a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 border-t border-white/10 bg-black/35 backdrop-blur-md">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-5 py-6 md:grid-cols-4 lg:px-8">
            <div><Sparkles className="text-[#d8ad62]" size={20}/><p className="mt-2 text-sm font-semibold">Premium Décor</p><p className="text-xs text-white/55">Elegant, stylish designs</p></div>
            <div><UsersRound className="text-[#d8ad62]" size={20}/><p className="mt-2 text-sm font-semibold">Professional Team</p><p className="text-xs text-white/55">Experienced & reliable</p></div>
            <div><Clock3 className="text-[#d8ad62]" size={20}/><p className="mt-2 text-sm font-semibold">On-Time Delivery</p><p className="text-xs text-white/55">We keep our promise</p></div>
            <div><Check className="text-[#d8ad62]" size={20}/><p className="mt-2 text-sm font-semibold">Affordable Packages</p><p className="text-xs text-white/55">Quality within your budget</p></div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><SectionTitle eyebrow="Our Services" title="Event Décor & Planning Services" description="Complete event solutions tailored to your occasion, style and budget."/><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.map((s,i)=><Link href={`/services#${s.title.toLowerCase().replaceAll(' ','-')}`} key={s.title} className="group overflow-hidden rounded-2xl border border-[#e8e0d2] bg-white shadow-sm"><div className="relative h-64 overflow-hidden"><Image src={s.image} alt={s.title} fill className="object-cover transition duration-700 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent"/></div><div className="p-6"><div className="flex items-center justify-between"><h3 className="serif text-2xl">{s.title}</h3><ArrowRight size={18} className="text-[#a77a2d]"/></div><p className="mt-2 text-sm leading-6 text-black/55">{s.desc}</p></div></Link>)}</div></section>
      <section className="bg-[#f7f3eb] px-5 py-24 lg:px-8"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Our Packages" title="Choose Your Perfect Package" description="Flexible starting points designed to make planning simple. We can customise every package for your event."/><div className="mt-10 grid gap-5 lg:grid-cols-3">{packages.map(p=><div key={p.name} className="relative rounded-2xl border border-[#ded4c3] bg-white p-7">{p.popular&&<span className="absolute right-6 top-6 rounded-full bg-[#d8ad62] px-3 py-1 text-[10px] font-bold uppercase tracking-wider">Most Popular</span>}<h3 className="serif text-3xl">{p.name}</h3><p className="mt-2 text-sm text-black/50">{p.desc}</p><div className="my-6 text-2xl font-bold">From KSh {p.price}</div><ul className="space-y-3 text-sm">{p.items.map(x=><li key={x}><Check size={16} className="mr-2 inline text-[#a77a2d]"/>{x}</li>)}</ul><Link href="/quote" className="mt-8 block rounded-full border border-black/15 px-5 py-3 text-center text-sm font-semibold hover:bg-black hover:text-white">Request this package</Link></div>)}</div></div></section>
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><div className="flex items-end justify-between gap-5"><SectionTitle eyebrow="Our Gallery" title="Moments We've Decorated" description="A glimpse of the spaces and celebrations we have helped bring to life."/><Link href="/gallery" className="hidden text-sm font-semibold md:block">View Full Gallery <ArrowRight className="ml-1 inline" size={15}/></Link></div><div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">{gallery.map((src,i)=><div key={src} className={`relative overflow-hidden rounded-2xl ${i===0?'md:col-span-2 md:row-span-2 h-[520px]':'h-64'}`}><Image src={src} alt="Vantoz event décor" fill className="object-cover transition duration-700 hover:scale-105"/></div>)}</div></section>
      <section className="relative overflow-hidden bg-black px-5 py-24 text-center text-white"><div className="absolute inset-0 opacity-20"><Image src={gallery[0]} alt="" fill className="object-cover"/></div><div className="relative mx-auto max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.3em] text-[#d8ad62]">Ready to plan your next event?</p><h2 className="serif mt-4 text-5xl">Let's Create Something Beautiful Together</h2><p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/60">Tell us what you're planning and our team will help turn your ideas into a beautiful, memorable experience.</p><div className="mt-8"><Link href="/quote" className="rounded-full bg-[#d8ad62] px-7 py-4 text-sm font-bold text-black">Start Your Quote <ArrowRight className="ml-2 inline" size={15}/></Link></div></div></section>
      <footer className="bg-[#10100e] px-5 py-10 text-white lg:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between"><div><div className="tracking-[.28em]">VANTOZ</div><div className="mt-1 text-[9px] tracking-[.45em] text-[#d8ad62]">EVENTS</div></div><div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/60">{['Services','Packages','Gallery','Rentals','About','Contact'].map(x=><Link key={x} href={`/${x.toLowerCase()}`}>{x}</Link>)}</div><p className="text-xs text-white/35">© 2026 Vantoz Events.</p></div></footer>
    </main>
  );
}
