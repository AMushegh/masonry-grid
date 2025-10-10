import { useLayoutEffect, useRef } from "react";

export const useResizeObserver = <T extends HTMLElement>(callback: (entry: ResizeObserverEntry) => void) => {
  const ref = useRef<T | null>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const obs = new ResizeObserver((entries) => {
      for (const e of entries) callback(e);
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [callback]);

  return ref;
};
