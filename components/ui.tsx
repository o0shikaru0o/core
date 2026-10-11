import Image from "next/image";
import Link from "next/link";
import { PROGRESS, STAGE_LABEL, type Stage } from "@/lib/types";

export function Header({ title, back }: { title: string; back?: string }) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 bg-[#f5f5f7]/90 px-5 backdrop-blur-xl">
      {back && (
        <Link href={back} aria-label="Back" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      )}
      <p className="truncate text-[17px] font-semibold tracking-tight">{title}</p>
    </header>
  );
}

export function Tile({ src, alt, className = "", sizes = "200px" }: { src: string | null; alt: string; className?: string; sizes?: string }) {
  return (
    <div className={`relative overflow-hidden bg-[#e9e9ec] ${className}`}>
      {src ? <Image src={src} alt={alt} fill sizes={sizes} unoptimized={src.startsWith("http")} className="object-cover" /> : <span className="absolute inset-0 flex items-center justify-center px-4 text-center text-xs text-[#6e6e73]">Image unavailable</span>}
    </div>
  );
}

export function StageBadge({ stage }: { stage: Stage }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f2ff] px-2.5 py-1 text-[11px] font-semibold text-[#0066cc]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3]" />
      {STAGE_LABEL[stage]}
    </span>
  );
}

export function StageBar({ stage }: { stage: Stage }) {
  const i = PROGRESS.findIndex((s) => s.id === stage);
  return (
    <div className="flex gap-1">
      {PROGRESS.map((s, j) => (
        <span key={s.id} className={`h-1 flex-1 rounded-full ${j <= i ? "bg-neutral-900" : "bg-neutral-200"}`} />
      ))}
    </div>
  );
}
