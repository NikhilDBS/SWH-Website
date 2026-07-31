"use client";
import { hero } from "@/lib/content";
import { navigate } from "@/lib/router";
import "./Home.css";

export default function Hero() {
  return (
    <section className="snap-panel hero" id="hero" aria-label="Standard Wear House">
      {hero.video ? (
        <video
          className="hero__media editorial-img"
          autoPlay muted loop playsInline
          poster={hero.image}
          aria-hidden="true"
        >
          <source src={hero.video} type="video/mp4" />
        </video>
      ) : (
        <img
          className="hero__media editorial-img"
          src={hero.image}
          alt="A master tailor marking chalk on dark wool cloth at a cutting table"
          fetchPriority="high"
        />
      )}
      <div className="hero__scrim" aria-hidden="true" />
      <div className="hero__content">
        <span className="eyebrow eyebrow--bone hero__eyebrow">{hero.eyebrow}</span>
        <h1 className="hero__title">{hero.headline}</h1>
        <p className="hero__supporting">{hero.supporting}</p>
        <button
          type="button"
          className="text-cta text-cta--bone hero__cta"
          onClick={() => navigate("/#contact")}
        >
          {hero.cta} <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
