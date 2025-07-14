import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { message } from 'antd'

// 请求响应接口
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  success?: boolean
}

// 请求配置接口
export interface RequestConfig extends AxiosRequestConfig {
  showLoading?: boolean
  showError?: boolean
  showSuccess?: boolean
}

class ApiClient {
  private instance: AxiosInstance
  private loadingCount = 0

  constructor() {
    // 创建axios实例
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // 设置请求拦截器
    this.setupRequestInterceptor()
    // 设置响应拦截器
    this.setupResponseInterceptor()
  }

  /**
   * 设置请求拦截器
   */
  private setupRequestInterceptor(): void {
    this.instance.interceptors.request.use(
      (config: any) => {
        // 添加认证token
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = token
        }

        // 显示loading
        if (config.showLoading !== false) {
          this.showLoading()
        }

        return config
      },
      (error: AxiosError) => {
        this.hideLoading()
        return Promise.reject(error)
      }
    )
  }

  /**
   * 设置响应拦截器
   */
  private setupResponseInterceptor(): void {
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        this.hideLoading()
        const { data } = response
        const config = response.config as RequestConfig

        // 请求成功
        if (data.code === 200) {
          // 显示成功消息
          if (config.showSuccess && data.message) {
            message.success(data.message)
          }
          return data
        }

        // 业务错误
        if (config.showError !== false) {
          message.error(data.message || '请求失败')
        }
        return Promise.reject(new Error(data.message || '请求失败'))
      },
      (error: AxiosError) => {
        this.hideLoading()
        this.handleError(error)
        return Promise.reject(error)
      }
    )
  }

  /**
   * 处理错误
   */
  private handleError(error: AxiosError): void {
    const config = error.config as RequestConfig

    if (config?.showError === false) {
      return
    }

    let errorMessage = '网络错误，请稍后重试'

    if (error.response) {
      const { status, data } = error.response

      switch (status) {
        case 400:
          errorMessage = (data as any)?.message || '请求参数错误'
          break
        case 401:
          errorMessage = '登录已过期，请重新登录'
          // 清除token并跳转到登录页
          localStorage.removeItem('auth_token')
          localStorage.removeItem('user_info')
          window.location.href = '/login'
          break
        case 403:
          errorMessage = '没有权限访问该资源'
          break
        case 404:
          errorMessage = '请求的资源不存在'
          break
        case 500:
          errorMessage = '服务器内部错误'
          break
        default:
          errorMessage = (data as any)?.message || `请求失败 (${status})`
      }
    } else if (error.request) {
      errorMessage = '网络连接失败，请检查网络设置'
    }

    message.error(errorMessage)
  }

  /**
   * 显示loading
   */
  private showLoading(): void {
    this.loadingCount++
    // 这里可以集成全局loading组件
    // 例如：store.dispatch(setGlobalLoading(true))
  }

  /**
   * 隐藏loading
   */
  private hideLoading(): void {
    this.loadingCount--
    if (this.loadingCount <= 0) {
      this.loadingCount = 0
      // 这里可以集成全局loading组件
      // 例如：store.dispatch(setGlobalLoading(false))
    }
  }

  /**
   * GET请求
   */
  get<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.instance.get(url, config)
  }

  /**
   * POST请求
   */
  post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.instance.post(url, data, config)
  }

  /**
   * PUT请求
   */
  put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.instance.put(url, data, config)
  }

  /**
   * DELETE请求
   */
  delete<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.instance.delete(url, config)
  }

  /**
   * PATCH请求
   */
  patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.instance.patch(url, data, config)
  }

  /**
   * 上传文件
   */
  upload<T = any>(url: string, file: File, config?: RequestConfig): Promise<ApiResponse<T>> {
    const formData = new FormData()
    formData.append('file', file)

    return this.instance.post(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    })
  }

  /**
   * 下载文件
   */
  download(url: string, filename?: string, config?: RequestConfig): Promise<void> {
    return this.instance.get(url, {
      ...config,
      responseType: 'blob',
    }).then((response) => {
      const blob = new Blob([response.data])
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = filename || 'download'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    })
  }
}

// 创建API客户端实例
const apiClient = new ApiClient()

// 导出API客户端
export default apiClient

// 导出常用方法
export const { get, post, put, delete: del, patch, upload, download } = apiClient
