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

export const categoryLabels: Record<CategoryKey, string> = {
  suits: "Suits",
  shirts: "Shirts",
  trousers: "Trousers",
  ethnic: "Ethnic",
  "ready-made": "Ready-made",
};



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

