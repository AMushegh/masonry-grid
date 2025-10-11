import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Mocked } from "vitest";

import { PexelsService } from "@/services/PexelsService";
import { ApiService } from "@/services/ApiService";

describe("PexelsService", () => {
  let mockApi: Mocked<ApiService>;
  let service: PexelsService;

  beforeEach(() => {
    mockApi = {
      get: vi.fn(),
    } as unknown as Mocked<ApiService>;

    service = new PexelsService(mockApi);
  });

  describe("searchPhotos", () => {
    it("should return empty array if query is empty", async () => {
      const result = await service.searchPhotos("");
      expect(result).toEqual([]);
      expect(mockApi.get).not.toHaveBeenCalled();
    });

    it("should return empty array if api returns invalid data", async () => {
      mockApi.get.mockResolvedValueOnce({} as any);
      const result = await service.searchPhotos("nature");
      expect(result).toEqual([]);
    });

    it("should return empty array if photos is empty", async () => {
      mockApi.get.mockResolvedValueOnce({ photos: [] });
      const result = await service.searchPhotos("nature");
      expect(result).toEqual([]);
    });

    it("should return photos if api returns valid data", async () => {
      const mockPhotos = [{ id: 1 }, { id: 2 }] as any;
      mockApi.get.mockResolvedValueOnce({ photos: mockPhotos });

      const result = await service.searchPhotos("mountains");

      expect(mockApi.get).toHaveBeenCalledWith("/search", {
        params: { query: "mountains", per_page: 20, page: 1 },
      });
      expect(result).toEqual(mockPhotos);
    });

    it("should handle api errors gracefully", async () => {
      mockApi.get.mockRejectedValueOnce(new Error("Network Error"));
      const result = await service.searchPhotos("forest");
      expect(result).toEqual([]);
    });
  });

  describe("getPhotoById", () => {
    it("should return photo if valid", async () => {
      const mockPhoto = { id: 123, src: { original: "url" } } as any;
      mockApi.get.mockResolvedValueOnce(mockPhoto);

      const result = await service.getPhotoById(123);

      expect(mockApi.get).toHaveBeenCalledWith("/photos/123");
      expect(result).toEqual(mockPhoto);
    });

    it("should throw error if invalid response", async () => {
      mockApi.get.mockResolvedValueOnce({ id: null } as any);
      await expect(service.getPhotoById(123)).rejects.toThrowError();
    });

    it("should throw error if api call fails", async () => {
      mockApi.get.mockRejectedValueOnce(new Error("Network error"));
      await expect(service.getPhotoById(1)).rejects.toThrowError();
    });
  });
});
