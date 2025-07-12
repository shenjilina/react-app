import React, { useState } from 'react'
import {
  Card,
  Form,
  Input,
  Button,
  Switch,
  Select,
  InputNumber,
  Upload,
  message,
  Divider,
  Typography,
  Space,
  Row,
  Col,
  Tabs,
  Alert,
  Modal,
  List,
  Tag,
} from 'antd'
import {
  SaveOutlined,
  ReloadOutlined,
  UploadOutlined,
  SettingOutlined,
  SecurityScanOutlined,
  MailOutlined,
  DatabaseOutlined,
  CloudOutlined,
  BellOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import type { UploadProps } from 'antd'
import './index.less'

const { Title, Text, Paragraph } = Typography
const { Option } = Select
const { TextArea } = Input
const { TabPane } = Tabs

interface ISystemSettings {
  siteName: string
  siteDescription: string
  siteKeywords: string
  siteLogo: string
  siteFavicon: string
  adminEmail: string
  timezone: string
  language: string
  dateFormat: string
  enableRegistration: boolean
  enableComments: boolean
  enableNotifications: boolean
  maxFileSize: number
  allowedFileTypes: string[]
  cacheEnabled: boolean
  cacheExpiration: number
}

interface IEmailSettings {
  smtpHost: string
  smtpPort: number
  smtpUsername: string
  smtpPassword: string
  smtpEncryption: string
  fromEmail: string
  fromName: string
  testEmail: string
}

interface ISecuritySettings {
  passwordMinLength: number
  passwordRequireUppercase: boolean
  passwordRequireLowercase: boolean
  passwordRequireNumbers: boolean
  passwordRequireSymbols: boolean
  sessionTimeout: number
  maxLoginAttempts: number
  lockoutDuration: number
  enableTwoFactor: boolean
  enableCaptcha: boolean
}

const SettingsManage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('general')
  const [systemForm] = Form.useForm()
  const [emailForm] = Form.useForm()
  const [securityForm] = Form.useForm()

  // 系统设置数据
  const [systemSettings, setSystemSettings] = useState<ISystemSettings>({
    siteName: '技术博客管理系统',
    siteDescription: '专业的技术文章分享平台，汇聚前端、后端、运维等各领域技术精华',
    siteKeywords: '技术博客,前端开发,后端开发,运维技术,编程教程',
    siteLogo: '',
    siteFavicon: '',
    adminEmail: 'admin@example.com',
    timezone: 'Asia/Shanghai',
    language: 'zh-CN',
    dateFormat: 'YYYY-MM-DD HH:mm:ss',
    enableRegistration: true,
    enableComments: true,
    enableNotifications: true,
    maxFileSize: 10,
    allowedFileTypes: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'],
    cacheEnabled: true,
    cacheExpiration: 3600,
  })

  // 邮件设置数据
  const [emailSettings, setEmailSettings] = useState<IEmailSettings>({
    smtpHost: 'smtp.example.com',
    smtpPort: 587,
    smtpUsername: 'noreply@example.com',
    smtpPassword: '',
    smtpEncryption: 'tls',
    fromEmail: 'noreply@example.com',
    fromName: '技术博客系统',
    testEmail: '',
  })

  // 安全设置数据
  const [securitySettings, setSecuritySettings] = useState<ISecuritySettings>({
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireLowercase: true,
    passwordRequireNumbers: true,
    passwordRequireSymbols: false,
    sessionTimeout: 1800,
    maxLoginAttempts: 5,
    lockoutDuration: 300,
    enableTwoFactor: false,
    enableCaptcha: true,
  })

  const uploadProps: UploadProps = {
    name: 'file',
    action: '/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 文件上传成功`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败`)
      }
    },
  }

  const handleSystemSave = async (): Promise<void> => {
    try {
      const values = await systemForm.validateFields()
      setLoading(true)
      
      // 模拟API调用
      setTimeout(() => {
        setSystemSettings({ ...systemSettings, ...values })
        message.success('系统设置保存成功')
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('表单验证失败:', error)
    }
  }

  const handleEmailSave = async (): Promise<void> => {
    try {
      const values = await emailForm.validateFields()
      setLoading(true)
      
      // 模拟API调用
      setTimeout(() => {
        setEmailSettings({ ...emailSettings, ...values })
        message.success('邮件设置保存成功')
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('表单验证失败:', error)
    }
  }

  const handleSecuritySave = async (): Promise<void> => {
    try {
      const values = await securityForm.validateFields()
      setLoading(true)
      
      // 模拟API调用
      setTimeout(() => {
        setSecuritySettings({ ...securitySettings, ...values })
        message.success('安全设置保存成功')
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('表单验证失败:', error)
    }
  }

  const handleTestEmail = (): void => {
    const testEmail = emailForm.getFieldValue('testEmail')
    if (!testEmail) {
      message.error('请输入测试邮箱地址')
      return
    }
    
    Modal.confirm({
      title: '发送测试邮件',
      content: `确定要向 ${testEmail} 发送测试邮件吗？`,
      icon: <MailOutlined />,
      onOk() {
        message.loading('正在发送测试邮件...', 2)
        setTimeout(() => {
          message.success('测试邮件发送成功')
        }, 2000)
      },
    })
  }

  const handleClearCache = (): void => {
    Modal.confirm({
      title: '清除缓存',
      content: '确定要清除所有系统缓存吗？这可能会暂时影响系统性能。',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        message.loading('正在清除缓存...', 2)
        setTimeout(() => {
          message.success('缓存清除成功')
        }, 2000)
      },
    })
  }

  const handleReset = (formType: string): void => {
    Modal.confirm({
      title: '重置设置',
      content: '确定要重置当前设置为默认值吗？此操作不可撤销。',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        switch (formType) {
          case 'system':
            systemForm.resetFields()
            break
          case 'email':
            emailForm.resetFields()
            break
          case 'security':
            securityForm.resetFields()
            break
        }
        message.success('设置已重置为默认值')
      },
    })
  }

  const systemOperations = [
    {
      title: '清除系统缓存',
      description: '清除所有系统缓存，提高系统性能',
      action: handleClearCache,
      icon: <DatabaseOutlined />,
      type: 'warning' as const,
    },
    {
      title: '重建搜索索引',
      description: '重新构建文章搜索索引，提高搜索准确性',
      action: () => message.info('重建索引功能开发中...'),
      icon: <CloudOutlined />,
      type: 'info' as const,
    },
    {
      title: '系统备份',
      description: '创建系统数据备份，确保数据安全',
      action: () => message.info('系统备份功能开发中...'),
      icon: <DatabaseOutlined />,
      type: 'success' as const,
    },
  ]

  return (
    <div className="settings-manage-container">
      <div className="page-header">
        <Title level={3}>系统设置</Title>
        <Text type="secondary">配置系统参数和功能选项</Text>
      </div>

      <Card className="settings-card" bordered={false}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          type="card"
          size="large"
        >
          {/* 基础设置 */}
          <TabPane
            tab={
              <Space>
                <SettingOutlined />
                基础设置
              </Space>
            }
            key="general"
          >
            <Form
              form={systemForm}
              layout="vertical"
              initialValues={systemSettings}
              className="settings-form"
            >
              <Row gutter={[24, 0]}>
                <Col xs={24} lg={12}>
                  <Form.Item
                    label="网站名称"
                    name="siteName"
                    rules={[
                      { required: true, message: '请输入网站名称' },
                      { max: 50, message: '网站名称不能超过50个字符' },
                    ]}
                  >
                    <Input placeholder="请输入网站名称" />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                  <Form.Item
                    label="管理员邮箱"
                    name="adminEmail"
                    rules={[
                      { required: true, message: '请输入管理员邮箱' },
                      { type: 'email', message: '请输入有效的邮箱地址' },
                    ]}
                  >
                    <Input placeholder="请输入管理员邮箱" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="网站描述"
                name="siteDescription"
                rules={[
                  { max: 200, message: '网站描述不能超过200个字符' },
                ]}
              >
                <TextArea
                  placeholder="请输入网站描述"
                  rows={3}
                  showCount
                  maxLength={200}
                />
              </Form.Item>

              <Form.Item
                label="网站关键词"
                name="siteKeywords"
                extra="多个关键词用英文逗号分隔"
              >
                <Input placeholder="请输入网站关键词" />
              </Form.Item>

              <Row gutter={[24, 0]}>
                <Col xs={24} lg={12}>
                  <Form.Item
                    label="时区"
                    name="timezone"
                  >
                    <Select placeholder="请选择时区">
                      <Option value="Asia/Shanghai">Asia/Shanghai (UTC+8)</Option>
                      <Option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</Option>
                      <Option value="America/New_York">America/New_York (UTC-5)</Option>
                      <Option value="Europe/London">Europe/London (UTC+0)</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                  <Form.Item
                    label="语言"
                    name="language"
                  >
                    <Select placeholder="请选择语言">
                      <Option value="zh-CN">简体中文</Option>
                      <Option value="zh-TW">繁体中文</Option>
                      <Option value="en-US">English</Option>
                      <Option value="ja-JP">日本語</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[24, 0]}>
                <Col xs={24} lg={8}>
                  <Form.Item
                    label="允许用户注册"
                    name="enableRegistration"
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={8}>
                  <Form.Item
                    label="允许评论"
                    name="enableComments"
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={8}>
                  <Form.Item
                    label="启用通知"
                    name="enableNotifications"
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[24, 0]}>
                <Col xs={24} lg={12}>
                  <Form.Item
                    label="最大文件大小 (MB)"
                    name="maxFileSize"
                    rules={[
                      { required: true, message: '请输入最大文件大小' },
                    ]}
                  >
                    <InputNumber
                      placeholder="请输入最大文件大小"
                      min={1}
                      max={100}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                  <Form.Item
                    label="缓存过期时间 (秒)"
                    name="cacheExpiration"
                  >
                    <InputNumber
                      placeholder="请输入缓存过期时间"
                      min={60}
                      max={86400}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="网站Logo"
                name="siteLogo"
              >
                <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined />}>点击上传Logo</Button>
                </Upload>
              </Form.Item>

              <div className="form-actions">
                <Space>
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={handleSystemSave}
                    loading={loading}
                  >
                    保存设置
                  </Button>
                  <Button
                    icon={<ReloadOutlined />}
                    onClick={() => handleReset('system')}
                  >
                    重置
                  </Button>
                </Space>
              </div>
            </Form>
          </TabPane>

          {/* 邮件设置 */}
          <TabPane
            tab={
              <Space>
                <MailOutlined />
                邮件设置
              </Space>
            }
            key="email"
          >
            <Alert
              message="邮件配置说明"
              description="配置SMTP服务器信息，用于发送系统通知邮件、密码重置邮件等。"
              type="info"
              showIcon
              style={{ marginBottom: 24 }}
            />

            <Form
              form={emailForm}
              layout="vertical"
              initialValues={emailSettings}
              className="settings-form"
            >
              <Row gutter={[24, 0]}>
                <Col xs={24} lg={12}>
                  <Form.Item
                    label="SMTP服务器"
                    name="smtpHost"
                    rules={[
                      { required: true, message: '请输入SMTP服务器地址' },
                    ]}
                  >
                    <Input placeholder="如：smtp.gmail.com" />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                  <Form.Item
                    label="SMTP端口"
                    name="smtpPort"
                    rules={[
                      { required: true, message: '请输入SMTP端口' },
                    ]}
                  >
                    <InputNumber
                      placeholder="如：587"
                      min={1}
                      max={65535}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[24, 0]}>
                <Col xs={24} lg={12}>
                  <Form.Item
                    label="SMTP用户名"
                    name="smtpUsername"
                    rules={[
                      { required: true, message: '请输入SMTP用户名' },
                    ]}
                  >
                    <Input placeholder="请输入SMTP用户名" />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                  <Form.Item
                    label="SMTP密码"
                    name="smtpPassword"
                    rules={[
                      { required: true, message: '请输入SMTP密码' },
                    ]}
                  >
                    <Input.Password placeholder="请输入SMTP密码" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[24, 0]}>
                <Col xs={24} lg={8}>
                  <Form.Item
                    label="加密方式"
                    name="smtpEncryption"
                  >
                    <Select placeholder="请选择加密方式">
                      <Option value="none">无加密</Option>
                      <Option value="ssl">SSL</Option>
                      <Option value="tls">TLS</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} lg={8}>
                  <Form.Item
                    label="发件人邮箱"
                    name="fromEmail"
                    rules={[
                      { required: true, message: '请输入发件人邮箱' },
                      { type: 'email', message: '请输入有效的邮箱地址' },
                    ]}
                  >
                    <Input placeholder="请输入发件人邮箱" />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={8}>
                  <Form.Item
                    label="发件人名称"
                    name="fromName"
                  >
                    <Input placeholder="请输入发件人名称" />
                  </Form.Item>
                </Col>
              </Row>

              <Divider>邮件测试</Divider>

              <Row gutter={[24, 0]}>
                <Col xs={24} lg={16}>
                  <Form.Item
                    label="测试邮箱"
                    name="testEmail"
                    rules={[
                      { type: 'email', message: '请输入有效的邮箱地址' },
                    ]}
                  >
                    <Input placeholder="请输入测试邮箱地址" />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={8}>
                  <Form.Item label=" ">
                    <Button
                      type="default"
                      icon={<MailOutlined />}
                      onClick={handleTestEmail}
                      style={{ width: '100%' }}
                    >
                      发送测试邮件
                    </Button>
                  </Form.Item>
                </Col>
              </Row>

              <div className="form-actions">
                <Space>
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={handleEmailSave}
                    loading={loading}
                  >
                    保存设置
                  </Button>
                  <Button
                    icon={<ReloadOutlined />}
                    onClick={() => handleReset('email')}
                  >
                    重置
                  </Button>
                </Space>
              </div>
            </Form>
          </TabPane>

          {/* 安全设置 */}
          <TabPane
            tab={
              <Space>
                <SecurityScanOutlined />
                安全设置
              </Space>
            }
            key="security"
          >
            <Alert
              message="安全配置说明"
              description="配置密码策略、登录安全等设置，提高系统安全性。"
              type="warning"
              showIcon
              style={{ marginBottom: 24 }}
            />

            <Form
              form={securityForm}
              layout="vertical"
              initialValues={securitySettings}
              className="settings-form"
            >
              <Title level={5}>密码策略</Title>
              
              <Row gutter={[24, 0]}>
                <Col xs={24} lg={12}>
                  <Form.Item
                    label="密码最小长度"
                    name="passwordMinLength"
                    rules={[
                      { required: true, message: '请输入密码最小长度' },
                    ]}
                  >
                    <InputNumber
                      placeholder="请输入密码最小长度"
                      min={6}
                      max={20}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                  <Form.Item
                    label="会话超时时间 (秒)"
                    name="sessionTimeout"
                  >
                    <InputNumber
                      placeholder="请输入会话超时时间"
                      min={300}
                      max={86400}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[24, 0]}>
                <Col xs={12} lg={6}>
                  <Form.Item
                    label="要求大写字母"
                    name="passwordRequireUppercase"
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="是" unCheckedChildren="否" />
                  </Form.Item>
                </Col>
                <Col xs={12} lg={6}>
                  <Form.Item
                    label="要求小写字母"
                    name="passwordRequireLowercase"
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="是" unCheckedChildren="否" />
                  </Form.Item>
                </Col>
                <Col xs={12} lg={6}>
                  <Form.Item
                    label="要求数字"
                    name="passwordRequireNumbers"
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="是" unCheckedChildren="否" />
                  </Form.Item>
                </Col>
                <Col xs={12} lg={6}>
                  <Form.Item
                    label="要求特殊字符"
                    name="passwordRequireSymbols"
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="是" unCheckedChildren="否" />
                  </Form.Item>
                </Col>
              </Row>

              <Divider />
              
              <Title level={5}>登录安全</Title>
              
              <Row gutter={[24, 0]}>
                <Col xs={24} lg={12}>
                  <Form.Item
                    label="最大登录尝试次数"
                    name="maxLoginAttempts"
                  >
                    <InputNumber
                      placeholder="请输入最大登录尝试次数"
                      min={3}
                      max={10}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                  <Form.Item
                    label="锁定持续时间 (秒)"
                    name="lockoutDuration"
                  >
                    <InputNumber
                      placeholder="请输入锁定持续时间"
                      min={60}
                      max={3600}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[24, 0]}>
                <Col xs={12} lg={6}>
                  <Form.Item
                    label="启用双因子认证"
                    name="enableTwoFactor"
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                  </Form.Item>
                </Col>
                <Col xs={12} lg={6}>
                  <Form.Item
                    label="启用验证码"
                    name="enableCaptcha"
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                  </Form.Item>
                </Col>
              </Row>

              <div className="form-actions">
                <Space>
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={handleSecuritySave}
                    loading={loading}
                  >
                    保存设置
                  </Button>
                  <Button
                    icon={<ReloadOutlined />}
                    onClick={() => handleReset('security')}
                  >
                    重置
                  </Button>
                </Space>
              </div>
            </Form>
          </TabPane>

          {/* 系统操作 */}
          <TabPane
            tab={
              <Space>
                <DatabaseOutlined />
                系统操作
              </Space>
            }
            key="operations"
          >
            <Alert
              message="系统操作说明"
              description="这些操作可能会影响系统性能或数据，请谨慎操作。"
              type="error"
              showIcon
              style={{ marginBottom: 24 }}
            />

            <List
              itemLayout="horizontal"
              dataSource={systemOperations}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button
                      key="action"
                      type={item.type}
                      icon={item.icon}
                      onClick={item.action}
                    >
                      执行
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={item.icon}
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  )
}

export default SettingsManage