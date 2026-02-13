"use client";

import { useEffect, useRef, useState } from "react";

export default function GlobalCursorLight() {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");

    const update = () => {
      setEnabled(media.matches);
    };

    update();
    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled || !glowRef.current) return;

    const handleMove = (event: MouseEvent) => {
      const x = event.clientX - 150;
      const y = event.clientY - 150;
      glowRef.current?.style.setProperty("transform", `translate3d(${x}px, ${y}px, 0)`);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return <div ref={glowRef} className="cursor-light" aria-hidden="true" />;
}
