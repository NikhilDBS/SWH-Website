/* =============================================================================
 * PRISM API CLIENT — server-only
 * -----------------------------------------------------------------------------
 * Never import this file from a "use client" component.
 * PRISM_API_KEY must never reach the browser bundle.
 * ========================================================================== */

export interface PrismProduct {
  product_id: string;
  category: "suits" | "shirts" | "trousers" | "ethnic" | "ready-made";
  product_title: string | null;
  material_note: string | null;
  website_caption: string | null;
  images: string[];
  published_at: string;
}

export async function getPublishedProducts(): Promise<PrismProduct[]> {
  const base = process.env.PRISM_API_BASE_URL;
  const key = process.env.PRISM_API_KEY;
  const brandId = process.env.PRISM_BRAND_ID;

  if (!base || !key || !brandId) {
    // Env vars not configured — degrade gracefully, don't 500
    return [];
  }

  const url = `${base}/api/website/products?brand_id=${brandId}&limit=200`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${key}` },
      next: { revalidate: 900 }, // 15 min — adjust as needed
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.products ?? [];
  } catch {
    // Prism unreachable — degrade to empty, don't 500 the whole site
    return [];
  }
}
