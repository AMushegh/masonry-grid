import { useCallback, useState } from "react";
import { MasonryVirtualized } from "./components/shared/MasonryVirtualized";
import { pexelsService } from "./services";

export const App = () => {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const searchTerm = "nature";

  const loadMore = useCallback(async () => {
    const photos = await pexelsService.searchPhotos(searchTerm, page);

    setPhotos((prev) => [...prev, ...photos]);
    setPage((prev) => prev + 1);

    if (photos.length < 20) setHasMore(false);
  }, [page]);

  return (
    <MasonryVirtualized
      items={photos}
      estimateHeight={(p) =>
        Math.max(120, Math.round((p.height / p.width) * 280))
      }
      onLoadMore={loadMore}
      hasMore={hasMore}
      renderItem={(p) => (
        <img
          src={p.src.medium}
          alt={p.alt}
          style={{
            width: "100%",
            display: "block",
            borderRadius: 12,
            aspectRatio: `${p.width} / ${p.height}`,
          }}
        />
      )}
    />
  );
};

export default App;
