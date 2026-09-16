type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="bg-black px-5 pb-16 pt-44 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[.35em] text-[#d8ad62]">
          {eyebrow}
        </p>
        <h1 className="serif max-w-2xl text-5xl leading-[1.02] md:text-6xl">{title}</h1>
        {description && (
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/60">{description}</p>
        )}
      </div>
    </section>
  );
}
