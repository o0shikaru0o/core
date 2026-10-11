"use client";

import Screen from "@/components/Screen";
import { resizeImage } from "@/lib/resizeImage";
import { useFlow } from "@/lib/store";

export default function Outfit() {
  const { photos, addPhoto, removePhoto } = useFlow();

  async function onFiles(files: FileList | null) {
    for (const file of Array.from(files ?? [])) addPhoto(await resizeImage(file));
  }

  return (
    <Screen title="Show us the outfit" next={{ href: "/taste", label: "Next", disabled: photos.length === 0 }}>
      <p className="text-sm text-ink/60">Try it on, or lay it flat. Good light helps.</p>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {photos.map((src, i) => (
          <div key={i} className="relative aspect-[3/4] overflow-hidden rounded-xl bg-stone">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="h-full w-full object-cover" />
            <button
              onClick={() => removePhoto(i)}
              className="absolute right-1 top-1 h-6 w-6 rounded-full bg-ink/70 text-xs text-paper"
            >
              ×
            </button>
          </div>
        ))}
        {photos.length < 3 && (
          <label className="flex aspect-[3/4] cursor-pointer items-center justify-center rounded-xl border border-dashed border-ink/30 text-2xl text-ink/40">
            +
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => onFiles(e.target.files)}
            />
          </label>
        )}
      </div>
    </Screen>
  );
}
