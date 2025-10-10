import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { pexelsService } from "@/services";
import { useDebounce } from "@/hooks/useDebounce";
import { MasonryVirtualized } from "@/components/shared/masonry/MasonryVirtualized";
import { ImagesListFilterInput } from "@/components/imagesList/ImagesListFilterInput";

import { GridImage, ImageListWrapper } from "./styled";

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
      <ImageListWrapper>
        <MasonryVirtualized
          items={photos}
          estimateHeight={(p) => Math.max(120, Math.round((p.height / p.width) * 280))}
          onLoadMore={loadMore}
          hasMore={hasMore}
          renderItem={(p) => (
            <Link to={`/image/${p.id}`}>
              <GridImage height={p.height} width={p.width} src={p.src.medium} alt={p.alt} />
            </Link>
          )}
        />
      </ImageListWrapper>
    </>
  );
};
