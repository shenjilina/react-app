/**
 * API使用示例
 * 本文件展示如何在React组件中使用封装好的API
 */

import { useState, useEffect } from 'react'
import { message } from 'antd'
import { AuthApi, UserApi, ArticleApi, CategoryApi, SystemApi } from './modules'
import type { LoginParams, UserInfo, ArticleInfo, CategoryInfo } from './modules'

/**
 * 认证相关API使用示例
 */
export const useAuthExample = () => {
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  // 登录示例
  const handleLogin = async (params: LoginParams) => {
    try {
      setLoading(true)
      const response = await AuthApi.login(params)
      
      // 保存token和用户信息
      localStorage.setItem('auth_token', response.data.token)
      localStorage.setItem('user_info', JSON.stringify(response.data.userInfo))
      
      setUserInfo(response.data.userInfo)
      message.success('登录成功')
    } catch (error) {
      console.error('登录失败:', error)
    } finally {
      setLoading(false)
    }
  }

  // 获取用户信息示例
  const fetchUserInfo = async () => {
    try {
      const response = await AuthApi.getUserInfo()
      setUserInfo(response.data)
    } catch (error) {
      console.error('获取用户信息失败:', error)
    }
  }

  // 登出示例
  const handleLogout = async () => {
    try {
      await AuthApi.logout()
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_info')
      setUserInfo(null)
      message.success('登出成功')
    } catch (error) {
      console.error('登出失败:', error)
    }
  }

  return {
    loading,
    userInfo,
    handleLogin,
    fetchUserInfo,
    handleLogout,
  }
}

/**
 * 用户管理API使用示例
 */
export const useUserManagement = () => {
  const [users, setUsers] = useState<UserInfo[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)

  // 获取用户列表示例
  const fetchUsers = async (params = { page: 1, pageSize: 10 }) => {
    try {
      setLoading(true)
      const response = await UserApi.getUserList(params)
      setUsers(response.data.list)
      setTotal(response.data.total)
    } catch (error) {
      console.error('获取用户列表失败:', error)
    } finally {
      setLoading(false)
    }
  }

  // 创建用户示例
  const createUser = async (userData: any) => {
    try {
      await UserApi.createUser(userData)
      message.success('用户创建成功')
      fetchUsers() // 刷新列表
    } catch (error) {
      console.error('创建用户失败:', error)
    }
  }

  // 更新用户示例
  const updateUser = async (userData: any) => {
    try {
      await UserApi.updateUser(userData)
      message.success('用户更新成功')
      fetchUsers() // 刷新列表
    } catch (error) {
      console.error('更新用户失败:', error)
    }
  }

  // 删除用户示例
  const deleteUser = async (userId: string) => {
    try {
      await UserApi.deleteUser(userId)
      message.success('用户删除成功')
      fetchUsers() // 刷新列表
    } catch (error) {
      console.error('删除用户失败:', error)
    }
  }

  return {
    users,
    loading,
    total,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  }
}

/**
 * 文章管理API使用示例
 */
export const useArticleManagement = () => {
  const [articles, setArticles] = useState<ArticleInfo[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)

  // 获取文章列表示例
  const fetchArticles = async (params = { page: 1, pageSize: 10 }) => {
    try {
      setLoading(true)
      const response = await ArticleApi.getArticleList(params)
      setArticles(response.data.list)
      setTotal(response.data.total)
    } catch (error) {
      console.error('获取文章列表失败:', error)
    } finally {
      setLoading(false)
    }
  }

  // 发布文章示例
  const publishArticle = async (articleId: string) => {
    try {
      await ArticleApi.publishArticle(articleId)
      message.success('文章发布成功')
      fetchArticles() // 刷新列表
    } catch (error) {
      console.error('发布文章失败:', error)
    }
  }

  // 上传封面图片示例
  const uploadCoverImage = async (file: File) => {
    try {
      const response = await ArticleApi.uploadCoverImage(file)
      return response.data.url
    } catch (error) {
      console.error('上传封面图片失败:', error)
      throw error
    }
  }

  return {
    articles,
    loading,
    total,
    fetchArticles,
    publishArticle,
    uploadCoverImage,
  }
}

/**
 * 分类管理API使用示例
 */
export const useCategoryManagement = () => {
  const [categories, setCategories] = useState<CategoryInfo[]>([])
  const [categoryTree, setCategoryTree] = useState<CategoryInfo[]>([])
  const [loading, setLoading] = useState(false)

  // 获取分类树形结构示例
  const fetchCategoryTree = async () => {
    try {
      setLoading(true)
      const response = await CategoryApi.getCategoryTree()
      setCategoryTree(response.data)
    } catch (error) {
      console.error('获取分类树失败:', error)
    } finally {
      setLoading(false)
    }
  }

  // 创建分类示例
  const createCategory = async (categoryData: any) => {
    try {
      await CategoryApi.createCategory(categoryData)
      message.success('分类创建成功')
      fetchCategoryTree() // 刷新树形结构
    } catch (error) {
      console.error('创建分类失败:', error)
    }
  }

  // 检查分类别名是否可用示例
  const checkCategoryAlias = async (alias: string, excludeId?: string) => {
    try {
      const response = await CategoryApi.checkCategoryAlias(alias, excludeId)
      return response.data.available
    } catch (error) {
      console.error('检查分类别名失败:', error)
      return false
    }
  }

  return {
    categories,
    categoryTree,
    loading,
    fetchCategoryTree,
    createCategory,
    checkCategoryAlias,
  }
}

/**
 * 系统管理API使用示例
 */
export const useSystemManagement = () => {
  const [systemInfo, setSystemInfo] = useState<any>(null)
  const [systemSettings, setSystemSettings] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  // 获取系统信息示例
  const fetchSystemInfo = async () => {
    try {
      setLoading(true)
      const response = await SystemApi.getSystemInfo()
      setSystemInfo(response.data)
    } catch (error) {
      console.error('获取系统信息失败:', error)
    } finally {
      setLoading(false)
    }
  }

  // 获取系统设置示例
  const fetchSystemSettings = async () => {
    try {
      const response = await SystemApi.getSystemSettings()
      setSystemSettings(response.data)
    } catch (error) {
      console.error('获取系统设置失败:', error)
    }
  }

  // 更新系统设置示例
  const updateSystemSettings = async (settings: any) => {
    try {
      await SystemApi.updateSystemSettings(settings)
      message.success('系统设置更新成功')
      fetchSystemSettings() // 刷新设置
    } catch (error) {
      console.error('更新系统设置失败:', error)
    }
  }

  // 清理缓存示例
  const clearCache = async (cacheType = 'all') => {
    try {
      await SystemApi.clearCache(cacheType as any)
      message.success('缓存清理成功')
    } catch (error) {
      console.error('清理缓存失败:', error)
    }
  }

  return {
    systemInfo,
    systemSettings,
    loading,
    fetchSystemInfo,
    fetchSystemSettings,
    updateSystemSettings,
    clearCache,
  }
}

/**
 * 在React组件中使用API的完整示例
 */
export const ExampleComponent: React.FC = () => {
  const { userInfo, handleLogin, handleLogout } = useAuthExample()
  const { users, fetchUsers, createUser } = useUserManagement()
  const { articles, fetchArticles } = useArticleManagement()

  useEffect(() => {
    // 组件挂载时获取数据
    fetchUsers()
    fetchArticles()
  }, [])

  const handleLoginSubmit = async (values: LoginParams) => {
    await handleLogin(values)
  }

  const handleCreateUser = async (userData: any) => {
    await createUser(userData)
  }

  return (
    <div>
      {/* 组件内容 */}
      <h1>API使用示例组件</h1>
      {userInfo ? (
        <div>
          <p>欢迎, {userInfo.username}!</p>
          <button onClick={handleLogout}>登出</button>
        </div>
      ) : (
        <div>
          <p>请先登录</p>
          {/* 登录表单 */}
        </div>
      )}
      
      {/* 用户列表 */}
      <div>
        <h2>用户列表 ({users.length})</h2>
        {users.map(user => (
          <div key={user.id}>{user.username}</div>
        ))}
      </div>
      
      {/* 文章列表 */}
      <div>
        <h2>文章列表 ({articles.length})</h2>
        {articles.map(article => (
          <div key={article.id}>{article.title}</div>
        ))}
      </div>
    </div>
  )
}

export default ExampleComponent