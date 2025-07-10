import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import router from './router'
import 'antd/dist/reset.css'
import './App.css'

// React 19 兼容性配置
import '@ant-design/v5-patch-for-react-19'

function App() {
  return (
    <ConfigProvider 
      locale={zhCN}
      theme={{
        token: {
          // 自定义主题配置
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
        components: {
          // 组件级别的主题配置
          Layout: {
            headerBg: '#fff',
            siderBg: '#001529',
          },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
