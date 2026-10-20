const PAYSTACK_BASE = "https://api.paystack.co";

type InitializeResponse = {
  status: boolean;
  message?: string;
  data?: { authorization_url: string; reference: string };
};

type VerifyResponse = {
  status: boolean;
  message?: string;
  data?: { status: string; reference: string; amount: number };
};

export async function initializePaystackPayment(input: {
  email: string;
  amountKobo: number;
  callbackUrl: string;
  metadata: Record<string, string>;
}) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return { ok: false as const, message: "PAYSTACK_SECRET_KEY is not configured" };
  }

  const res = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: input.email,
      amount: input.amountKobo,
      currency: "NGN",
      callback_url: input.callbackUrl,
      metadata: input.metadata,
    }),
    cache: "no-store",
  });

  const json = (await res.json()) as InitializeResponse;
  if (!res.ok || json.status !== true || !json.data?.authorization_url) {
    return { ok: false as const, message: json.message || "Could not start Paystack payment" };
  }

  return {
    ok: true as const,
    authorizationUrl: json.data.authorization_url,
    reference: json.data.reference,
  };
}

export async function verifyPaystackPayment(reference: string) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return { ok: false as const, message: "PAYSTACK_SECRET_KEY is not configured" };
  }

  const res = await fetch(`${PAYSTACK_BASE}/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secret}` },
    cache: "no-store",
  });
  const json = (await res.json()) as VerifyResponse;
  if (!res.ok || json.status !== true || !json.data) {
    return { ok: false as const, message: json.message || "Could not verify payment" };
  }

  return { ok: true as const, data: json.data };
}
