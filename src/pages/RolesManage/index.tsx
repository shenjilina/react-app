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
} from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  SafetyOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import './index.less'

const { Title } = Typography
const { Option } = Select

interface IRoleData {
  id: string
  name: string
  description: string
  status: 'active' | 'inactive'
  permissions: string[]
  userCount: number
  createTime: string
}

const RolesManage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingRole, setEditingRole] = useState<IRoleData | null>(null)
  const [form] = Form.useForm()

  // 模拟数据
  const [rolesData, setRolesData] = useState<IRoleData[]>([
    {
      id: '1',
      name: '超级管理员',
      description: '拥有系统所有权限',
      status: 'active',
      permissions: ['user:read', 'user:write', 'role:read', 'role:write', 'system:admin'],
      userCount: 2,
      createTime: '2024-01-15 10:30:00',
    },
    {
      id: '2',
      name: '普通管理员',
      description: '拥有基础管理权限',
      status: 'active',
      permissions: ['user:read', 'user:write', 'article:read', 'article:write'],
      userCount: 5,
      createTime: '2024-01-16 14:20:00',
    },
    {
      id: '3',
      name: '编辑员',
      description: '负责内容编辑和管理',
      status: 'active',
      permissions: ['article:read', 'article:write', 'category:read'],
      userCount: 8,
      createTime: '2024-01-17 09:15:00',
    },
    {
      id: '4',
      name: '访客',
      description: '只读权限',
      status: 'inactive',
      permissions: ['article:read'],
      userCount: 0,
      createTime: '2024-01-18 16:45:00',
    },
  ])

  const columns: ColumnsType<IRoleData> = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <SafetyOutlined style={{ color: '#1890ff' }} />
          <span style={{ fontWeight: 500 }}>{text}</span>
        </Space>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '权限数量',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (permissions: string[]) => (
        <Tag color="blue">{permissions.length} 个权限</Tag>
      ),
    },
    {
      title: '用户数量',
      dataIndex: 'userCount',
      key: 'userCount',
      render: (count: number) => (
        <Space>
          <UserOutlined />
          <span>{count} 人</span>
        </Space>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: IRoleData) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个角色吗？"
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
    setEditingRole(null)
    setModalVisible(true)
    form.resetFields()
  }

  const handleEdit = (role: IRoleData): void => {
    setEditingRole(role)
    setModalVisible(true)
    form.setFieldsValue(role)
  }

  const handleDelete = (id: string): void => {
    setRolesData(rolesData.filter(role => role.id !== id))
    message.success('角色删除成功')
  }

  const handleModalOk = async (): Promise<void> => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      
      // 模拟API调用
      setTimeout(() => {
        if (editingRole) {
          // 编辑
          setRolesData(rolesData.map(role => 
            role.id === editingRole.id ? { ...role, ...values } : role
          ))
          message.success('角色更新成功')
        } else {
          // 新增
          const newRole: IRoleData = {
            id: Date.now().toString(),
            ...values,
            userCount: 0,
            createTime: new Date().toLocaleString('zh-CN'),
          }
          setRolesData([...rolesData, newRole])
          message.success('角色创建成功')
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

  return (
    <div className="roles-manage-container">
      <Card bordered={false}>
        <div className="page-header">
          <Title level={3}>角色管理</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            新增角色
          </Button>
        </div>
        
        <Table
          columns={columns}
          dataSource={rolesData}
          rowKey="id"
          pagination={{
            total: rolesData.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
        />
      </Card>

      <Modal
        title={editingRole ? '编辑角色' : '新增角色'}
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
            status: 'active',
            permissions: [],
          }}
        >
          <Form.Item
            label="角色名称"
            name="name"
            rules={[
              { required: true, message: '请输入角色名称' },
              { min: 2, max: 20, message: '角色名称长度为2-20个字符' },
            ]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>
          
          <Form.Item
            label="角色描述"
            name="description"
            rules={[
              { required: true, message: '请输入角色描述' },
              { max: 100, message: '描述不能超过100个字符' },
            ]}
          >
            <Input.TextArea
              placeholder="请输入角色描述"
              rows={3}
              showCount
              maxLength={100}
            />
          </Form.Item>
          
          <Form.Item
            label="状态"
            name="status"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Option value="active">启用</Option>
              <Option value="inactive">禁用</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            label="权限配置"
            name="permissions"
            rules={[{ required: true, message: '请选择权限' }]}
          >
            <Select
              mode="multiple"
              placeholder="请选择权限"
              style={{ width: '100%' }}
            >
              <Option value="user:read">用户查看</Option>
              <Option value="user:write">用户管理</Option>
              <Option value="role:read">角色查看</Option>
              <Option value="role:write">角色管理</Option>
              <Option value="article:read">文章查看</Option>
              <Option value="article:write">文章管理</Option>
              <Option value="category:read">分类查看</Option>
              <Option value="category:write">分类管理</Option>
              <Option value="system:admin">系统管理</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default RolesManage