"use client";

import { useEffect } from "react";

export default function ClientEffects() {
  useEffect(() => {
    // Reveal on scroll
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );

    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // Parallax on hero figure + nav scroll state
    const figure = document.querySelector<HTMLElement>(".hero-figure");
    const nav = document.querySelector<HTMLElement>(".nav");
    const supportsDesktop = window.matchMedia("(min-width: 1024px)");

    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (figure && y < 800 && supportsDesktop.matches) {
          figure.style.transform = `translateY(${y * 0.08}px)`;
        }
        if (nav) {
          if (y > 40) nav.classList.add("nav--scrolled");
          else nav.classList.remove("nav--scrolled");
        }
        rafId = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      io.disconnect();
    };
  }, []);

  return null;
}
