export const sanitizeHeight = (val: any, fallback = 0): number => {
  return Number.isFinite(val) && val > 0 ? Math.round(val) : fallback;
};

export const getVisibleIndices = (rects: Rect[], viewportTop: number, viewportBottom: number) => {
  const visible: number[] = [];
  for (let i = 0; i < rects.length; i++) {
    const r = rects[i];
    if (!r) continue;
    const rTop = r.y;
    const rBottom = r.y + r.height;
    if (rBottom >= viewportTop && rTop <= viewportBottom) {
      visible.push(i);
    }
  }
  return visible;
};

export const buildMasonryLayout = (
  itemCount: number,
  columnCount: number,
  colWidth: number,
  gap: number,
  heights: number[],
) => {
  const rects: Rect[] = new Array(itemCount);
  const colHeights = new Array(columnCount).fill(0) as number[];

  for (let i = 0; i < itemCount; i++) {
    const h = sanitizeHeight(heights[i], 0);

    let targetCol = 0;
    for (let c = 1; c < columnCount; c++) {
      if (colHeights[c] < colHeights[targetCol]) targetCol = c;
    }
    const x = targetCol * (colWidth + gap);
    const y = colHeights[targetCol];
    rects[i] = { x, y, width: colWidth, height: h };
    colHeights[targetCol] = y + h + gap;
  }

  const finiteHeights = colHeights.filter((h) => Number.isFinite(h));
  const maxCol = Math.max(0, ...finiteHeights);
  const containerHeight = Math.max(0, maxCol - gap);
  return { rects, containerHeight };
};
