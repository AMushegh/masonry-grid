import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  buildMasonryLayout,
  getVisibleIndices,
  sanitizeHeight,
} from "@/helpers/masonry";
import { useElementSize } from "@/hooks/useElementSize";
import { useWindowScroll } from "@/hooks/useWindowScroll";

import {
  LoaderContainer,
  MasonryContainer,
  MasonryItem,
  MasonryItemsWrapper,
  Sentinel,
} from "./styled";

type MasonryVirtualizedProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  columnWidth?: number;
  columnCount?: number;
  gap?: number;
  estimateHeight?: (item: T, index: number) => number;
  overscanBy?: number;
  onLoadMore?: () => void;
  hasMore?: boolean;
};

const NEW_HEIGHT_TRESHOLD = 2;

export function MasonryVirtualized<T>(props: MasonryVirtualizedProps<T>) {
  const {
    items,
    renderItem,
    columnWidth = 280,
    columnCount: fixedColumnCount,
    gap = 12,
    estimateHeight = () => 200,
    overscanBy = 3000,
    onLoadMore,
    hasMore = false,
  } = props;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { ref: sizeRef, width: containerWidth } =
    useElementSize<HTMLDivElement>();

  const [heights, setHeights] = useState<number[]>(() =>
    items.map((it, i) => sanitizeHeight(estimateHeight(it, i), 200))
  );

  useEffect(() => {
    setHeights((prev) => {
      const next = items.map((it, i) =>
        sanitizeHeight(prev[i] ?? estimateHeight(it, i), 200)
      );
      return next;
    });
  }, [items, estimateHeight]);

  const columnCount = useMemo(() => {
    if (fixedColumnCount && fixedColumnCount > 0) return fixedColumnCount;
    if (!containerWidth) return 1;
    const full = Math.max(
      1,
      Math.floor((containerWidth + gap) / (columnWidth + gap))
    );
    return full;
  }, [fixedColumnCount, containerWidth, columnWidth, gap]);

  const effectiveColWidth = useMemo(() => {
    if (columnCount <= 0) return columnWidth;

    if (!containerWidth) return columnWidth;

    const totalGaps = gap * (columnCount - 1);

    const w = Math.max(
      1,
      Math.floor((containerWidth - totalGaps) / columnCount)
    );
    return w;
  }, [containerWidth, columnCount, gap, columnWidth]);

  const { rects, containerHeight } = useMemo(() => {
    return buildMasonryLayout(
      items.length,
      columnCount,
      effectiveColWidth,
      gap,
      heights
    );
  }, [items.length, columnCount, effectiveColWidth, gap, heights]);

  const { top: scrollTop, vh: viewportH } = useWindowScroll();

  const viewportTop = scrollTop - overscanBy;
  const viewportBottom = scrollTop + viewportH + overscanBy;

  const visibleIndices = useMemo(
    () => getVisibleIndices(rects, viewportTop, viewportBottom),
    [rects, viewportTop, viewportBottom]
  );
  const visibleSet = useMemo(() => new Set(visibleIndices), [visibleIndices]);
  const resizeObservers = useRef<(ResizeObserver | null)[]>([]);

  const attachMeasureRef = useCallback(
    (i: number) => (node: HTMLElement | null) => {
      if (resizeObservers.current[i]) {
        resizeObservers.current[i]!.disconnect();
        resizeObservers.current[i] = null;
      }
      if (!node) return;
      const ro = new ResizeObserver((entries) => {
        const entry = entries[0];
        const newHeight = sanitizeHeight(entry.contentRect.height, 0);
        setHeights((prev) => {
          const old = prev[i];
          if (Math.abs(old - newHeight) < NEW_HEIGHT_TRESHOLD) return prev;
          const next = prev.slice();
          next[i] = newHeight;
          return next;
        });
      });
      ro.observe(node);
      resizeObservers.current[i] = ro;
    },
    []
  );

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore || !onLoadMore) return;
    const node = sentinelRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) onLoadMore();
        });
      },
      {
        root: null,
        rootMargin: "2000px",
      }
    );
    io.observe(node);

    return () => io.disconnect();
  }, [hasMore, onLoadMore]);

  const safeContainerHeight =
    Number.isFinite(containerHeight) && containerHeight > 0
      ? containerHeight
      : 1;

  return (
    <MasonryContainer
      ref={(el) => {
        rootRef.current = el;
        (sizeRef as any).current = el;
      }}
    >
      <MasonryItemsWrapper height={safeContainerHeight}>
        {items.map((item, i) => {
          const r = rects[i];

          const visible = visibleSet.has(i);

          if (!r || !visible) return null;

          return (
            <MasonryItem
              width={r.width}
              x={r.x}
              y={r.y}
              key={i}
              ref={attachMeasureRef(i)}
            >
              {renderItem(item, i)}
            </MasonryItem>
          );
        })}
        {hasMore && <Sentinel ref={sentinelRef} height={safeContainerHeight} />}
      </MasonryItemsWrapper>
      {hasMore && <LoaderContainer>{<span>Loading…</span>}</LoaderContainer>}
    </MasonryContainer>
  );
}
