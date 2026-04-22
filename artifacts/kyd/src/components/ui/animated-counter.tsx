import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  format?: (val: number) => string;
}

export function AnimatedCounter({ value, duration = 2, format = (v) => v.toLocaleString('it-IT') }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const totalFrames = Math.round((duration * 1000) / 16);
    let frame = 0;

    const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

    const counter = setInterval(() => {
      frame++;
      const progress = easeOutQuart(frame / totalFrames);
      const current = Math.round(start + (end - start) * progress);

      setCount(current);

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, 16);

    return () => clearInterval(counter);
  }, [value, duration, isInView]);

  return <span ref={ref}>{format(count)}</span>;
}
