// hooks/useInView.ts
import { useEffect, useRef, useState } from "react";

export function useInView(
  ref: React.RefObject<Element>,
  threshold = 0.1
) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return visible;
}