"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/", label: "Projects", match: (p: string) => p === "/" || p.startsWith("/projects"), icon: "M4 5h7v7H4zM13 5h7v7h-7zM4 14h7v5H4zM13 14h7v5h-7z" },
  { href: "/tracking", label: "Tracking", match: (p: string) => p.startsWith("/tracking"), icon: "M3 7h11v9H3zM14 10h4l3 3v3h-7zM7 19a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z" },
  { href: "/profile", label: "Profile", match: (p: string) => p.startsWith("/profile"), icon: "M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5" },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[520px] border-t border-[#e8e8eb] bg-[#f8f8fa]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl">
      <ul className="flex px-3">
        {ITEMS.map((item) => {
          const active = item.match(pathname);
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`flex min-h-[62px] flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium transition-colors ${
                  active ? "text-[#0071e3]" : "text-[#6e6e73]"
                }`}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.6} strokeLinejoin="round">
                  <path d={item.icon} />
                </svg>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
