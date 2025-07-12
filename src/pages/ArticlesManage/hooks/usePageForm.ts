import { useState } from 'react'
import { message } from 'antd'
import type { FormInstance } from 'antd'

export interface IArticleData {
  id: string
  title: string
  author: string
  category: string
  status: 'draft' | 'published' | 'archived'
  views: number
  likes: number
  isTop: boolean
  publishTime: string
  createTime: string
  summary: string
  coverImage?: string
}

export const usePageForm = () => {
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingArticle, setEditingArticle] = useState<IArticleData | null>(null)

  // 模拟数据
  const [articlesData, setArticlesData] = useState<IArticleData[]>([
    {
      id: '1',
      title: 'React 18 新特性详解',
      author: '张三',
      category: '前端技术',
      status: 'published',
      views: 1280,
      likes: 45,
      isTop: true,
      publishTime: '2024-01-15 10:30:00',
      createTime: '2024-01-14 16:20:00',
      summary: '本文详细介绍了 React 18 的新特性，包括并发渲染、自动批处理等重要更新。',
      coverImage: 'https://example.com/cover1.jpg',
    },
    {
      id: '2',
      title: 'TypeScript 最佳实践指南',
      author: '李四',
      category: '前端技术',
      status: 'published',
      views: 980,
      likes: 32,
      isTop: false,
      publishTime: '2024-01-16 14:20:00',
      createTime: '2024-01-15 09:15:00',
      summary: '分享 TypeScript 在实际项目中的最佳实践，帮助开发者写出更好的代码。',
    },
    {
      id: '3',
      title: 'Vue 3 组合式 API 深度解析',
      author: '王五',
      category: '前端技术',
      status: 'draft',
      views: 0,
      likes: 0,
      isTop: false,
      publishTime: '',
      createTime: '2024-01-17 11:30:00',
      summary: '深入探讨 Vue 3 组合式 API 的设计理念和使用技巧。',
    },
    {
      id: '4',
      title: 'Node.js 性能优化实战',
      author: '赵六',
      category: '后端技术',
      status: 'published',
      views: 756,
      likes: 28,
      isTop: false,
      publishTime: '2024-01-18 16:45:00',
      createTime: '2024-01-17 14:20:00',
      summary: '从多个维度分析 Node.js 应用的性能瓶颈，提供实用的优化方案。',
    },
    {
      id: '5',
      title: 'Docker 容器化部署指南',
      author: '孙七',
      category: '运维技术',
      status: 'archived',
      views: 1520,
      likes: 67,
      isTop: false,
      publishTime: '2024-01-10 09:00:00',
      createTime: '2024-01-09 15:30:00',
      summary: '详细介绍如何使用 Docker 进行应用容器化部署的完整流程。',
    },
  ])

  const handleAdd = (form: FormInstance): void => {
    setEditingArticle(null)
    setModalVisible(true)
    form.resetFields()
  }

  const handleEdit = (article: IArticleData, form: FormInstance): void => {
    setEditingArticle(article)
    setModalVisible(true)
    form.setFieldsValue({
      ...article,
      publishTime: article.publishTime ? new Date(article.publishTime) : null,
    })
  }

  const handleView = (article: IArticleData): void => {
    message.info(`查看文章：${article.title}`)
    // 这里可以跳转到文章详情页
  }

  const handleDelete = (id: string): void => {
    setArticlesData(articlesData.filter(article => article.id !== id))
    message.success('文章删除成功')
  }

  const handleModalOk = async (form: FormInstance): Promise<void> => {
    try {
      const values = await form.validateFields()
      setLoading(true)

      // 处理发布时间
      const processedValues = {
        ...values,
        publishTime: values.publishTime ? values.publishTime.format('YYYY-MM-DD HH:mm:ss') : '',
      }

      // 模拟API调用
      setTimeout(() => {
        if (editingArticle) {
          // 编辑
          setArticlesData(articlesData.map(article =>
            article.id === editingArticle.id ? { ...article, ...processedValues } : article
          ))
          message.success('文章更新成功')
        } else {
          // 新增
          const newArticle: IArticleData = {
            id: Date.now().toString(),
            ...processedValues,
            views: 0,
            likes: 0,
            createTime: new Date().toLocaleString('zh-CN'),
          }
          setArticlesData([...articlesData, newArticle])
          message.success('文章创建成功')
        }
        setModalVisible(false)
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('表单验证失败:', error)
    }
  }

  const handleModalCancel = (form: FormInstance): void => {
    setModalVisible(false)
    form.resetFields()
  }

  const handleSearch = (searchForm: FormInstance): void => {
    const values = searchForm.getFieldsValue()
    console.log('搜索条件:', values)
    message.info('搜索功能开发中...')
  }

  const handleReset = (searchForm: FormInstance): void => {
    searchForm.resetFields()
  }

  return {
    loading,
    modalVisible,
    editingArticle,
    articlesData,
    handleAdd,
    handleEdit,
    handleView,
    handleDelete,
    handleModalOk,
    handleModalCancel,
    handleSearch,
    handleReset,
  }
}
