import { isRouteProtected } from '@/config/routes'
import AppLayout from '@/layout'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import {
  getToken,
  isAuthenticated,
  isTokenExpired,
  validateToken,
} from '@/utils/auth'
import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

// 受保护的路由组件
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = getToken()
  const authenticated = isAuthenticated()
  const tokenExpired = isTokenExpired()

  // 检查是否有有效的 token
  if (!authenticated || !token || !validateToken(token) || tokenExpired) {
    return <Navigate to='/login' replace />
  }

  return <>{children}</>
}

// 路由守卫组件 - 在路由跳转前验证 token
const RouteGuard: React.FC<{ children: React.ReactNode; path: string }> = ({
  children,
  path,
}) => {
  const token = getToken()
  const authenticated = isAuthenticated()
  const needsAuth = isRouteProtected(path)
  const tokenExpired = isTokenExpired()

  // 如果路由需要认证但没有有效 token，跳转到登录页
  if (
    needsAuth &&
    (!authenticated || !token || !validateToken(token) || tokenExpired)
  ) {
    return <Navigate to='/login' replace />
  }

  // 如果已登录用户访问登录页，跳转到仪表盘
  if (
    path === '/login' &&
    authenticated &&
    token &&
    validateToken(token) &&
    !tokenExpired
  ) {
    return <Navigate to='/dashboard' replace />
  }

  return <>{children}</>
}

// 创建路由配置
export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <RouteGuard path='/login'>
        <Login />
      </RouteGuard>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to='/dashboard' replace />,
      },
      {
        path: 'dashboard',
        element: (
          <RouteGuard path='/dashboard'>
            <div>dashboard</div>
          </RouteGuard>
        ),
      },
      {
        path: 'home',
        element: (
          <RouteGuard path='/home'>
            <Home />
          </RouteGuard>
        ),
      },
      {
        path: 'about',
        element: (
          <RouteGuard path='/about'>
            <About />
          </RouteGuard>
        ),
      },
      {
        path: 'contact',
        element: (
          <RouteGuard path='/contact'>
            <Contact />
          </RouteGuard>
        ),
      },
      {
        path: 'users',
        element: (
          <RouteGuard path='/users'>
            <div>用户管理页面</div>
          </RouteGuard>
        ),
      },
      {
        path: 'roles',
        element: (
          <RouteGuard path='/roles'>
            <div>角色管理页面</div>
          </RouteGuard>
        ),
      },
      {
        path: 'permissions',
        element: (
          <RouteGuard path='/permissions'>
            <div>权限管理页面</div>
          </RouteGuard>
        ),
      },
      {
        path: 'articles',
        element: (
          <RouteGuard path='/articles'>
            <div>文章管理页面</div>
          </RouteGuard>
        ),
      },
      {
        path: 'categories',
        element: (
          <RouteGuard path='/categories'>
            <div>分类管理页面</div>
          </RouteGuard>
        ),
      },
      {
        path: 'statistics',
        element: (
          <RouteGuard path='/statistics'>
            <div>数据统计页面</div>
          </RouteGuard>
        ),
      },
      {
        path: 'settings',
        element: (
          <RouteGuard path='/settings'>
            <div>系统设置页面</div>
          </RouteGuard>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to='/login' replace />,
  },
])

export default router
