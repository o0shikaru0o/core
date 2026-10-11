import { NextResponse } from "next/server";
import { z } from "zod";
import { arcade } from "@/lib/arcade";

const CheckoutRequest = z.object({ productId: z.string().min(1) });

export async function POST(req: Request) {
  const parsed = CheckoutRequest.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const checkout = await arcade<{ checkoutId: string; checkoutUrl: string }>("checkouts/create", {
      requestId: `gaise-${parsed.data.productId}`,
      lines: [{ productId: parsed.data.productId, quantity: 1 }],
      dropShip: true,
    });
    return NextResponse.json(checkout);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Could not create Arcade checkout" }, { status: 502 });
  }
}
