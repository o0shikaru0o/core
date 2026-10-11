import Link from "next/link";

type Props = {
  title: string;
  children?: React.ReactNode;
  next?: { href: string; label: string; disabled?: boolean };
};

export default function Screen({ title, children, next }: Props) {
  return (
    <main className="flex min-h-dvh flex-col px-6 pb-8 pt-14 md:min-h-full">
      <h1 className="font-serif text-4xl leading-tight">{title}</h1>
      <div className="mt-8 flex-1">{children}</div>
      {next && (
        <Link
          href={next.href}
          aria-disabled={next.disabled}
          className={`mt-8 block rounded-full bg-ink py-4 text-center text-sm font-medium tracking-wide text-paper transition-opacity ${
            next.disabled ? "pointer-events-none opacity-30" : ""
          }`}
        >
          {next.label}
        </Link>
      )}
    </main>
  );
}
