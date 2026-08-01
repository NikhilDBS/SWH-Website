"use client";
import { useState } from "react";
import { contact, whatsappUrl } from "@/lib/content";
import FlowingAccordion from "./FlowingAccordion";
import "./Home.css";

type AccId = "legacy" | "contact";

export default function LegacyContact() {
  const [openId, setOpenId] = useState<AccId | null>(null);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : (id as AccId)));
  };

  return (
    <div className="accordions">
      <div className="accordions__wrap">
        <FlowingAccordion
          id="legacy"
          title="Legacy / History"
          open={openId === "legacy"}
          onToggle={handleToggle}
          overlayColor="#B99B78"
        >
          <p>
            Standard Wear House began with a simple conviction: that cloth, patience and an
            honest fit matter more than fashion. The house grew around a cutter&rsquo;s bench in
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
        </FlowingAccordion>

        <FlowingAccordion
          id="contact"
          title="Contact"
          open={openId === "contact"}
          onToggle={handleToggle}
          overlayColor="#B99B78"
        >
          <dl className="facc__contact">
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
        </FlowingAccordion>
      </div>
    </div>
  );
}
