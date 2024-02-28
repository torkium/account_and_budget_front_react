import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const apiService: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const request = async <T = any,>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return apiService.request<T>(config);
};

export class ApiService<T, U> {
  private basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  async get(id?: number): Promise<T[]> {
    const url = id ? `${this.basePath}/${id}` : `${this.basePath}/`;
    const response = await request({
      url,
      method: "GET",
    });
    return response.data;
  }

  async show(id: number): Promise<T> {
    const response = await request({
      url: `${this.basePath}/${id}`,
      method: "GET",
    });
    return response.data;
  }

  async push(data: U, id?: number): Promise<T> {
    const url = id ? `${this.basePath}/${id}` : `${this.basePath}/`;
    const method = id ? "PUT" : "POST";
    const response = await request({
      url,
      method,
      data,
    });
    return response.data;
  }

  async remove(id: number): Promise<T> {
    const response = await request({
      url: `${this.basePath}/${id}`,
      method: "DELETE",
    });
    return response.data;
  }
}
