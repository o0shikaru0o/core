import Link from "next/link";
import { Tile } from "@/components/ui";
import { listProducts, listProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await Promise.all(
    (await listProjects()).map(async (project) => ({ project, products: await listProducts(project.id) })),
  );

  return (
    <main className="px-5 pb-10 pt-8">
      <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#6e6e73]">Core</p>
      <h1 className="mt-4 text-[36px] font-semibold leading-[1.05] tracking-[-0.04em]">Your groups.<br /><span className="text-[#77777d]">Made real.</span></h1>
      <p className="mb-8 mt-3 text-[15px] leading-relaxed text-[#6e6e73]">Every inside joke deserves something you can hold.</p>
      <h2 className="mb-4 text-[21px] font-semibold tracking-tight">Your projects</h2>

      <div className="space-y-5">
        {projects.map(({ project, products }) => {
          const featured = products[0];
          return (
            <article key={project.id} className="overflow-hidden rounded-[24px] bg-white shadow-[0_3px_16px_rgba(0,0,0,0.035)]">
              <Link href={`/projects/${project.id}`} className="block">
                {featured ? <Tile src={featured.imageUrl} alt={featured.name} className="aspect-[1.25]" sizes="(max-width: 520px) 100vw, 520px" /> : <div className="flex aspect-[1.25] items-center justify-center bg-[#e9e9ed] px-8 text-center text-[14px] text-[#6e6e73]">Your group&apos;s first creation will appear here.</div>}
              </Link>
              <div className="flex items-center gap-3 px-5 py-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f0f0f3] text-[16px] font-semibold">
                  {project.title[0]}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[18px] font-semibold tracking-tight">{project.title}</p>
                  <p className="truncate text-[13px] text-[#6e6e73]">{products.length} {products.length === 1 ? "creation" : "creations"}</p>
                </div>
                <Link href={`/projects/${project.id}`} className="rounded-full bg-[#0071e3] px-4 py-2 text-sm font-semibold text-white">
                  Open
                </Link>
              </div>
            </article>
          );
        })}
        {!projects.length && (
          <p className="rounded-[24px] bg-white px-6 py-16 text-center text-[15px] text-[#6e6e73]">Add Core to a Telegram group to start turning your shared lore into real products.</p>
        )}
      </div>
    </main>
  );
}
