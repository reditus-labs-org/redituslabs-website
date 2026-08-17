"use client";

interface SectionMarkerProps {
  id: string;
  children?: React.ReactNode;
}

export function SectionMarker({ id, children }: SectionMarkerProps) {
  return (
    <div id={id} className="section-marker" aria-hidden="true">
      {children}
    </div>
  );
}