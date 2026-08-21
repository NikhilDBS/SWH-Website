# SWH-Website — Pulling Products from Prism-SWH

**Audience: the agent working in the `SWH-Website` repo only.** You will not have access to the `Prism-SWH` repo. Everything you need from it is pinned down in the "Shared Contract" section below — identical text in both agents' files. If you need something that isn't in it, that's a sign to flag it rather than guess at how Prism's side works.

> **Revision note:** this replaces an earlier version of this doc written against a completely different codebase — at the time, SWH-Website was a static, zero-build HTML/CSS/JS site. It has since been rebuilt as a **Next.js 16 (App Router) + TypeScript + Tailwind + shadcn** app, running as a persistent Node/Bun server (`output: standalone`) behind Caddy — not a static export. That changes the mechanism entirely: there's no more `index.html` to inject generated HTML into. Everything below reflects the real current codebase. It also now covers all 5 categories including `ready-made` (an earlier revision treated that one as staying static — it doesn't anymore; Prism manages it the same as the other 4).

---

## 1. What's already here, and what this work touches

- **`src/lib/content.ts`** — the single content file. Two categories of content live in it: (a) brand/hero/categories-rail/collection-page-headers/contact/social/nav — all static editorial copy, **untouched by this work** — and (b) product data (`seeds`, `products`, `newArrivals`, `productBySlug`, `productsByCategory`) — currently hardcoded, **this is what becomes Prism-backed, for all 5 categories**.
- **`src/lib/router.tsx`** — a hash router (`/`, `/new-arrivals`, `/collections/:cat`, `/products/:slug`), all rendered client-side through the single `src/app/page.tsx`. Not changing.
- **Component tree:** `page.tsx` (today: `"use client"`) → route switch → `Home` (Hero, NewArrivalsPreview, CategoriesPanel, VisitHouse, LegacyContact) | `CollectionPage` | `ProductPage`.
- `CollectionPage.tsx` and `ProductPage.tsx` **already accept product data via props** — no changes to their own rendering logic needed.
- `NewArrivalsPreview.tsx` and `ProductPage.tsx`'s internal `MoreInCategory` currently **import product data directly from `content.ts`** — these need real changes.
- `CategoriesPanel.tsx` (the category rail) and `collectionMeta` (per-category page header copy) are brand-authored editorial content — **out of scope**, stay static, same treatment for all 5 categories including `ready-made`.
- The live `CategoryKey` type has 5 values: `suits | shirts | trousers | ethnic | ready-made`. Prism now manages **all five** symmetrically — nothing category-specific to special-case anywhere below.

---

## 2. The approach: Server Component fetch, not a build script

Because this is now a real, always-running Next.js server — not a static export — the right mechanism is Next's native data fetching: an async Server Component fetches from Prism once, with time-based cache revalidation. No cron job, no CI trigger, no regenerating HTML files. New approved products appear automatically once the revalidation window passes.

---

## 3. New files

### `src/lib/prism.ts` — server-only

Wraps the Prism endpoint. Reads `PRISM_API_BASE_URL`, `PRISM_API_KEY`, `PRISM_BRAND_ID` from env — **server-side only, never prefix these with `NEXT_PUBLIC_`**, they must not reach the browser bundle.

```ts
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
  const url = `${process.env.PRISM_API_BASE_URL}/api/website/products?brand_id=${process.env.PRISM_BRAND_ID}&limit=200`;
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.PRISM_API_KEY}` },
      next: { revalidate: 900 }, // 15 min — adjust as needed
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.products ?? [];
  } catch {
    return []; // Prism unreachable — degrade to empty, don't 500 the whole site
  }
}
```

One call, no `category` filter, generous `limit` — everything downstream (New Arrivals, each category page) is derived in memory from this single result, the same way `content.ts` already derives multiple views from one `products` array today.

### `src/lib/products.ts` — adapter + the pure helpers the app already relies on

```ts
export interface Product {
  slug: string;
  title: string;
  category: "suits" | "shirts" | "trousers" | "ethnic" | "ready-made";
  categoryLabel: string;
  material: string;
  description: string;
  images: string[];       // CHANGED — was a fixed 3-tuple, now 1..N
  arrival?: "new";
}

function slugify(s: string): string {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function adaptPrismProduct(p: PrismProduct, categoryLabels: Record<string, string>): Product {
  const title = p.product_title ?? categoryLabels[p.category];
  return {
    slug: `${slugify(title)}-${p.product_id.slice(0, 8)}`, // always unique, still readable
    title,
    category: p.category,
    categoryLabel: categoryLabels[p.category],
    material: p.material_note ?? "",
    description: p.website_caption ?? "",
    images: p.images,
  };
}

export function productBySlug(products: Product[], slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(products: Product[], cat: Product["category"]): Product[] {
  return products.filter((p) => p.category === cat);
}

export function newArrivals(products: Product[], limit = 8): Product[] {
  // Prism already returns products most-recently-published first, so this is just a slice.
  return products.slice(0, limit).map((p) => ({ ...p, arrival: "new" as const }));
}
```

`categoryLabels` for all 5 categories can stay defined in `content.ts` — it's static regardless of where the product data comes from, no reason to fetch it.

### `src/lib/products-context.tsx` — avoids prop-drilling into deeply nested components

`NewArrivalsPreview` and `ProductPage`'s `MoreInCategory` both need the fetched product list but sit several component-levels below where it's fetched. A small context is simpler than threading it through every intermediate component:

```tsx
"use client";
import { createContext, useContext } from "react";
import type { Product } from "./products";

const ProductsContext = createContext<Product[]>([]);
export const ProductsProvider = ProductsContext.Provider;
export const useProducts = () => useContext(ProductsContext);
```

---

## 4. Changes to existing files

**`src/app/page.tsx`** — becomes an async Server Component (no `"use client"`):
```tsx
import { getPublishedProducts } from "@/lib/prism";
import { adaptPrismProduct } from "@/lib/products";
import { categoryLabels } from "@/lib/content";
import AppShell from "@/components/AppShell";

export default async function Page() {
  const raw = await getPublishedProducts();
  const products = raw.map((p) => adaptPrismProduct(p, categoryLabels));
  return <AppShell products={products} />;
}
```
This is also why fetching here keeps `PRISM_API_KEY` server-side automatically — Server Components never ship to the client bundle.

**`src/components/AppShell.tsx`** — NEW. Move essentially all of today's `page.tsx` body here (the `useRoute`/`useScrollManager` calls, `renderRoute`, `NotFound`, the exported component), marked `"use client"`. Accepts `products: Product[]` as a prop, wraps its render in `<ProductsProvider value={products}>`, and passes `newArrivals(products)` / `productsByCategory(products, cat)` / `productBySlug(products, slug)` into `Home` / `CollectionPage` / `ProductPage` exactly where `page.tsx` reads from static `content.ts` imports today.

**`src/components/Home.tsx`** — accepts a `newArrivals: Product[]` prop, passes it to `<NewArrivalsPreview newArrivals={newArrivals} />` instead of that component importing it directly.

**`src/components/NewArrivalsPreview.tsx`** — change `import { newArrivals } from "@/lib/content"` to accepting `newArrivals: Product[]` as a prop. The rendering (`.map` over it) doesn't need to change.

**`src/components/ProductPage.tsx`** — `MoreInCategory` should call `useProducts()` and then the pure `productsByCategory(products, category)` helper, instead of importing a version of that function backed by static data. `categoryLabels` and `whatsappUrl` stay imported from `content.ts` as-is — still static.

**`src/lib/content.ts`** — keep `brand`, `imagePool`, `hero`, `categories`, `categoryLabels`, `collectionMeta`, `contact`, `social`, `navItems`, `whatsappUrl` exactly as they are. Remove (or stop exporting) `seeds`, `products`, `newArrivals`, `productBySlug`, `productsByCategory` — those move to `src/lib/products.ts` above. The `Product` interface itself moves there too, since its shape changed (see below).

**Type change — `images`:** was `[string, string, string]` (exactly 3, TypeScript-enforced). Becomes `string[]` (1 or more — Prism products can have anywhere from 1 to however many shots a curator approved in Pipeline 3). `ProductPage.tsx`'s gallery already just does `product.images.map(...)`, so rendering itself likely doesn't need to change — but check for any hardcoded "1/3"-style counter in the carousel (`Product.css` or nearby script) and make it dynamic (`${i + 1}/${product.images.length}`) if one exists.

---

## 5. What NOT to change

- `CollectionPage.tsx` — already prop-driven, leave it alone.
- `CategoriesPanel.tsx`, `categories`, `collectionMeta` — stay static, not Prism-driven, for all 5 categories.
- No client-side fetching, no Next.js API route as a proxy — the Server Component talks to Prism directly, server-to-server.
- No cart, price, SKU, stock.

---

## 6. Env vars

`PRISM_API_BASE_URL`, `PRISM_API_KEY`, `PRISM_BRAND_ID` — server-side only. Add to `.env` and wherever production secrets actually get managed for this deployment. (The `.env` currently in the repo only holds `DATABASE_URL` for the unused Prisma/SQLite starter boilerplate — unrelated, leave it as is.)

---

## 7. Acceptance checklist

- [ ] Home page's New Arrivals rail and Categories rail both render correctly on first load
- [ ] `/collections/suits`, `/shirts`, `/trousers`, `/ethnic`, `/ready-made` each show only their own category's Prism-sourced products
- [ ] `/products/:slug` renders correctly for a Prism-sourced product, with a gallery that adapts to however many images it has — test with 1 image and with 4+
- [ ] The WhatsApp CTA message text on a product page includes that product's `material` correctly
- [ ] If Prism's API is unreachable, the site still renders — Prism-backed sections empty, static sections unaffected — rather than a 500 page
- [ ] `PRISM_API_KEY` does not appear anywhere in client-side JS (check the browser network tab / view-source, not just the source code)
- [ ] Revisiting the site after the revalidation window shows newly-approved products with no manual deploy step

---

## Shared Contract (identical in both agents' files — do not edit without updating the other)

- Category vocabulary: `suits`, `shirts`, `trousers`, `ethnic`, `ready-made` (keys) → `Suits`, `Shirts`, `Trousers`, `Ethnic`, `Ready-made` (labels). Prism manages all 5 — there's no website-only static category anymore.
- Endpoint, on Prism's side:
  ```
  GET /api/website/products?brand_id=<uuid>&category=<key|omit>&limit=<n>&since=<iso8601>
  200:
  {
    "brand_id": "uuid",
    "category": "shirts" | null,
    "count": 12,
    "products": [
      {
        "product_id": "uuid",
        "category": "shirts",
        "product_title": "Italian Wool Suiting" | null,
        "material_note": "Cotton poplin, ivory" | null,
        "website_caption": "Soft-structured cotton shirting, cut for everyday polish.",
        "images": ["https://.../<brand_id>/<asset_id_1>.png", "https://.../<brand_id>/<asset_id_2>.png"],
        "published_at": "2026-08-01T10:15:00Z"
      }
    ]
  }

  GET /api/website/last-updated?brand_id=<uuid>
  200: { "brand_id": "uuid", "last_published_at": "2026-08-01T10:15:00Z" | null }
  ```
  `images` is always an array, even for a product with exactly one published shot.
- Auth: `Authorization: Bearer <token>` — same secret value in Prism-SWH's `WEBSITE_API_KEY` and this repo's `PRISM_API_KEY` (server-side env var only), set by whoever provisions each deployment
- Base URL: this repo reads `PRISM_API_BASE_URL` from its own server-side env — actual value depends on hosting, which isn't decided yet
- Pull mechanism: this repo calls `GET /api/website/products` **once, with no `category` filter**, and derives New Arrivals / per-category views from that single result in memory, using Next's built-in fetch caching (`next: { revalidate: ... }`) to refresh periodically. It does not poll `last-updated` per section or make five separate calls — `last-updated` exists if a cheap pre-check is ever wanted, but isn't required by the fetch-with-revalidate approach.
- No CORS needed — this is a server-to-server call from a Next.js Server Component, not a browser fetch, so Prism's side won't have CORS headers and this repo doesn't need them either
- `images` URLs are always public and non-expiring — link to them directly, never proxy or re-host
