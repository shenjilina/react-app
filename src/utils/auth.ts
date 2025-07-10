// 认证相关工具函数

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
 * 验证 token 是否有效（这里可以添加更复杂的验证逻辑）
 * @param {string} token - 要验证的 token
 * @returns {boolean} token 是否有效
 */
export const validateToken = (token: string): boolean => {
  // 这里可以添加 token 格式验证、过期时间检查等逻辑
  // 目前只做简单的非空检查
  return !!token && token.length > 0
}

/**
 * 检查 token 是否过期（示例实现）
 * @returns {boolean} token 是否过期
 */
export const isTokenExpired = (): boolean => {
  const token = getToken()
  if (!token) return true
  
  // 这里可以添加实际的 token 过期检查逻辑
  // 例如解析 JWT token 的过期时间
  // 目前返回 false 表示不过期
  return false
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