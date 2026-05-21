"use client";

import { useEffect, useRef } from "react";

export function CursorAura() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame: number | null = null;
    let nextX = 0;
    let nextY = 0;
    const root = document.documentElement;

    const onMove = (e: PointerEvent) => {
      nextX = e.clientX;
      nextY = e.clientY;
      if (frame === null) {
        frame = requestAnimationFrame(() => {
          el.style.setProperty("--mx", `${nextX}px`);
          el.style.setProperty("--my", `${nextY}px`);
          frame = null;
        });
      }
    };
    const onEnter = () => el.setAttribute("data-on", "true");
    const onLeave = () => el.setAttribute("data-on", "false");

    window.addEventListener("pointermove", onMove);
    // pointerleave on window almost never fires — bind to the document element
    // so we catch the cursor leaving the viewport (browser chrome, devtools).
    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointerleave", onLeave);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="cursor-aura" data-on="true" aria-hidden="true" />;
}
