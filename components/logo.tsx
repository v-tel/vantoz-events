export function Logo({ light = true }: { light?: boolean }) {
  const textColor = light ? "text-white" : "text-black";

  return (
    <div className="flex items-center gap-2.5 leading-none">
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2L28 16L16 30L4 16L16 2Z" stroke="#d8ad62" strokeWidth="1.4" />
        <path d="M9 11L16 25L23 11" stroke="#d8ad62" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="9" r="1.6" fill="#d8ad62" />
      </svg>
      <div>
        <div className={`text-lg tracking-[.24em] ${textColor}`}>VANTOZ</div>
        <div className="-mt-0.5 text-[9px] tracking-[.4em] text-[#d8ad62]">EVENTS</div>
      </div>
    </div>
  );
}
