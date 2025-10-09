import { useCallback, useEffect, useState } from "react";

import { MasonryVirtualized } from "../shared/masonry/MasonryVirtualized";
import { pexelsService } from "../../services";
import { useDebounce } from "../../hooks/useDebounce";
import { ImagesListFilterInput } from "./ImagesListFilterInput";

export const ImagesList = () => {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [searchTerm, setSearchTerm] = useState("Nature");
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setPhotos([]);
  }, [debouncedSearchTerm]);

  const loadMore = useCallback(async () => {
    const photos = await pexelsService.searchPhotos(debouncedSearchTerm, page);

    setPhotos((prev) => [...prev, ...photos]);
    setPage((prev) => prev + 1);

    if (photos.length < 20) setHasMore(false);
  }, [page, debouncedSearchTerm]);

  return (
    <>
      <ImagesListFilterInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search images..."
      />
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
    </>
  );
};
