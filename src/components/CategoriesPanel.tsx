"use client";
import { categories } from "@/lib/content";
import { AppLink } from "@/lib/router";
import { useInView } from "@/lib/useInView";
import "./Home.css";

export default function CategoriesPanel() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section className="snap-panel" aria-label="Categories">
      <div className="outer-card">
        <div className={`outer-card__head reveal${inView ? " is-in" : ""}`} ref={ref}>
          <span className="eyebrow outer-card__index">03 — Categories</span>
          <h2 className="outer-card__title">Five houses of cloth.</h2>
          <p className="outer-card__intro">
            From half-canvas suiting to handwoven ethnic tailoring — explore the house by craft.
          </p>
        </div>

        <div className="h-rail warm-scroll" role="list" aria-label="Categories">
          {categories.map((c) => (
            <AppLink
              key={c.key}
              to={c.route}
              className="cat-card"
              role="listitem"
              aria-label={`${c.title} — ${c.blurb}`}
            >
              <div className="cat-card__img">
                <img
                  className="editorial-img"
                  src={c.image}
                  alt={`${c.title} — ${c.blurb}`}
                  loading="lazy"
                />
                <span className="cat-card__scrim" aria-hidden="true" />
                <span className="cat-card__index">{c.index}</span>
                <span className="cat-card__title-on">{c.title}</span>
              </div>
              <div className="cat-card__meta">
                <span className="cat-card__explore">Explore</span>
                <span className="cat-card__explore" aria-hidden="true">→</span>
              </div>
            </AppLink>
          ))}
        </div>
      </div>
    </section>
  );
}
