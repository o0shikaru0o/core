const BASE = process.env.ARCADE_API_BASE || "https://platform.arcade.ai/v1";

export async function arcade<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.ARCADE_API_KEY}`,
      "Content-Type": "application/json",
      "User-Agent": "core-app/0.1 (shopping-3.0-hackathon)",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Arcade ${path} ${res.status}`);
  return res.json();
}

export type ArcadeProduct = { imageUrl?: string | null; title?: string; selectionLabel?: string };

export type ArcadeOrder = {
  orderNumber: string;
  status: string;
  lines: { makerName: string | null }[];
  tracking: { company: string | null; number: string | null; url: string | null }[];
};

// Arcade image URLs are signed for about an hour, so re-fetch them instead of trusting stored ones.
const imageCache = new Map<string, { url: string | null; expires: number }>();

export async function freshImageUrl(arcadeProductId: string, fallback: string | null) {
  const hit = imageCache.get(arcadeProductId);
  if (hit && hit.expires > Date.now()) return hit.url;
  try {
    const product = await arcade<ArcadeProduct>("products/get", { productId: arcadeProductId });
    const url = product.imageUrl ?? fallback;
    imageCache.set(arcadeProductId, { url, expires: Date.now() + 40 * 60_000 });
    return url;
  } catch {
    return fallback;
  }
}

export async function orderForCheckout(checkoutId: string) {
  try {
    return await arcade<ArcadeOrder>("orders/get", { checkoutId });
  } catch {
    return null; // 404 until the checkout is paid
  }
}
