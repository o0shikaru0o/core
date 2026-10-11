import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, StageBadge, Tile } from "@/components/ui";
import { getProduct, getProject, listOrders } from "@/lib/data";
import { buyLink, formatPrice } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: { id: string; productId: string } }) {
  const [project, product] = await Promise.all([getProject(params.id), getProduct(params.productId)]);
  if (!project || !product || product.projectId !== project.id) notFound();
  const orders = await listOrders({ productId: product.id });

  return (
    <main className="pb-28">
      <Header title={project.title} back={`/projects/${project.id}`} />
      <div className="px-4">
        <Tile src={product.imageUrl} alt={product.name} className="aspect-square rounded-[28px]" sizes="390px" />
      </div>

      <section className="px-5 pt-5">
        <p className="text-[13px] text-neutral-500">{product.category}</p>
        <h2 className="mt-1 text-[24px] font-semibold leading-tight">{product.name}</h2>
        {product.price && (
          <p className="mt-1 text-[17px] font-medium">
            {formatPrice(product.price)} <span className="text-[13px] font-normal text-neutral-500">each, before shipping and tax</span>
          </p>
        )}
        {product.selectionLabel && <p className="mt-1 text-[13px] text-neutral-500">{product.selectionLabel}</p>}
      </section>

      <section className="mx-4 mt-6 rounded-[24px] bg-neutral-50 p-4">
        <p className="text-[12px] font-semibold uppercase tracking-wider text-neutral-500">The lore</p>
        <p className="mt-1 text-[16px] font-semibold leading-snug">{product.lore}</p>
        <p className="mt-2 text-[13px] leading-relaxed text-neutral-600">{product.explanation}</p>
        {product.votes > 0 && (
          <p className="mt-3 text-[12px] font-medium text-neutral-500">
            {product.votes} {product.votes === 1 ? "vote" : "votes"} for {product.category}
          </p>
        )}
      </section>

      {product.quotes.length > 0 && (
        <section className="space-y-2 px-5 pt-6">
          <h3 className="text-[15px] font-semibold">From the chat</h3>
          {product.quotes.map((q, i) => (
            <div key={i} className="rounded-[18px] rounded-tl-md bg-neutral-100 px-3.5 py-2.5">
              <p className="text-[12px] font-semibold text-neutral-500">{q.sender}</p>
              <p className="text-[14px]">{q.text}</p>
            </div>
          ))}
        </section>
      )}

      {orders.length > 0 && (
        <section className="space-y-2 px-4 pt-6">
          <h3 className="px-1 text-[15px] font-semibold">Orders</h3>
          {orders.map((o) => (
            <Link key={o.id} href={`/tracking/${o.id}`} className="flex items-center justify-between rounded-[20px] bg-neutral-50 px-4 py-3">
              <p className="text-[13px] font-semibold">{o.buyerName}</p>
              <StageBadge stage={o.stage} />
            </Link>
          ))}
        </section>
      )}

      <div className="fixed inset-x-0 bottom-16 z-20 border-t border-neutral-100 bg-white/95 px-4 py-3 backdrop-blur md:absolute">
        <a href={buyLink(product.id)} className="block rounded-full bg-neutral-900 py-3 text-center text-[15px] font-semibold text-white">
          Get yours in Telegram
        </a>
      </div>
    </main>
  );
}
