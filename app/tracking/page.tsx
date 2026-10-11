import { Header, StageBadge, StageBar, Tile } from "@/components/ui";
import { projects } from "@/lib/demo";

export default function TrackingPage() {
  const rows = projects.flatMap((project) =>
    project.orders.map((order) => ({
      order,
      project,
      product: project.products.find((p) => p.id === order.productId)!,
    })),
  );

  return (
    <main>
      <Header title="Tracking" />
      <div className="space-y-3 px-4">
        {rows.map(({ order, project, product }) => (
          <div key={order.id} className="flex gap-3 rounded-[24px] border border-neutral-100 p-3">
            <Tile src={product.image} alt={product.name} className="h-20 w-20 shrink-0 rounded-2xl" />
            <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
              <div>
                <p className="truncate text-[14px] font-semibold">
                  {order.quantity} × {product.name}
                </p>
                <p className="truncate text-[12px] text-neutral-500">
                  {project.name} · #{order.id}
                </p>
              </div>
              <div className="space-y-1.5">
                <StageBadge stage={order.stage} />
                <StageBar stage={order.stage} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
