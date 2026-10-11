"use client";

import { usePathname } from "next/navigation";
import PhoneFrame from "@/components/PhoneFrame";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return pathname.startsWith("/demo") ? <>{children}</> : <PhoneFrame>{children}</PhoneFrame>;
}
