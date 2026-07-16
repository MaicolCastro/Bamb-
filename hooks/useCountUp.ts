"use client";

import { useEffect, useRef, useState } from "react";

/** Anima un contador numérico cuando entra en viewport (actualiza DOM, no cada frame en React) */
export function useCountUp(
  end: number,
  duration = 2000,
  startOnView = true
) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(!startOnView);
  const ref = useRef<HTMLDivElement>(null);
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!startOnView || hasStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnView, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;
    let lastRendered = -1;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.floor(eased * end);

      if (next !== lastRendered) {
        lastRendered = next;
        if (displayRef.current) {
          displayRef.current.textContent = String(next);
        }
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
        if (displayRef.current) {
          displayRef.current.textContent = String(end);
        }
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);

  return { count, ref, displayRef };
}
