/* =============================================================================
 * PRISM API CLIENT -- server-only (legacy + Supabase)
 * -----------------------------------------------------------------------------
 * Never import this file from a "use client" component.
 * PRISM_API_KEY must never reach the browser bundle.
 *
 * Data source priority:
 *   1. Supabase (NEXT_PUBLIC_SUPABASE_URL set)  -- direct DB query, instant
 *   2. Prism API (PRISM_API_BASE_URL set)       -- legacy polling fallback
 *   3. Empty array                              -- graceful degradation
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

// ---------------------------------------------------------------------------
// Supabase data fetcher (primary)
// ---------------------------------------------------------------------------

async function getProductsFromSupabase(): Promise<PrismProduct[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  try {
    const { createClient } = await import("./supabase");
    const supabase = createClient();

    const { data, error } = await supabase
      .from("products")
      .select(
        
        id,
        prism_internal_id,
        category_id,
        title,
        material_note,
        website_caption,
        published_at,
        product_images ( storage_url, display_order )
      
      )
      .order("published_at", { ascending: false })
      .limit(200);

    if (error || !data) return [];

    return data.map((p: any) => ({
      product_id: p.prism_internal_id ?? p.id,
      category: p.category_id,
      product_title: p.title,
      material_note: p.material_note,
      website_caption: p.website_caption,
      images: (
        p.product_images as Array<{
          storage_url: string;
          display_order: number;
        }>
      )
        .sort((a, b) => a.display_order - b.display_order)
        .map((img) => img.storage_url),
      published_at: p.published_at ?? new Date().toISOString(),
    }));
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Prism API fetcher (legacy fallback)
// ---------------------------------------------------------------------------

async function getProductsFromPrismApi(): Promise<PrismProduct[]> {
  const base = process.env.PRISM_API_BASE_URL;
  const key = process.env.PRISM_API_KEY;
  const brandId = process.env.PRISM_BRAND_ID;

  if (!base || !key || !brandId) return [];

  const url = ${base}/api/website/products?brand_id=&limit=200;

  try {
    const res = await fetch(url, {
      headers: { Authorization: Bearer  },
      next: { revalidate: 900 }, // 15 min -- only used when Supabase is unavailable
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.products ?? [];
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Fetch published products.
 * Uses Supabase directly if credentials are present; falls back to Prism API.
 */
export async function getPublishedProducts(): Promise<PrismProduct[]> {
  // Try Supabase first (instant, no polling required)
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    const products = await getProductsFromSupabase();
    if (products.length > 0) return products;
  }

  // Legacy fallback: Prism API
  return getProductsFromPrismApi();
}
