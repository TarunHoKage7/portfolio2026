"use client";

import { useEffect } from "react";

/**
 * Sets per-element CSS vars (--spot-x, --spot-y) on every `.spotlight`
 * element relative to its own top-left, so the spotlight gradient border
 * lights up where the cursor is. Adds `data-spot="on"` only when the cursor
 * is within a small slop of the element, to avoid showing the effect on
 * cards far away from the pointer.
 *
 * Cheap enough at ~30 elements; throttled to RAF so we do at most one
 * layout-query pass per frame regardless of pointermove rate.
 */
export function SpotlightTracker() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame: number | null = null;
    let lastX = 0;
    let lastY = 0;
    // Ignore synthetic pointermove events that fire with unchanged coords during
    // scroll — we only want the spotlight border to move when the cursor actually
    // moves, not whenever the page shifts under a stationary pointer.
    let prevX = -1;
    let prevY = -1;
    const SLOP = 80; // px of cursor distance from element edge before lighting up

    const onMove = (e: PointerEvent) => {
      if (e.clientX === prevX && e.clientY === prevY) return;
      prevX = e.clientX;
      prevY = e.clientY;
      lastX = e.clientX;
      lastY = e.clientY;
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        const targets = document.querySelectorAll<HTMLElement>(".spotlight");
        for (const el of targets) {
          const rect = el.getBoundingClientRect();
          const near =
            lastX >= rect.left - SLOP &&
            lastX <= rect.right + SLOP &&
            lastY >= rect.top - SLOP &&
            lastY <= rect.bottom + SLOP;
          if (near) {
            el.style.setProperty("--spot-x", `${lastX - rect.left}px`);
            el.style.setProperty("--spot-y", `${lastY - rect.top}px`);
            el.setAttribute("data-spot", "on");
          } else if (el.hasAttribute("data-spot")) {
            el.removeAttribute("data-spot");
          }
        }
      });
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
