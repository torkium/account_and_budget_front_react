import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const apiService: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

apiService.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const request = async <T = any>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return apiService.request<T>(config)
}
