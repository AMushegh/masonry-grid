import { ApiService } from "./ApiService";
import { PexelsService } from "./PexelsService";

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY as string;

const api = new ApiService("https://api.pexels.com/v1", {
  Authorization: API_KEY,
});

export const pexelsService = new PexelsService(api);
