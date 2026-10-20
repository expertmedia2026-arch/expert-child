"use client";

import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type TuitionStatus = "Open" | "Due";

type Tuition = {
  className: string;
  term: string;
  amount: number;
  status: TuitionStatus;
};

const classes = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"];
const terms = ["Term 1", "Term 2", "Term 3"];
const statuses: TuitionStatus[] = ["Open", "Due"];

const emptyForm = {
  className: "",
  term: "Term 1",
  amount: "",
  status: "Open" as TuitionStatus,
};

const fieldClass =
  "mt-1 w-full rounded-xl border border-[#1c1412]/10 bg-[#faf7f4] px-3 py-2 text-sm outline-none focus:border-[#e10600] focus:bg-white";

function naira(amount: number) {
  return `₦${amount.toLocaleString("en-GB")}`;
}

export function SchoolTuition() {
  const [fees, setFees] = useState<Tuition[]>([
    { className: "Year 2", term: "Term 1", amount: 180000, status: "Open" },
  ]);
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

  function addTuition(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const amount = Math.round(Number(form.amount));
    if (!form.className.trim() || !Number.isFinite(amount) || amount < 1) return;
    setFees((current) => [
      {
        className: form.className.trim(),
        term: form.term,
        amount,
        status: form.status,
      },
      ...current,
    ]);
    closeModal();
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-[#1c1412]/8 bg-white">
      <div className="flex flex-col gap-3 border-b border-[#1c1412]/8 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight">Tuition</h2>
          <p className="text-xs text-[#8a756d]">
            Riverside Primary · {fees.length} {fees.length === 1 ? "fee" : "fees"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="shrink-0 rounded-full bg-[#e10600] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#c40500]"
        >
          Add Tuition
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="bg-[#faf7f4] text-xs tracking-wide text-[#6d5c56] uppercase">
            <tr>
              <th className="px-4 py-2 font-semibold">Class</th>
              <th className="px-4 py-2 font-semibold">Term</th>
              <th className="px-4 py-2 font-semibold">Amount</th>
              <th className="px-4 py-2 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((fee) => (
              <tr key={`${fee.className}-${fee.term}-${fee.amount}`} className="border-t border-[#1c1412]/6">
                <td className="px-4 py-2.5 font-medium">{fee.className}</td>
                <td className="px-4 py-2.5 text-[#6d5c56]">{fee.term}</td>
                <td className="px-4 py-2.5 text-[#6d5c56]">{naira(fee.amount)}</td>
                <td className="px-4 py-2.5">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                      fee.status === "Due" ? "bg-[#fff1e8] text-[#a33b32]" : "bg-[#e7f6ee] text-[#1f7a4d]"
                    }`}
                  >
                    {fee.status}
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
                aria-labelledby="add-tuition-title"
                className="max-h-[calc(100vh-2rem)] w-[80%] overflow-y-auto rounded-3xl bg-white p-5 text-[#1c1412] shadow-[0_24px_60px_-30px_rgba(28,20,18,0.6)] sm:p-6"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.2em] text-[#a33b32] uppercase">Fees</p>
                    <h2 id="add-tuition-title" className="mt-1 text-xl font-semibold tracking-tight">
                      Add Tuition
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

                <form onSubmit={addTuition} className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
                  <label className="block">
                    <span className="text-xs font-semibold tracking-wide text-[#5c4b45] uppercase">Class</span>
                    <select
                      required
                      autoFocus
                      value={form.className}
                      onChange={(event) => setForm((current) => ({ ...current, className: event.target.value }))}
                      className={fieldClass}
                    >
                      <option value="">Select class</option>
                      {classes.map((className) => (
                        <option key={className}>{className}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold tracking-wide text-[#5c4b45] uppercase">Term</span>
                    <select
                      value={form.term}
                      onChange={(event) => setForm((current) => ({ ...current, term: event.target.value }))}
                      className={fieldClass}
                    >
                      {terms.map((term) => (
                        <option key={term}>{term}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold tracking-wide text-[#5c4b45] uppercase">Amount</span>
                    <input
                      required
                      type="number"
                      min={1}
                      value={form.amount}
                      onChange={(event) => setForm((current) => ({ ...current, amount: event.target.value }))}
                      placeholder="180000"
                      className={fieldClass}
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold tracking-wide text-[#5c4b45] uppercase">Status</span>
                    <select
                      value={form.status}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, status: event.target.value as TuitionStatus }))
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
                      Save tuition
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
