import { clearAuth, getUserInfo } from '@/utils/auth'
import {
  BellOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Dropdown,
  Layout,
  Space,
  Typography,
} from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const { Header } = Layout
const { Text } = Typography

interface IHeaderProps {
  collapsed: boolean
  onToggleCollapsed: () => void
}

const HeaderComponent: React.FC<IHeaderProps> = ({
  collapsed,
  onToggleCollapsed,
}) => {
  const navigate = useNavigate()

  // 获取用户信息
  const userInfo = getUserInfo()

  // 用户下拉菜单
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '账户设置',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      danger: true,
    },
  ]

  const handleUserMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'profile':
        console.log('跳转到个人中心')
        break
      case 'settings':
        console.log('跳转到账户设置')
        break
      case 'logout':
        // 清除认证信息并跳转到登录页
        clearAuth()
        navigate('/login')
        break
      default:
        break
    }
  }

  return (
    <Header className='layout-header'>
      <div className='header-left'>
        <Button
          type='text'
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggleCollapsed}
          className='collapse-btn'
        />

        <Breadcrumb
          className='breadcrumb'
          items={[
            {
              title: <HomeOutlined />,
            },
            {
              title: '仪表盘',
            },
            {
              title: '数据概览',
            },
          ]}
        />
      </div>

      <div className='header-right'>
        <Space size='middle'>
          {/* 通知铃铛 */}
          <Badge count={5} size='small'>
            <Button
              type='text'
              icon={<BellOutlined />}
              className='header-btn'
            />
          </Badge>

          {/* 用户信息 */}
          <Dropdown
            menu={{
              items: userMenuItems,
              onClick: handleUserMenuClick,
            }}
            placement='bottomRight'
            arrow
          >
            <div className='user-info'>
              <Avatar
                size='small'
                icon={<UserOutlined />}
                className='user-avatar'
              />
              <Text className='user-name'>{userInfo?.name || '用户'}</Text>
            </div>
          </Dropdown>
        </Space>
      </div>
    </Header>
  )
}

export default HeaderComponent
