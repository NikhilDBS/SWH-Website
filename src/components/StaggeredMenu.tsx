"use client";
import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import "./StaggeredMenu.css";

/* =============================================================================
 * StaggeredMenu — mandatory hamburger menu component.
 * GSAP layered-panel entrance (tobacco / espresso / ink underlays cascade in
 * from the right), plus-to-close icon, cycling Menu/Close text, staggered
 * item labels with numbering, and social links. Brand overrides make the open
 * panel deep ink/espresso with bone text and a muted brass accent.
 *
 * NOTE: The original supplied source referenced Markdown-corrupted method calls
 * (e.g. [gsap.to](...), [layers.map](...), event.target, it.link). These have
 * been repaired to normal JS expressions. The DOM structure and GSAP
 * choreography follow the original intent.
 * ========================================================================== */

export interface MenuItem {
  label: string;
  route: string;
}
export interface MenuSocial {
  label: string;
  url: string;
  icon?: "instagram" | "facebook" | "x";
}

interface StaggeredMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: MenuItem[];
  socials: MenuSocial[];
  logoUrl: string;
  isFixed?: boolean;
  position?: "left" | "right";
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  changeMenuColorOnOpen?: boolean;
  closedTheme?: "light" | "dark"; // light = bone control (over hero); dark = ink control (frosted)
  onNavigate?: (route: string) => void;
}

export default function StaggeredMenu({
  open,
  onOpenChange,
  items,
  socials,
  logoUrl,
  isFixed = true,
  position = "right",
  displaySocials = true,
  displayItemNumbering = true,
  changeMenuColorOnOpen = true,
  closedTheme = "dark",
  onNavigate,
}: StaggeredMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const underlayRefs = useRef<HTMLDivElement[]>([]);
  const innerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLButtonElement[]>([]);
  const socialRefs = useRef<HTMLAnchorElement[]>([]);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const prefersReduced = typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const setUnderlay = (el: HTMLDivElement | null, i: number) => {
    if (el) underlayRefs.current[i] = el;
  };
  const setItem = (el: HTMLButtonElement | null, i: number) => {
    if (el) itemRefs.current[i] = el;
  };
  const setSocial = (el: HTMLAnchorElement | null, i: number) => {
    if (el) socialRefs.current[i] = el;
  };

  const toggle = useCallback(() => onOpenChange(!open), [open, onOpenChange]);

  // Build open timeline once.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });
      const underlays = underlayRefs.current.filter(Boolean);
      const itemsEls = itemRefs.current.filter(Boolean);
      const socialEls = socialRefs.current.filter(Boolean);

      gsap.set(underlays, { xPercent: 100 });
      tl.to(underlays, {
        xPercent: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.07,
      }, 0);
      tl.fromTo(innerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35 }, 0.35);
      tl.fromTo(itemsEls, { yPercent: 120, opacity: 0 }, {
        yPercent: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.06,
      }, 0.45);
      if (socialEls.length) {
        tl.fromTo(socialEls, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 }, 0.7);
      }
      tlRef.current = tl;
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // Play/reverse on open change.
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    const panel = panelRef.current;
    if (!panel) return;

    if (open) {
      lastFocused.current = document.activeElement as HTMLElement;
      panel.style.visibility = "visible";
      document.body.style.overflow = "hidden";
      // restart timeline from start
      tl.pause(0).play();
      // focus first item shortly after
      const t = setTimeout(() => {
        const first = itemRefs.current.find(Boolean);
        first?.focus();
      }, 650);
      return () => clearTimeout(t);
    } else {
      tl.reverse();
      const onReverse = () => {
        if (tl.reversed() && tl.progress() === 0) {
          panel.style.visibility = "hidden";
          tl.eventCallback("onReverseComplete", null);
        }
      };
      tl.eventCallback("onReverseComplete", onReverse);
      document.body.style.overflow = "";
      // restore focus to toggle
      toggleRef.current?.focus();
    }
  }, [open]);

  // Keyboard: Escape to close, basic focus trap.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange(false);
      }
      if (e.key === "Tab") {
        const focusables = [
          toggleRef.current,
          ...itemRefs.current,
          ...socialRefs.current,
        ].filter(Boolean) as HTMLElement[];
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const handleNav = (route: string) => {
    onOpenChange(false);
    onNavigate?.(route);
  };

  // Click-away: clicking the backdrop closes.
  const onBackdropClick = () => onOpenChange(false);

  const controlBone = open && changeMenuColorOnOpen ? true : closedTheme === "light";

  return (
    <div
      ref={rootRef}
      className={`sm-root${isFixed ? " sm-root--fixed" : ""} sm-pos--${position}`}
      data-open={open ? "true" : "false"}
      data-theme={closedTheme}
    >
      {/* Toggle control */}
      <button
        ref={toggleRef}
        type="button"
        className={`sm-toggle${controlBone ? " sm-toggle--bone" : " sm-toggle--ink"}`}
        onClick={toggle}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="sm-panel"
      >
        <span className="sm-toggle__icon" data-open={open ? "true" : "false"} aria-hidden="true">
          <span className="sm-bar sm-bar--h" />
          <span className="sm-bar sm-bar--v" />
        </span>
        <span className="sm-toggle__text">{open ? "Close" : "Menu"}</span>
      </button>

      {/* Backdrop (click-away) */}
      <div className="sm-backdrop" data-open={open ? "true" : "false"} onClick={onBackdropClick} aria-hidden="true" />

      {/* Panel */}
      <div ref={panelRef} id="sm-panel" className="sm-panel" data-open={open ? "true" : "false"} aria-hidden={!open} role="dialog" aria-modal="true" aria-label="Site menu">
        {/* Layered underlays: tobacco (back), espresso (mid), ink (front/main) */}
        <div ref={(el) => setUnderlay(el, 0)} className="sm-underlay sm-underlay--tobacco" aria-hidden="true" />
        <div ref={(el) => setUnderlay(el, 1)} className="sm-underlay sm-underlay--espresso" aria-hidden="true" />
        <div ref={(el) => setUnderlay(el, 2)} className="sm-underlay sm-underlay--ink" aria-hidden="true" />
        {/* Brass accent strip (left edge) */}
        <div className="sm-brass" aria-hidden="true" />

        <div ref={innerRef} className="sm-inner">
          <div className="sm-head">
            <img src={logoUrl} alt="Standard Wear House" className="sm-logo" width={200} height={50} />
          </div>

          <nav className="sm-nav" aria-label="Primary">
            <ul className="sm-list">
              {items.map((it, i) => (
                <li className="sm-item" key={it.route + it.label}>
                  <span className="sm-item__mask">
                    <button
                      ref={(el) => setItem(el, i)}
                      type="button"
                      className="sm-item__btn"
                      onClick={() => handleNav(it.route)}
                    >
                      {displayItemNumbering && (
                        <span className="sm-item__num">{String(i + 1).padStart(2, "0")}</span>
                      )}
                      <span className="sm-item__label">{it.label}</span>
                      <span className="sm-item__arrow" aria-hidden="true">→</span>
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </nav>

          {displaySocials && socials.length > 0 && (
            <div className="sm-socials">
              {socials.map((s, i) => (
                <a
                  key={s.label}
                  ref={(el) => setSocial(el, i)}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="sm-social"
                  aria-label={s.label}
                >
                  <SocialIcon kind={s.icon} />
                  <span className="sm-social__label">{s.label}</span>
                </a>
              ))}
            </div>
          )}

          <div className="sm-foot">
            <span className="eyebrow eyebrow--bone">Bengaluru, India</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialIcon({ kind }: { kind?: "instagram" | "facebook" | "x" }) {
  if (kind === "instagram") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (kind === "facebook") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.25-1.5 1.5-1.5h1.6V4.9c-.8-.1-1.6-.15-2.4-.15-2.4 0-4 1.45-4 4.1V11H7.6v3h2.6v8h3.3z" />
      </svg>
    );
  }
  // X
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.5 3h3l-6.6 7.55L21.7 21h-6l-4.7-6.15L5.6 21H2.6l7.05-8.05L2.3 3h6.15l4.25 5.6L17.5 3zm-1.05 16h1.65L7.6 4.7H5.85L16.45 19z" />
    </svg>
  );
}
