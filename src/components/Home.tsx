"use client";
import Hero from "./Hero";
import NewArrivalsPreview from "./NewArrivalsPreview";
import CategoriesPanel from "./CategoriesPanel";
import VisitHouse from "./VisitHouse";
import LegacyContact from "./LegacyContact";

export default function Home() {
  return (
    <>
      <div className="home-snap warm-scroll" aria-label="Featured panels">
        <Hero />
        <NewArrivalsPreview />
        <CategoriesPanel />
        <VisitHouse />
      </div>
      <LegacyContact />
    </>
  );
}
