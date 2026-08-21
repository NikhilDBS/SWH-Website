"use client";
import type { Product } from "@/lib/products";
import Hero from "./Hero";
import NewArrivalsPreview from "./NewArrivalsPreview";
import CategoriesPanel from "./CategoriesPanel";
import VisitHouse from "./VisitHouse";
import LegacyContact from "./LegacyContact";

interface HomeProps {
  newArrivals: Product[];
}

export default function Home({ newArrivals }: HomeProps) {
  return (
    <>
      <div className="home-snap warm-scroll" aria-label="Featured panels">
        <Hero />
        <NewArrivalsPreview newArrivals={newArrivals} />
        <CategoriesPanel />
        <VisitHouse />
      </div>
      <LegacyContact />
    </>
  );
}
