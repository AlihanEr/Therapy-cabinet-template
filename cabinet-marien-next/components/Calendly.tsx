"use client";

import Script from "next/script";
import { useEffect } from "react";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://calendly.com/cabinet-marien/seance";

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (opts: { url: string }) => void };
  }
}

/**
 * Loads the Calendly widget assets and opens the scheduling popup for any
 * element carrying a `data-calendly` attribute (nav CTA, booking button…).
 * Set NEXT_PUBLIC_CALENDLY_URL to your real scheduling link.
 */
export default function Calendly() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const trigger = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-calendly]",
      );
      if (!trigger) return;
      e.preventDefault();
      if (window.Calendly) {
        window.Calendly.initPopupWidget({ url: CALENDLY_URL });
      } else {
        // Assets not ready yet — open the scheduling page directly.
        window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}
