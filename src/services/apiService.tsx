import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const apiService: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const request = async <T = any>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return apiService.request<T>(config)
}
