import { Layout } from 'antd'
import React from 'react'

const { Content } = Layout

interface IMainProps {
  children: React.ReactNode
}

const MainComponent: React.FC<IMainProps> = ({ children }) => {
  return (
    <Content className='layout-content'>
      <div className='content-wrapper'>{children}</div>
    </Content>
  )
}

export default MainComponent