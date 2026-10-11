export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh md:flex md:items-center md:justify-center md:py-8">
      <div className="relative min-h-dvh w-full overflow-hidden bg-paper md:h-[844px] md:min-h-0 md:w-[390px] md:overflow-y-auto md:rounded-[44px] md:shadow-[0_30px_80px_-20px_rgba(26,26,26,0.35)]">
        {children}
      </div>
    </div>
  );
}
