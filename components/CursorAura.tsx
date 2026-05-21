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
    // Track last applied coords so we can ignore synthetic pointermove events —
    // browsers fire pointermove during keyboard scroll / trackpad scroll with the
    // unchanged clientX/Y; we want the aura to sit still on that, only travelling
    // on a real cursor movement.
    let lastX = -1;
    let lastY = -1;
    const root = document.documentElement;

    const onMove = (e: PointerEvent) => {
      if (e.clientX === lastX && e.clientY === lastY) return;
      nextX = e.clientX;
      nextY = e.clientY;
      if (frame === null) {
        frame = requestAnimationFrame(() => {
          lastX = nextX;
          lastY = nextY;
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
