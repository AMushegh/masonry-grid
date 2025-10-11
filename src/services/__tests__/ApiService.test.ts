import axios from "axios";
import type { AxiosInstance } from "axios";
import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import type { Mocked, Mock } from "vitest";

import { ApiService } from "@/services/ApiService";

// Mock axios
vi.mock("axios");

describe("ApiService", () => {
  let api: ApiService;
  let mockAxiosInstance: Mocked<AxiosInstance>;

  beforeEach(() => {
    mockAxiosInstance = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      interceptors: {
        response: {
          use: vi.fn(),
        },
      },
    } as unknown as Mocked<AxiosInstance>;

    (axios.create as unknown as Mock).mockReturnValue(mockAxiosInstance);

    api = new ApiService("https://api.example.com", {
      Authorization: "Bearer token",
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("creates axios instance with correct baseURL and headers", () => {
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: "https://api.example.com",
      headers: { Authorization: "Bearer token" },
    });
  });

  it("calls GET and returns data", async () => {
    mockAxiosInstance.get.mockResolvedValueOnce({ data: { ok: true } });

    const result = await api.get<{ ok: boolean }>("/test");

    expect(mockAxiosInstance.get).toHaveBeenCalledWith("/test", undefined);
    expect(result).toEqual({ ok: true });
  });

  it("calls POST and returns data", async () => {
    mockAxiosInstance.post.mockResolvedValueOnce({ data: { id: 42 } });

    const result = await api.post<{ id: number }>("/items", { name: "Item" });

    expect(mockAxiosInstance.post).toHaveBeenCalledWith("/items", { name: "Item" }, undefined);
    expect(result).toEqual({ id: 42 });
  });

  it("calls PUT and returns data", async () => {
    mockAxiosInstance.put.mockResolvedValueOnce({ data: { updated: true } });

    const result = await api.put<{ updated: boolean }>("/item/1", { title: "New" });

    expect(mockAxiosInstance.put).toHaveBeenCalledWith("/item/1", { title: "New" }, undefined);
    expect(result).toEqual({ updated: true });
  });

  it("calls DELETE and returns data", async () => {
    mockAxiosInstance.delete.mockResolvedValueOnce({ data: { deleted: true } });

    const result = await api.delete<{ deleted: boolean }>("/item/1");

    expect(mockAxiosInstance.delete).toHaveBeenCalledWith("/item/1", undefined);
    expect(result).toEqual({ deleted: true });
  });

  it("attaches response interceptor", () => {
    expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalledTimes(1);
    const responseUseMock = mockAxiosInstance.interceptors.response.use as unknown as Mock;
    const [onFulfilled, onRejected] = responseUseMock.mock.calls[0];

    expect(typeof onRejected).toBe("function");
    expect(typeof onFulfilled).toBe("function");
  });
});
