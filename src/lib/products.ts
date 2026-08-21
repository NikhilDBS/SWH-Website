/* =============================================================================
 * PRODUCT ADAPTER + PURE HELPERS
 * -----------------------------------------------------------------------------
 * This module is safe to import from both Server and Client Components.
 * It contains no I/O — all functions are pure.
 * ========================================================================== */

import type { PrismProduct } from "./prism";
import type { CategoryKey } from "./content";

export interface Product {
  slug: string;
  title: string;
  category: CategoryKey;
  categoryLabel: string;
  material: string;
  description: string;
  images: string[]; // 1..N — Prism can publish any number of approved shots
  arrival?: "new";
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Maps a raw PrismProduct to the Product shape the app uses.
 * Pass `categoryLabels` from content.ts (static editorial copy, unchanged).
 */
export function adaptPrismProduct(
  p: PrismProduct,
  categoryLabels: Record<string, string>
): Product {
  const title = p.product_title ?? categoryLabels[p.category] ?? p.category;
  return {
    slug: `${slugify(title)}-${p.product_id.slice(0, 8)}`,
    title,
    category: p.category,
    categoryLabel: categoryLabels[p.category] ?? p.category,
    material: p.material_note ?? "",
    description: p.website_caption ?? "",
    images: p.images,
  };
}

/** Find a product by its slug. */
export function productBySlug(
  products: Product[],
  slug: string
): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Filter products to a single category, preserving server-side order. */
export function productsByCategory(
  products: Product[],
  cat: Product["category"]
): Product[] {
  return products.filter((p) => p.category === cat);
}

/**
 * Return the first `limit` products as New Arrivals.
 * Prism already returns products most-recently-published first,
 * so slicing from the front gives the newest items.
 */
export function newArrivals(products: Product[], limit = 8): Product[] {
  return products
    .slice(0, limit)
    .map((p) => ({ ...p, arrival: "new" as const }));
}
