"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { storeProducts, type StoreProduct } from "@/lib/store-catalog";

const products = storeProducts;

type Product = StoreProduct;

type CartItem = Product & { quantity: number };

function naira(amount: number) {
  return `₦${amount.toLocaleString("en-GB")}`;
}

export function ParentStore() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find((item) => item.name === product.name);
      if (!existing) return [...current, { ...product, quantity: 1 }];
      return current.map((item) =>
        item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item,
      );
    });
  }

  async function checkout() {
    if (cart.length === 0 || paying) return;
    setPaying(true);
    setPayError(null);
    try {
      const response = await fetch("/api/parent/store/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((item) => ({ name: item.name, quantity: item.quantity })),
        }),
      });
      const payload = (await response.json().catch(() => ({}))) as {
        message?: string;
        authorizationUrl?: string;
      };
      if (!response.ok || !payload.authorizationUrl) {
        setPayError(payload.message || "Could not start Paystack payment");
        setPaying(false);
        return;
      }
      window.location.assign(payload.authorizationUrl);
    } catch {
      setPayError("Network error. Try again.");
      setPaying(false);
    }
  }

  function setQuantity(name: string, quantity: number) {
    setCart((current) =>
      quantity < 1
        ? current.filter((item) => item.name !== name)
        : current.map((item) => (item.name === name ? { ...item, quantity } : item)),
    );
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold tracking-tight">Store</h2>
          <p className="text-xs text-[#8a756d]">Riverside Primary · {products.length} products</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={count === 0 ? "Open cart" : `Open cart, ${count} ${count === 1 ? "item" : "items"}`}
          className="relative grid size-10 place-items-center rounded-full border border-[#1c1412]/10 bg-white text-[#6e1520] hover:bg-[#fff8f6]"
        >
          <CartIcon />
          {count > 0 ? (
            <span className="absolute -top-1 -right-1 grid min-w-5 place-items-center rounded-full bg-[#e10600] px-1 text-[10px] font-semibold text-white">
              {count}
            </span>
          ) : null}
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => {
          const inCart = cart.find((item) => item.name === product.name)?.quantity ?? 0;
          return (
            <article
              key={product.name}
              className="overflow-hidden rounded-2xl border border-[#1c1412]/8 bg-white"
            >
              <div className="relative aspect-[4/3] bg-[#faf7f4]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1280px) 380px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="px-4 py-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold">{product.name}</h3>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                      product.status === "Available"
                        ? "bg-[#e7f6ee] text-[#1f7a4d]"
                        : "bg-[#fff4d6] text-[#9a6700]"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#8a756d]">{product.detail}</p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="text-base font-semibold tracking-tight">{naira(product.price)}</p>
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="shrink-0 rounded-full bg-[#e10600] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#c40500]"
                  >
                    {inCart > 0 ? `Add to cart (${inCart})` : "Add to cart"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {open ? (
        <div className="fixed inset-0 z-40 flex justify-end">
          <button
            type="button"
            aria-label="Close cart"
            className="absolute inset-0 bg-[#1c1412]/40"
            onClick={() => setOpen(false)}
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Cart"
            className="relative flex h-full w-full max-w-md flex-col bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-[#1c1412]/8 px-4 py-3">
              <div>
                <h2 className="text-base font-semibold tracking-tight">Cart</h2>
                <p className="text-xs text-[#8a756d]">
                  {count === 0 ? "No items yet" : `${count} ${count === 1 ? "item" : "items"}`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-[#1c1412]/10 px-3 py-1.5 text-xs font-medium text-[#6e1520] hover:bg-[#fff8f6]"
              >
                Close
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="px-4 py-8 text-sm text-[#6d5c56]">Your cart is empty.</p>
            ) : (
              <ul className="min-h-0 flex-1 overflow-y-auto">
                {cart.map((item) => (
                  <li key={item.name} className="flex gap-3 border-t border-[#1c1412]/6 px-4 py-3 first:border-t-0">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-[#faf7f4]">
                      <Image src={item.image} alt="" fill sizes="64px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="shrink-0 text-sm font-semibold">{naira(item.price * item.quantity)}</p>
                      </div>
                      <p className="mt-0.5 text-xs text-[#8a756d]">{naira(item.price)} each</p>
                      <div className="mt-2 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            aria-label={`Decrease ${item.name}`}
                            onClick={() => setQuantity(item.name, item.quantity - 1)}
                            className="grid size-7 place-items-center rounded-full border border-[#1c1412]/10 text-sm hover:bg-[#faf7f4]"
                          >
                            −
                          </button>
                          <span className="min-w-4 text-center text-sm font-semibold">{item.quantity}</span>
                          <button
                            type="button"
                            aria-label={`Increase ${item.name}`}
                            onClick={() => setQuantity(item.name, item.quantity + 1)}
                            className="grid size-7 place-items-center rounded-full border border-[#1c1412]/10 text-sm hover:bg-[#faf7f4]"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => setQuantity(item.name, 0)}
                          className="text-xs font-medium text-[#a33b32] hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="border-t border-[#1c1412]/8 px-4 py-3">
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-medium text-[#6d5c56]">Total</p>
                <p className="text-base font-semibold tracking-tight">{naira(total)}</p>
              </div>
              {cart.length > 0 ? (
                <>
                  <button
                    type="button"
                    onClick={() => void checkout()}
                    disabled={paying}
                    className="mt-3 w-full rounded-full bg-[#e10600] px-3 py-2 text-sm font-semibold text-white hover:bg-[#c40500] disabled:opacity-60"
                  >
                    {paying ? "Opening Paystack…" : "Proceed to checkout"}
                  </button>
                  <p className="mt-2 text-center text-[11px] text-[#8a756d]">Pay with Paystack</p>
                </>
              ) : null}
              {payError ? <p className="mt-2 text-center text-xs text-[#a33b32]">{payError}</p> : null}
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
      <path d="M3 4h2l2.2 11h11.3l2-7H7" />
    </svg>
  );
}
