"use client";
import { useEffect, useRef, useCallback, useSyncExternalStore } from "react";

/* =============================================================================
 * Lightweight hash router.
 * Routes (deep-linkable via URL hash):
 *   #/                          -> Home
 *   #/new-arrivals              -> New Arrivals collection
 *   #/collections/suits|shirts|trousers|ethnic|ready-made
 *   #/products/<slug>           -> Product detail
 *   #/?a=contact|visit|legacy   -> Home + scroll to in-page section
 * ========================================================================== */

export interface Route {
  path: string; // e.g. "/", "/new-arrivals", "/collections/suits", "/products/slug"
  segments: string[]; // ["/"] or ["new-arrivals"] or ["collections","suits"] ...
  anchor?: string; // in-page section id when on home
  raw: string;
}

function parseHash(hash: string): Route {
  let h = hash || "";
  if (h.startsWith("#")) h = h.slice(1);
  // path?query
  const [rawPath, query = ""] = h.split("?");
  let path = rawPath || "/";
  if (!path.startsWith("/")) path = "/" + path;
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);

  const segments = path === "/" ? [] : path.split("/").filter(Boolean);

  const params = new URLSearchParams(query);
  const anchor = params.get("a") || undefined;

  return { path, segments, anchor, raw: h };
}

export function navigate(spec: string) {
  // spec examples: "/", "/new-arrivals", "/collections/suits", "/products/slug",
  // "/#contact", "/#visit", "/#legacy"
  let hash: string;
  if (spec.startsWith("/#")) {
    const anchor = spec.slice(2);
    hash = `#/?a=${anchor}`;
  } else {
    hash = "#" + spec;
  }
  if (window.location.hash === hash) {
    // Force a re-parse/scroll even if hash unchanged (e.g. clicking Contact twice).
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  } else {
    window.location.hash = hash;
  }
}

/* useSyncExternalStore: SSR-safe, no setState-in-effect, no hydration mismatch.
 * Snapshot is cached by hash string so the reference is stable across renders. */
let _cachedHash: string | null = null;
let _cachedRoute: Route | null = null;
const SSR_ROUTE: Route = { path: "/", segments: [], raw: "" };

function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}
function getSnapshot(): Route {
  const h = window.location.hash;
  if (h !== _cachedHash) {
    _cachedHash = h;
    _cachedRoute = parseHash(h);
  }
  return _cachedRoute as Route;
}
function getServerSnapshot(): Route {
  return SSR_ROUTE;
}

export function useRoute(): Route {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/* Scroll handling: scroll to top on path change, or to an anchor if present. */
export function useScrollManager(route: Route) {
  const lastPath = useRef<string>("");
  useEffect(() => {
    const pathChanged = lastPath.current !== route.path;
    if (pathChanged) {
      lastPath.current = route.path;
      if (route.anchor && route.path === "/") {
        // wait for home to render, then scroll to section
        const t = setTimeout(() => {
          const el = document.getElementById(route.anchor!);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          else window.scrollTo(0, 0);
        }, 120);
        return () => clearTimeout(t);
      } else {
        window.scrollTo(0, 0);
      }
    } else if (route.anchor && route.path === "/") {
      // same path, just an anchor click
      const el = document.getElementById(route.anchor);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [route.path, route.anchor]);
}

interface AppLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  onNavigate?: () => void;
  children: React.ReactNode;
}

export function AppLink({ to, onNavigate, children, onClick, ...rest }: AppLinkProps) {
  const handle = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      // allow modifier-click to open normally
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      navigate(to);
      onNavigate?.();
      onClick?.(e);
    },
    [to, onNavigate, onClick]
  );
  // Build a real href so the link is a real link (accessible, right-clickable).
  const href = to.startsWith("/#") ? `#/?a=${to.slice(2)}` : "#" + to;
  return (
    <a href={href} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
