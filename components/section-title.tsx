type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[.35em] text-[#a77a2d]">
          {eyebrow}
        </p>
      )}
      <h2 className="serif text-4xl leading-[1.05] md:text-5xl">{title}</h2>
      {description && (
        <p className="mt-4 text-sm leading-7 text-black/55">{description}</p>
      )}
    </div>
  );
}
