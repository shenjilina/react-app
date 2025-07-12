// 统一导出所有API模块
export { AuthApi, type LoginParams, type LoginResponse, type RegisterParams, type ResetPasswordParams, type ChangePasswordParams, type RefreshTokenParams } from './auth'
export { UserApi, type UserInfo, type UserListParams, type UserListResponse, type CreateUserParams, type UpdateUserParams, type UpdateUserProfileParams, type UserStatistics } from './user'
export { ArticleApi, type ArticleInfo, type ArticleListParams, type ArticleListResponse, type CreateArticleParams, type UpdateArticleParams, type ArticleStatistics } from './article'
export { CategoryApi, type CategoryInfo, type CategoryListParams, type CategoryListResponse, type CreateCategoryParams, type UpdateCategoryParams, type CategoryTreeNode, type CategoryStatistics } from './category'
export { SystemApi, type SystemSettings, type UpdateSystemSettingsParams, type SystemInfo, type SystemLog, type SystemLogParams, type SystemLogResponse, type BackupInfo, type CreateBackupParams, type RestoreBackupParams } from './system'

// 默认导出所有API类
export default {
  AuthApi,
  UserApi,
  ArticleApi,
  CategoryApi,
  SystemApi,
}