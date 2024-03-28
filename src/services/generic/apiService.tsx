import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface ParamHandler {
  (): Record<string, any>;
}

let globalParamHandler: ParamHandler | null = null;

// Fonction pour définir le gestionnaire de paramètres global
export const setGlobalParamHandler = (handler: ParamHandler | null): void => {
  globalParamHandler = handler;
};

// Initialisation de l'instance axios
export const apiService: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Ajout de l'intercepteur pour intégrer les paramètres dynamiques dans chaque requête
apiService.interceptors.request.use((config) => {
  if (globalParamHandler) {
    const dynamicParams = globalParamHandler();
    config.params = { ...config.params, ...dynamicParams };
  }
  return config;
});

// Fonction pour effectuer les requêtes avec le support des paramètres dynamiques
export const request = async <T = any,>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return apiService.request<T>(config);
};

// Classe générique ApiService intégrant le support des paramètres dynamiques
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
