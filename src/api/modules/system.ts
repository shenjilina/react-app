import apiClient, { ApiResponse } from '../index'

// 系统设置相关接口类型定义
export interface SystemSettings {
  // 基本设置
  siteName: string
  siteDescription: string
  siteKeywords: string
  siteLogo?: string
  siteFavicon?: string
  siteUrl: string
  adminEmail: string
  
  // 邮件设置
  emailProvider: 'smtp' | 'sendmail' | 'mailgun' | 'ses'
  smtpHost?: string
  smtpPort?: number
  smtpUser?: string
  smtpPassword?: string
  smtpSecure?: boolean
  emailFrom: string
  emailFromName: string
  
  // 安全设置
  enableRegistration: boolean
  requireEmailVerification: boolean
  enableCaptcha: boolean
  captchaProvider: 'recaptcha' | 'hcaptcha' | 'local'
  captchaSecretKey?: string
  sessionTimeout: number
  maxLoginAttempts: number
  lockoutDuration: number
  
  // 文件上传设置
  maxFileSize: number
  allowedFileTypes: string[]
  uploadPath: string
  enableImageCompression: boolean
  imageQuality: number
  
  // 缓存设置
  enableCache: boolean
  cacheProvider: 'memory' | 'redis' | 'file'
  cacheExpiration: number
  
  // 其他设置
  timezone: string
  dateFormat: string
  timeFormat: string
  language: string
  enableMaintenance: boolean
  maintenanceMessage?: string
}

export interface UpdateSystemSettingsParams extends Partial<SystemSettings> {}

export interface SystemInfo {
  version: string
  environment: 'development' | 'production' | 'staging'
  nodeVersion: string
  platform: string
  uptime: number
  memoryUsage: {
    used: number
    total: number
    percentage: number
  }
  diskUsage: {
    used: number
    total: number
    percentage: number
  }
  cpuUsage: number
  databaseInfo: {
    type: string
    version: string
    size: number
    connectionCount: number
  }
}

export interface SystemLog {
  id: string
  level: 'error' | 'warn' | 'info' | 'debug'
  message: string
  module: string
  userId?: string
  ip?: string
  userAgent?: string
  timestamp: string
  details?: Record<string, any>
}

export interface SystemLogParams {
  page?: number
  pageSize?: number
  level?: SystemLog['level']
  module?: string
  userId?: string
  startDate?: string
  endDate?: string
  keyword?: string
}

export interface SystemLogResponse {
  list: SystemLog[]
  total: number
  page: number
  pageSize: number
}

export interface BackupInfo {
  id: string
  name: string
  type: 'full' | 'incremental' | 'database' | 'files'
  size: number
  status: 'pending' | 'running' | 'completed' | 'failed'
  progress?: number
  createdAt: string
  completedAt?: string
  errorMessage?: string
}

export interface CreateBackupParams {
  name: string
  type: BackupInfo['type']
  description?: string
}

export interface RestoreBackupParams {
  backupId: string
  restoreType: 'full' | 'database' | 'files'
}

/**
 * 系统管理相关API
 */
export class SystemApi {
  /**
   * 获取系统设置
   */
  static getSystemSettings(): Promise<ApiResponse<SystemSettings>> {
    return apiClient.get('/system/settings', {
      showLoading: true,
      showError: true,
    })
  }

  /**
   * 更新系统设置
   */
  static updateSystemSettings(params: UpdateSystemSettingsParams): Promise<ApiResponse<SystemSettings>> {
    return apiClient.put('/system/settings', params, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 获取系统信息
   */
  static getSystemInfo(): Promise<ApiResponse<SystemInfo>> {
    return apiClient.get('/system/info', {
      showLoading: true,
      showError: true,
    })
  }

  /**
   * 获取系统日志
   */
  static getSystemLogs(params?: SystemLogParams): Promise<ApiResponse<SystemLogResponse>> {
    return apiClient.get('/system/logs', {
      params,
      showLoading: true,
      showError: true,
    })
  }

  /**
   * 清理系统日志
   */
  static clearSystemLogs(beforeDate?: string): Promise<ApiResponse<void>> {
    return apiClient.delete('/system/logs', {
      params: { beforeDate },
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 导出系统日志
   */
  static exportSystemLogs(params?: SystemLogParams): Promise<void> {
    return apiClient.download('/system/logs/export', 'system-logs.xlsx', {
      params,
      showLoading: true,
      showError: true,
    })
  }

  /**
   * 测试邮件配置
   */
  static testEmailConfig(email: string): Promise<ApiResponse<{ success: boolean; message: string }>> {
    return apiClient.post('/system/test-email', { email }, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 清理系统缓存
   */
  static clearCache(cacheType?: 'all' | 'api' | 'page' | 'image'): Promise<ApiResponse<void>> {
    return apiClient.post('/system/clear-cache', { cacheType }, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 重启系统服务
   */
  static restartSystem(): Promise<ApiResponse<void>> {
    return apiClient.post('/system/restart', {}, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 获取备份列表
   */
  static getBackupList(): Promise<ApiResponse<BackupInfo[]>> {
    return apiClient.get('/system/backups', {
      showLoading: true,
      showError: true,
    })
  }

  /**
   * 创建备份
   */
  static createBackup(params: CreateBackupParams): Promise<ApiResponse<BackupInfo>> {
    return apiClient.post('/system/backups', params, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 删除备份
   */
  static deleteBackup(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(`/system/backups/${id}`, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 下载备份文件
   */
  static downloadBackup(id: string, filename?: string): Promise<void> {
    return apiClient.download(`/system/backups/${id}/download`, filename, {
      showLoading: true,
      showError: true,
    })
  }

  /**
   * 恢复备份
   */
  static restoreBackup(params: RestoreBackupParams): Promise<ApiResponse<void>> {
    return apiClient.post('/system/restore', params, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 获取备份进度
   */
  static getBackupProgress(id: string): Promise<ApiResponse<{ progress: number; status: string }>> {
    return apiClient.get(`/system/backups/${id}/progress`, {
      showLoading: false,
      showError: true,
    })
  }

  /**
   * 上传系统Logo
   */
  static uploadLogo(file: File): Promise<ApiResponse<{ url: string }>> {
    return apiClient.upload('/system/logo', file, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 上传系统Favicon
   */
  static uploadFavicon(file: File): Promise<ApiResponse<{ url: string }>> {
    return apiClient.upload('/system/favicon', file, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 检查系统更新
   */
  static checkUpdate(): Promise<ApiResponse<{ hasUpdate: boolean; version?: string; changelog?: string }>> {
    return apiClient.get('/system/check-update', {
      showLoading: true,
      showError: true,
    })
  }

  /**
   * 执行系统更新
   */
  static performUpdate(): Promise<ApiResponse<void>> {
    return apiClient.post('/system/update', {}, {
      showLoading: true,
      showSuccess: true,
      showError: true,
    })
  }

  /**
   * 获取系统健康状态
   */
  static getHealthStatus(): Promise<ApiResponse<{ status: 'healthy' | 'warning' | 'error'; checks: Record<string, boolean> }>> {
    return apiClient.get('/system/health', {
      showLoading: false,
      showError: true,
    })
  }
}

export default SystemApi