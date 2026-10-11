import Link from "next/link";
import { Header, StageBadge, StageBar, Tile } from "@/components/ui";
import { getProduct, getProject, listOrders } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function TrackingPage() {
  const rows = await Promise.all(
    (await listOrders()).map(async (order) => ({
      order,
      project: await getProject(order.projectId),
      product: await getProduct(order.productId),
    })),
  );

  return (
    <main>
      <Header title="Tracking" />
      <div className="space-y-3 px-4">
        {rows.map(({ order, project, product }) =>
          product ? (
            <Link key={order.id} href={`/tracking/${order.id}`} className="flex gap-3 rounded-[24px] border border-neutral-100 p-3">
              <Tile src={product.imageUrl} alt={product.name} className="h-20 w-20 shrink-0 rounded-2xl" />
              <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                <div>
                  <p className="truncate text-[14px] font-semibold">{product.name}</p>
                  <p className="truncate text-[12px] text-neutral-500">
                    {order.buyerName} · {project?.title}
                  </p>
                </div>
                <div className="space-y-1.5">
                  <StageBadge stage={order.stage} />
                  <StageBar stage={order.stage} />
                </div>
              </div>
            </Link>
          ) : null,
        )}
        {!rows.length && <p className="py-16 text-center text-[14px] text-neutral-500">No orders yet. Tap “Get yours” on a product.</p>}
      </div>
    </main>
  );
}
