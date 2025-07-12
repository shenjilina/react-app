import apiClient, { ApiResponse } from '../index'

// 用户相关接口类型定义
export interface UserInfo {
  id: string
  username: string
  email: string
  phone?: string
  avatar?: string
  realName?: string
  gender?: 'male' | 'female' | 'unknown'
  birthday?: string
  address?: string
  bio?: string
  status: 'active' | 'inactive' | 'banned'
  roles: string[]
  permissions: string[]
  createdAt: string
  updatedAt: string
  lastLoginAt?: string
}

export interface UserListParams {
  page?: number
  pageSize?: number
  keyword?: string
  status?: UserInfo['status']
  role?: string
  startDate?: string
  endDate?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface UserListResponse {
  list: UserInfo[]
  total: number
  page: number
  pageSize: number
}

export interface CreateUserParams {
  username: string
  email: string
  password: string
  phone?: string
  realName?: string
  gender?: UserInfo['gender']
  roles: string[]
  status?: UserInfo['status']
}

export interface UpdateUserParams {
  id: string
  username?: string
  email?: string
  phone?: string
  realName?: string
  gender?: UserInfo['gender']
  birthday?: string
  address?: string
  bio?: string
  avatar?: string
  roles?: string[]
  status?: UserInfo['status']
}

export interface UpdateUserProfileParams {
  username?: string
  email?: string
  phone?: string
  realName?: string
  gender?: UserInfo['gender']
  birthday?: string
  address?: string
  bio?: string
  avatar?: string
}

export interface UserStatistics {
  totalUsers: number
  activeUsers: number
  newUsersToday: number
  newUsersThisMonth: number
  userGrowthRate: number
  genderDistribution: {
    male: number
    female: number
    unknown: number
  }
  roleDistribution: Record<string, number>
}

/**
 * 用户管理相关API
 */
export class UserApi {
  /**
   * 获取用户列表
   */
  static getUserList(params?: UserListParams): Promise<ApiResponse<UserListResponse>> {
    return apiClient.get('/users', {
      params,
      showLoading: true,
      showError: true,
    })
  }

  /**
   * 获取用户详情
   */
  static getUserDetail(id: string): Promise<ApiResponse<UserInfo>> {
    return apiClient.get(`/users/${id}`, {
      showLoading: true,
      showError: true,
    })
  }

  /**
   * 创建用户
   */
  static createUser(params: CreateUserParams): Promise<ApiResponse<UserInfo>> {
    return apiClient.post('/users', params, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 更新用户信息
   */
  static updateUser(params: UpdateUserParams): Promise<ApiResponse<UserInfo>> {
    const { id, ...data } = params
    return apiClient.put(`/users/${id}`, data, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 删除用户
   */
  static deleteUser(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(`/users/${id}`, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 批量删除用户
   */
  static batchDeleteUsers(ids: string[]): Promise<ApiResponse<void>> {
    return apiClient.post('/users/batch-delete', { ids }, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 更新用户状态
   */
  static updateUserStatus(id: string, status: UserInfo['status']): Promise<ApiResponse<void>> {
    return apiClient.patch(`/users/${id}/status`, { status }, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 重置用户密码
   */
  static resetUserPassword(id: string, newPassword: string): Promise<ApiResponse<void>> {
    return apiClient.post(`/users/${id}/reset-password`, { newPassword }, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 更新用户个人资料
   */
  static updateProfile(params: UpdateUserProfileParams): Promise<ApiResponse<UserInfo>> {
    return apiClient.put('/users/profile', params, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 上传用户头像
   */
  static uploadAvatar(file: File): Promise<ApiResponse<{ url: string }>> {
    return apiClient.upload('/users/avatar', file, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 获取用户统计数据
   */
  static getUserStatistics(): Promise<ApiResponse<UserStatistics>> {
    return apiClient.get('/users/statistics', {
      showLoading: true,
      showError: true,
    })
  }

  /**
   * 导出用户数据
   */
  static exportUsers(params?: UserListParams): Promise<void> {
    return apiClient.download('/users/export', 'users.xlsx', {
      params,
      showLoading: true,
      showError: true,
    })
  }

  /**
   * 搜索用户
   */
  static searchUsers(keyword: string): Promise<ApiResponse<UserInfo[]>> {
    return apiClient.get('/users/search', {
      params: { keyword },
      showLoading: false,
      showError: true,
    })
  }
}

export default UserApi