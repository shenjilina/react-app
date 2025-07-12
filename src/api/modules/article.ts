import apiClient, { ApiResponse } from '../index'

// 文章相关接口类型定义
export interface ArticleInfo {
  id: string
  title: string
  content: string
  summary?: string
  coverImage?: string
  author: {
    id: string
    username: string
    avatar?: string
  }
  category: {
    id: string
    name: string
    alias: string
  }
  tags: Array<{
    id: string
    name: string
    color?: string
  }>
  status: 'draft' | 'published' | 'archived'
  isTop: boolean
  viewCount: number
  likeCount: number
  commentCount: number
  publishTime?: string
  createdAt: string
  updatedAt: string
}

export interface ArticleListParams {
  page?: number
  pageSize?: number
  keyword?: string
  categoryId?: string
  tagId?: string
  authorId?: string
  status?: ArticleInfo['status']
  isTop?: boolean
  startDate?: string
  endDate?: string
  sortBy?: 'createdAt' | 'publishTime' | 'viewCount' | 'likeCount'
  sortOrder?: 'asc' | 'desc'
}

export interface ArticleListResponse {
  list: ArticleInfo[]
  total: number
  page: number
  pageSize: number
}

export interface CreateArticleParams {
  title: string
  content: string
  summary?: string
  coverImage?: string
  categoryId: string
  tagIds: string[]
  status: ArticleInfo['status']
  isTop?: boolean
  publishTime?: string
}

export interface UpdateArticleParams {
  id: string
  title?: string
  content?: string
  summary?: string
  coverImage?: string
  categoryId?: string
  tagIds?: string[]
  status?: ArticleInfo['status']
  isTop?: boolean
  publishTime?: string
}

export interface ArticleStatistics {
  totalArticles: number
  publishedArticles: number
  draftArticles: number
  archivedArticles: number
  totalViews: number
  totalLikes: number
  totalComments: number
  articlesThisMonth: number
  viewsThisMonth: number
  likesThisMonth: number
  categoryDistribution: Array<{
    categoryId: string
    categoryName: string
    count: number
  }>
  popularArticles: Array<{
    id: string
    title: string
    viewCount: number
    likeCount: number
  }>
}

/**
 * 文章管理相关API
 */
export class ArticleApi {
  /**
   * 获取文章列表
   */
  static getArticleList(params?: ArticleListParams): Promise<ApiResponse<ArticleListResponse>> {
    return apiClient.get('/articles', {
      params,
      showLoading: true,
      showError: true,
    })
  }

  /**
   * 获取文章详情
   */
  static getArticleDetail(id: string): Promise<ApiResponse<ArticleInfo>> {
    return apiClient.get(`/articles/${id}`, {
      showLoading: true,
      showError: true,
    })
  }

  /**
   * 创建文章
   */
  static createArticle(params: CreateArticleParams): Promise<ApiResponse<ArticleInfo>> {
    return apiClient.post('/articles', params, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 更新文章
   */
  static updateArticle(params: UpdateArticleParams): Promise<ApiResponse<ArticleInfo>> {
    const { id, ...data } = params
    return apiClient.put(`/articles/${id}`, data, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 删除文章
   */
  static deleteArticle(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(`/articles/${id}`, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 批量删除文章
   */
  static batchDeleteArticles(ids: string[]): Promise<ApiResponse<void>> {
    return apiClient.post('/articles/batch-delete', { ids }, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 更新文章状态
   */
  static updateArticleStatus(id: string, status: ArticleInfo['status']): Promise<ApiResponse<void>> {
    return apiClient.patch(`/articles/${id}/status`, { status }, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 切换文章置顶状态
   */
  static toggleArticleTop(id: string, isTop: boolean): Promise<ApiResponse<void>> {
    return apiClient.patch(`/articles/${id}/top`, { isTop }, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 发布文章
   */
  static publishArticle(id: string, publishTime?: string): Promise<ApiResponse<void>> {
    return apiClient.post(`/articles/${id}/publish`, { publishTime }, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 归档文章
   */
  static archiveArticle(id: string): Promise<ApiResponse<void>> {
    return apiClient.post(`/articles/${id}/archive`, {}, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 上传文章封面图片
   */
  static uploadCoverImage(file: File): Promise<ApiResponse<{ url: string }>> {
    return apiClient.upload('/articles/cover', file, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 上传文章内容图片
   */
  static uploadContentImage(file: File): Promise<ApiResponse<{ url: string }>> {
    return apiClient.upload('/articles/image', file, {
      showLoading: true,
      showError: true,
    })
  }

  /**
   * 获取文章统计数据
   */
  static getArticleStatistics(): Promise<ApiResponse<ArticleStatistics>> {
    return apiClient.get('/articles/statistics', {
      showLoading: true,
      showError: true,
    })
  }

  /**
   * 导出文章数据
   */
  static exportArticles(params?: ArticleListParams): Promise<void> {
    return apiClient.download('/articles/export', 'articles.xlsx', {
      params,
      showLoading: true,
      showError: true,
    })
  }

  /**
   * 搜索文章
   */
  static searchArticles(keyword: string): Promise<ApiResponse<ArticleInfo[]>> {
    return apiClient.get('/articles/search', {
      params: { keyword },
      showLoading: false,
      showError: true,
    })
  }

  /**
   * 获取热门文章
   */
  static getPopularArticles(limit = 10): Promise<ApiResponse<ArticleInfo[]>> {
    return apiClient.get('/articles/popular', {
      params: { limit },
      showLoading: false,
      showError: true,
    })
  }

  /**
   * 获取推荐文章
   */
  static getRecommendedArticles(articleId?: string, limit = 5): Promise<ApiResponse<ArticleInfo[]>> {
    return apiClient.get('/articles/recommended', {
      params: { articleId, limit },
      showLoading: false,
      showError: true,
    })
  }
}

export default ArticleApi