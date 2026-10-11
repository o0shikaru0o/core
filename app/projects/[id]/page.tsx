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
    <main>
      <Header title={project.title} back="/" />
      <p className="px-5 pb-5 text-[13px] text-neutral-500">Telegram group · {products.length} products</p>

      {pending.map((p) => (
        <section key={p.id} className="mx-4 mb-4 rounded-[24px] bg-neutral-50 p-4">
          <p className="text-[12px] font-semibold uppercase tracking-wider text-neutral-500">
            {p.status === "voting" ? "Voting now in the chat" : "Being made by Arcade"}
          </p>
          <p className="mt-1 text-[15px] font-medium">{p.lore}</p>
        </section>
      ))}

      <div className="grid grid-cols-2 gap-x-3 gap-y-5 px-4 pt-2">
        {products.map((p) => (
          <Link key={p.id} href={`/projects/${project.id}/products/${p.id}`}>
            <Tile src={p.imageUrl} alt={p.name} className="aspect-square rounded-[20px]" />
            <p className="mt-2 truncate text-[14px] font-semibold">{p.name}</p>
            <p className="truncate text-[12px] text-neutral-500">{p.category}</p>
            {p.price && <p className="mt-0.5 text-[13px] font-medium">{formatPrice(p.price)}</p>}
          </Link>
        ))}
      </div>
    </main>
  );
}
