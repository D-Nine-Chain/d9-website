import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios, { AxiosHeaders } from 'axios'

const baseURL = 'https://files.q6z4kzhr.uk'

// 定义 axios 实例
const http: AxiosInstance = axios.create({
  baseURL, // 替换为实际的 API 基础 URL
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
    // 在这里可以添加更多的默认请求头
  },
})

function requestInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  // 假设 token 存储在 localStorage
  const token = localStorage.getItem('token')

  // 如果 config.headers 未定义，则初始化它为 AxiosHeaders
  if (!config.headers) {
    config.headers = new AxiosHeaders()
  }

  // 如果存在 token，将其添加到请求头中
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // 返回修改后的 config 对象
  return config
}

// // 请求拦截器
http.interceptors.request.use(
  requestInterceptor,
  (error) => {
    // 请求错误处理
    return Promise.reject(error)
  },
)

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    // 可以在这里添加响应后的处理逻辑，例如处理全局错误
    if (response.status === 200) {
      return response.data
    }
  },
  (error) => {
    // 响应错误处理
    // if (error.response) {
    //   // 服务器返回的错误响应处理
    //   switch (error.response.status) {
    //     case 401:
    //       // 未授权，处理逻辑
    //       break;
    //     case 403:
    //       // 禁止访问，处理逻辑
    //       break;
    //     case 500:
    //       // 服务器错误，处理逻辑
    //       break;
    //     default:
    //       // 其他错误处理
    //       break;
    //   }
    // }
    return Promise.reject(error)
  },
)

export default http
