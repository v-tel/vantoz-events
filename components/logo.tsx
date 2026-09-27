import Image from "next/image";

type LogoVariant = "desktop" | "mobile" | "admin" | "nav";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
}

export function Logo({
  variant = "desktop",
  className = "",
}: LogoProps) {
  const sizes = {
    desktop: {
      width: 180,
      height: 100,
      className: "h-auto w-[150px]",
    },
    mobile: {
      width: 140,
      height: 80,
      className: "h-auto w-[110px]",
    },
    admin: {
      width: 160,
      height: 90,
      className: "h-auto w-[130px]",
    },
    // Height-constrained, not width-constrained — fits inside a fixed-height
    // navbar row without overflowing above/below it.
    nav: {
      width: 160,
      height: 90,
      className: "h-14 w-auto sm:h-16",
    },
  };

  const size = sizes[variant];

  return (
    <div className={`flex items-center leading-none ${className}`}>
      <Image
        src="/vantoz-logo.png"
        alt="Vantoz Events"
        width={size.width}
        height={size.height}
        className={`object-contain ${size.className}`}
        priority
      />
    </div>
  );
}