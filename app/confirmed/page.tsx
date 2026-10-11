"use client";

import Screen from "@/components/Screen";

export default function Confirmed() {
  return (
    <Screen title="Your piece is being made." next={{ href: "/", label: "Style another look" }} />
  );
}
