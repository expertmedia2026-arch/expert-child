import Link from "next/link";
import { SchoolAdminShell } from "@/components/school-admin-shell";
import { productSlug, storeProducts } from "@/lib/store-catalog";

const users = [
  { name: "Ada Okonkwo", detail: "School admin · Active" },
  { name: "Year 2 teacher", detail: "Teacher · Active" },
  { name: "Chidi Nwosu", detail: "Bursar · Active" },
  { name: "Amaka Bello", detail: "Teacher · Invite waiting" },
];

const fees = [
  { name: "Tuition", href: "/school-admin/fees/tuition", amount: "₦180,000", note: "Term 1 · paid by most families" },
  { name: "Books", href: "/school-admin/fees/books", amount: "₦24,500", note: "Term 1 · still due for some pupils" },
  { name: "Lesson Fees", href: "/school-admin/fees/lesson-fees", amount: "₦18,000", note: "Term 1 · paid" },
];

function naira(amount: number) {
  return `₦${amount.toLocaleString("en-GB")}`;
}

const lowStock = storeProducts.filter((product) => product.status === "Low stock").length;

export function SchoolAdminDashboard() {
  return (
    <SchoolAdminShell current="overview">
      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <article className="rounded-2xl border border-[#1c1412]/8 bg-white px-4 py-3">
          <p className="text-xs font-medium text-[#6d5c56]">Pupils</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight">486</p>
          <p className="mt-1 text-xs text-[#8a756d]">Riverside Primary · Lagos</p>
        </article>
        <article className="rounded-2xl border border-[#1c1412]/8 bg-white px-4 py-3">
          <p className="text-xs font-medium text-[#6d5c56]">Users</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight">{users.length}</p>
          <p className="mt-1 text-xs text-[#8a756d]">1 invite waiting</p>
        </article>
        <article className="rounded-2xl border border-[#1c1412]/8 bg-white px-4 py-3">
          <p className="text-xs font-medium text-[#6d5c56]">Fees due</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight">₦24,500</p>
          <p className="mt-1 text-xs text-[#8a756d]">Books still unpaid</p>
        </article>
        <article className="rounded-2xl border border-[#1c1412]/8 bg-white px-4 py-3">
          <p className="text-xs font-medium text-[#6d5c56]">Products</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight">{storeProducts.length}</p>
          <p className="mt-1 text-xs text-[#8a756d]">{lowStock} low stock</p>
        </article>
      </section>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
        <section className="rounded-2xl border border-[#1c1412]/8 bg-white">
          <div className="flex items-center justify-between px-4 py-3">
            <h2 className="text-sm font-semibold">Users</h2>
            <Link href="/school-admin/users" className="text-xs font-medium text-[#a33b32] hover:underline">
              View all
            </Link>
          </div>
          <ul>
            {users.map((user) => (
              <li key={user.name} className="border-t border-[#1c1412]/6 px-4 py-3">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="mt-0.5 text-xs text-[#6d5c56]">{user.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="grid gap-4">
          <section className="rounded-2xl border border-[#1c1412]/8 bg-white">
            <div className="flex items-center justify-between px-4 py-3">
              <h2 className="text-sm font-semibold">Manage Fees</h2>
              <Link href="/school-admin/fees" className="text-xs font-medium text-[#a33b32] hover:underline">
                View all
              </Link>
            </div>
            <ul>
              {fees.map((fee) => (
                <li key={fee.name} className="border-t border-[#1c1412]/6 px-4 py-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <Link href={fee.href} className="text-sm font-medium hover:underline">
                      {fee.name}
                    </Link>
                    <p className="text-sm font-semibold">{fee.amount}</p>
                  </div>
                  <p className="mt-0.5 text-xs text-[#6d5c56]">{fee.note}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-[#1c1412]/8 bg-white">
            <div className="flex items-center justify-between px-4 py-3">
              <h2 className="text-sm font-semibold">Manage Products</h2>
              <Link href="/school-admin/products" className="text-xs font-medium text-[#a33b32] hover:underline">
                View all
              </Link>
            </div>
            <ul>
              {storeProducts.slice(0, 3).map((product) => (
                <li key={product.name} className="flex items-center justify-between gap-3 border-t border-[#1c1412]/6 px-4 py-3">
                  <div className="min-w-0">
                    <Link href={`/school-admin/products/${productSlug(product.name)}`} className="truncate text-sm font-medium hover:underline">
                      {product.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-[#6d5c56]">{product.status}</p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold">{naira(product.price)}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </SchoolAdminShell>
  );
}
