import Link from "next/link";
import { Tile } from "@/components/ui";
import { projects } from "@/lib/demo";

export default function ProjectsPage() {
  return (
    <main className="px-4 pt-4">
      <div className="mb-4 flex items-center justify-between px-1">
        <p className="font-wordmark text-[26px] font-bold tracking-tight">Core</p>
      </div>
      <h1 className="mb-3 px-1 text-[20px] font-semibold">Projects</h1>

      <div className="space-y-4">
        {projects.map((project) => {
          const [a, b, ...rest] = project.products;
          return (
            <article key={project.id} className="rounded-[28px] border border-neutral-100 p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <Link href={`/projects/${project.id}`} className="block overflow-hidden rounded-[20px]">
                <div className="grid grid-cols-2 gap-[3px]">
                  {[a, b].map((p) => (
                    <Tile key={p.id} src={p.image} alt={p.name} className="aspect-square" />
                  ))}
                </div>
                <div className="mt-[3px] grid grid-cols-3 gap-[3px]">
                  {rest.slice(0, 3).map((p) => (
                    <Tile key={p.id} src={p.image} alt={p.name} className="aspect-square" />
                  ))}
                </div>
              </Link>
              <div className="flex items-center gap-3 px-1 pb-1 pt-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-base">
                  {project.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-semibold">{project.name}</p>
                  <p className="truncate text-[13px] text-neutral-500">
                    {project.chat} · {project.products.length} products
                  </p>
                </div>
                <Link href={`/projects/${project.id}`} className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold">
                  View
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
