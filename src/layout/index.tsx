import { Layout } from 'antd'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import HeaderComponent from './Header'
import MainComponent from './Main'
import MenuComponent from './Menu'
import './index.less'

// interface IMainLayoutProps {
//   children: React.ReactNode
// }

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState(['1'])

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const handleSelectedKeysChange = (keys: string[]) => {
    setSelectedKeys(keys)
  }

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
