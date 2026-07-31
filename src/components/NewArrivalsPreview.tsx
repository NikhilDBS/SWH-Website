"use client";
import { newArrivals } from "@/lib/content";
import { AppLink } from "@/lib/router";
import { useInView } from "@/lib/useInView";
import "./Home.css";

export default function NewArrivalsPreview() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section className="snap-panel" aria-label="New Arrivals preview">
      <div className="outer-card">
        <div className={`outer-card__head reveal${inView ? " is-in" : ""}`} ref={ref}>
          <span className="eyebrow outer-card__index">02 — New Arrivals</span>
          <h2 className="outer-card__title">The season’s first cut.</h2>
          <p className="outer-card__intro">
            A quiet edit of new cloth and considered shapes, freshly off the bench.
          </p>
        </div>

        <div className="h-rail warm-scroll" role="list" aria-label="New arrivals">
          {newArrivals.map((p) => (
            <AppLink
              key={p.slug}
              to={`/products/${p.slug}`}
              className="prev-card"
              role="listitem"
              aria-label={`${p.title} — ${p.material}`}
            >
              <div className="prev-card__img">
                <img
                  className="editorial-img"
                  src={p.images[0]}
                  alt={`${p.title} — ${p.material}`}
                  loading="lazy"
                />
                <span className="prev-card__arrow" aria-hidden="true">→</span>
              </div>
              <div className="prev-card__meta">
                <span className="eyebrow eyebrow--mute" style={{ fontSize: "10px" }}>{p.categoryLabel}</span>
                <span className="prev-card__name">{p.title}</span>
                <span className="prev-card__mat">{p.material}</span>
              </div>
            </AppLink>
          ))}
        </div>

        <div className="outer-card__foot">
          <AppLink to="/new-arrivals" className="text-cta">
            SEE ALL NEW ARRIVALS <span aria-hidden="true">→</span>
          </AppLink>
        </div>
      </div>
    </section>
  );
}
