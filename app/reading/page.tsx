"use client";

import Screen from "@/components/Screen";

export default function Reading() {
  return (
    <Screen title="The Reading" next={{ href: "/designs", label: "See your designs" }}>
      <p className="text-sm text-ink/60">Calls /api/analyze then /api/generate, revealing the analysis line by line.</p>
    </Screen>
  );
}
