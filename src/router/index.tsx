import { isRouteProtected } from '@/config/routes'
import AppLayout from '@/layout'
import UsersManage from '@/pages/UsersManage'
import RolesManage from '@/pages/RolesManage'
import PermissionsManage from '@/pages/PermissionsManage'
import ArticlesManage from '@/pages/ArticlesManage'
import CategoriesManage from '@/pages/CategoriesManage'
import StatisticsManage from '@/pages/StatisticsManage'
import SettingsManage from '@/pages/SettingsManage'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
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
    path: '/register',
    element: (
      <RouteGuard path='/register'>
        <Register />
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
        element: <Navigate to='/home' replace />,
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
        path: 'users',
        element: (
          <RouteGuard path='/users'>
            <UsersManage />
          </RouteGuard>
        ),
      },
      {
        path: 'roles',
        element: (
          <RouteGuard path='/roles'>
            <RolesManage />
          </RouteGuard>
        ),
      },
      {
        path: 'permissions',
        element: (
          <RouteGuard path='/permissions'>
            <PermissionsManage />
          </RouteGuard>
        ),
      },
      {
        path: 'articles',
        element: (
          <RouteGuard path='/articles'>
            <ArticlesManage />
          </RouteGuard>
        ),
      },
      {
        path: 'categories',
        element: (
          <RouteGuard path='/categories'>
            <CategoriesManage />
          </RouteGuard>
        ),
      },
      {
        path: 'statistics',
        element: (
          <RouteGuard path='/statistics'>
            <StatisticsManage />
          </RouteGuard>
        ),
      },
      {
        path: 'settings',
        element: (
          <RouteGuard path='/settings'>
            <SettingsManage />
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
