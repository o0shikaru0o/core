import { Header } from "@/components/ui";

const ROWS = ["Connected Telegram groups", "Shipping address", "Payment", "Notifications"];

export default function ProfilePage() {
  return (
    <main>
      <Header title="Profile" />
      <section className="flex items-center gap-3 px-5 pb-6">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-lg font-semibold">R</span>
        <div>
          <p className="text-[16px] font-semibold">Rachel</p>
          <p className="text-[13px] text-neutral-500">@rachel · Telegram</p>
        </div>
      </section>
      <ul className="mx-4 divide-y divide-neutral-100 rounded-[24px] border border-neutral-100">
        {ROWS.map((row) => (
          <li key={row} className="flex items-center justify-between px-4 py-3.5 text-[14px]">
            {row}
            <span className="text-neutral-400">›</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
