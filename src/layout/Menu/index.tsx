import { getRouteByKey, routeConfig } from '@/config/routes'
import {
  BarChartOutlined,
  DashboardOutlined,
  EditOutlined,
  FileTextOutlined,
  HomeOutlined,
  SafetyOutlined,
  SettingOutlined,
  TagsOutlined,
  TeamOutlined,
  ToolOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Layout, Menu, Typography } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const { Sider } = Layout
const { Text } = Typography

interface IMenuProps {
  collapsed: boolean
  selectedKeys: string[]
  onSelectedKeysChange: (keys: string[]) => void
}

const MenuComponent: React.FC<IMenuProps> = ({
  collapsed,
  selectedKeys,
  onSelectedKeysChange,
}) => {
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

  const handleMenuClick = ({ key }: { key: string }) => {
    onSelectedKeysChange([key])

    // 根据菜单key获取路由配置并跳转
    const route = getRouteByKey(key)
    if (route) {
      navigate(route.path)
    } else {
      console.log('未找到对应的路由配置:', key)
    }
  }

  return (
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
  )
}

export default MenuComponent
