import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, Typography, message } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setAuth } from '../../utils/auth.ts'
import { AuthApi } from '@/api/modules/auth'
import './index.less'

const { Title } = Typography

interface ILoginForm {
  username: string
  password: string
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const handleSubmit = async (values: ILoginForm) => {
    setLoading(true)
    try {
      const res = await AuthApi.login({
        username: values.username,
        password: values.password,
      })
      if(res.code === 200) {
        const { token, userInfo } = res.data
        setAuth(token, userInfo)
        message.success('登录成功！')

        // 跳转到首页
        navigate('/home', { replace: true })
      }
    } catch (error) {
      message.error('登录失败，请检查用户名和密码')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitFailed = (errorInfo: any) => {
    console.log('表单验证失败:', errorInfo)
    message.error('请检查输入信息')
  }

  return (
    <div className='login-container'>
      <div className='login-background'>
        <div className='login-form-wrapper'>
          <Card className='login-card'>
            <div className='login-header'>
              <Title level={2} className='login-title'>
                用户登录
              </Title>
              <p className='login-subtitle'>欢迎回来，请输入您的账户信息</p>
            </div>

            <Form
              form={form}
              name='login'
              className='login-form'
              onFinish={handleSubmit}
              onFinishFailed={handleSubmitFailed}
              autoComplete='off'
              size='large'
            >
              <Form.Item
                name='username'
                rules={[
                  { required: true, message: '请输入用户名！' },
                  { min: 3, message: '用户名至少3个字符！' },
                ]}
              >
                <Input
                  prefix={<UserOutlined className='input-icon' />}
                  placeholder='请输入用户名'
                  allowClear
                />
              </Form.Item>

              <Form.Item
                name='password'
                rules={[
                  { required: true, message: '请输入密码！' },
                  { min: 6, message: '密码至少6个字符！' },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className='input-icon' />}
                  placeholder='请输入密码'
                  allowClear
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='login-button'
                  loading={loading}
                  block
                >
                  {loading ? '登录中...' : '登录'}
                </Button>
              </Form.Item>
            </Form>

            <div className='login-footer'>
              <p className='login-tips'>
                还没有账户？
                <Link to='/register' className='register-link'>
                  立即注册
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Login
