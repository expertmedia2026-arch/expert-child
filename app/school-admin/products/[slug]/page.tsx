import Image from "next/image";
import { notFound } from "next/navigation";
import { SchoolAdminShell } from "@/components/school-admin-shell";
import { productSlug, storeProducts } from "@/lib/store-catalog";

function naira(amount: number) {
  return `₦${amount.toLocaleString("en-GB")}`;
}

export function generateStaticParams() {
  return storeProducts.map((product) => ({ slug: productSlug(product.name) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = storeProducts.find((item) => productSlug(item.name) === slug);
  return { title: product ? `${product.name} — School Admin` : "Product — School Admin" };
}

export default async function SchoolProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = storeProducts.find((item) => productSlug(item.name) === slug);
  if (!product) notFound();

  return (
    <SchoolAdminShell current={slug}>
      <section className="max-w-lg overflow-hidden rounded-2xl border border-[#1c1412]/8 bg-white">
        <div className="relative aspect-[4/3] bg-[#faf7f4]">
          <Image src={product.image} alt={product.name} fill sizes="32rem" className="object-cover" />
        </div>
        <div className="px-4 py-3">
          <h2 className="text-base font-semibold tracking-tight">{product.name}</h2>
          <p className="mt-1 text-xs text-[#8a756d]">{product.detail}</p>
          <p className="mt-3 text-base font-semibold">{naira(product.price)}</p>
          <p
            className={`mt-1 text-xs font-semibold ${
              product.status === "Available" ? "text-[#1f7a4d]" : "text-[#9a6700]"
            }`}
          >
            {product.status}
          </p>
        </div>
      </section>
    </SchoolAdminShell>
  );
}
