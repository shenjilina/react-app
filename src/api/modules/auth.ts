import apiClient from '../index'
import type { ApiResponse } from '../index'

// 认证相关接口类型定义
export interface LoginParams {
  username: string
  password: string
  captcha?: string
}

export interface LoginResponse {
  token: string
  refreshToken: string
  userInfo: {
    id: string
    username: string
    email: string
    avatar?: string
    roles: string[]
    permissions: string[]
  }
}

export interface RegisterParams {
  username: string
  email: string
  password: string
  confirmPassword: string
  captcha?: string
}

export interface ResetPasswordParams {
  email: string
  captcha: string
  newPassword: string
  confirmPassword: string
}

export interface ChangePasswordParams {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export interface RefreshTokenParams {
  refreshToken: string
}

/**
 * 认证相关API
 */
export class AuthApi {
  /**
   * 用户登录
   */
  static login(params: LoginParams): Promise<ApiResponse<LoginResponse>> {
    return apiClient.post('/auth/login', params, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 用户注册
   */
  static register(params: RegisterParams): Promise<ApiResponse<void>> {
    return apiClient.post('/auth/register', params, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 用户登出
   */
  static logout(): Promise<ApiResponse<void>> {
    return apiClient.post(
      '/auth/logout',
      {},
      {
        showLoading: true,
        showSuccess: true,
        showError: true,
      }
    )
  }

  /**
   * Token 验证
   */
  static verifyToken(): Promise<ApiResponse<{ valid: boolean }>> {
    return apiClient.post(
      '/auth/verify-token',
      {},
      {
        showLoading: false,
        showError: false,
      }
    )
  }

  /**
   * 刷新Token
   */
  static refreshToken(
    params: RefreshTokenParams
  ): Promise<ApiResponse<{ token: string }>> {
    return apiClient.post('/auth/refresh-token', params, {
      showLoading: false,
      showError: true,
    })
  }

  /**
   * 获取用户信息
   */
  static getUserInfo(): Promise<ApiResponse<LoginResponse['userInfo']>> {
    return apiClient.get('/auth/user-info', {
      showLoading: false,
      showError: true,
    })
  }

  /**
   * 修改密码
   */
  static changePassword(
    params: ChangePasswordParams
  ): Promise<ApiResponse<void>> {
    return apiClient.post('/auth/change-password', params, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 重置密码
   */
  static resetPassword(
    params: ResetPasswordParams
  ): Promise<ApiResponse<void>> {
    return apiClient.post('/auth/reset-password', params, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 发送验证码
   */
  static sendCaptcha(email: string): Promise<ApiResponse<void>> {
    return apiClient.post(
      '/auth/send-captcha',
      { email },
      {
        showLoading: true,
        showSuccess: true,
        showError: true,
      }
    )
  }
}

export default AuthApi
