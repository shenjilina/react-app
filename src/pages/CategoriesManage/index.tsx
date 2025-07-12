import React, { useState } from 'react'
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  message,
  Popconfirm,
  Typography,
  Switch,
  TreeSelect,
  InputNumber,
  ColorPicker,
} from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FolderOutlined,
  SearchOutlined,
  SortAscendingOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { Color } from 'antd/es/color-picker'
import './index.less'

const { Title } = Typography
const { Option } = Select
const { TextArea } = Input

interface ICategoryData {
  id: string
  name: string
  slug: string
  description: string
  parentId: string | null
  level: number
  sort: number
  color: string
  icon: string
  isActive: boolean
  articleCount: number
  createTime: string
  updateTime: string
  children?: ICategoryData[]
}

const CategoriesManage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingCategory, setEditingCategory] = useState<ICategoryData | null>(null)
  const [searchForm] = Form.useForm()
  const [form] = Form.useForm()

  // 模拟数据
  const [categoriesData, setCategoriesData] = useState<ICategoryData[]>([
    {
      id: '1',
      name: '技术分享',
      slug: 'tech-share',
      description: '技术相关的文章分类',
      parentId: null,
      level: 1,
      sort: 1,
      color: '#1890ff',
      icon: 'CodeOutlined',
      isActive: true,
      articleCount: 25,
      createTime: '2024-01-10 10:00:00',
      updateTime: '2024-01-15 14:30:00',
      children: [
        {
          id: '2',
          name: '前端开发',
          slug: 'frontend',
          description: '前端技术相关文章',
          parentId: '1',
          level: 2,
          sort: 1,
          color: '#52c41a',
          icon: 'Html5Outlined',
          isActive: true,
          articleCount: 15,
          createTime: '2024-01-10 10:30:00',
          updateTime: '2024-01-15 14:30:00',
        },
        {
          id: '3',
          name: '后端开发',
          slug: 'backend',
          description: '后端技术相关文章',
          parentId: '1',
          level: 2,
          sort: 2,
          color: '#faad14',
          icon: 'DatabaseOutlined',
          isActive: true,
          articleCount: 10,
          createTime: '2024-01-10 11:00:00',
          updateTime: '2024-01-15 14:30:00',
        },
      ],
    },
    {
      id: '4',
      name: '产品设计',
      slug: 'product-design',
      description: '产品设计相关的文章分类',
      parentId: null,
      level: 1,
      sort: 2,
      color: '#f5222d',
      icon: 'SketchOutlined',
      isActive: true,
      articleCount: 8,
      createTime: '2024-01-11 09:00:00',
      updateTime: '2024-01-16 16:20:00',
      children: [
        {
          id: '5',
          name: 'UI设计',
          slug: 'ui-design',
          description: 'UI设计相关文章',
          parentId: '4',
          level: 2,
          sort: 1,
          color: '#eb2f96',
          icon: 'BgColorsOutlined',
          isActive: true,
          articleCount: 5,
          createTime: '2024-01-11 09:30:00',
          updateTime: '2024-01-16 16:20:00',
        },
        {
          id: '6',
          name: 'UX设计',
          slug: 'ux-design',
          description: 'UX设计相关文章',
          parentId: '4',
          level: 2,
          sort: 2,
          color: '#722ed1',
          icon: 'UserOutlined',
          isActive: true,
          articleCount: 3,
          createTime: '2024-01-11 10:00:00',
          updateTime: '2024-01-16 16:20:00',
        },
      ],
    },
    {
      id: '7',
      name: '行业资讯',
      slug: 'industry-news',
      description: '行业动态和资讯',
      parentId: null,
      level: 1,
      sort: 3,
      color: '#13c2c2',
      icon: 'GlobalOutlined',
      isActive: false,
      articleCount: 12,
      createTime: '2024-01-12 14:00:00',
      updateTime: '2024-01-17 10:15:00',
    },
  ])

  // 扁平化数据用于表格显示
  const flattenCategories = (categories: ICategoryData[], level = 0): ICategoryData[] => {
    let result: ICategoryData[] = []
    categories.forEach(category => {
      result.push({ ...category, level })
      if (category.children && category.children.length > 0) {
        result = result.concat(flattenCategories(category.children, level + 1))
      }
    })
    return result
  }

  const flatData = flattenCategories(categoriesData)

  // 构建树形选择器数据
  const buildTreeData = (categories: ICategoryData[]): any[] => {
    return categories.map(category => ({
      title: category.name,
      value: category.id,
      children: category.children ? buildTreeData(category.children) : undefined,
    }))
  }

  const treeData = buildTreeData(categoriesData)

  const columns: ColumnsType<ICategoryData> = [
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: ICategoryData) => (
        <Space>
          <div style={{ marginLeft: record.level * 20 }}>
            <FolderOutlined style={{ color: record.color, marginRight: 8 }} />
            <span style={{ fontWeight: record.level === 0 ? 600 : 400 }}>{text}</span>
          </div>
        </Space>
      ),
    },
    {
      title: '别名',
      dataIndex: 'slug',
      key: 'slug',
      render: (slug: string) => (
        <code style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: 4 }}>
          {slug}
        </code>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      width: 80,
      render: (sort: number) => (
        <Tag color="blue">{sort}</Tag>
      ),
    },
    {
      title: '颜色',
      dataIndex: 'color',
      key: 'color',
      width: 80,
      render: (color: string) => (
        <div
          style={{
            width: 20,
            height: 20,
            backgroundColor: color,
            borderRadius: 4,
            border: '1px solid #d9d9d9',
          }}
        />
      ),
    },
    {
      title: '文章数',
      dataIndex: 'articleCount',
      key: 'articleCount',
      width: 80,
      render: (count: number) => (
        <span style={{ color: '#1890ff', fontWeight: 500 }}>{count}</span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 80,
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 160,
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_, record: ICategoryData) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个分类吗？"
            description="删除后该分类下的文章将移至未分类"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const handleAdd = (): void => {
    setEditingCategory(null)
    setModalVisible(true)
    form.resetFields()
  }

  const handleEdit = (category: ICategoryData): void => {
    setEditingCategory(category)
    setModalVisible(true)
    form.setFieldsValue({
      ...category,
      color: category.color,
    })
  }

  const handleDelete = (id: string): void => {
    // 递归删除函数
    const deleteFromTree = (categories: ICategoryData[]): ICategoryData[] => {
      return categories.filter(category => {
        if (category.id === id) {
          return false
        }
        if (category.children) {
          category.children = deleteFromTree(category.children)
        }
        return true
      })
    }

    setCategoriesData(deleteFromTree(categoriesData))
    message.success('分类删除成功')
  }

  const handleModalOk = async (): Promise<void> => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      
      // 处理颜色值
      const processedValues = {
        ...values,
        color: typeof values.color === 'string' ? values.color : values.color?.toHexString?.() || '#1890ff',
      }
      
      // 模拟API调用
      setTimeout(() => {
        if (editingCategory) {
          // 编辑逻辑
          const updateInTree = (categories: ICategoryData[]): ICategoryData[] => {
            return categories.map(category => {
              if (category.id === editingCategory.id) {
                return { ...category, ...processedValues, updateTime: new Date().toLocaleString('zh-CN') }
              }
              if (category.children) {
                category.children = updateInTree(category.children)
              }
              return category
            })
          }
          setCategoriesData(updateInTree(categoriesData))
          message.success('分类更新成功')
        } else {
          // 新增逻辑
          const newCategory: ICategoryData = {
            id: Date.now().toString(),
            ...processedValues,
            level: processedValues.parentId ? 2 : 1,
            articleCount: 0,
            createTime: new Date().toLocaleString('zh-CN'),
            updateTime: new Date().toLocaleString('zh-CN'),
          }
          
          if (processedValues.parentId) {
            // 添加到父分类下
            const addToParent = (categories: ICategoryData[]): ICategoryData[] => {
              return categories.map(category => {
                if (category.id === processedValues.parentId) {
                  return {
                    ...category,
                    children: [...(category.children || []), newCategory],
                  }
                }
                if (category.children) {
                  category.children = addToParent(category.children)
                }
                return category
              })
            }
            setCategoriesData(addToParent(categoriesData))
          } else {
            // 添加为顶级分类
            setCategoriesData([...categoriesData, newCategory])
          }
          message.success('分类创建成功')
        }
        setModalVisible(false)
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('表单验证失败:', error)
    }
  }

  const handleModalCancel = (): void => {
    setModalVisible(false)
    form.resetFields()
  }

  const handleSearch = (): void => {
    const values = searchForm.getFieldsValue()
    console.log('搜索条件:', values)
    message.info('搜索功能开发中...')
  }

  const handleReset = (): void => {
    searchForm.resetFields()
  }

  return (
    <div className="categories-manage-container">
      {/* 搜索区域 */}
      <Card className="search-card" bordered={false}>
        <Form
          form={searchForm}
          layout="inline"
          className="search-form"
        >
          <Form.Item name="name" label="分类名称">
            <Input placeholder="请输入分类名称" style={{ width: 200 }} />
          </Form.Item>
          <Form.Item name="isActive" label="状态">
            <Select placeholder="请选择状态" style={{ width: 120 }} allowClear>
              <Option value={true}>启用</Option>
              <Option value={false}>禁用</Option>
            </Select>
          </Form.Item>
          <Form.Item name="level" label="层级">
            <Select placeholder="请选择层级" style={{ width: 120 }} allowClear>
              <Option value={1}>一级分类</Option>
              <Option value={2}>二级分类</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
                搜索
              </Button>
              <Button onClick={handleReset}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      {/* 分类列表 */}
      <Card bordered={false}>
        <div className="page-header">
          <Title level={3}>分类管理</Title>
          <Space>
            <Button
              icon={<SortAscendingOutlined />}
              onClick={() => message.info('排序功能开发中...')}
            >
              排序
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
            >
              新增分类
            </Button>
          </Space>
        </div>
        
        <Table
          columns={columns}
          dataSource={flatData}
          rowKey="id"
          pagination={{
            total: flatData.length,
            pageSize: 20,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
        />
      </Card>

      <Modal
        title={editingCategory ? '编辑分类' : '新增分类'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        confirmLoading={loading}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            isActive: true,
            sort: 1,
            color: '#1890ff',
          }}
        >
          <Form.Item
            label="分类名称"
            name="name"
            rules={[
              { required: true, message: '请输入分类名称' },
              { min: 2, max: 20, message: '分类名称长度为2-20个字符' },
            ]}
          >
            <Input placeholder="请输入分类名称" />
          </Form.Item>
          
          <Form.Item
            label="分类别名"
            name="slug"
            rules={[
              { required: true, message: '请输入分类别名' },
              { pattern: /^[a-z0-9-]+$/, message: '别名只能包含小写字母、数字和连字符' },
            ]}
          >
            <Input placeholder="请输入分类别名，如：frontend-tech" />
          </Form.Item>
          
          <Form.Item
            label="父分类"
            name="parentId"
          >
            <TreeSelect
              placeholder="请选择父分类（不选择则为顶级分类）"
              allowClear
              treeData={treeData}
              style={{ width: '100%' }}
            />
          </Form.Item>
          
          <Form.Item
            label="分类描述"
            name="description"
            rules={[
              { max: 100, message: '描述不能超过100个字符' },
            ]}
          >
            <TextArea
              placeholder="请输入分类描述"
              rows={3}
              showCount
              maxLength={100}
            />
          </Form.Item>
          
          <Form.Item
            label="排序"
            name="sort"
            rules={[
              { required: true, message: '请输入排序值' },
            ]}
          >
            <InputNumber
              placeholder="请输入排序值"
              min={1}
              max={999}
              style={{ width: '100%' }}
            />
          </Form.Item>
          
          <Form.Item
            label="分类颜色"
            name="color"
            rules={[
              { required: true, message: '请选择分类颜色' },
            ]}
          >
            <ColorPicker
              showText
              format="hex"
              presets={[
                {
                  label: '推荐颜色',
                  colors: [
                    '#1890ff',
                    '#52c41a',
                    '#faad14',
                    '#f5222d',
                    '#eb2f96',
                    '#722ed1',
                    '#13c2c2',
                    '#fa8c16',
                  ],
                },
              ]}
            />
          </Form.Item>
          
          <Form.Item
            label="图标"
            name="icon"
          >
            <Input placeholder="请输入图标名称，如：CodeOutlined" />
          </Form.Item>
          
          <Form.Item
            label="状态"
            name="isActive"
            valuePropName="checked"
          >
            <Switch checkedChildren="启用" unCheckedChildren="禁用" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CategoriesManage