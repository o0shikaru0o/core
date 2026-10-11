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
    <main className="pb-10">
      <Header title="Tracking" />
      <div className="px-5 pb-5 pt-3"><h1 className="text-[31px] font-semibold tracking-[-0.04em]">Made for you.</h1><p className="mt-1 text-[14px] text-[#6e6e73]">Follow every creation from order to arrival.</p></div>
      <div className="space-y-3 px-5">
        {rows.map(({ order, project, product }) =>
          product ? (
            <Link key={order.id} href={`/tracking/${order.id}`} className="flex gap-4 rounded-[22px] bg-white p-3 shadow-[0_3px_16px_rgba(0,0,0,0.025)]">
              <Tile src={product.imageUrl} alt={product.name} className="h-24 w-24 shrink-0 rounded-[15px]" />
              <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                <div>
                  <p className="line-clamp-2 text-[15px] font-semibold leading-snug">{product.name}</p>
                  <p className="truncate text-[12px] text-[#6e6e73]">
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
        {!rows.length && <div className="rounded-[24px] bg-white px-6 py-14 text-center"><h2 className="text-[19px] font-semibold">Nothing on its way yet.</h2><p className="mt-2 text-[14px] leading-relaxed text-[#6e6e73]">Choose a group creation and tap Get yours to start an order.</p><Link href="/" className="mt-5 inline-block rounded-full bg-[#0071e3] px-5 py-2.5 text-[14px] font-semibold text-white">Explore projects</Link></div>}
      </div>
    </main>
  );
}
