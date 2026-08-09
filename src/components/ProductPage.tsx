"use client";
import type { Product } from "@/lib/products";
import { productsByCategory } from "@/lib/products";
import { useProducts } from "@/lib/products-context";
import { whatsappUrl, categoryLabels } from "@/lib/content";
import type { CategoryKey } from "@/lib/content";
import { AppLink, navigate } from "@/lib/router";
import "./Product.css";

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
  const waMessage = `Hello Standard Wear House, I'd like a fitting consultation about the ${product.title} (${product.material}).`;

  return (
    <div className="page product">
      <nav className="product__crumb" aria-label="Breadcrumb">
        <AppLink to="/" className="product__crumb-link">Home</AppLink>
        <span aria-hidden="true">/</span>
        <AppLink to={`/collections/${product.category}`} className="product__crumb-link">
          {product.categoryLabel}
        </AppLink>
        <span aria-hidden="true">/</span>
        <span className="product__crumb-current">{product.title}</span>
      </nav>

      {/* Vertical image stack */}
      <div className="pgallery" aria-label={`${product.title} images`}>
        {product.images.map((src, i) => (
          <div className="pgallery__img-wrap" key={i}>
            <img
              className="pgallery__img"
              src={src}
              alt={`${product.title} — view ${i + 1}`}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Details */}
      <div className="product__detail">
        <span className="eyebrow">{product.categoryLabel}</span>
        <h1 className="product__title">{product.title}</h1>
        <p className="product__material">{product.material}</p>

        <div className="product__making">
          <span className="eyebrow eyebrow--mute" style={{ display: "block", marginBottom: 12 }}>The Making</span>
          <p>{product.description}</p>
        </div>

        <div className="product__cta-block">
          <a
            className="btn-solid product__cta"
            href={whatsappUrl(waMessage)}
            target="_blank"
            rel="noreferrer"
          >
            BOOK A FITTING CONSULTATION <span aria-hidden="true">→</span>
          </a>
          <p className="product__cta-note">
            Bespoke, by appointment. No checkout — every piece begins with a conversation.
          </p>
        </div>
      </div>

      {/* More in category */}
      <MoreInCategory category={product.category} currentSlug={product.slug} />
    </div>
  );
}

function MoreInCategory({ category, currentSlug }: { category: CategoryKey; currentSlug: string }) {
  const allProducts = useProducts();
  const more = productsByCategory(allProducts, category).filter((p) => p.slug !== currentSlug).slice(0, 4);
  if (more.length === 0) return null;
  return (
    <section className="product__more" aria-label={`More ${categoryLabels[category]}`}>
      <div className="product__more-head">
        <span className="eyebrow">More in {categoryLabels[category]}</span>
        <AppLink to={`/collections/${category}`} className="text-cta">
          VIEW ALL <span aria-hidden="true">→</span>
        </AppLink>
      </div>
      <div className="h-rail warm-scroll">
        {more.map((p) => (
          <AppLink key={p.slug} to={`/products/${p.slug}`} className="prev-card">
            <div className="prev-card__img">
              <img className="editorial-img" src={p.images[0]} alt={`${p.title} — ${p.material}`} loading="lazy" />
            </div>
            <div className="prev-card__meta">
              <span className="prev-card__name">{p.title}</span>
              <span className="prev-card__mat">{p.material}</span>
            </div>
          </AppLink>
        ))}
      </div>
    </section>
  );
}

export function ProductNotFound({ slug }: { slug: string }) {
  return (
    <div className="page product product--notfound">
      <div className="product__notfound">
        <span className="eyebrow">Not found</span>
        <h1 className="product__title">This piece is not on the bench.</h1>
        <p className="product__material">
          We couldn't find "{slug}". It may have been moved or retired.
        </p>
        <div className="product__cta-block">
          <button type="button" className="btn-solid" onClick={() => navigate("/")}>
            RETURN HOME <span aria-hidden="true">→</span>
          </button>
          <AppLink to="/new-arrivals" className="text-cta" style={{ marginTop: 14 }}>
            BROWSE NEW ARRIVALS <span aria-hidden="true">→</span>
          </AppLink>
        </div>
      </div>
    </div>
  );
}
