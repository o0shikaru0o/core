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
  const telegramBuyLink = buyLink(product.id);

  return (
    <main className="pb-40">
      <Header title={project.title} back={`/projects/${project.id}`} />
      <div className="px-5 pt-2">
        <Tile src={product.imageUrl} alt={product.name} className="aspect-[0.96] rounded-[24px] bg-white" sizes="(max-width: 520px) 100vw, 520px" />
        {product.imageUrl?.startsWith("/demo/pattern-") && <p className="px-1 pt-2 text-[12px] text-[#6e6e73]">Design preview</p>}
      </div>

      <section className="px-6 pt-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6e6e73]">{product.category} · {project.title}</p>
        <h1 className="mt-2 text-[29px] font-semibold leading-[1.08] tracking-[-0.035em]">{product.name}</h1>
        {product.price && (
          <p className="mt-3 text-[19px] font-semibold">
            {formatPrice(product.price)} <span className="text-[14px] font-normal text-[#6e6e73]">each</span>
          </p>
        )}
        <p className="mt-1 text-[13px] text-[#6e6e73]">Shipping and tax calculated at checkout.</p>
        {product.selectionLabel && <p className="mt-2 text-[13px] text-[#6e6e73]">{product.selectionLabel}</p>}
      </section>

      <section className="mx-5 mt-8 rounded-[24px] bg-white p-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6e6e73]">The story</p>
        <p className="mt-3 text-[20px] font-semibold leading-snug tracking-tight">{product.lore}</p>
        <p className="mt-3 text-[14px] leading-relaxed text-[#6e6e73]">{product.explanation}</p>
        {product.votes > 0 && (
          <p className="mt-4 border-t border-[#eeeef0] pt-4 text-[13px] font-medium text-[#0066cc]">
            Your group chose {product.category} · {product.votes} {product.votes === 1 ? "vote" : "votes"}
          </p>
        )}
      </section>

      {product.quotes.length > 0 && (
        <section className="space-y-2 px-5 pt-8">
          <h2 className="mb-3 text-[21px] font-semibold tracking-tight">From the chat</h2>
          {product.quotes.map((q, i) => (
            <div key={i} className="rounded-[20px] bg-white px-5 py-4">
              <p className="text-[12px] font-semibold text-[#6e6e73]">{q.sender}</p>
              <p className="mt-1 text-[15px] leading-relaxed">{q.text}</p>
            </div>
          ))}
        </section>
      )}

      {orders.length > 0 && (
        <section className="space-y-2 px-5 pt-8">
          <h2 className="mb-3 text-[21px] font-semibold tracking-tight">Orders</h2>
          {orders.map((o) => (
            <Link key={o.id} href={`/tracking/${o.id}`} className="flex items-center justify-between rounded-[20px] bg-white px-5 py-4">
              <p className="text-[13px] font-semibold">{o.buyerName}</p>
              <StageBadge stage={o.stage} />
            </Link>
          ))}
        </section>
      )}

      <div className="fixed inset-x-0 bottom-[calc(62px+env(safe-area-inset-bottom))] z-20 mx-auto max-w-[520px] border-t border-[#e8e8eb] bg-[#f8f8fa]/95 px-5 py-3 backdrop-blur-xl">
        {telegramBuyLink ? <a href={telegramBuyLink} className="block rounded-full bg-[#0071e3] py-3.5 text-center text-[15px] font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071e3]">Get yours</a> : <div className="rounded-full bg-[#d8d8dc] py-3.5 text-center text-[15px] font-semibold text-[#6e6e73]">Checkout unavailable in demo</div>}
        <p className="mt-2 text-center text-[11px] text-[#6e6e73]">{telegramBuyLink ? "Continue in Telegram. Checkout is handled by Arcade." : "Connect the Core bot to enable checkout."}</p>
      </div>
    </main>
  );
}
