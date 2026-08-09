"use client";
import { useRoute, useScrollManager } from "@/lib/router";
import {
  newArrivals as getNewArrivals,
  productsByCategory,
  productBySlug,
} from "@/lib/products";
import { ProductsProvider } from "@/lib/products-context";
import type { Product } from "@/lib/products";
import { collectionMeta, type CategoryKey } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/components/Home";
import CollectionPage from "@/components/CollectionPage";
import ProductPage, { ProductNotFound } from "@/components/ProductPage";
import { ScrollProgress } from "@/components/ui/scroll-progress";

interface AppShellProps {
  products: Product[];
}

const VALID_CATEGORIES: CategoryKey[] = [
  "suits",
  "shirts",
  "trousers",
  "ethnic",
  "ready-made",
];

function NotFound() {
  return (
    <div
      className="page"
      style={{
        minHeight: "70svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 var(--inset)",
      }}
    >
      <div>
        <span className="eyebrow">Not found</span>
        <h1
          style={{
            fontSize: "clamp(36px,10vw,64px)",
            fontWeight: 500,
            margin: "10px 0 16px",
          }}
        >
          This page is not on the bench.
        </h1>
        <p style={{ color: "var(--tobacco)", marginBottom: 24 }}>
          The page you&apos;re looking for has moved or was never cut.
        </p>
        <a
          className="btn-solid"
          href="#/"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          RETURN HOME <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}

function renderRoute(
  path: string,
  segments: string[],
  products: Product[]
) {
  // Home
  if (path === "/" || segments.length === 0) {
    return <Home newArrivals={getNewArrivals(products)} />;
  }

  // New Arrivals
  if (segments[0] === "new-arrivals" && segments.length === 1) {
    const meta = collectionMeta["new-arrivals"];
    return (
      <CollectionPage
        title={meta.title}
        eyebrow={meta.eyebrow}
        intro={meta.intro}
        products={getNewArrivals(products)}
      />
    );
  }

  // Collections
  if (segments[0] === "collections" && segments.length === 2) {
    const cat = segments[1] as CategoryKey;
    if (VALID_CATEGORIES.includes(cat)) {
      const meta = collectionMeta[cat];
      return (
        <CollectionPage
          title={meta.title}
          eyebrow={meta.eyebrow}
          intro={meta.intro}
          products={productsByCategory(products, cat)}
        />
      );
    }
    return <NotFound />;
  }

  // Products
  if (segments[0] === "products" && segments.length === 2) {
    const slug = segments[1];
    const product = productBySlug(products, slug);
    if (product) return <ProductPage key={product.slug} product={product} />;
    return <ProductNotFound slug={slug} />;
  }

  return <NotFound />;
}

export default function AppShell({ products }: AppShellProps) {
  const route = useRoute();
  useScrollManager(route);

  return (
    <ProductsProvider value={products}>
      <div className="app-shell">
        <ScrollProgress />
        <Header path={route.path} />
        <main className="app-main">
          {renderRoute(route.path, route.segments, products)}
        </main>
        <Footer />
      </div>
    </ProductsProvider>
  );
}
