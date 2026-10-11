import Link from "next/link";

export default function Landing() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-8 text-center md:min-h-full md:h-full">
      <p className="font-wordmark text-5xl font-bold tracking-tight">Gaise</p>
      <p className="mt-4 font-serif text-2xl leading-snug text-ink/80">
        The jewelry your outfit is missing — designed for you.
      </p>
      <Link
        href="/occasion"
        className="mt-12 w-full rounded-full bg-ink py-4 text-sm font-medium tracking-wide text-paper"
      >
        Start styling
      </Link>
      <Link href="/occasion?demo=1" className="mt-4 text-sm text-ink/60 underline underline-offset-4">
        See a demo look
      </Link>
    </main>
  );
}
