"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function isScrollable(el: HTMLElement) {
  if (el.scrollHeight <= el.clientHeight) return false;
  const { overflowY } = window.getComputedStyle(el);
  return overflowY === "auto" || overflowY === "scroll";
}

function getScrollContainer(): HTMLElement | null {
  const main = document.querySelector("main");
  if (main instanceof HTMLElement && isScrollable(main)) return main;

  const marked = document.querySelectorAll("[data-scroll-container]");
  for (const node of marked) {
    if (node instanceof HTMLElement && isScrollable(node)) return node;
  }

  const all = document.querySelectorAll<HTMLElement>("*");
  for (const el of all) {
    if (isScrollable(el)) return el;
  }

  return null;
}

export default function ScrollToTopOnRouteChange() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      window.history.scrollRestoration = "manual";
    } catch {
      // Ignore if the browser blocks access.
    }

    const id = window.requestAnimationFrame(() => {
      const container = getScrollContainer();
      if (container) {
        container.scrollTo({ top: 0, left: 0 });
        return;
      }
      window.scrollTo(0, 0);
    });

    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
