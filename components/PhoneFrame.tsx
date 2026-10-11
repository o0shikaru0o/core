import BottomNav from "@/components/BottomNav";

export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh">
      <div className="relative mx-auto min-h-dvh w-full max-w-[520px] bg-[#f5f5f7] pb-24 md:border-x md:border-[#e7e7e9]">
        <div>{children}</div>
        <BottomNav />
      </div>
    </div>
  );
}
