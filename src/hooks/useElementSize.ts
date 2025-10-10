import { useState, useRef } from "react";

import { useResizeObserver } from "@/hooks/useResizeObserver";

export const useElementSize = <T extends HTMLElement>() => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const lastSize = useRef({ width: 0, height: 0 });

  const ref = useResizeObserver<T>((entry) => {
    const { inlineSize: width, blockSize: height } = (entry as any).contentBoxSize
      ? Array.isArray((entry as any).contentBoxSize)
        ? (entry as any).contentBoxSize[0]
        : (entry as any).contentBoxSize
      : {
          inlineSize: entry.contentRect.width,
          blockSize: entry.contentRect.height,
        };

    const w = Math.round(width);
    const h = Math.round(height);

    if (lastSize.current.width === w && lastSize.current.height === h) return;

    lastSize.current = { width: w, height: h };
    setSize({ width: w, height: h });
  });

  return { ref, width: size.width, height: size.height } as const;
};
