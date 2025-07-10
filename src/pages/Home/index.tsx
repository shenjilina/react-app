import React from 'react'
import { Card, Row, Col, Statistic, Progress, Typography, Space, Button } from 'antd'
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  EyeOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons'
import './index.less'

const { Title, Paragraph } = Typography

const Home: React.FC = () => {
  // 模拟数据
  const statsData = [
    {
      title: '总用户数',
      value: 11280,
      prefix: <UserOutlined />,
      suffix: '人',
      precision: 0,
      valueStyle: { color: '#3f8600' },
      trend: { value: 11.28, isUp: true },
    },
    {
      title: '总订单数',
      value: 9280,
      prefix: <ShoppingCartOutlined />,
      suffix: '单',
      precision: 0,
      valueStyle: { color: '#cf1322' },
      trend: { value: 6.47, isUp: false },
    },
    {
      title: '总收入',
      value: 112893,
      prefix: <DollarOutlined />,
      suffix: '元',
      precision: 2,
      valueStyle: { color: '#1890ff' },
      trend: { value: 15.32, isUp: true },
    },
    {
      title: '页面浏览量',
      value: 893012,
      prefix: <EyeOutlined />,
      suffix: '次',
      precision: 0,
      valueStyle: { color: '#722ed1' },
      trend: { value: 8.91, isUp: true },
    },
  ]

  const progressData = [
    { label: '任务完成率', percent: 75, status: 'active' as const },
    { label: '项目进度', percent: 60, status: 'normal' as const },
    { label: '系统性能', percent: 90, status: 'success' as const },
    { label: '用户满意度', percent: 85, status: 'normal' as const },
  ]

  return (
    <div className="home-container">
      {/* 欢迎区域 */}
      <Card className="welcome-card" bordered={false}>
        <div className="welcome-content">
          <div className="welcome-text">
            <Title level={2} className="welcome-title">
              欢迎回来！
            </Title>
            <Paragraph className="welcome-description">
              今天是美好的一天，让我们开始工作吧。这里是您的工作台，您可以查看最新的数据统计和系统状态。
            </Paragraph>
            <Space>
              <Button type="primary" size="large">
                开始工作
              </Button>
              <Button size="large">查看报告</Button>
            </Space>
          </div>
          <div className="welcome-image">
            <div className="welcome-illustration">
              <UserOutlined style={{ fontSize: '120px', color: '#1890ff', opacity: 0.3 }} />
            </div>
          </div>
        </div>
      </Card>

      {/* 统计数据 */}
      <Row gutter={[16, 16]} className="stats-row">
        {statsData.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="stat-card" bordered={false}>
              <Statistic
                title={stat.title}
                value={stat.value}
                precision={stat.precision}
                valueStyle={stat.valueStyle}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
              <div className="stat-trend">
                {stat.trend.isUp ? (
                  <ArrowUpOutlined style={{ color: '#3f8600' }} />
                ) : (
                  <ArrowDownOutlined style={{ color: '#cf1322' }} />
                )}
                <span
                  style={{
                    color: stat.trend.isUp ? '#3f8600' : '#cf1322',
                    marginLeft: '4px',
                  }}
                >
                  {stat.trend.value}%
                </span>
                <span style={{ color: '#666', marginLeft: '8px' }}>较上月</span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 进度和图表区域 */}
      <Row gutter={[16, 16]} className="content-row">
        {/* 进度统计 */}
        <Col xs={24} lg={12}>
          <Card title="系统状态" className="progress-card" bordered={false}>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              {progressData.map((item, index) => (
                <div key={index} className="progress-item">
                  <div className="progress-header">
                    <span className="progress-label">{item.label}</span>
                    <span className="progress-value">{item.percent}%</span>
                  </div>
                  <Progress
                    percent={item.percent}
                    status={item.status}
                    showInfo={false}
                    strokeWidth={8}
                  />
                </div>
              ))}
            </Space>
          </Card>
        </Col>

        {/* 快速操作 */}
        <Col xs={24} lg={12}>
          <Card title="快速操作" className="quick-actions-card" bordered={false}>
            <Row gutter={[12, 12]}>
              <Col span={12}>
                <Button
                  type="primary"
                  size="large"
                  block
                  icon={<UserOutlined />}
                  className="action-btn"
                >
                  用户管理
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  size="large"
                  block
                  icon={<ShoppingCartOutlined />}
                  className="action-btn"
                >
                  订单管理
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  size="large"
                  block
                  icon={<DollarOutlined />}
                  className="action-btn"
                >
                  财务报表
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  size="large"
                  block
                  icon={<EyeOutlined />}
                  className="action-btn"
                >
                  数据分析
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Home