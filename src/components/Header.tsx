"use client";
import { useEffect, useRef, useState } from "react";
import "./Wordmark.css";
import "./Header.css";
import Wordmark from "./Wordmark";
import StaggeredMenu, { type MenuItem, type MenuSocial } from "./StaggeredMenu";
import { navItems, social, brand } from "@/lib/content";
import { navigate } from "@/lib/router";

interface HeaderProps {
  path: string; // current route path
}

export default function Header({ path }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  const isHome = path === "/";
  // overHero is only true on home AND while the hero is in view.
  const overHero = isHome && heroVisible;

  // Observe the hero to switch header state (transparent over hero, frosted after).
  useEffect(() => {
    if (!isHome) return; // nothing to observe on other routes
    let cancelled = false;
    let tries = 0;
    const attach = () => {
      if (cancelled) return;
      const el = document.getElementById("hero");
      if (el) {
        const obs = new IntersectionObserver(
          (entries) => {
            const e = entries[0];
            setHeroVisible(e.isIntersecting && e.intersectionRatio > 0.2);
          },
          { threshold: [0, 0.2, 0.5, 0.9] }
        );
        obs.observe(el);
        cleanupRef.current = () => obs.disconnect();
      } else if (tries < 25) {
        tries += 1;
        setTimeout(attach, 80);
      }
    };
    attach();
    return () => {
      cancelled = true;
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [isHome]);

  // The menu closes itself on item navigation; the wordmark click also closes
  // it (see goHome). No route-change effect needed.

  const wordmarkBone = menuOpen || (isHome && overHero);
  const frosted = !isHome || !overHero;
  const barState = menuOpen ? "transparent" : frosted ? "frosted" : "transparent";
  const closedTheme = isHome && overHero ? "light" : "dark";

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate("/");
  };

  const menuItems: MenuItem[] = navItems.map((n) => ({ label: n.label, route: n.route }));
  const menuSocials: MenuSocial[] = [
    { label: "Instagram", url: social.instagram, icon: "instagram" },
    { label: "Facebook", url: social.facebook, icon: "facebook" },
    { label: "X", url: social.x, icon: "x" },
  ];

  return (
    <>
      <header
        className="site-header"
        data-state={barState}
        data-menuopen={menuOpen ? "true" : "false"}
        style={{ zIndex: menuOpen ? 100 : 50 }}
      >
        <div className="site-header__inner">
          <Wordmark
            tone={wordmarkBone ? "bone" : "ink"}
            href="#/"
            onClick={goHome}
          />
        </div>
      </header>

      <StaggeredMenu
        open={menuOpen}
        onOpenChange={setMenuOpen}
        items={menuItems}
        socials={menuSocials}
        logoUrl={brand.wordmarkBoneUrl}
        isFixed
        position="right"
        displaySocials
        displayItemNumbering
        changeMenuColorOnOpen
        closedTheme={closedTheme}
        onNavigate={(route) => navigate(route)}
      />
    </>
  );
}
