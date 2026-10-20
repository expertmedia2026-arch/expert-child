import Link from "next/link";
import { Suspense } from "react";
import { ParentShell } from "@/components/parent-shell";
import { verifyPaystackPayment } from "@/lib/paystack";

export const metadata = {
  title: "Checkout — Parent",
  description: "Paystack payment result for the Expert Child parent store.",
};

export default function StoreCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string; trxref?: string }>;
}) {
  return (
    <ParentShell current="store">
      <Suspense fallback={<p className="text-sm text-[#6d5c56]">Checking payment…</p>}>
        <PaymentResult searchParams={searchParams} />
      </Suspense>
    </ParentShell>
  );
}

async function PaymentResult({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string; trxref?: string }>;
}) {
  const params = await searchParams;
  const reference = (params.reference || params.trxref || "").trim();

  if (!process.env.PAYSTACK_SECRET_KEY) {
    return (
      <ResultCard
        title="Paystack is not configured"
        detail="Add PAYSTACK_SECRET_KEY to the app environment, then try checkout again."
      />
    );
  }

  if (!reference) {
    return (
      <ResultCard
        title="No payment to confirm"
        detail="Paystack did not return a reference for this checkout."
      />
    );
  }

  const payment = await verifyPaystackPayment(reference);
  if (payment.ok && payment.data.status === "success") {
    const amount = `₦${(payment.data.amount / 100).toLocaleString("en-GB")}`;
    return (
      <ResultCard
        title="Payment received"
        detail={`Paystack confirmed ${amount} for Jane Cole.`}
        reference={reference}
      />
    );
  }

  return (
    <ResultCard
      title="Payment not completed"
      detail="Paystack did not confirm this payment. You can return to the store and try again."
      reference={reference}
    />
  );
}

function ResultCard({
  title,
  detail,
  reference,
}: {
  title: string;
  detail: string;
  reference?: string;
}) {
  return (
    <section className="max-w-lg rounded-2xl border border-[#1c1412]/8 bg-white px-4 py-5">
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-[#6d5c56]">{detail}</p>
      {reference ? (
        <p className="mt-3 text-xs text-[#8a756d]">
          Reference <span className="font-medium text-[#1c1412]">{reference}</span>
        </p>
      ) : null}
      <Link
        href="/parent/store"
        className="mt-4 inline-flex rounded-full bg-[#e10600] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#c40500]"
      >
        Back to store
      </Link>
    </section>
  );
}
