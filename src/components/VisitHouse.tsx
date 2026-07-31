"use client";
import { contact } from "@/lib/content";
import { useInView } from "@/lib/useInView";
import "./Home.css";

export default function VisitHouse() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section className="snap-panel" id="visit" aria-label="Visit the House">
      <div className="outer-card outer-card--visit">
        <div className={`outer-card__head reveal${inView ? " is-in" : ""}`} ref={ref}>
          <span className="eyebrow outer-card__index">04 — Visit the House</span>
          <h2 className="outer-card__title">By appointment, Bengaluru.</h2>
          <p className="outer-card__intro">
            A quiet atelier. Visits are by appointment so each fitting has the time it deserves.
          </p>
        </div>

        <div className="visit-body">
          <div className="visit-map" aria-label="Illustrative map of Bengaluru" role="img">
            <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
              {/* ground */}
              <rect x="0" y="0" width="400" height="300" fill="#F3F0E9" />
              {/* blocks */}
              <g fill="#EDE8DE">
                <rect x="30" y="40" width="70" height="46" />
                <rect x="120" y="28" width="58" height="58" />
                <rect x="200" y="52" width="80" height="40" />
                <rect x="300" y="36" width="64" height="56" />
                <rect x="40" y="120" width="60" height="60" />
                <rect x="130" y="120" width="70" height="44" />
                <rect x="225" y="120" width="55" height="60" />
                <rect x="305" y="125" width="58" height="52" />
                <rect x="30" y="210" width="80" height="50" />
                <rect x="135" y="200" width="60" height="62" />
                <rect x="220" y="210" width="70" height="48" />
                <rect x="310" y="205" width="55" height="58" />
              </g>
              {/* streets (major) */}
              <g stroke="#B7AD9F" strokeWidth="2.4" fill="none" opacity="0.85">
                <line x1="0" y1="108" x2="400" y2="108" />
                <line x1="0" y1="188" x2="400" y2="188" />
                <line x1="110" y1="0" x2="110" y2="300" />
                <line x1="210" y1="0" x2="210" y2="300" />
                <line x1="295" y1="0" x2="295" y2="300" />
              </g>
              {/* streets (minor) */}
              <g stroke="#B7AD9F" strokeWidth="1" fill="none" opacity="0.5">
                <line x1="0" y1="64" x2="400" y2="64" />
                <line x1="0" y1="148" x2="400" y2="148" />
                <line x1="0" y1="248" x2="400" y2="248" />
                <line x1="60" y1="0" x2="60" y2="300" />
                <line x1="170" y1="0" x2="170" y2="300" />
                <line x1="255" y1="0" x2="255" y2="300" />
                <line x1="345" y1="0" x2="345" y2="300" />
              </g>
              {/* a diagonal avenue */}
              <g stroke="#80654F" strokeWidth="1.4" fill="none" opacity="0.6">
                <line x1="0" y1="300" x2="400" y2="40" />
              </g>
              {/* park / green dot */}
              <circle cx="90" cy="245" r="14" fill="#EDE8DE" stroke="#B7AD9F" strokeWidth="1" />
              {/* location pin */}
              <g transform="translate(232,150)">
                <circle cx="0" cy="0" r="22" fill="#80654F" opacity="0.12" />
                <path d="M0 -16 C -9 -16 -15 -10 -15 -1 C -15 8 0 22 0 22 C 0 22 15 8 15 -1 C 15 -10 9 -16 0 -16 Z" fill="#2A241E" />
                <circle cx="0" cy="-2" r="5" fill="#F3F0E9" />
              </g>
            </svg>
          </div>

          <div className="visit-details anchor-target">
            <span className="eyebrow" style={{ marginBottom: 10, display: "block" }}>The Atelier</span>
            <h2>{contact.address.line1}</h2>
            <p className="visit-line">{contact.address.line2}</p>
            <p className="visit-note">{contact.address.note}</p>
            <a
              className="btn-solid btn-solid--outline"
              href={contact.mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              OPEN IN GOOGLE MAPS <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
