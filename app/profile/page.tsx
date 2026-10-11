import { Header } from "@/components/ui";

export default function ProfilePage() {
  return (
    <main className="pb-10">
      <Header title="Profile" />
      <div className="px-5 pb-7 pt-3"><h1 className="text-[31px] font-semibold tracking-[-0.04em]">Your Core.</h1><p className="mt-2 text-[14px] leading-relaxed text-[#6e6e73]">Your groups create together. Each member buys their own copy securely through Telegram and Arcade.</p></div>
      <section className="mx-5 rounded-[24px] bg-white p-6"><h2 className="text-[19px] font-semibold">Your privacy matters.</h2><p className="mt-3 text-[14px] leading-relaxed text-[#6e6e73]">Core starts collecting new text messages only after a group admin consents with /resume. Admins can pause collection with /pause or request deletion with /delete_data in Telegram.</p></section>
      <section className="mx-5 mt-4 rounded-[24px] bg-white p-6"><h2 className="text-[19px] font-semibold">Orders and payment</h2><p className="mt-3 text-[14px] leading-relaxed text-[#6e6e73]">Arcade handles checkout and payment. Core shows products and production progress; it does not store your payment details.</p></section>
    </main>
  );
}
