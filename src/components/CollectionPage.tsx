"use client";
import type { Product } from "@/lib/content";
import { AppLink, navigate } from "@/lib/router";
import "./Collection.css";

interface CollectionPageProps {
  title: string;
  eyebrow: string;
  intro: string;
  products: Product[];
}

/* Chunk products into groups of 3 for the bento pattern. */
function chunk3(arr: Product[]): Product[][] {
  const out: Product[][] = [];
  for (let i = 0; i < arr.length; i += 3) out.push(arr.slice(i, i + 3));
  return out;
}

export default function CollectionPage({ title, eyebrow, intro, products }: CollectionPageProps) {
  const groups = chunk3(products);

  return (
    <div className="page collection">
      <header className="collection__head anchor-target">
        <button
          type="button"
          className="text-cta collection__back"
          onClick={() => navigate("/")}
        >
          <span aria-hidden="true">←</span> Home
        </button>
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="collection__title">{title}</h1>
        <p className="collection__intro">{intro}</p>
        <span className="collection__count">{products.length} pieces</span>
      </header>

      <div className="bento">
        {groups.map((group, gi) => {
          // group has up to 3 products: [a, b, large]
          const largeSide = gi % 2 === 0 ? "right" : "left"; // alternate
          const a = group[0];
          const b = group[1];
          const large = group[2];
          if (!large) {
            // fewer than 3 in the last group: render as simple small tiles
            return (
              <div className="bento-group bento-group--tail" key={gi}>
                {group.map((p) => (
                  <BentoTile key={p.slug} p={p} size="small" />
                ))}
              </div>
            );
          }
          return (
            <div
              className={`bento-group bento-group--large-${largeSide}`}
              key={gi}
            >
              <BentoTile p={a} size="small" />
              <BentoTile p={b} size="small" />
              <BentoTile p={large} size="large" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BentoTile({ p, size }: { p: Product; size: "small" | "large" }) {
  return (
    <AppLink
      to={`/products/${p.slug}`}
      className={`bento-tile bento-tile--${size}`}
      aria-label={`${p.title} — ${p.material}`}
    >
      <div className="bento-tile__img">
        <img
          className="editorial-img"
          src={p.images[0]}
          alt={`${p.title} — ${p.material}`}
          loading="lazy"
        />
        <span className="bento-tile__cat eyebrow eyebrow--mute">{p.categoryLabel}</span>
      </div>
      <div className="bento-tile__caption">
        <span className="bento-tile__name">{p.title}</span>
        <span className="bento-tile__mat">{p.material}</span>
      </div>
    </AppLink>
  );
}
