import type { DesignBrief } from "./schema";

const BASE = process.env.ARCADE_API_BASE || "https://platform.arcade.ai/v1";

export async function arcade<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.ARCADE_API_KEY}`,
      "Content-Type": "application/json",
      "User-Agent": "gaise/0.1 (shopping-3.0-hackathon)",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Arcade ${path} ${res.status}: ${await res.text()}`);
  return res.json();
}

type Category = { categoryId: string; name: string; world: string; category?: { name: string } };

export type ArcadeJob = {
  jobId: string;
  status: "running" | "succeeded" | "failed";
  result: { patternId: string; productId?: string } | null;
  error?: { message: string };
};

export type ArcadeProduct = {
  productId: string;
  title: string;
  imageUrl?: string;
  images?: { url: string }[];
  maker?: { name: string };
  selectionLabel?: string;
  unitPrice: { amount: string; currency: string } | null;
};

const PIECE_MATCH: Record<DesignBrief["pieceType"], RegExp> = {
  earrings: /earring/i,
  necklace: /necklace|pendant/i,
  ring: /ring/i,
  bracelet: /bracelet|cuff|bangle/i,
  brooch: /brooch|pin/i,
};

let categoriesPromise: Promise<Category[]> | null = null;

export async function jewelryCategories() {
  categoriesPromise ??= arcade<{ items: Category[] }>("categories/list", {})
    .then((r) => r.items.filter((c) => c.world === "jewelry"))
    .catch((e) => {
      categoriesPromise = null;
      throw e;
    });
  return categoriesPromise;
}

export async function categoryFor(pieceType: DesignBrief["pieceType"]) {
  const cats = await jewelryCategories();
  const re = PIECE_MATCH[pieceType];
  const match = cats.find((c) => re.test(c.name) || re.test(c.category?.name ?? ""));
  if (!match) throw new Error(`No Arcade jewelry category for ${pieceType}`);
  return match.categoryId;
}

export async function waitForJob(jobId: string, timeoutMs = 50_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const job = await arcade<ArcadeJob>("jobs/get", { jobId });
    if (job.status === "succeeded") return job;
    if (job.status === "failed") throw new Error(`Arcade job failed: ${job.error?.message}`);
    await new Promise((r) => setTimeout(r, 2000));
  }
  throw new Error(`Arcade job ${jobId} timed out`);
}
