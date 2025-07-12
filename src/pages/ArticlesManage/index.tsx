import React from 'react'
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Form,
  Input,
  Select,
  Popconfirm,
  Typography,
  DatePicker,
} from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  FileTextOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { usePageForm, type IArticleData } from './hooks/usePageForm.ts'
import EditModal from './components/EditModal/index.tsx'
import './index.less'

const { Title } = Typography
const { Option } = Select
const { RangePicker } = DatePicker

const ArticlesManage: React.FC = () => {
  const {
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
  } = usePageForm()

  const [searchForm] = Form.useForm()
  const [form] = Form.useForm()

  const columns: ColumnsType<IArticleData> = [
    {
      title: '文章标题',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: IArticleData) => (
        <Space>
          <FileTextOutlined style={{ color: '#1890ff' }} />
          <span style={{ fontWeight: 500 }}>{text}</span>
          {record.isTop && <Tag color="red">置顶</Tag>}
        </Space>
      ),
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => (
        <Tag color="blue">{category}</Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          draft: { color: 'orange', text: '草稿' },
          published: { color: 'green', text: '已发布' },
          archived: { color: 'gray', text: '已归档' },
        }
        const config = statusMap[status as keyof typeof statusMap]
        return <Tag color={config.color}>{config.text}</Tag>
      },
    },
    {
      title: '浏览量',
      dataIndex: 'views',
      key: 'views',
      render: (views: number) => (
        <Space>
          <EyeOutlined />
          <span>{views.toLocaleString()}</span>
        </Space>
      ),
    },
    {
      title: '点赞数',
      dataIndex: 'likes',
      key: 'likes',
    },
    {
      title: '发布时间',
      dataIndex: 'publishTime',
      key: 'publishTime',
      render: (time: string) => time || '-',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: IArticleData) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            查看
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record, form)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这篇文章吗？"
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



  return (
    <div className="articles-manage-container">
      {/* 搜索区域 */}
      <Card className="search-card" bordered={false}>
        <Form
          form={searchForm}
          layout="inline"
          className="search-form"
        >
          <Form.Item name="title" label="文章标题">
            <Input placeholder="请输入文章标题" style={{ width: 200 }} />
          </Form.Item>
          <Form.Item name="author" label="作者">
            <Input placeholder="请输入作者" style={{ width: 150 }} />
          </Form.Item>
          <Form.Item name="category" label="分类">
            <Select placeholder="请选择分类" style={{ width: 150 }} allowClear>
              <Option value="前端技术">前端技术</Option>
              <Option value="后端技术">后端技术</Option>
              <Option value="运维技术">运维技术</Option>
              <Option value="产品设计">产品设计</Option>
            </Select>
          </Form.Item>
          <Form.Item name="status" label="状态">
            <Select placeholder="请选择状态" style={{ width: 120 }} allowClear>
              <Option value="draft">草稿</Option>
              <Option value="published">已发布</Option>
              <Option value="archived">已归档</Option>
            </Select>
          </Form.Item>
          <Form.Item name="dateRange" label="发布时间">
            <RangePicker style={{ width: 240 }} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={() => handleSearch(searchForm)}>
                搜索
              </Button>
              <Button onClick={() => handleReset(searchForm)}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      {/* 文章列表 */}
      <Card bordered={false}>
        <div className="page-header">
          <Title level={3}>文章管理</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleAdd(form)}
          >
            新增文章
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={articlesData}
          rowKey="id"
          pagination={{
            total: articlesData.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
        />
      </Card>

      <EditModal
        visible={modalVisible}
        loading={loading}
        editingArticle={editingArticle}
        form={form}
        onOk={() => handleModalOk(form)}
        onCancel={() => handleModalCancel(form)}
      />
    </div>
  )
}

export default ArticlesManage
