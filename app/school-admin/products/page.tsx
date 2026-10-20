import { SchoolAdminShell } from "@/components/school-admin-shell";
import { SchoolProducts } from "@/components/school-products";

export const metadata = {
  title: "Manage Products — School Admin",
  description: "Store products for Riverside Primary.",
};

export default function SchoolAdminProductsPage() {
  return (
    <SchoolAdminShell current="products">
      <SchoolProducts />
    </SchoolAdminShell>
  );
}
