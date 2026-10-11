"use client";

import Screen from "@/components/Screen";

export default function DesignDetail({ params }: { params: { i: string } }) {
  return (
    <Screen title={`Design ${Number(params.i) + 1}`} next={{ href: "/confirmed", label: "Order with Arcade" }}>
      <p className="text-sm text-ink/60">Made on demand by an independent maker · ships in ~X weeks</p>
    </Screen>
  );
}
