"use client";

import Screen from "@/components/Screen";
import { useFlow } from "@/lib/store";
import { MIN_SWIPES, STYLE_CARDS } from "@/lib/styles";

export default function Taste() {
  const { liked, passed, swipe } = useFlow();
  const done = liked.length + passed.length;
  const current = STYLE_CARDS[done];

  return (
    <Screen
      title="What do you love wearing?"
      next={{
        href: "/reading",
        label: done >= STYLE_CARDS.length ? "Show me →" : "That's enough, show me →",
        disabled: done < MIN_SWIPES,
      }}
    >
      <p className="text-sm text-ink/60">
        {Math.min(done + 1, STYLE_CARDS.length)} / {STYLE_CARDS.length}
      </p>
      {current && (
        <div className="mt-4">
          <div className="flex aspect-[3/4] items-end rounded-2xl bg-stone p-5">
            <p className="font-serif text-3xl">{current.name}</p>
          </div>
          <div className="mt-6 flex justify-center gap-6">
            <button onClick={() => swipe(current.id, false)} className="h-14 w-14 rounded-full border border-ink/20 text-xl">
              ✕
            </button>
            <button onClick={() => swipe(current.id, true)} className="h-14 w-14 rounded-full bg-ink text-xl text-paper">
              ♥
            </button>
          </div>
        </div>
      )}
    </Screen>
  );
}
