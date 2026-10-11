import { NextResponse } from "next/server";
import { getProvider } from "@/lib/providers";
import { GenerateRequestSchema, type Design } from "@/lib/schema";

export const maxDuration = 60;

export async function POST(req: Request) {
  const parsed = GenerateRequestSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const provider = getProvider();
  const results = await Promise.allSettled(
    parsed.data.briefs.map((brief, i) => provider.generate(brief, i)),
  );

  const designs: Design[] = [];
  results.forEach((r, i) => {
    if (r.status === "fulfilled") designs.push({ ...parsed.data.briefs[i], ...r.value });
    else console.error(`Design ${i} failed:`, r.reason);
  });

  if (designs.length === 0) {
    return NextResponse.json({ error: "All design generations failed" }, { status: 502 });
  }
  return NextResponse.json({ designs });
}
