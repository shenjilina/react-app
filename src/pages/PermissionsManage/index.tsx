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
  Tree,
} from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  KeyOutlined,
  FolderOutlined,
  FileOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { DataNode } from 'antd/es/tree'
import './index.less'

const { Title } = Typography
const { Option } = Select

interface IPermissionData {
  id: string
  name: string
  code: string
  type: 'menu' | 'button' | 'api'
  description: string
  parentId?: string
  status: 'active' | 'inactive'
  createTime: string
}

const PermissionsManage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingPermission, setEditingPermission] = useState<IPermissionData | null>(null)
  const [form] = Form.useForm()

  // 模拟数据
  const [permissionsData, setPermissionsData] = useState<IPermissionData[]>([
    {
      id: '1',
      name: '系统管理',
      code: 'system',
      type: 'menu',
      description: '系统管理模块',
      status: 'active',
      createTime: '2024-01-15 10:30:00',
    },
    {
      id: '2',
      name: '用户管理',
      code: 'system:user',
      type: 'menu',
      description: '用户管理页面',
      parentId: '1',
      status: 'active',
      createTime: '2024-01-15 10:31:00',
    },
    {
      id: '3',
      name: '用户查看',
      code: 'system:user:view',
      type: 'button',
      description: '查看用户信息',
      parentId: '2',
      status: 'active',
      createTime: '2024-01-15 10:32:00',
    },
    {
      id: '4',
      name: '用户新增',
      code: 'system:user:add',
      type: 'button',
      description: '新增用户',
      parentId: '2',
      status: 'active',
      createTime: '2024-01-15 10:33:00',
    },
    {
      id: '5',
      name: '用户编辑',
      code: 'system:user:edit',
      type: 'button',
      description: '编辑用户信息',
      parentId: '2',
      status: 'active',
      createTime: '2024-01-15 10:34:00',
    },
    {
      id: '6',
      name: '用户删除',
      code: 'system:user:delete',
      type: 'button',
      description: '删除用户',
      parentId: '2',
      status: 'active',
      createTime: '2024-01-15 10:35:00',
    },
    {
      id: '7',
      name: '获取用户列表API',
      code: 'api:user:list',
      type: 'api',
      description: '获取用户列表接口',
      parentId: '2',
      status: 'active',
      createTime: '2024-01-15 10:36:00',
    },
    {
      id: '8',
      name: '角色管理',
      code: 'system:role',
      type: 'menu',
      description: '角色管理页面',
      parentId: '1',
      status: 'active',
      createTime: '2024-01-15 10:37:00',
    },
  ])

  const columns: ColumnsType<IPermissionData> = [
    {
      title: '权限名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: IPermissionData) => {
        const icon = record.type === 'menu' ? <FolderOutlined /> : 
                    record.type === 'button' ? <KeyOutlined /> : <FileOutlined />
        return (
          <Space>
            {icon}
            <span style={{ fontWeight: 500 }}>{text}</span>
          </Space>
        )
      },
    },
    {
      title: '权限编码',
      dataIndex: 'code',
      key: 'code',
      render: (text: string) => (
        <code style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>
          {text}
        </code>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const colorMap = {
          menu: 'blue',
          button: 'green',
          api: 'orange',
        }
        const textMap = {
          menu: '菜单',
          button: '按钮',
          api: '接口',
        }
        return (
          <Tag color={colorMap[type as keyof typeof colorMap]}>
            {textMap[type as keyof typeof textMap]}
          </Tag>
        )
      },
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
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: IPermissionData) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个权限吗？"
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

  // 构建树形数据
  const buildTreeData = (data: IPermissionData[]): DataNode[] => {
    const map = new Map<string, DataNode>()
    const roots: DataNode[] = []

    data.forEach(item => {
      const node: DataNode = {
        key: item.id,
        title: item.name,
        children: [],
      }
      map.set(item.id, node)
    })

    data.forEach(item => {
      const node = map.get(item.id)!
      if (item.parentId && map.has(item.parentId)) {
        const parent = map.get(item.parentId)!
        if (!parent.children) parent.children = []
        parent.children.push(node)
      } else {
        roots.push(node)
      }
    })

    return roots
  }

  const handleAdd = (): void => {
    setEditingPermission(null)
    setModalVisible(true)
    form.resetFields()
  }

  const handleEdit = (permission: IPermissionData): void => {
    setEditingPermission(permission)
    setModalVisible(true)
    form.setFieldsValue(permission)
  }

  const handleDelete = (id: string): void => {
    setPermissionsData(permissionsData.filter(permission => permission.id !== id))
    message.success('权限删除成功')
  }

  const handleModalOk = async (): Promise<void> => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      
      // 模拟API调用
      setTimeout(() => {
        if (editingPermission) {
          // 编辑
          setPermissionsData(permissionsData.map(permission => 
            permission.id === editingPermission.id ? { ...permission, ...values } : permission
          ))
          message.success('权限更新成功')
        } else {
          // 新增
          const newPermission: IPermissionData = {
            id: Date.now().toString(),
            ...values,
            createTime: new Date().toLocaleString('zh-CN'),
          }
          setPermissionsData([...permissionsData, newPermission])
          message.success('权限创建成功')
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
    <div className="permissions-manage-container">
      <div className="permissions-layout">
        {/* 左侧权限树 */}
        <Card title="权限结构" className="tree-card">
          <Tree
            treeData={buildTreeData(permissionsData)}
            defaultExpandAll
            showIcon
          />
        </Card>

        {/* 右侧权限列表 */}
        <Card bordered={false} className="table-card">
          <div className="page-header">
            <Title level={3}>权限管理</Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
            >
              新增权限
            </Button>
          </div>
          
          <Table
            columns={columns}
            dataSource={permissionsData}
            rowKey="id"
            pagination={{
              total: permissionsData.length,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `共 ${total} 条记录`,
            }}
          />
        </Card>
      </div>

      <Modal
        title={editingPermission ? '编辑权限' : '新增权限'}
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
            type: 'menu',
          }}
        >
          <Form.Item
            label="权限名称"
            name="name"
            rules={[
              { required: true, message: '请输入权限名称' },
              { min: 2, max: 20, message: '权限名称长度为2-20个字符' },
            ]}
          >
            <Input placeholder="请输入权限名称" />
          </Form.Item>
          
          <Form.Item
            label="权限编码"
            name="code"
            rules={[
              { required: true, message: '请输入权限编码' },
              { pattern: /^[a-zA-Z0-9:_-]+$/, message: '权限编码只能包含字母、数字、冒号、下划线和横线' },
            ]}
          >
            <Input placeholder="请输入权限编码，如：system:user:view" />
          </Form.Item>
          
          <Form.Item
            label="权限类型"
            name="type"
            rules={[{ required: true, message: '请选择权限类型' }]}
          >
            <Select placeholder="请选择权限类型">
              <Option value="menu">菜单</Option>
              <Option value="button">按钮</Option>
              <Option value="api">接口</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            label="上级权限"
            name="parentId"
          >
            <Select placeholder="请选择上级权限（可选）" allowClear>
              {permissionsData
                .filter(p => p.type === 'menu')
                .map(permission => (
                  <Option key={permission.id} value={permission.id}>
                    {permission.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            label="权限描述"
            name="description"
            rules={[
              { required: true, message: '请输入权限描述' },
              { max: 100, message: '描述不能超过100个字符' },
            ]}
          >
            <Input.TextArea
              placeholder="请输入权限描述"
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
        </Form>
      </Modal>
    </div>
  )
}

export default PermissionsManage