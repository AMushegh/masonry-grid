import { ApiService } from "@/services/ApiService";

export class PexelsService {
  private api: ApiService;

  constructor(api: ApiService) {
    this.api = api;
  }

  async searchPhotos(query: string, page = 1, perPage = 20): Promise<PexelsPhoto[]> {
    if (!query || !query.trim()) {
      return [];
    }

    try {
      const data = await this.api.get<PexelsResponse>("/search", {
        params: { query, per_page: perPage, page },
      });

      if (!data || !Array.isArray(data.photos)) {
        return [];
      }

      if (data.photos.length === 0) {
        return [];
      }

      return data.photos;
    } catch (error: any) {
      console.error(error);
      return [];
    }
  }

  async getPhotoById(id: number | string): Promise<PexelsPhoto> {
    try {
      const data = await this.api.get<PexelsPhoto>(`/photos/${id}`);

      if (!data || !data.id || !data.src) {
        throw new Error();
      }

      return data;
    } catch (error: any) {
      console.error(error);
      throw new Error();
    }
  }
}
