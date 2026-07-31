"use client";
interface WordmarkProps {
  tone?: "ink" | "bone";
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
}

/* Inline text wordmark — uses the loaded Cormorant + DM Sans fonts, switches
 * colour smoothly via currentColor. Reads "STANDARD / WEAR HOUSE". */
export default function Wordmark({ tone = "ink", className = "", href, onClick }: WordmarkProps) {
  const cls = `wordmark wordmark--${tone}${className ? " " + className : ""}`;
  const inner = (
    <>
      <span className="wordmark__top">STANDARD</span>
      <span className="wordmark__rule" aria-hidden="true" />
      <span className="wordmark__bottom">WEAR HOUSE</span>
    </>
  );
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick} aria-label="Standard Wear House — home">
        {inner}
      </a>
    );
  }
  return <span className={cls} aria-label="Standard Wear House">{inner}</span>;
}
