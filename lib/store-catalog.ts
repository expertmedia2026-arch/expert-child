export const storeProducts = [
  {
    name: "Reading pack",
    detail: "Term books and a folder",
    price: 6500,
    status: "Available",
    image: "/store/reading-pack.jpg",
  },
  {
    name: "PE kit",
    detail: "Shirt, shorts, and pumps",
    price: 12000,
    status: "Available",
    image: "/store/pe-kit.jpg",
  },
  {
    name: "Lunch card",
    detail: "Term lunch credit",
    price: 15000,
    status: "Low stock",
    image: "/store/lunch-card.jpg",
  },
  {
    name: "Exercise books",
    detail: "Pack of 10 ruled books",
    price: 3500,
    status: "Available",
    image: "/store/exercise-books.jpg",
  },
  {
    name: "School bag",
    detail: "Day bag with the school crest",
    price: 18000,
    status: "Available",
    image: "/store/school-bag.jpg",
  },
  {
    name: "Water bottle",
    detail: "Named bottle for the classroom",
    price: 2500,
    status: "Available",
    image: "/store/water-bottle.jpg",
  },
  {
    name: "Art set",
    detail: "Pencils, crayons, and a sketchbook",
    price: 4800,
    status: "Low stock",
    image: "/store/art-set.jpg",
  },
  {
    name: "Cardigan",
    detail: "School cardigan, Year 2",
    price: 9500,
    status: "Available",
    image: "/store/cardigan.jpg",
  },
] as const;

export type StoreProduct = (typeof storeProducts)[number];

export function productSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function priceCart(items: { name: string; quantity: number }[]) {
  const lines: { name: string; quantity: number; price: number }[] = [];

  for (const item of items) {
    const product = storeProducts.find((entry) => entry.name === item.name);
    const quantity = Math.floor(Number(item.quantity));
    if (!product || !Number.isFinite(quantity) || quantity < 1) return null;
    lines.push({ name: product.name, quantity, price: product.price });
  }

  if (lines.length === 0) return null;

  const amount = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  return { lines, amount, amountKobo: amount * 100 };
}
