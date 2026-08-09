import { getPublishedProducts } from "@/lib/prism";
import { adaptPrismProduct } from "@/lib/products";
import { categoryLabels } from "@/lib/content";
import AppShell from "@/components/AppShell";

export default async function Page() {
  const raw = await getPublishedProducts();
  const products = raw.map((p) => adaptPrismProduct(p, categoryLabels));
  return <AppShell products={products} />;
}
