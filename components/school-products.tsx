"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { storeProducts } from "@/lib/store-catalog";

type ProductStatus = "Available" | "Low stock";

type Product = {
  name: string;
  detail: string;
  price: number;
  status: ProductStatus;
  image: string;
};

const statuses: ProductStatus[] = ["Available", "Low stock"];

const emptyForm = {
  name: "",
  detail: "",
  price: "",
  status: "Available" as ProductStatus,
  image: "",
};

const fieldClass =
  "mt-1 w-full rounded-xl border border-[#1c1412]/10 bg-[#faf7f4] px-3 py-2 text-sm outline-none focus:border-[#e10600] focus:bg-white";

function naira(amount: number) {
  return `₦${amount.toLocaleString("en-GB")}`;
}

export function SchoolProducts() {
  const [products, setProducts] = useState<Product[]>([...storeProducts]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function closeModal() {
    setOpen(false);
    setForm(emptyForm);
  }

  function onImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({ ...current, image: String(reader.result) }));
    };
    reader.readAsDataURL(file);
  }

  function addProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const price = Math.round(Number(form.price));
    if (!form.name.trim() || !Number.isFinite(price) || price < 1) return;
    setProducts((current) => [
      {
        name: form.name.trim(),
        detail: form.detail.trim(),
        price,
        status: form.status,
        image: form.image,
      },
      ...current,
    ]);
    closeModal();
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-[#1c1412]/8 bg-white">
      <div className="flex flex-col gap-3 border-b border-[#1c1412]/8 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight">Manage Products</h2>
          <p className="text-xs text-[#8a756d]">Riverside Primary · {products.length} products</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="shrink-0 rounded-full bg-[#e10600] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#c40500]"
        >
          Add New Product
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="bg-[#faf7f4] text-xs tracking-wide text-[#6d5c56] uppercase">
            <tr>
              <th className="px-4 py-2 font-semibold">Product</th>
              <th className="px-4 py-2 font-semibold">Price</th>
              <th className="px-4 py-2 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={`${product.name}-${product.price}`} className="border-t border-[#1c1412]/6">
                <td className="px-4 py-2.5 font-medium">
                  {product.name}
                  {product.detail ? (
                    <span className="block text-xs font-normal text-[#8a756d]">{product.detail}</span>
                  ) : null}
                </td>
                <td className="px-4 py-2.5 text-[#6d5c56]">{naira(product.price)}</td>
                <td className="px-4 py-2.5">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                      product.status === "Available"
                        ? "bg-[#e7f6ee] text-[#1f7a4d]"
                        : "bg-[#fff4d6] text-[#9a6700]"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open
        ? createPortal(
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#1c1412]/45"
              onClick={closeModal}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="add-product-title"
                className="max-h-[calc(100vh-2rem)] w-[80%] overflow-y-auto rounded-3xl bg-white p-5 text-[#1c1412] shadow-[0_24px_60px_-30px_rgba(28,20,18,0.6)] sm:p-6"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.2em] text-[#a33b32] uppercase">
                      Products
                    </p>
                    <h2 id="add-product-title" className="mt-1 text-xl font-semibold tracking-tight">
                      Add New Product
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    aria-label="Close"
                    className="grid size-8 place-items-center rounded-full text-[#6d5c56] hover:bg-[#f4efe8]"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={addProduct} className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
                  <div className="col-span-2 flex justify-center">
                    <label className="grid size-24 cursor-pointer place-items-center overflow-hidden rounded-full border border-dashed border-[#1c1412]/25 bg-[#faf7f4] text-center">
                      {form.image ? (
                        // Local preview of the file the user just picked.
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={form.image} alt="" className="size-full object-cover" />
                      ) : (
                        <span className="px-2 text-[10px] font-semibold tracking-wide text-[#8a756d] uppercase">
                          Upload image
                        </span>
                      )}
                      <input type="file" accept="image/*" className="sr-only" onChange={onImage} />
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-xs font-semibold tracking-wide text-[#5c4b45] uppercase">
                      Product name
                    </span>
                    <input
                      required
                      autoFocus
                      value={form.name}
                      onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                      placeholder="Product name"
                      className={fieldClass}
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold tracking-wide text-[#5c4b45] uppercase">
                      Description
                    </span>
                    <input
                      value={form.detail}
                      onChange={(event) => setForm((current) => ({ ...current, detail: event.target.value }))}
                      placeholder="Short description"
                      className={fieldClass}
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold tracking-wide text-[#5c4b45] uppercase">Price</span>
                    <input
                      required
                      type="number"
                      min={1}
                      value={form.price}
                      onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
                      placeholder="6500"
                      className={fieldClass}
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold tracking-wide text-[#5c4b45] uppercase">Status</span>
                    <select
                      value={form.status}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, status: event.target.value as ProductStatus }))
                      }
                      className={fieldClass}
                    >
                      {statuses.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                  </label>
                  <div className="col-span-2 flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="rounded-full px-3.5 py-2 text-sm font-semibold text-[#6d5c56] hover:bg-[#f4efe8]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-full bg-[#e10600] px-4 py-2 text-sm font-semibold text-white hover:bg-[#c40500]"
                    >
                      Save product
                    </button>
                  </div>
                </form>
              </div>
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}
