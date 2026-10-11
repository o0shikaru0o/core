import Image from "next/image";
import Link from "next/link";
import { PROGRESS, STAGE_LABEL, type Stage } from "@/lib/types";

export function Header({ title, back }: { title: string; back?: string }) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 bg-white/95 px-4 backdrop-blur">
      {back && (
        <Link href={back} aria-label="Back" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      )}
      <h1 className="truncate text-[20px] font-semibold">{title}</h1>
    </header>
  );
}

export function Tile({ src, alt, className = "", sizes = "200px" }: { src: string | null; alt: string; className?: string; sizes?: string }) {
  return (
    <div className={`relative overflow-hidden bg-neutral-100 ${className}`}>
      {src && <Image src={src} alt={alt} fill sizes={sizes} unoptimized={src.startsWith("http")} className="object-cover" />}
    </div>
  );
}

export function StageBadge({ stage }: { stage: Stage }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold">
      <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />
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
