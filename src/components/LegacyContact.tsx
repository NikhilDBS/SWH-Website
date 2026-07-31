"use client";
import { useRef } from "react";
import { contact, whatsappUrl } from "@/lib/content";
import "./Home.css";

type AccId = "legacy" | "contact";

export default function LegacyContact() {
  const openRef = useRef<AccId | null>(null);

  const onToggle = (id: AccId, e: React.SyntheticEvent<HTMLDetailsElement>) => {
    const el = e.currentTarget;
    if (el.open) {
      // close the other
      if (openRef.current && openRef.current !== id) {
        const other = document.getElementById(openRef.current) as HTMLDetailsElement | null;
        if (other) other.open = false;
      }
      openRef.current = id;
    } else if (openRef.current === id) {
      openRef.current = null;
    }
  };

  return (
    <div className="accordions">
      <div className="accordions__wrap">
        <details
          id="legacy"
          className="acc anchor-target"
          onToggle={(e) => onToggle("legacy", e)}
        >
          <summary>
            <span>Legacy / History</span>
            <span className="acc__icon" aria-hidden="true" />
          </summary>
          <div className="acc__body">
            <p>
              Standard Wear House began with a simple conviction: that cloth, patience and an
              honest fit matter more than fashion. The house grew around a cutter’s bench in
              Bengaluru, where bolts of wool, linen and handwoven Indian silk were studied by
              hand before a single mark was made.
            </p>
            <p>
              Every garment is built slowly. Measurements are taken, then taken again. A half-canvas
              chest is shaped over three fittings, the collar eased by hand, the lining set so the
              cloth can breathe. We keep no catalogue of trends — only an archive of cloth, and the
              memory of the bodies it was cut for.
            </p>
            <p>
              It is an Indian tailoring house in the way Bengaluru is an Indian city: contemporary,
              considered, and quietly rooted in craft.
            </p>
          </div>
        </details>

        <details
          id="contact"
          className="acc anchor-target"
          onToggle={(e) => onToggle("contact", e)}
        >
          <summary>
            <span>Contact</span>
            <span className="acc__icon" aria-hidden="true" />
          </summary>
          <div className="acc__body">
            <dl className="acc__contact">
              <dt>Owner</dt>
              <dd>{contact.owner}</dd>
              <dt>Phone</dt>
              <dd><a href={`tel:${contact.phone.replace(/\s+/g, "")}`}>{contact.phone}</a></dd>
              <dt>Email</dt>
              <dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd>
              <dt>Hours</dt>
              <dd>{contact.hours}</dd>
              <dt>Address</dt>
              <dd>{contact.address.line1}, {contact.address.line2}</dd>
            </dl>
            <a
              className="btn-solid"
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
            >
              MESSAGE ON WHATSAPP <span aria-hidden="true">→</span>
            </a>
          </div>
        </details>
      </div>
    </div>
  );
}
