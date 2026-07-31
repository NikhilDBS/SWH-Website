"use client";
import Wordmark from "./Wordmark";
import { social, brand } from "@/lib/content";
import { navigate } from "@/lib/router";

export default function Footer() {
  return (
    <footer className="site-footer app-footer" aria-label="Site footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <Wordmark
            tone="ink"
            href="#/"
            onClick={(e) => { e.preventDefault(); navigate("/"); }}
          />
          <div className="site-footer__socials">
            <a className="site-footer__social" href={social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a className="site-footer__social" href={social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.25-1.5 1.5-1.5h1.6V4.9c-.8-.1-1.6-.15-2.4-.15-2.4 0-4 1.45-4 4.1V11H7.6v3h2.6v8h3.3z" />
              </svg>
            </a>
            <a className="site-footer__social" href={social.x} target="_blank" rel="noreferrer" aria-label="X">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.5 3h3l-6.6 7.55L21.7 21h-6l-4.7-6.15L5.6 21H2.6l7.05-8.05L2.3 3h6.15l4.25 5.6L17.5 3zm-1.05 16h1.65L7.6 4.7H5.85L16.45 19z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="site-footer__legal">
          <span>© 2026 {brand.name}. All rights reserved.</span>
          <span>Bengaluru, India</span>
        </div>
      </div>
    </footer>
  );
}
