import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, Typography, message } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthApi } from '@/api/modules/auth'
import type { RegisterParams } from '@/api/modules/auth'
import './index.less'

const { Title } = Typography


const Register: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const handleSubmit = async (values: RegisterParams) => {
    setLoading(true)
    try {

      // 调用注册接口
      await AuthApi.register({ ...values });

      // 模拟注册逻辑
      console.log('注册信息:', values)

      message.success('注册成功！请使用新账户登录')

      // 注册成功后跳转到登录页面
      debugger;
      navigate('/login', { replace: true })
    } catch (error) {
      message.error('注册失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitFailed = (errorInfo: any) => {
    console.log('表单验证失败:', errorInfo)
    message.error('请检查输入信息')
  }

  return (
    <div className='register-container'>
      <div className='register-background'>
        <div className='register-form-wrapper'>
          <Card className='register-card'>
            <div className='register-header'>
              <Title level={2} className='register-title'>
                用户注册
              </Title>
              <p className='register-subtitle'>创建您的新账户，开始使用我们的服务</p>
            </div>

            <Form
              form={form}
              name='register'
              className='register-form'
              onFinish={handleSubmit}
              onFinishFailed={handleSubmitFailed}
              autoComplete='off'
              size='large'
              layout='vertical'
            >
              <Form.Item
                name='username'
                label='用户名'
                rules={[
                  { required: true, message: '请输入用户名！' },
                  { min: 3, message: '用户名至少3个字符！' },
                  { max: 20, message: '用户名最多20个字符！' },
                  { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线！' },
                ]}
              >
                <Input
                  prefix={<UserOutlined className='input-icon' />}
                  placeholder='请输入用户名'
                  allowClear
                />
              </Form.Item>

              <Form.Item
                name='email'
                label='邮箱地址'
                rules={[
                  { required: true, message: '请输入邮箱地址！' },
                  { type: 'email', message: '请输入有效的邮箱地址！' },
                ]}
              >
                <Input
                  prefix={<MailOutlined className='input-icon' />}
                  placeholder='请输入邮箱地址'
                  allowClear
                />
              </Form.Item>

              <Form.Item
                name='password'
                label='密码'
                rules={[
                  { required: true, message: '请输入密码！' },
                  { min: 6, message: '密码至少6个字符！' },
                  { max: 20, message: '密码最多20个字符！' },
                  {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/,
                    message: '密码必须包含大小写字母和数字！'
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  prefix={<LockOutlined className='input-icon' />}
                  placeholder='请输入密码'
                  allowClear
                />
              </Form.Item>

              <Form.Item
                name='confirmPassword'
                label='确认密码'
                dependencies={['password']}
                rules={[
                  { required: true, message: '请确认密码！' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('两次输入的密码不一致！'))
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input.Password
                  prefix={<LockOutlined className='input-icon' />}
                  placeholder='请再次输入密码'
                  allowClear
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='register-button'
                  loading={loading}
                  block
                >
                  {loading ? '注册中...' : '立即注册'}
                </Button>
              </Form.Item>
            </Form>

            <div className='register-footer'>
              <p className='register-tips'>
                已有账户？
                <Link to='/login' className='login-link'>
                  立即登录
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Register
