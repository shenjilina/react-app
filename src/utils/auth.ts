// 认证相关工具函数
import { AuthApi } from '@/api/modules/auth'

/**
 * 检查用户是否已登录
 * @returns {boolean} 是否已登录
 */
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token')
  return !!token
}

/**
 * 获取存储的用户信息
 * @returns {any} 用户信息对象
 */
export const getUserInfo = (): any => {
  const userInfo = localStorage.getItem('userInfo')
  return userInfo ? JSON.parse(userInfo) : null
}

/**
 * 获取存储的 token
 * @returns {string | null} token 字符串
 */
export const getToken = (): string | null => {
  return localStorage.getItem('token')
}

/**
 * 清除认证信息
 */
export const clearAuth = (): void => {
  localStorage.removeItem('token')
  localStorage.removeItem('userInfo')
}

/**
 * 设置认证信息
 * @param {string} token - 认证 token
 * @param {any} userInfo - 用户信息
 */
export const setAuth = (token: string, userInfo: any): void => {
  localStorage.setItem('token', token)
  localStorage.setItem('userInfo', JSON.stringify(userInfo))
}

/**
 * 异步验证 token 是否有效（调用后端API）
 * @returns {Promise<boolean>} token 是否有效
 */
export const validateToken = async (): Promise<boolean> => {
  try {
    const res = await AuthApi.verifyToken()
    return res.data.valid
  } catch (error) {
    return false
  }
}

/**
 * 检查 token 是否过期
 * @returns {boolean} token 是否过期
 */
export const isTokenExpired = (): boolean => {
  const token = getToken()
  if (!token) return true

  try {
    // 解析 JWT token 检查过期时间
    const parts = token.split('.')
    if (parts.length !== 3) return true
    
    const payload = JSON.parse(atob(parts[1]))
    const currentTime = Math.floor(Date.now() / 1000)
    
    // 如果有过期时间且已过期，返回 true
    if (payload.exp && payload.exp < currentTime) {
      return true
    }
    
    return false
  } catch (error) {
    return true
  }
}

/**
 * 刷新 token（示例实现）
 * @returns {Promise<boolean>} 是否刷新成功
 */
export const refreshToken = async (): Promise<boolean> => {
  // 这里可以添加实际的 token 刷新逻辑
  // 例如调用刷新 token 的 API
  // 目前返回 false 表示不支持刷新
  return false
}
