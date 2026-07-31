# Standard Wear House

A polished, mobile-first, fully navigable site for an Indian bespoke tailoring
house — a contemporary Bengaluru tailoring house with the formality of Savile
Row and a subtle Indian textile sensibility. No checkout; product CTAs lead to a
fitting consultation / WhatsApp enquiry.

> Built on **Next.js 16 + TypeScript** (the project's non-negotiable stack). All
> requested routes work as **real, deep-linkable hash URLs** within the single
> user-visible `/` route (e.g. `/#/collections/suits`, `/#/products/<slug>`),
> powered by a small `useSyncExternalStore` hash router in `src/lib/router.tsx`.
> The `StaggeredMenu` uses **gsap** as required.

## Routes

- `/#/` — Home (full-bleed hero + 4 snap panels + Legacy/Contact accordions)
- `/#/new-arrivals` — full New Arrivals collection
- `/#/collections/suits` · `/shirts` · `/trousers` · `/ethnic` · `/ready-made`
- `/#/products/:slug` — reusable, data-driven product detail (3-image carousel)

## The ONE data file to edit

**`src/lib/content.ts`** — this is the single source of truth. Replace
everything here to rebrand the site:

| What to replace | Where in `content.ts` |
|---|---|
| Wordmark / logo SVGs | `brand.wordmarkInkUrl`, `brand.wordmarkBoneUrl` (files in `/public/wordmark-*.svg`) |
| Hero photo / video | `hero.image` / `hero.video` |
| Product & category photography | `imagePool` + each product's `images[]` (local files in `/public/images/`) |
| Address & Google Maps link | `contact.address` + `contact.mapsUrl` |
| Owner / phone / email / hours | `contact.owner` / `phone` / `email` / `hours` |
| WhatsApp number & message | `contact.whatsappNumber` / `contact.whatsappMessage` |
| Social URLs | `social.instagram` / `facebook` / `x` |
| Nav labels & routes | `navItems` |
| Collection header copy | `collectionMeta` |
| Products (slug, title, material, description, images) | `seeds` array (9+ per collection) |

All images in `/public/images/` are AI-generated editorial placeholders on a
warm, matte, cinematic art direction — swap them for your own photography. All
contact details, the WhatsApp number, and social URLs are **placeholders**
(`919000000000`, `https://instagram.com/`, etc.) — replace before launch.

## Run

```bash
bun run dev      # http://localhost:3000 (preview via the Preview Panel)
bun run lint
```

## Notes

- Home uses native CSS scroll-snap (`y mandatory` on touch, `proximity` on
  desktop, disabled for reduced motion). Horizontal rails snap on `x`.
- The frosted header appears only after leaving the hero (IntersectionObserver).
- The `StaggeredMenu` is the sole hamburger: gsap layered-panel entrance,
  plus-to-close icon, Menu/Close cycling, staggered numbered labels, socials,
  full-screen on mobile, deep ink/espresso panel with bone text.
- No prices, cart, reviews, or stock — bespoke discovery only.
- Tested at 412×915, 360×780, and 768×1024.
