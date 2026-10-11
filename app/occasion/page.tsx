"use client";

import Screen from "@/components/Screen";
import { useFlow } from "@/lib/store";

const OCCASIONS = ["Wedding guest", "Work dinner", "Date night", "Gala / black tie", "Brunch", "Vacation"];

export default function Occasion() {
  const { occasion, setOccasion } = useFlow();

  return (
    <Screen title="What's the occasion?" next={{ href: "/outfit", label: "Next", disabled: !occasion }}>
      <div className="flex flex-wrap gap-2">
        {OCCASIONS.map((o) => (
          <button
            key={o}
            onClick={() => setOccasion(o)}
            className={`rounded-full border px-4 py-2 text-sm ${
              occasion === o ? "border-ink bg-ink text-paper" : "border-ink/20"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </Screen>
  );
}
