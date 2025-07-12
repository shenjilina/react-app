# API 封装使用指南

本项目使用 Axios 进行 HTTP 请求封装，提供了完整的 API 管理解决方案。

## 目录结构

```
src/api/
├── index.ts              # Axios 封装主文件
├── modules/              # API 模块目录
│   ├── auth.ts          # 认证相关 API
│   ├── user.ts          # 用户管理 API
│   ├── article.ts       # 文章管理 API
│   ├── category.ts      # 分类管理 API
│   ├── system.ts        # 系统管理 API
│   └── index.ts         # 模块统一导出
├── example.ts           # 使用示例
└── README.md           # 使用说明
```

## 核心特性

### 1. 统一的响应格式

```typescript
interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  success: boolean
}
```

### 2. 自动错误处理

- 自动显示错误消息
- 401 状态码自动跳转登录页
- 网络错误友好提示

### 3. 请求/响应拦截器

- 自动添加 Authorization 头
- 全局 Loading 状态管理
- 统一错误处理

### 4. 丰富的请求配置

```typescript
interface RequestConfig extends AxiosRequestConfig {
  showLoading?: boolean    // 是否显示加载状态
  showError?: boolean      // 是否显示错误消息
  showSuccess?: boolean    // 是否显示成功消息
}
```

## 基本使用

### 1. 导入 API 模块

```typescript
import { AuthApi, UserApi, ArticleApi } from '@/api/modules'
```

### 2. 在组件中使用

```typescript
import React, { useState, useEffect } from 'react'
import { UserApi } from '@/api/modules'
import type { UserInfo } from '@/api/modules'

const UserList: React.FC = () => {
  const [users, setUsers] = useState<UserInfo[]>([])
  const [loading, setLoading] = useState(false)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await UserApi.getUserList({
        page: 1,
        pageSize: 10
      })
      setUsers(response.data.list)
    } catch (error) {
      console.error('获取用户列表失败:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div>
      {loading ? '加载中...' : (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

### 3. 自定义 Hook 使用

```typescript
import { useState, useEffect } from 'react'
import { UserApi } from '@/api/modules'
import type { UserInfo, UserListParams } from '@/api/modules'

export const useUserList = () => {
  const [users, setUsers] = useState<UserInfo[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)

  const fetchUsers = async (params?: UserListParams) => {
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

  return {
    users,
    loading,
    total,
    fetchUsers,
  }
}

// 在组件中使用
const UserManagement: React.FC = () => {
  const { users, loading, total, fetchUsers } = useUserList()

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div>
      {/* 组件内容 */}
    </div>
  )
}
```

## API 模块说明

### 1. 认证模块 (AuthApi)

```typescript
// 用户登录
const response = await AuthApi.login({
  username: 'admin',
  password: '123456'
})

// 获取用户信息
const userInfo = await AuthApi.getUserInfo()

// 用户登出
await AuthApi.logout()
```

### 2. 用户管理模块 (UserApi)

```typescript
// 获取用户列表
const users = await UserApi.getUserList({
  page: 1,
  pageSize: 10,
  keyword: '搜索关键词'
})

// 创建用户
await UserApi.createUser({
  username: 'newuser',
  email: 'user@example.com',
  password: '123456',
  roles: ['user']
})

// 更新用户
await UserApi.updateUser({
  id: 'user-id',
  username: 'updated-username'
})
```

### 3. 文章管理模块 (ArticleApi)

```typescript
// 获取文章列表
const articles = await ArticleApi.getArticleList({
  page: 1,
  pageSize: 10,
  status: 'published'
})

// 创建文章
await ArticleApi.createArticle({
  title: '文章标题',
  content: '文章内容',
  categoryId: 'category-id',
  tagIds: ['tag1', 'tag2'],
  status: 'published'
})

// 上传封面图片
const coverUrl = await ArticleApi.uploadCoverImage(file)
```

### 4. 分类管理模块 (CategoryApi)

```typescript
// 获取分类树
const categoryTree = await CategoryApi.getCategoryTree()

// 创建分类
await CategoryApi.createCategory({
  name: '分类名称',
  alias: 'category-alias',
  parentId: 'parent-id'
})

// 检查别名是否可用
const isAvailable = await CategoryApi.checkCategoryAlias('alias')
```

### 5. 系统管理模块 (SystemApi)

```typescript
// 获取系统信息
const systemInfo = await SystemApi.getSystemInfo()

// 更新系统设置
await SystemApi.updateSystemSettings({
  siteName: '网站名称',
  siteDescription: '网站描述'
})

// 清理缓存
await SystemApi.clearCache('all')
```

## 文件上传

```typescript
// 上传用户头像
const handleAvatarUpload = async (file: File) => {
  try {
    const response = await UserApi.uploadAvatar(file)
    console.log('头像URL:', response.data.url)
  } catch (error) {
    console.error('上传失败:', error)
  }
}

// 上传文章封面
const handleCoverUpload = async (file: File) => {
  try {
    const response = await ArticleApi.uploadCoverImage(file)
    return response.data.url
  } catch (error) {
    throw error
  }
}
```

## 文件下载

```typescript
// 导出用户数据
const handleExportUsers = async () => {
  try {
    await UserApi.exportUsers({
      status: 'active'
    })
  } catch (error) {
    console.error('导出失败:', error)
  }
}

// 下载备份文件
const handleDownloadBackup = async (backupId: string) => {
  try {
    await SystemApi.downloadBackup(backupId, 'backup.zip')
  } catch (error) {
    console.error('下载失败:', error)
  }
}
```

## 错误处理

### 1. 全局错误处理

错误会自动通过 Ant Design 的 `message` 组件显示，无需手动处理。

### 2. 自定义错误处理

```typescript
// 禁用自动错误提示
const response = await UserApi.getUserList({
  page: 1,
  pageSize: 10
}, {
  showError: false  // 禁用自动错误提示
})

// 手动处理错误
try {
  const response = await UserApi.createUser(userData)
} catch (error) {
  // 自定义错误处理逻辑
  if (error.response?.status === 409) {
    message.error('用户名已存在')
  } else {
    message.error('创建用户失败')
  }
}
```

## 环境配置

### 1. 开发环境 (.env)

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_TITLE=React Admin
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development
```

### 2. 生产环境 (.env.production)

```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
VITE_APP_TITLE=React Admin
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=production
```

## 最佳实践

### 1. 使用 TypeScript 类型

```typescript
import type { UserInfo, CreateUserParams } from '@/api/modules'

const createUser = async (params: CreateUserParams): Promise<UserInfo> => {
  const response = await UserApi.createUser(params)
  return response.data
}
```

### 2. 封装自定义 Hook

```typescript
export const useUserManagement = () => {
  const [users, setUsers] = useState<UserInfo[]>([])
  const [loading, setLoading] = useState(false)

  const fetchUsers = useCallback(async (params?: UserListParams) => {
    try {
      setLoading(true)
      const response = await UserApi.getUserList(params)
      setUsers(response.data.list)
    } catch (error) {
      console.error('获取用户列表失败:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  return { users, loading, fetchUsers }
}
```

### 3. 错误边界处理

```typescript
const handleAsyncOperation = async () => {
  try {
    setLoading(true)
    await SomeApi.someOperation()
    message.success('操作成功')
  } catch (error) {
    console.error('操作失败:', error)
    // 错误已由拦截器自动处理
  } finally {
    setLoading(false)
  }
}
```

### 4. 请求取消

```typescript
const useApiWithCancel = () => {
  const abortControllerRef = useRef<AbortController>()

  const fetchData = async () => {
    // 取消之前的请求
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // 创建新的 AbortController
    abortControllerRef.current = new AbortController()

    try {
      const response = await UserApi.getUserList({
        page: 1,
        pageSize: 10
      }, {
        signal: abortControllerRef.current.signal
      })
      return response.data
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('请求失败:', error)
      }
    }
  }

  useEffect(() => {
    return () => {
      // 组件卸载时取消请求
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  return { fetchData }
}
```

## 扩展新的 API 模块

### 1. 创建新模块文件

```typescript
// src/api/modules/newModule.ts
import apiClient, { ApiResponse } from '../index'

export interface NewModuleData {
  id: string
  name: string
  // 其他字段...
}

export class NewModuleApi {
  static getList(): Promise<ApiResponse<NewModuleData[]>> {
    return apiClient.get('/new-module')
  }

  static create(data: Omit<NewModuleData, 'id'>): Promise<ApiResponse<NewModuleData>> {
    return apiClient.post('/new-module', data)
  }

  // 其他方法...
}

export default NewModuleApi
```

### 2. 更新模块导出

```typescript
// src/api/modules/index.ts
export { NewModuleApi, type NewModuleData } from './newModule'

export default {
  // 其他 API...
  NewModuleApi,
}
```

## 注意事项

1. **Token 管理**: Token 会自动添加到请求头，无需手动处理
2. **错误处理**: 401 错误会自动清除 Token 并跳转登录页
3. **Loading 状态**: 可通过 `showLoading` 参数控制是否显示加载状态
4. **类型安全**: 充分利用 TypeScript 类型检查，避免运行时错误
5. **环境变量**: 不同环境使用不同的 API 基础 URL

## 故障排除

### 1. 网络错误

- 检查 API 基础 URL 配置
- 确认后端服务是否正常运行
- 检查网络连接

### 2. 认证错误

- 检查 Token 是否有效
- 确认 Token 格式是否正确
- 检查后端认证逻辑

### 3. 类型错误

- 确保导入了正确的类型定义
- 检查 API 响应格式是否与类型定义匹配
- 更新类型定义以匹配最新的 API 规范

通过以上封装，您可以轻松地在项目中使用各种 API，同时保持代码的整洁和可维护性。