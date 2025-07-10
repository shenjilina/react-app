import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  isAuthenticated,
  isTokenExpired,
  validateToken,
  getToken,
} from '../utils/auth'
import { isRouteProtected } from '../config/routes'

/**
 * 路由守卫 Hook
 * 用于在路由变化时自动验证用户认证状态
 */
export const useRouteGuard = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const currentPath = location.pathname
    const token = getToken()
    const authenticated = isAuthenticated()
    const needsAuth = isRouteProtected(currentPath)
    const tokenExpired = isTokenExpired()

    // 如果当前路由需要认证
    if (needsAuth) {
      // 检查是否有有效的认证信息
      if (!authenticated || !token || !validateToken(token) || tokenExpired) {
        console.log('路由守卫：用户未认证或 token 无效，跳转到登录页')
        navigate('/login', { replace: true })
        return
      }
    }

    // 如果用户已登录但访问登录页，重定向到仪表盘
    if (
      currentPath === '/login' &&
      authenticated &&
      token &&
      validateToken(token) &&
      !tokenExpired
    ) {
      console.log('路由守卫：用户已登录，从登录页重定向到仪表盘')
      navigate('/dashboard', { replace: true })
      return
    }

    console.log('路由守卫：路由验证通过', {
      path: currentPath,
      needsAuth,
      authenticated,
      hasToken: !!token,
      tokenExpired,
    })
  }, [location.pathname, navigate])
}

/**
 * 全局路由守卫组件
 */
export const GlobalRouteGuard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useRouteGuard()
  return <>{children}</>
}
