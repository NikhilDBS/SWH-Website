"use client";
import { useRef, useCallback, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import "./FlowingAccordion.css";

interface FlowingAccordionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  open: boolean;
  onToggle: (id: string) => void;
  /** Overlay color that slides in on hover — defaults to SWH brass */
  overlayColor?: string;
  /** Text color when overlay is visible */
  overlayTextColor?: string;
}

function distMetric(x: number, y: number, x2: number, y2: number) {
  const dx = x - x2;
  const dy = y - y2;
  return dx * dx + dy * dy;
}

function findClosestEdge(
  mouseX: number,
  mouseY: number,
  width: number,
  height: number
): "top" | "bottom" {
  const top = distMetric(mouseX, mouseY, width / 2, 0);
  const bottom = distMetric(mouseX, mouseY, width / 2, height);
  return top < bottom ? "top" : "bottom";
}

const ANIM = { duration: 0.55, ease: "expo.out" };

export default function FlowingAccordion({
  id,
  title,
  children,
  open,
  onToggle,
  overlayColor = "#B99B78",
  overlayTextColor = "#171512",
}: FlowingAccordionProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayInnerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Set initial overlay position off-screen below
  useLayoutEffect(() => {
    if (overlayRef.current && overlayInnerRef.current) {
      gsap.set(overlayRef.current, { yPercent: 101 });
      gsap.set(overlayInnerRef.current, { yPercent: -101 });
    }
  }, []);

  // Animate body height on open/close
  const prevOpen = useRef(open);
  useLayoutEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    if (open === prevOpen.current) return;
    prevOpen.current = open;

    if (open) {
      // Measure natural height then animate from 0
      gsap.set(body, { height: "auto", overflow: "hidden" });
      const h = body.scrollHeight;
      gsap.fromTo(
        body,
        { height: 0, opacity: 0 },
        { height: h, opacity: 1, duration: 0.5, ease: "power3.out", onComplete: () => gsap.set(body, { height: "auto" }) }
      );
    } else {
      gsap.to(body, {
        height: 0,
        opacity: 0,
        duration: 0.38,
        ease: "power3.in",
        onComplete: () => gsap.set(body, { height: 0 }),
      });
    }
  }, [open]);

  const handleMouseEnter = useCallback((ev: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    const overlay = overlayRef.current;
    const inner = overlayInnerRef.current;
    if (!el || !overlay || !inner) return;

    const rect = el.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    tlRef.current?.kill();
    tlRef.current = gsap
      .timeline({ defaults: ANIM })
      .set(overlay, { yPercent: edge === "top" ? -101 : 101 })
      .set(inner, { yPercent: edge === "top" ? 101 : -101 })
      .to([overlay, inner], { yPercent: 0 });
  }, []);

  const handleMouseLeave = useCallback((ev: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    const overlay = overlayRef.current;
    const inner = overlayInnerRef.current;
    if (!el || !overlay || !inner) return;

    const rect = el.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    tlRef.current?.kill();
    tlRef.current = gsap
      .timeline({ defaults: ANIM })
      .to(overlay, { yPercent: edge === "top" ? -101 : 101 })
      .to(inner, { yPercent: edge === "top" ? 101 : -101 }, 0);
  }, []);

  return (
    <div
      ref={wrapRef}
      className={"facc" + (open ? " facc--open" : "")}
      id={id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Flowing overlay (slides in from top/bottom edge on hover) */}
      <div
        ref={overlayRef}
        className="facc__overlay"
        style={{ backgroundColor: overlayColor }}
        aria-hidden="true"
      >
        <div ref={overlayInnerRef} className="facc__overlay-inner" />
      </div>

      {/* Summary / trigger */}
      <button
        className="facc__summary"
        onClick={() => onToggle(id)}
        aria-expanded={open}
        aria-controls={`facc-body-${id}`}
        style={{ color: "inherit" }}
        type="button"
      >
        <span className="facc__title" style={{ color: open ? overlayTextColor : undefined }}>
          {title}
        </span>
        <span className="facc__icon" aria-hidden="true" />
      </button>

      {/* Collapsible body — height animated by GSAP */}
      <div
        ref={bodyRef}
        id={`facc-body-${id}`}
        className="facc__body"
        style={{ height: 0, overflow: "hidden", opacity: 0 }}
      >
        {children}
      </div>
    </div>
  );
}
