import BottomNav from "@/components/BottomNav";

export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh md:flex md:items-center md:justify-center md:py-8">
      <div className="relative min-h-dvh w-full overflow-hidden bg-white md:h-[844px] md:min-h-0 md:w-[390px] md:rounded-[48px] md:border-[10px] md:border-neutral-900 md:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]">
        <div className="h-full overflow-y-auto pb-20 [&::-webkit-scrollbar]:hidden">{children}</div>
        <BottomNav />
      </div>
    </div>
  );
}
