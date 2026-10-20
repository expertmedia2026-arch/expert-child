import { NextRequest, NextResponse } from "next/server";
import { initializePaystackPayment } from "@/lib/paystack";
import { priceCart } from "@/lib/store-catalog";

const PARENT_EMAIL = "jane.cole@expertchild.app";

type CheckoutBody = {
  items?: { name?: string; quantity?: number }[];
};

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as CheckoutBody | null;
  const items = Array.isArray(body?.items)
    ? body.items.map((item) => ({
        name: String(item?.name ?? ""),
        quantity: Number(item?.quantity),
      }))
    : [];

  const priced = priceCart(items);
  if (!priced || priced.amountKobo < 100) {
    return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
  }

  const origin = new URL(request.url).origin;
  const summary = priced.lines.map((line) => `${line.name} x${line.quantity}`).join("; ").slice(0, 450);
  const payment = await initializePaystackPayment({
    email: PARENT_EMAIL,
    amountKobo: priced.amountKobo,
    callbackUrl: `${origin}/parent/store/callback`,
    metadata: {
      kind: "parent_store",
      parent: "Jane Cole",
      items: summary,
    },
  });

  if (!payment.ok) {
    return NextResponse.json({ message: payment.message }, { status: 502 });
  }

  return NextResponse.json({
    authorizationUrl: payment.authorizationUrl,
    reference: payment.reference,
  });
}
