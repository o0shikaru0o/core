import Link from "next/link";
import { Tile } from "@/components/ui";
import { listProducts, listProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await Promise.all(
    (await listProjects()).map(async (project) => ({ project, products: await listProducts(project.id) })),
  );

  return (
    <main className="px-4 pt-4">
      <p className="mb-4 px-1 font-wordmark text-[26px] font-bold tracking-tight">Core</p>
      <h1 className="mb-3 px-1 text-[20px] font-semibold">Projects</h1>

      <div className="space-y-4">
        {projects.map(({ project, products }) => {
          const [a, b, ...rest] = products;
          return (
            <article key={project.id} className="rounded-[28px] border border-neutral-100 p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <Link href={`/projects/${project.id}`} className="block overflow-hidden rounded-[20px]">
                {products.length ? (
                  <>
                    <div className="grid grid-cols-2 gap-[3px]">
                      {[a, b].filter(Boolean).map((p) => (
                        <Tile key={p.id} src={p.imageUrl} alt={p.name} className="aspect-square" />
                      ))}
                    </div>
                    {rest.length > 0 && (
                      <div className="mt-[3px] grid grid-cols-3 gap-[3px]">
                        {rest.slice(0, 3).map((p) => (
                          <Tile key={p.id} src={p.imageUrl} alt={p.name} className="aspect-square" />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex aspect-[2/1] items-center justify-center bg-neutral-100 px-6 text-center text-[13px] text-neutral-500">
                    Keep chatting. Core will spot your group&apos;s lore.
                  </div>
                )}
              </Link>
              <div className="flex items-center gap-3 px-1 pb-1 pt-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-[15px] font-semibold">
                  {project.title[0]}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-semibold">{project.title}</p>
                  <p className="truncate text-[13px] text-neutral-500">Telegram group · {products.length} products</p>
                </div>
                <Link href={`/projects/${project.id}`} className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold">
                  View
                </Link>
              </div>
            </article>
          );
        })}
        {!projects.length && (
          <p className="py-16 text-center text-[14px] text-neutral-500">Add the Core bot to a Telegram group to start a project.</p>
        )}
      </div>
    </main>
  );
}
