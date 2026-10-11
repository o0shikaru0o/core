import { notFound } from "next/navigation";
import { Header, Tile } from "@/components/ui";
import { projectById } from "@/lib/demo";

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projectById(params.id);
  if (!project) notFound();

  return (
    <main>
      <Header title={project.name} back="/" />
      <p className="px-5 pb-5 text-[13px] text-neutral-500">
        {project.chat} · {project.members} members
      </p>
      <div className="grid grid-cols-2 gap-x-3 gap-y-5 px-4">
        {project.products.map((p) => (
          <div key={p.id}>
            <Tile src={p.image} alt={p.name} className="aspect-square rounded-[20px]" />
            <p className="mt-2 truncate text-[14px] font-semibold">{p.name}</p>
            <p className="truncate text-[12px] text-neutral-500">{p.category}</p>
            <p className="mt-0.5 text-[13px] font-medium">${p.priceUsd}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
