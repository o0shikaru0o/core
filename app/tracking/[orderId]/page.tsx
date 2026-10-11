import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Tile } from "@/components/ui";
import { getOrder, getProduct, getProject } from "@/lib/data";
import { PROGRESS, STAGE_LABEL } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function OrderPage({ params }: { params: { orderId: string } }) {
  const order = await getOrder(params.orderId);
  if (!order) notFound();
  const [project, product] = await Promise.all([getProject(order.projectId), getProduct(order.productId)]);
  if (!project || !product) notFound();
  const current = PROGRESS.findIndex((s) => s.id === order.stage);

  return (
    <main className="pb-10">
      <Header title={order.orderNumber ?? "Order"} back="/tracking" />

      <div className="px-5 pb-5 pt-3"><p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6e6e73]">Current status</p><h1 className="mt-2 text-[30px] font-semibold tracking-[-0.04em]">{STAGE_LABEL[order.stage]}</h1><p className="mt-1 text-[14px] text-[#6e6e73]">{order.stage === "awaitingPayment" ? "Your checkout is ready. Payment has not been confirmed yet." : order.stage === "refunded" ? "This order was refunded." : order.stage === "delivered" ? "Your creation has arrived." : "We’ll keep this page updated as your creation moves forward."}</p></div>
      <Link href={`/projects/${project.id}/products/${product.id}`} className="mx-5 flex gap-4 rounded-[22px] bg-white p-3">
        <Tile src={product.imageUrl} alt={product.name} className="h-24 w-24 shrink-0 rounded-[15px]" />
        <div className="min-w-0 py-1">
          <p className="truncate text-[15px] font-semibold">{product.name}</p>
          <p className="truncate text-[13px] text-[#6e6e73]">
            {order.buyerName} · {project.title}
          </p>
          {order.maker && <p className="truncate text-[13px] text-[#6e6e73]">Made by {order.maker}</p>}
        </div>
      </Link>

      <section className="px-6 pt-8"><h2 className="mb-6 text-[21px] font-semibold tracking-tight">The journey</h2>
        {order.stage === "awaitingPayment" || order.stage === "refunded" ? (
          <p className="text-[15px] font-semibold">{STAGE_LABEL[order.stage]}</p>
        ) : (
          <ol className="space-y-5">
            {PROGRESS.map((s, i) => (
              <li key={s.id} className="flex items-center gap-4">
                <span className={`h-3 w-3 rounded-full ${i <= current ? "bg-[#0071e3]" : "border border-[#c7c7cc]"}`} />
                <span className={`text-[15px] ${i === current ? "font-semibold" : i < current ? "" : "text-[#86868b]"}`}>{s.label}</span>
              </li>
            ))}
          </ol>
        )}
      </section>

      {order.tracking.some((t) => t.url) && (
        <section className="space-y-2 px-5 pt-8">
          {order.tracking.map((t, i) =>
            t.url ? (
              <a key={i} href={t.url} className="block rounded-full bg-[#0071e3] py-3 text-center text-[14px] font-semibold text-white">
                Track shipment{t.company ? ` · ${t.company}` : ""}
              </a>
            ) : null,
          )}
        </section>
      )}
    </main>
  );
}
