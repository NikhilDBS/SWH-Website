"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import "./Wordmark.css";
import "./Header.css";
import StaggeredMenu, {
  type StaggeredMenuItem,
  type StaggeredMenuSocialItem,
} from "./StaggeredMenu";
import { navItems, social, brand } from "@/lib/content";
import { navigate } from "@/lib/router";

interface HeaderProps {
  path: string; // current route path
}

export default function Header({ path }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const toggleMenuRef = useRef<(() => void) | null>(null);
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

  const frosted = !isHome || !overHero;
  const barState = menuOpen ? "transparent" : frosted ? "frosted" : "transparent";

  // Derive toggle button colour from header context
  const closedButtonColor = isHome && overHero ? "#F3F0E9" : "#171512"; // bone over hero, ink otherwise

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate("/");
  };

  // Map navItems to StaggeredMenu format
  const menuItems: StaggeredMenuItem[] = navItems.map((n) => ({
    label: n.label,
    ariaLabel: `Go to ${n.label}`,
    link: n.route,
  }));

  const menuSocials: StaggeredMenuSocialItem[] = [
    { label: "Instagram", link: social.instagram },
    { label: "Facebook", link: social.facebook },
    { label: "X", link: social.x },
  ];

  const handleToggleClick = useCallback(() => {
    toggleMenuRef.current?.();
  }, []);

  return (
    <>
      <header
        className="site-header"
        data-state={barState}
        data-menuopen={menuOpen ? "true" : "false"}
      >
        <div className="site-header__inner">
          <a href="#/" className="site-header__logo" onClick={goHome} aria-label="Standard Wear House — home">
            <img
              src="/images/logo-main.png"
              alt="Standard Wear House"
              className={"site-header__logo-img" + (isHome && overHero ? " site-header__logo-img--over-hero" : "")}
              width={140}
              height={36}
              style={{
                height: "32px",
                width: "auto",
                objectFit: "contain",
                transition: "filter 0.5s ease",
              }}
            />
          </a>

          <button
            className="site-header__menu-btn"
            onClick={handleToggleClick}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className="site-header__menu-text">{menuOpen ? "Close" : "Menu"}</span>
            <span className={"site-header__menu-icon" + (menuOpen ? " site-header__menu-icon--open" : "")}>
              <span className="site-header__menu-icon-line" />
              <span className="site-header__menu-icon-line site-header__menu-icon-line--v" />
            </span>
          </button>
        </div>
      </header>

      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={menuSocials}
        displaySocials
        displayItemNumbering
        logoUrl="/images/logo-main.png"
        menuButtonColor={closedButtonColor}
        openMenuButtonColor="#F3F0E9"
        changeMenuColorOnOpen
        colors={["#80654F", "#2A241E"]}
        accentColor="#B99B78"
        isFixed
        hideHeader
        onToggleRef={toggleMenuRef}
        onMenuOpen={() => setMenuOpen(true)}
        onMenuClose={() => setMenuOpen(false)}
        onNavigate={(route) => navigate(route)}
      />
    </>
  );
}
