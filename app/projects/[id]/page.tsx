import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Tile } from "@/components/ui";
import { getProject, listPendingProposals, listProducts } from "@/lib/data";
import { formatPrice } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);
  if (!project) notFound();
  const [products, pending] = await Promise.all([listProducts(project.id), listPendingProposals(project.id)]);

  return (
    <main className="pb-10">
      <Header title="Projects" back="/" />
      <div className="px-5 pb-7 pt-3"><p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#6e6e73]">A group collection</p><h1 className="mt-2 text-[33px] font-semibold tracking-[-0.04em]">{project.title}</h1><p className="mt-1 text-[14px] text-[#6e6e73]">{products.length} {products.length === 1 ? "creation" : "creations"} made from your story</p></div>

      {pending.map((p) => (
        <section key={p.id} className="mx-5 mb-5 rounded-[24px] bg-[#e8f2ff] p-5">
          <p className="text-[12px] font-semibold uppercase tracking-wider text-[#0066cc]">
            {p.status === "voting" ? "Voting in Telegram" : "Design in progress"}
          </p>
          <p className="mt-2 text-[17px] font-semibold leading-snug">{p.lore}</p>
          <p className="mt-2 text-[13px] text-[#516271]">{p.status === "voting" ? "Your group decides if this becomes a product." : "Arcade is making your group’s choice real."}</p>
        </section>
      ))}

      <h2 className="px-5 pb-4 pt-3 text-[21px] font-semibold tracking-tight">The collection</h2>
      <div className="grid grid-cols-2 gap-x-3 gap-y-6 px-5">
        {products.map((p) => (
          <Link key={p.id} href={`/projects/${project.id}/products/${p.id}`}>
            <Tile src={p.imageUrl} alt={p.name} className="aspect-[0.92] rounded-[20px]" sizes="(max-width: 520px) 45vw, 230px" />
            <p className="mt-2 line-clamp-2 text-[14px] font-semibold leading-snug">{p.name}</p>
            <p className="mt-1 truncate text-[12px] text-[#6e6e73]">{p.category}</p>
            {p.price && <p className="mt-0.5 text-[13px] font-medium">{formatPrice(p.price)}</p>}
          </Link>
        ))}
      </div>
      {!products.length && <p className="mx-5 rounded-[24px] bg-white px-6 py-12 text-center text-[14px] leading-relaxed text-[#6e6e73]">Keep chatting. When the group chooses a creation, it will live here.</p>}
    </main>
  );
}
