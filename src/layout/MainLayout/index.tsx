import {
  BarChartOutlined,
  BellOutlined,
  DashboardOutlined,
  EditOutlined,
  FileTextOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SafetyOutlined,
  SettingOutlined,
  TagsOutlined,
  TeamOutlined,
  ToolOutlined,
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
  Menu,
  Space,
  Typography,
} from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRouteByKey, routeConfig } from '../../config/routes'
import { clearAuth, getUserInfo } from '../../utils/auth'
import './index.less'

const { Header, Sider, Content } = Layout
const { Text } = Typography

interface IMainLayoutProps {
  children: React.ReactNode
}

type MenuItem = Required<MenuProps>['items'][number]

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState(['1'])
  const navigate = useNavigate()

  // 图标映射
  const iconMap: { [key: string]: React.ReactNode } = {
    DashboardOutlined: <DashboardOutlined />,
    HomeOutlined: <HomeOutlined />,
    SettingOutlined: <SettingOutlined />,
    UserOutlined: <UserOutlined />,
    TeamOutlined: <TeamOutlined />,
    SafetyOutlined: <SafetyOutlined />,
    FileTextOutlined: <FileTextOutlined />,
    EditOutlined: <EditOutlined />,
    TagsOutlined: <TagsOutlined />,
    BarChartOutlined: <BarChartOutlined />,
    ToolOutlined: <ToolOutlined />,
  }

  // 根据路由配置生成菜单项
  const generateMenuItems = (routes: typeof routeConfig) => {
    return routes.map(route => {
      const menuItem: any = {
        key: route.key,
        icon: route.icon ? iconMap[route.icon] : null,
        label: route.title,
      }

      if (route.children) {
        menuItem.children = generateMenuItems(route.children)
      }

      return menuItem
    })
  }

  const menuItems = generateMenuItems(routeConfig)

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

  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedKeys([key])

    // 根据菜单key获取路由配置并跳转
    const route = getRouteByKey(key)
    if (route) {
      navigate(route.path)
    } else {
      console.log('未找到对应的路由配置:', key)
    }
  }

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

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout className='main-layout'>
      {/* 侧边栏 */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className='layout-sider'
        width={240}
        collapsedWidth={64}
      >
        <div className='logo'>
          <div className='logo-icon'>
            <DashboardOutlined />
          </div>
          {!collapsed && (
            <div className='logo-text'>
              <Text strong className='logo-title'>
                管理系统
              </Text>
            </div>
          )}
        </div>

        <Menu
          theme='dark'
          mode='inline'
          selectedKeys={selectedKeys}
          items={menuItems}
          onClick={handleMenuClick}
          className='layout-menu'
        />
      </Sider>

      {/* 主要内容区域 */}
      <Layout className='layout-main'>
        {/* 头部 */}
        <Header className='layout-header'>
          <div className='header-left'>
            <Button
              type='text'
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleCollapsed}
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

        {/* 内容区域 */}
        <Content className='layout-content'>
          <div className='content-wrapper'>{children}</div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
