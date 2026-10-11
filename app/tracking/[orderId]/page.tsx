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
    <main className="pb-8">
      <Header title={order.orderNumber ?? "Order"} back="/tracking" />

      <Link href={`/projects/${project.id}/products/${product.id}`} className="mx-4 flex gap-3 rounded-[24px] border border-neutral-100 p-3">
        <Tile src={product.imageUrl} alt={product.name} className="h-20 w-20 shrink-0 rounded-2xl" />
        <div className="min-w-0 py-1">
          <p className="truncate text-[15px] font-semibold">{product.name}</p>
          <p className="truncate text-[13px] text-neutral-500">
            {order.buyerName} · {project.title}
          </p>
          {order.maker && <p className="truncate text-[13px] text-neutral-500">Made by {order.maker}</p>}
        </div>
      </Link>

      <section className="px-6 pt-8">
        {order.stage === "awaitingPayment" || order.stage === "refunded" ? (
          <p className="text-[15px] font-semibold">{STAGE_LABEL[order.stage]}</p>
        ) : (
          <ol className="space-y-5">
            {PROGRESS.map((s, i) => (
              <li key={s.id} className="flex items-center gap-3">
                <span className={`h-3 w-3 rounded-full ${i <= current ? "bg-neutral-900" : "border border-neutral-300"}`} />
                <span className={`text-[15px] ${i === current ? "font-semibold" : i < current ? "" : "text-neutral-400"}`}>{s.label}</span>
              </li>
            ))}
          </ol>
        )}
      </section>

      {order.tracking.some((t) => t.url) && (
        <section className="space-y-2 px-4 pt-8">
          {order.tracking.map((t, i) =>
            t.url ? (
              <a key={i} href={t.url} className="block rounded-full bg-neutral-100 py-3 text-center text-[14px] font-semibold">
                Track shipment{t.company ? ` · ${t.company}` : ""}
              </a>
            ) : null,
          )}
        </section>
      )}
    </main>
  );
}
