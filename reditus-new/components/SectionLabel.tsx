interface SectionLabelProps {
  index: string;
  label: string;
  className?: string;
}

export default function SectionLabel({
  index,
  label,
  className = "",
}: SectionLabelProps) {
  return (
    <div
      className={`flex items-center gap-4 font-mono text-[11px] tracking-[0.28em] uppercase text-ink-muted ${className}`}
    >
      <span className="text-petrol font-bold">{index}</span>
      <span className="h-px w-10 bg-petrol/40" aria-hidden="true" />
      <span className="text-ink font-medium">{label}</span>
    </div>
  );
}
