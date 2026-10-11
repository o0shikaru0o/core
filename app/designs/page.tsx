"use client";

import Screen from "@/components/Screen";

export default function Designs() {
  return (
    <Screen title="Your designs" next={{ href: "/designs/0", label: "Make it" }}>
      <p className="text-sm text-ink/60">2–3 DesignCards go here.</p>
    </Screen>
  );
}
