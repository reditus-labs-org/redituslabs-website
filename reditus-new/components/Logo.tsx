import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <a
      href="#top"
      className={cn(
        "inline-flex items-center gap-2.5 group",
        className,
      )}
      aria-label="REDITUS home"
    >
      <span
        aria-hidden="true"
        className="grid h-8 w-8 place-items-center rounded-lg border border-ink bg-ink text-white font-heading text-[15px] font-bold leading-none transition-all duration-300 group-hover:bg-petrol group-hover:border-petrol shadow-sm"
      >
        R
      </span>
      <span className="font-heading text-lg font-bold tracking-[0.14em] text-ink group-hover:text-petrol transition-colors drop-shadow-sm">
        REDITUS
      </span>
    </a>
  );
}
