import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class ApiService {
  private client: AxiosInstance;

  constructor(baseURL: string, headers: Record<string, string> = {}) {
    this.client = axios.create({
      baseURL,
      headers,
    });

    this.client.interceptors.response.use(
      (response) => response,
      (err) => {
        console.error(err.message);
        return Promise.reject(err);
      },
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data }: AxiosResponse<T> = await this.client.get(url, config);
    return data;
  }

  async post<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const { data }: AxiosResponse<T> = await this.client.post(url, body, config);
    return data;
  }

  async put<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const { data }: AxiosResponse<T> = await this.client.put(url, body, config);
    return data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data }: AxiosResponse<T> = await this.client.delete(url, config);
    return data;
  }
}
