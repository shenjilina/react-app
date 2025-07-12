import { Layout } from 'antd'
import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import HeaderComponent from './Header'
import MainComponent from './Main'
import MenuComponent from './Menu'
import { getRouteByPath } from '@/config/routes'
import './index.less'

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState(['1'])

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const handleSelectedKeysChange = (keys: string[]) => {
    setSelectedKeys(keys)
  }

  const initSelectedKeys = () => {
    const pathname = window.location.pathname
    const route = getRouteByPath(pathname)
    if (route) {
      setSelectedKeys([route.key])
    }
  }
  useEffect(() => {
    initSelectedKeys()
  }, [])

  return (
    <Layout className='main-layout'>
      <MenuComponent
        collapsed={collapsed}
        selectedKeys={selectedKeys}
        onSelectedKeysChange={handleSelectedKeysChange}
      />

      <Layout className='layout-main'>
        <HeaderComponent
          collapsed={collapsed}
          onToggleCollapsed={toggleCollapsed}
        />

        <MainComponent>
          <Outlet />
        </MainComponent>
      </Layout>
    </Layout>
  )
}

export default AppLayout
