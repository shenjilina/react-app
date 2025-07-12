import apiClient, { ApiResponse } from '../index'

// 分类相关接口类型定义
export interface CategoryInfo {
  id: string
  name: string
  alias: string
  description?: string
  parentId?: string
  level: number
  sort: number
  color?: string
  icon?: string
  coverImage?: string
  status: 'active' | 'inactive'
  articleCount: number
  children?: CategoryInfo[]
  parent?: {
    id: string
    name: string
    alias: string
  }
  createdAt: string
  updatedAt: string
}

export interface CategoryListParams {
  page?: number
  pageSize?: number
  keyword?: string
  parentId?: string
  status?: CategoryInfo['status']
  level?: number
  sortBy?: 'sort' | 'createdAt' | 'articleCount'
  sortOrder?: 'asc' | 'desc'
  includeChildren?: boolean
}

export interface CategoryListResponse {
  list: CategoryInfo[]
  total: number
  page: number
  pageSize: number
}

export interface CreateCategoryParams {
  name: string
  alias: string
  description?: string
  parentId?: string
  sort?: number
  color?: string
  icon?: string
  coverImage?: string
  status?: CategoryInfo['status']
}

export interface UpdateCategoryParams {
  id: string
  name?: string
  alias?: string
  description?: string
  parentId?: string
  sort?: number
  color?: string
  icon?: string
  coverImage?: string
  status?: CategoryInfo['status']
}

export interface CategoryTreeNode extends CategoryInfo {
  key: string
  title: string
  value: string
  children?: CategoryTreeNode[]
}

export interface CategoryStatistics {
  totalCategories: number
  activeCategories: number
  inactiveCategories: number
  maxLevel: number
  categoryDistribution: Array<{
    level: number
    count: number
  }>
  topCategories: Array<{
    id: string
    name: string
    articleCount: number
  }>
}

/**
 * 分类管理相关API
 */
export class CategoryApi {
  /**
   * 获取分类列表
   */
  static getCategoryList(params?: CategoryListParams): Promise<ApiResponse<CategoryListResponse>> {
    return apiClient.get('/categories', {
      params,
      showLoading: true,
      showError: true,
    })
  }

  /**
   * 获取分类树形结构
   */
  static getCategoryTree(params?: Omit<CategoryListParams, 'page' | 'pageSize'>): Promise<ApiResponse<CategoryInfo[]>> {
    return apiClient.get('/categories/tree', {
      params,
      showLoading: true,
      showError: true,
    })
  }

  /**
   * 获取分类详情
   */
  static getCategoryDetail(id: string): Promise<ApiResponse<CategoryInfo>> {
    return apiClient.get(`/categories/${id}`, {
      showLoading: true,
      showError: true,
    })
  }

  /**
   * 创建分类
   */
  static createCategory(params: CreateCategoryParams): Promise<ApiResponse<CategoryInfo>> {
    return apiClient.post('/categories', params, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 更新分类
   */
  static updateCategory(params: UpdateCategoryParams): Promise<ApiResponse<CategoryInfo>> {
    const { id, ...data } = params
    return apiClient.put(`/categories/${id}`, data, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 删除分类
   */
  static deleteCategory(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(`/categories/${id}`, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 批量删除分类
   */
  static batchDeleteCategories(ids: string[]): Promise<ApiResponse<void>> {
    return apiClient.post('/categories/batch-delete', { ids }, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 更新分类状态
   */
  static updateCategoryStatus(id: string, status: CategoryInfo['status']): Promise<ApiResponse<void>> {
    return apiClient.patch(`/categories/${id}/status`, { status }, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 更新分类排序
   */
  static updateCategorySort(id: string, sort: number): Promise<ApiResponse<void>> {
    return apiClient.patch(`/categories/${id}/sort`, { sort }, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 批量更新分类排序
   */
  static batchUpdateCategorySort(items: Array<{ id: string; sort: number }>): Promise<ApiResponse<void>> {
    return apiClient.post('/categories/batch-sort', { items }, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 移动分类
   */
  static moveCategory(id: string, parentId?: string, sort?: number): Promise<ApiResponse<void>> {
    return apiClient.post(`/categories/${id}/move`, { parentId, sort }, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 上传分类封面图片
   */
  static uploadCoverImage(file: File): Promise<ApiResponse<{ url: string }>> {
    return apiClient.upload('/categories/cover', file, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 获取分类统计数据
   */
  static getCategoryStatistics(): Promise<ApiResponse<CategoryStatistics>> {
    return apiClient.get('/categories/statistics', {
      showLoading: true,
      showError: true,
    })
  }

  /**
   * 导出分类数据
   */
  static exportCategories(params?: CategoryListParams): Promise<void> {
    return apiClient.download('/categories/export', 'categories.xlsx', {
      params,
      showLoading: true,
      showError: true,
    })
  }

  /**
   * 搜索分类
   */
  static searchCategories(keyword: string): Promise<ApiResponse<CategoryInfo[]>> {
    return apiClient.get('/categories/search', {
      params: { keyword },
      showLoading: false,
      showError: true,
    })
  }

  /**
   * 获取父级分类选项
   */
  static getParentCategoryOptions(excludeId?: string): Promise<ApiResponse<CategoryTreeNode[]>> {
    return apiClient.get('/categories/parent-options', {
      params: { excludeId },
      showLoading: false,
      showError: true,
    })
  }

  /**
   * 检查分类别名是否可用
   */
  static checkCategoryAlias(alias: string, excludeId?: string): Promise<ApiResponse<{ available: boolean }>> {
    return apiClient.get('/categories/check-alias', {
      params: { alias, excludeId },
      showLoading: false,
      showError: false,
    })
  }

  /**
   * 获取分类路径
   */
  static getCategoryPath(id: string): Promise<ApiResponse<CategoryInfo[]>> {
    return apiClient.get(`/categories/${id}/path`, {
      showLoading: false,
      showError: true,
    })
  }
}

export default CategoryApi