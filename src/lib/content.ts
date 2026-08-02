/* =============================================================================
 * STANDARD WEAR HOUSE — SINGLE CONTENT / DATA FILE
 * -----------------------------------------------------------------------------
 * This is the ONE file to edit to rebrand the site. Replace everything here:
 *   • Brand wordmark / logo SVGs  -> brand.wordmarkInkUrl / wordmarkBoneUrl
 *   • Photography / video         -> imagePool + each product's images[]
 *   • Hero image / video          -> hero.image / hero.video
 *   • Address & Google Maps link  -> contact.address + contact.mapsUrl
 *   • Owner / phone / email       -> contact.owner / phone / email / hours
 *   • WhatsApp number & message   -> contact.whatsappNumber / whatsappMessage
 *   • Social URLs                 -> social.instagram / facebook / x
 *
 * All image paths below point to local files in /public/images (generated
 * editorial placeholders). Swap them for your own photography any time.
 * ========================================================================== */

export type CategoryKey = "suits" | "shirts" | "trousers" | "ethnic" | "ready-made";

export interface Product {
  slug: string;
  title: string;
  category: CategoryKey;
  categoryLabel: string;
  material: string; // short material note
  description: string; // fitting / making description
  images: [string, string, string]; // exactly three
  arrival?: "new"; // marks New Arrivals
}

/* ------------------------------------------------------------------ Brand -- */
export const brand = {
  name: "Standard Wear House",
  shortName: "Standard",
  wordmarkInkUrl: "/images/logo-main.png", // logo for frosted header
  wordmarkBoneUrl: "/images/logo-main.png", // logo over dark / hero
  establishedLabel: "EST. IN BENGALURU",
  tagline: "Bespoke tailoring, made patiently in Bengaluru.",
};

/* ------------------------------------------------------------- Image pool -- */
/* Local editorial placeholders (warm, matte, cinematic). Replace with your
 * own photography. Referenced by products and panels below. */
export const imagePool = {
  hero: "/images/hero.png",
  clothChalk: "/images/cloth-chalk.jpg",
  fabricRolls: "/images/fabric-rolls.jpg",
  tailoringBench: "/images/tailoring-bench.jpg",
  suitLapel: "/images/suit-lapel.png",
  shirtDetail: "/images/shirt-detail.png",
  trousersDetail: "/images/trousers-detail.png",
  ethnicTextile: "/images/ethnic-textile.png",
  readyMadeLook: "/images/ready-made-look.jpg",
  atelier: "/images/atelier.jpg",
};

/* Map each category to its primary editorial image. */
const categoryPrimary: Record<CategoryKey, string> = {
  suits: imagePool.suitLapel,
  shirts: imagePool.shirtDetail,
  trousers: imagePool.trousersDetail,
  ethnic: imagePool.ethnicTextile,
  "ready-made": imagePool.readyMadeLook,
};

/* Secondary detail images cycle through these for cohesive variety. */
const detailRotation = [
  imagePool.clothChalk,
  imagePool.fabricRolls,
  imagePool.tailoringBench,
  imagePool.atelier,
  imagePool.hero,
];

/* Helper: build a 3-image set for a product from its category + index. */
function imagesFor(category: CategoryKey, index: number): [string, string, string] {
  return [
    categoryPrimary[category],
    detailRotation[index % detailRotation.length],
    detailRotation[(index + 2) % detailRotation.length],
  ];
}

/* ----------------------------------------------------------------- Hero ---- */
export const hero = {
  eyebrow: brand.establishedLabel,
  headline: "Cut for the life you lead.",
  supporting: brand.tagline,
  cta: "BOOK A FITTING",
  ctaTarget: "/#contact", // in-page anchor to Contact accordion
  // Optional local muted tailoring video. Leave null to use the cinematic still.
  video: null as string | null,
  image: imagePool.hero,
};

/* ----------------------------------------------------------- Categories --- */
export interface CategoryCard {
  key: CategoryKey;
  index: string; // "01" etc.
  title: string;
  blurb: string;
  image: string;
  route: string;
}

export const categories: CategoryCard[] = [
  { key: "suits", index: "01", title: "Suits", blurb: "Half-canvas tailoring, cut to outlast trends.", image: imagePool.suitLapel, route: "/collections/suits" },
  { key: "shirts", index: "02", title: "Shirts", blurb: "Cottons and linens, measured to the collarbone.", image: imagePool.shirtDetail, route: "/collections/shirts" },
  { key: "trousers", index: "03", title: "Trousers", blurb: "Considered drape, a clean fall, a true crease.", image: imagePool.trousersDetail, route: "/collections/trousers" },
  { key: "ethnic", index: "04", title: "Ethnic", blurb: "Indian cloth, restrained silhouette, quiet craft.", image: imagePool.ethnicTextile, route: "/collections/ethnic" },
  { key: "ready-made", index: "05", title: "Ready-made", blurb: "House blocks, refined proportions, off the rail.", image: imagePool.readyMadeLook, route: "/collections/ready-made" },
];

/* ----------------------------------------------------------- Products ------ */
/* At least 9 products per collection. Placeholder names + material notes. */
type Seed = Omit<Product, "images" | "categoryLabel"> & { category: CategoryKey };

const seeds: Seed[] = [
  // ---- SUITS ----
  { slug: "midnight-super-130s", title: "Midnight Super 130s", category: "suits", material: "Super 130s wool, midnight", description: "A half-canvas two-piece cut from fine Super 130s wool. Soft shoulder, clean chest, a lapel that rolls rather than presses. Made over four fittings so the cloth settles to the body." },
  { slug: "tobacco-irish-linen-suit", title: "Tobacco Irish Linen Suit", category: "suits", material: "Irish linen, tobacco", description: "Bengaluru-weather tailoring. Substantial Irish linen in tobacco, with a relaxed drape and unstructured shoulder. Breathes through the day; creases like linen should." },
  { slug: "charcoal-cavalry-twill-suit", title: "Charcoal Cavalry Twill", category: "suits", material: "Cavalry twill, charcoal", description: "A dense, diagonal cavalry twill with real presence. Built on a firmer canvas for structure; the cloth holds a line through years of wear." },
  { slug: "espresso-herringbone-three-piece", title: "Espresso Herringbone Three-Piece", category: "suits", material: "Wool herringbone, espresso", description: "A three-piece in fine espresso herringbone with a matching waistcoat. Quiet pattern, warm depth, equally right with an open collar or a tie." },
  { slug: "stone-tropical-wool-two-piece", title: "Stone Tropical Wool Two-Piece", category: "suits", material: "Tropical wool, stone", description: "Lightweight tropical wool in stone for the long warm season. A clean, unlined-feeling jacket that still reads tailored." },
  { slug: "navy-fresco-summer-suit", title: "Navy Fresco Summer Suit", category: "suits", material: "Wool fresco, navy", description: "High-twist wool fresco in navy — open, porous, cool. Cut a touch looser for air; the cloth resists wrinkles by design." },
  { slug: "forest-velvet-dinner-jacket", title: "Forest Velvet Dinner Jacket", category: "suits", material: "Cotton velvet, forest", description: "An evening jacket in deep forest cotton velvet, shawl collar, frog-mouth pockets. Quietly formal, never loud." },
  { slug: "bone-mohair-half-canvas-suit", title: "Bone Mohair Half-Canvas", category: "suits", material: "Kid mohair blend, bone", description: "A bone mohair-wool suit with a natural sheen and an exceptionally cool hand. Half-canvas construction; the cloth falls clean and recovers fast." },
  { slug: "slate-prince-of-wales-check", title: "Slate Prince-of-Wales Check", category: "suits", material: "Wool, slate Prince-of-Wales", description: "A scaled Prince-of-Wales check in slate, with an overcheck that reads only up close. A considered pattern for a considered wardrobe." },

  // ---- SHIRTS ----
  { slug: "ivory-cotton-poplin-shirt", title: "Ivory Cotton Poplin", category: "shirts", material: "Cotton poplin, ivory", description: "A crisp two-ply cotton poplin in ivory. Measured to the collarbone, set-in sleeve, mother-of-pearl buttons. The everyday shirt, done properly." },
  { slug: "oxford-cream-tailored-shirt", title: "Oxford Cream Tailored", category: "shirts", material: "Oxford cotton, cream", description: "A soft Oxford-weave cotton in cream with a button-down collar that sits, not flaps. Relaxed enough for the day, precise enough for the evening." },
  { slug: "sky-linen-casual-shirt", title: "Sky Linen Casual", category: "shirts", material: "Linen, sky", description: "A washed linen shirt in a pale sky, camp collar, soft body. For warm evenings when a collar still matters." },
  { slug: "bone-bengali-stripe-shirt", title: "Bone Bengali-Stripe", category: "shirts", material: "Cotton poplin, bengali stripe", description: "A fine bengali-stripe cotton poplin on a bone ground. A pattern with restraint — visible from across a room, quiet up close." },
  { slug: "tobacco-flannel-overshirt", title: "Tobacco Flannel Overshirt", category: "shirts", material: "Cotton flannel, tobacco", description: "A brushed cotton flannel overshirt in tobacco, cut like a jacket, finished like a shirt. The piece between seasons." },
  { slug: "white-sea-island-formal-shirt", title: "White Sea-Island Formal", category: "shirts", material: "Sea-island cotton, white", description: "Sea-island cotton in white, spread collar, French cuffs. The formal shirt, woven from one of the finest cottons grown." },
  { slug: "stone-chambray-shirt", title: "Stone Chambray", category: "shirts", material: "Chambray cotton, stone", description: "A plain-weave chambray in stone with a subtle mottle. Soft from the first wear; ages slowly and well." },
  { slug: "espresso-brushed-cotton-shirt", title: "Espresso Brushed-Cotton", category: "shirts", material: "Brushed cotton, espresso", description: "A brushed cotton shirt in deep espresso, warm to the hand, cut for layering under a jacket or alone." },
  { slug: "sage-twill-spread-collar-shirt", title: "Sage Twill Spread-Collar", category: "shirts", material: "Cotton twill, sage", description: "A cotton twill shirt in sage with a spread collar and a clean placket. A colour that sits between city and country." },

  // ---- TROUSERS ----
  { slug: "charcoal-cavalry-twill-trousers", title: "Charcoal Cavalry Twill Trousers", category: "trousers", material: "Cavalry twill, charcoal", description: "Trousers cut from the same charcoal cavalry twill as the house suit. A true centre crease, side adjusters, a clean taper." },
  { slug: "tobacco-irish-linen-trousers", title: "Tobacco Irish Linen Trousers", category: "trousers", material: "Irish linen, tobacco", description: "Irish linen trousers in tobacco, cut with a touch of room. Falls soft; creases honestly; made for the warm months." },
  { slug: "stone-gabardine-trousers", title: "Stone Gabardine Trousers", category: "trousers", material: "Wool gabardine, stone", description: "A wool gabardine in stone with a tight, clean weave. Holds a crease through a long day; drapes without weight." },
  { slug: "espresso-moleskin-trousers", title: "Espresso Moleskin Trousers", category: "trousers", material: "Cotton moleskin, espresso", description: "A heavy cotton moleskin in espresso, brushed soft inside. Warm, durable, quietly elegant away from the suit." },
  { slug: "bone-cotton-chino-trousers", title: "Bone Cotton Chino", category: "trousers", material: "Cotton chino, bone", description: "A refined chino in bone cotton, slim and straight. The off-duty trouser, cut with the same eye as the suit." },
  { slug: "navy-tropical-wool-trousers", title: "Navy Tropical-Wool Trousers", category: "trousers", material: "Tropical wool, navy", description: "Lightweight tropical wool trousers in navy. Cool, crease-resistant, and easy to dress up or down." },
  { slug: "olive-drill-trousers", title: "Olive Drill Trousers", category: "trousers", material: "Cotton drill, olive", description: "A sturdy cotton drill in olive, cut clean. A quieter alternative to khaki, with more character." },
  { slug: "slate-pleated-wool-trousers", title: "Slate Pleated-Wool Trousers", category: "trousers", material: "Wool flannel, slate", description: "A soft wool flannel in slate with a forward pleat and a generous leg. Drape first; structure second." },
  { slug: "cream-corduroy-trousers", title: "Cream Corduroy Trousers", category: "trousers", material: "Cotton corduroy, cream", description: "A fine-wale cotton corduroy in cream. Warm, textural, and right for the cool months between monsoon and summer." },

  // ---- ETHNIC ----
  { slug: "handwoven-silk-nehru-jacket", title: "Handwoven Silk Nehru Jacket", category: "ethnic", material: "Handwoven silk, muted gold", description: "A Nehru jacket in handwoven silk with a restrained, traditional motif. Cut close, stand collar, lined in cotton. Dignified, never ornamental." },
  { slug: "ivory-bandhgala", title: "Ivory Bandhgala", category: "ethnic", material: "Silk-cotton, ivory", description: "A bandhgala in ivory silk-cotton, structured through the chest, soft at the shoulder. A formal Indian silhouette with a contemporary calm." },
  { slug: "tobacco-khadi-kurta", title: "Tobacco Khadi Kurta", category: "ethnic", material: "Khadi cotton, tobacco", description: "A handspun khadi kurta in tobacco. The cloth has life — slubs, weight, breath. Cut long, worn easy." },
  { slug: "gold-silk-cotton-sherwani", title: "Gold Silk-Cotton Sherwani", category: "ethnic", material: "Silk-cotton, muted gold", description: "A sherwani in muted gold silk-cotton with minimal hand-finished detailing. Formal Indian menswear, edited to its essentials." },
  { slug: "stone-linen-achkan", title: "Stone Linen Achkan", category: "ethnic", material: "Linen, stone", description: "A long-line achkan in stone linen for warm-weather occasions. Quiet, cool, and unmistakably considered." },
  { slug: "espresso-silk-modi-jacket", title: "Espresso Silk Modi Jacket", category: "ethnic", material: "Silk, espresso", description: "A short Modi jacket in espresso silk, cut to layer over a kurta or a shirt. A small piece with real presence." },
  { slug: "bone-chanderi-kurta-set", title: "Bone Chanderi Kurta Set", category: "ethnic", material: "Chanderi cotton-silk, bone", description: "A kurta and churidar set in fine Chanderi cotton-silk, bone. Sheer in the right light, weightless to wear." },
  { slug: "forest-velvet-bandhgala", title: "Forest Velvet Bandhgala", category: "ethnic", material: "Silk velvet, forest", description: "A bandhgala in deep forest silk velvet for the evening. Lustrous without shine, structured without stiffness." },
  { slug: "muted-gold-brocade-nehru", title: "Muted-Gold Brocade Nehru", category: "ethnic", material: "Woven brocade, muted gold", description: "A Nehru jacket in a muted-gold woven brocade with a traditional but restrained pattern. A piece for the few, not the many." },

  // ---- READY-MADE ----
  { slug: "tobacco-linen-rtw-suit", title: "Tobacco Linen RTW Suit", category: "ready-made", material: "Irish linen, tobacco", description: "The house linen suit, off the rail in tobacco. Cut on the ready-made block with the same proportions as bespoke; tailored finishing." },
  { slug: "ivory-poplin-rtw-shirt", title: "Ivory Poplin RTW Shirt", category: "ready-made", material: "Cotton poplin, ivory", description: "The house ivory poplin shirt in ready-made sizes. Same cloth, same collar, measured to a standard block." },
  { slug: "stone-gabardine-rtw-trousers", title: "Stone Gabardine RTW Trousers", category: "ready-made", material: "Wool gabardine, stone", description: "Stone gabardine trousers off the rail, with the house taper and a finished hem ready to break on the shoe." },
  { slug: "espresso-wool-rtw-blazer", title: "Espresso Wool RTW Blazer", category: "ready-made", material: "Wool, espresso", description: "An unstructured espresso wool blazer in ready-made sizes. Soft shoulder, patch pockets, wears like a jacket should." },
  { slug: "charcoal-twill-rtw-trousers", title: "Charcoal Twill RTW Trousers", category: "ready-made", material: "Cotton twill, charcoal", description: "Charcoal cotton twill trousers, ready-made, with a clean straight leg and side adjusters." },
  { slug: "bone-oxford-rtw-shirt", title: "Bone Oxford RTW Shirt", category: "ready-made", material: "Oxford cotton, bone", description: "A bone Oxford shirt off the rail. Button-down collar, soft body, the easy shirt in a ready-made block." },
  { slug: "navy-fresco-rtw-suit", title: "Navy Fresco RTW Suit", category: "ready-made", material: "Wool fresco, navy", description: "The navy fresco summer suit in ready-made sizes. Cool, light, and crease-resistant straight off the block." },
  { slug: "olive-drill-rtw-trousers", title: "Olive Drill RTW Trousers", category: "ready-made", material: "Cotton drill, olive", description: "Olive cotton drill trousers, ready-made. Sturdy, quiet, and easy to wear with anything." },
  { slug: "slate-check-rtw-blazer", title: "Slate Check RTW Blazer", category: "ready-made", material: "Wool, slate check", description: "A slate check wool blazer off the rail. A scaled pattern that reads as solid from a distance, textured up close." },
];

export const categoryLabels: Record<CategoryKey, string> = {
  suits: "Suits",
  shirts: "Shirts",
  trousers: "Trousers",
  ethnic: "Ethnic",
  "ready-made": "Ready-made",
};

// Assign images + label, keep category order for stable indices.
export const products: Product[] = seeds.map((s, i) => {
  // index within its own category for image rotation
  const catStart = seeds.findIndex((x) => x.category === s.category);
  const localIndex = i - catStart;
  return {
    ...s,
    categoryLabel: categoryLabels[s.category],
    images: imagesFor(s.category, localIndex),
  };
});

/* Quick lookup by slug. */
export const productBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

/* Products grouped by category (preserves insertion order). */
export const productsByCategory = (cat: CategoryKey): Product[] =>
  products.filter((p) => p.category === cat);

/* ------------------------------------------------------- New Arrivals ------ */
/* Exactly five, spanning the collections. Marked as arrivals on each. */
export const newArrivals: Product[] = [
  "midnight-super-130s",
  "ivory-cotton-poplin-shirt",
  "charcoal-cavalry-twill-trousers",
  "handwoven-silk-nehru-jacket",
  "tobacco-linen-rtw-suit",
]
  .map((slug) => productBySlug(slug)!)
  .map((p) => ({ ...p, arrival: "new" as const }));

/* ----------------------------------------------------------- Contact ------- */
/* EDITABLE. Marked as placeholders. */
export const contact = {
  owner: "Owner's Name (placeholder)",
  phone: "+91 90000 00000",
  email: "hello@standardwearhouse.in",
  hours: "By appointment — Tue–Sun, 11:00–19:00",
  address: {
    line1: "Standard Wear House",
    line2: "Bengaluru, Karnataka, India",
    note: "By appointment",
  },
  // Placeholder Google Maps search link — replace with your exact pin.
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Standard+Wear+House+Bengaluru",
  // Placeholder WhatsApp number — replace 919000000000 with your own.
  whatsappNumber: "919000000000",
  whatsappMessage: "Hello Standard Wear House, I'd like to book a fitting consultation.",
};

export const whatsappUrl = (message: string = contact.whatsappMessage): string =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;

/* ------------------------------------------------------------- Social ------ */
export const social = {
  instagram: "https://instagram.com/", // placeholder
  facebook: "https://facebook.com/", // placeholder
  x: "https://x.com/", // placeholder
};

/* ----------------------------------------------------------- Navigation ---- */
/* Used by the StaggeredMenu. Routes match the hash router. */
export interface NavItem {
  label: string;
  route: string; // hash route or in-page anchor
}

export const navItems: NavItem[] = [
  { label: "Home", route: "/" },
  { label: "New Arrivals", route: "/new-arrivals" },
  { label: "Suits", route: "/collections/suits" },
  { label: "Shirts", route: "/collections/shirts" },
  { label: "Trousers", route: "/collections/trousers" },
  { label: "Ethnic", route: "/collections/ethnic" },
  { label: "Ready-made", route: "/collections/ready-made" },
  { label: "Legacy", route: "/#legacy" },
  { label: "Visit Us", route: "/#visit" },
  { label: "Contact", route: "/#contact" },
];

/* -------------------------------------------------- Collection metadata ---- */
/* Editorial header copy for each collection page + New Arrivals. Editable. */
export interface CollectionMeta {
  title: string;
  eyebrow: string;
  intro: string;
}

export const collectionMeta: Record<CategoryKey | "new-arrivals", CollectionMeta> = {
  "new-arrivals": {
    title: "New Arrivals",
    eyebrow: "The Season’s First Cut",
    intro: "A quiet edit of new cloth and considered shapes, freshly off the bench.",
  },
  suits: {
    title: "Suits",
    eyebrow: "Half-Canvas Tailoring",
    intro: "Two-piece and three-piece tailoring, cut on the house block and shaped over fittings. Cloth chosen by hand, shoulders set soft, a lapel that rolls.",
  },
  shirts: {
    title: "Shirts",
    eyebrow: "Measured to the Collarbone",
    intro: "Cottons and linens, cut clean through the body, collars that sit rather than flap. The everyday shirt, made the patient way.",
  },
  trousers: {
    title: "Trousers",
    eyebrow: "Considered Drape",
    intro: "A true centre crease, side adjusters, a clean taper. Trousers cut to fall, in wool, linen, moleskin and drill.",
  },
  ethnic: {
    title: "Ethnic",
    eyebrow: "Indian Cloth, Quiet Silhouette",
    intro: "Handwoven silk, khadi and Chanderi, cut into bandhgalas, Nehru jackets and kurtas. Dignified Indian tailoring, edited to its essentials.",
  },
  "ready-made": {
    title: "Ready-made",
    eyebrow: "House Blocks, Off the Rail",
    intro: "The same proportions as bespoke, cut to standard blocks and finished in the house. Tailored ready-to-wear, refined not generic.",
  },
};

