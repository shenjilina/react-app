import React, { useState, useEffect } from 'react'
import {
  Card,
  Row,
  Col,
  Statistic,
  Button,
  Space,
  DatePicker,
  Select,
  Table,
  Progress,
  Typography,
  Divider,
  Tag,
} from 'antd'
import {
  UserOutlined,
  FileTextOutlined,
  EyeOutlined,
  LikeOutlined,
  TrophyOutlined,
  RiseOutlined,
  FallOutlined,
  DownloadOutlined,
  ReloadOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import './index.less'

const { Title, Text } = Typography
const { RangePicker } = DatePicker
const { Option } = Select

interface IStatisticsData {
  totalUsers: number
  totalArticles: number
  totalViews: number
  totalLikes: number
  todayUsers: number
  todayArticles: number
  todayViews: number
  todayLikes: number
  userGrowthRate: number
  articleGrowthRate: number
  viewGrowthRate: number
  likeGrowthRate: number
}

interface IPopularArticle {
  id: string
  title: string
  author: string
  category: string
  views: number
  likes: number
  publishTime: string
}

interface IUserActivity {
  id: string
  username: string
  avatar: string
  articlesCount: number
  totalViews: number
  totalLikes: number
  lastActiveTime: string
  level: string
}

interface ICategoryStats {
  id: string
  name: string
  articleCount: number
  totalViews: number
  percentage: number
  color: string
}

const StatisticsManage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [dateRange, setDateRange] = useState<string>('7')
  const [statisticsData, setStatisticsData] = useState<IStatisticsData>({
    totalUsers: 12580,
    totalArticles: 1456,
    totalViews: 89234,
    totalLikes: 5678,
    todayUsers: 156,
    todayArticles: 23,
    todayViews: 2341,
    todayLikes: 189,
    userGrowthRate: 12.5,
    articleGrowthRate: 8.3,
    viewGrowthRate: 15.7,
    likeGrowthRate: 6.9,
  })

  // 热门文章数据
  const [popularArticles] = useState<IPopularArticle[]>([
    {
      id: '1',
      title: 'React 18 新特性详解与实战应用',
      author: '张三',
      category: '前端技术',
      views: 8520,
      likes: 342,
      publishTime: '2024-01-15',
    },
    {
      id: '2',
      title: 'TypeScript 最佳实践指南',
      author: '李四',
      category: '前端技术',
      views: 6890,
      likes: 278,
      publishTime: '2024-01-16',
    },
    {
      id: '3',
      title: 'Node.js 性能优化实战',
      author: '王五',
      category: '后端技术',
      views: 5432,
      likes: 201,
      publishTime: '2024-01-17',
    },
    {
      id: '4',
      title: 'Vue 3 组合式 API 深度解析',
      author: '赵六',
      category: '前端技术',
      views: 4567,
      likes: 189,
      publishTime: '2024-01-18',
    },
    {
      id: '5',
      title: 'Docker 容器化部署完整指南',
      author: '孙七',
      category: '运维技术',
      views: 3890,
      likes: 156,
      publishTime: '2024-01-19',
    },
  ])

  // 活跃用户数据
  const [activeUsers] = useState<IUserActivity[]>([
    {
      id: '1',
      username: '技术达人',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
      articlesCount: 45,
      totalViews: 125680,
      totalLikes: 3456,
      lastActiveTime: '2024-01-20 14:30:00',
      level: '专家',
    },
    {
      id: '2',
      username: '前端小王',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
      articlesCount: 32,
      totalViews: 89234,
      totalLikes: 2341,
      lastActiveTime: '2024-01-20 13:45:00',
      level: '高级',
    },
    {
      id: '3',
      username: '后端老李',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
      articlesCount: 28,
      totalViews: 67890,
      totalLikes: 1987,
      lastActiveTime: '2024-01-20 12:20:00',
      level: '高级',
    },
    {
      id: '4',
      username: '设计师小美',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
      articlesCount: 21,
      totalViews: 45678,
      totalLikes: 1456,
      lastActiveTime: '2024-01-20 11:15:00',
      level: '中级',
    },
    {
      id: '5',
      username: '运维工程师',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
      articlesCount: 19,
      totalViews: 34567,
      totalLikes: 1234,
      lastActiveTime: '2024-01-20 10:30:00',
      level: '中级',
    },
  ])

  // 分类统计数据
  const [categoryStats] = useState<ICategoryStats[]>([
    {
      id: '1',
      name: '前端技术',
      articleCount: 456,
      totalViews: 234567,
      percentage: 35.2,
      color: '#1890ff',
    },
    {
      id: '2',
      name: '后端技术',
      articleCount: 342,
      totalViews: 189234,
      percentage: 28.6,
      color: '#52c41a',
    },
    {
      id: '3',
      name: '运维技术',
      articleCount: 234,
      totalViews: 123456,
      percentage: 18.7,
      color: '#faad14',
    },
    {
      id: '4',
      name: '产品设计',
      articleCount: 156,
      totalViews: 89123,
      percentage: 12.1,
      color: '#f5222d',
    },
    {
      id: '5',
      name: '行业资讯',
      articleCount: 89,
      totalViews: 45678,
      percentage: 5.4,
      color: '#722ed1',
    },
  ])

  const popularArticlesColumns: ColumnsType<IPopularArticle> = [
    {
      title: '排名',
      key: 'rank',
      width: 60,
      render: (_, __, index) => (
        <div className="rank-badge">
          {index < 3 ? (
            <TrophyOutlined style={{ color: ['#ffd700', '#c0c0c0', '#cd7f32'][index] }} />
          ) : (
            <span className="rank-number">{index + 1}</span>
          )}
        </div>
      ),
    },
    {
      title: '文章标题',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      render: (title: string) => (
        <Text strong style={{ color: '#1890ff' }}>{title}</Text>
      ),
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
      width: 100,
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 100,
      render: (category: string) => (
        <Tag color="blue">{category}</Tag>
      ),
    },
    {
      title: '浏览量',
      dataIndex: 'views',
      key: 'views',
      width: 100,
      render: (views: number) => (
        <Space>
          <EyeOutlined style={{ color: '#1890ff' }} />
          <span>{views.toLocaleString()}</span>
        </Space>
      ),
    },
    {
      title: '点赞数',
      dataIndex: 'likes',
      key: 'likes',
      width: 100,
      render: (likes: number) => (
        <Space>
          <LikeOutlined style={{ color: '#f5222d' }} />
          <span>{likes}</span>
        </Space>
      ),
    },
  ]

  const activeUsersColumns: ColumnsType<IUserActivity> = [
    {
      title: '用户',
      key: 'user',
      render: (_, record: IUserActivity) => (
        <Space>
          <img
            src={record.avatar}
            alt={record.username}
            style={{ width: 32, height: 32, borderRadius: '50%' }}
          />
          <div>
            <div style={{ fontWeight: 500 }}>{record.username}</div>
            <Tag color={record.level === '专家' ? 'gold' : record.level === '高级' ? 'blue' : 'green'}>
              {record.level}
            </Tag>
          </div>
        </Space>
      ),
    },
    {
      title: '文章数',
      dataIndex: 'articlesCount',
      key: 'articlesCount',
      width: 80,
      render: (count: number) => (
        <Text strong style={{ color: '#1890ff' }}>{count}</Text>
      ),
    },
    {
      title: '总浏览量',
      dataIndex: 'totalViews',
      key: 'totalViews',
      width: 100,
      render: (views: number) => (
        <span>{views.toLocaleString()}</span>
      ),
    },
    {
      title: '总点赞数',
      dataIndex: 'totalLikes',
      key: 'totalLikes',
      width: 100,
      render: (likes: number) => (
        <span>{likes.toLocaleString()}</span>
      ),
    },
    {
      title: '最后活跃',
      dataIndex: 'lastActiveTime',
      key: 'lastActiveTime',
      width: 150,
      render: (time: string) => (
        <Text type="secondary">{time}</Text>
      ),
    },
  ]

  const handleRefresh = (): void => {
    setLoading(true)
    // 模拟数据刷新
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const handleExport = (): void => {
    // 模拟导出功能
    console.log('导出统计数据')
  }

  const handleDateRangeChange = (value: string): void => {
    setDateRange(value)
    // 根据时间范围重新加载数据
    console.log('时间范围变更:', value)
  }

  useEffect(() => {
    // 组件挂载时加载数据
    handleRefresh()
  }, [])

  return (
    <div className="statistics-manage-container">
      {/* 页面头部 */}
      <div className="page-header">
        <div className="header-left">
          <Title level={3}>数据统计</Title>
          <Text type="secondary">实时监控平台数据变化</Text>
        </div>
        <div className="header-right">
          <Space>
            <Select
              value={dateRange}
              onChange={handleDateRangeChange}
              style={{ width: 120 }}
            >
              <Option value="1">今天</Option>
              <Option value="7">最近7天</Option>
              <Option value="30">最近30天</Option>
              <Option value="90">最近90天</Option>
            </Select>
            <Button icon={<ReloadOutlined />} onClick={handleRefresh} loading={loading}>
              刷新
            </Button>
            <Button type="primary" icon={<DownloadOutlined />} onClick={handleExport}>
              导出
            </Button>
          </Space>
        </div>
      </div>

      {/* 核心指标卡片 */}
      <Row gutter={[16, 16]} className="metrics-row">
        <Col xs={24} sm={12} lg={6}>
          <Card className="metric-card">
            <Statistic
              title="总用户数"
              value={statisticsData.totalUsers}
              prefix={<UserOutlined style={{ color: '#1890ff' }} />}
              suffix={
                <div className="growth-rate">
                  {statisticsData.userGrowthRate > 0 ? (
                    <RiseOutlined style={{ color: '#52c41a' }} />
                  ) : (
                    <FallOutlined style={{ color: '#f5222d' }} />
                  )}
                  <span style={{ color: statisticsData.userGrowthRate > 0 ? '#52c41a' : '#f5222d' }}>
                    {Math.abs(statisticsData.userGrowthRate)}%
                  </span>
                </div>
              }
            />
            <div className="today-data">
              <Text type="secondary">今日新增: </Text>
              <Text strong style={{ color: '#52c41a' }}>{statisticsData.todayUsers}</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="metric-card">
            <Statistic
              title="总文章数"
              value={statisticsData.totalArticles}
              prefix={<FileTextOutlined style={{ color: '#52c41a' }} />}
              suffix={
                <div className="growth-rate">
                  {statisticsData.articleGrowthRate > 0 ? (
                    <RiseOutlined style={{ color: '#52c41a' }} />
                  ) : (
                    <FallOutlined style={{ color: '#f5222d' }} />
                  )}
                  <span style={{ color: statisticsData.articleGrowthRate > 0 ? '#52c41a' : '#f5222d' }}>
                    {Math.abs(statisticsData.articleGrowthRate)}%
                  </span>
                </div>
              }
            />
            <div className="today-data">
              <Text type="secondary">今日新增: </Text>
              <Text strong style={{ color: '#52c41a' }}>{statisticsData.todayArticles}</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="metric-card">
            <Statistic
              title="总浏览量"
              value={statisticsData.totalViews}
              prefix={<EyeOutlined style={{ color: '#faad14' }} />}
              suffix={
                <div className="growth-rate">
                  {statisticsData.viewGrowthRate > 0 ? (
                    <RiseOutlined style={{ color: '#52c41a' }} />
                  ) : (
                    <FallOutlined style={{ color: '#f5222d' }} />
                  )}
                  <span style={{ color: statisticsData.viewGrowthRate > 0 ? '#52c41a' : '#f5222d' }}>
                    {Math.abs(statisticsData.viewGrowthRate)}%
                  </span>
                </div>
              }
            />
            <div className="today-data">
              <Text type="secondary">今日新增: </Text>
              <Text strong style={{ color: '#52c41a' }}>{statisticsData.todayViews}</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="metric-card">
            <Statistic
              title="总点赞数"
              value={statisticsData.totalLikes}
              prefix={<LikeOutlined style={{ color: '#f5222d' }} />}
              suffix={
                <div className="growth-rate">
                  {statisticsData.likeGrowthRate > 0 ? (
                    <RiseOutlined style={{ color: '#52c41a' }} />
                  ) : (
                    <FallOutlined style={{ color: '#f5222d' }} />
                  )}
                  <span style={{ color: statisticsData.likeGrowthRate > 0 ? '#52c41a' : '#f5222d' }}>
                    {Math.abs(statisticsData.likeGrowthRate)}%
                  </span>
                </div>
              }
            />
            <div className="today-data">
              <Text type="secondary">今日新增: </Text>
              <Text strong style={{ color: '#52c41a' }}>{statisticsData.todayLikes}</Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 详细统计 */}
      <Row gutter={[16, 16]} className="details-row">
        {/* 热门文章 */}
        <Col xs={24} lg={12}>
          <Card title="热门文章排行" className="chart-card">
            <Table
              columns={popularArticlesColumns}
              dataSource={popularArticles}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>

        {/* 活跃用户 */}
        <Col xs={24} lg={12}>
          <Card title="活跃用户排行" className="chart-card">
            <Table
              columns={activeUsersColumns}
              dataSource={activeUsers}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>

      {/* 分类统计 */}
      <Row gutter={[16, 16]} className="category-row">
        <Col span={24}>
          <Card title="分类统计" className="category-card">
            <Row gutter={[16, 16]}>
              {categoryStats.map((category) => (
                <Col xs={24} sm={12} md={8} lg={4} xl={4} key={category.id}>
                  <div className="category-item">
                    <div className="category-header">
                      <div
                        className="category-color"
                        style={{ backgroundColor: category.color }}
                      />
                      <Text strong>{category.name}</Text>
                    </div>
                    <div className="category-stats">
                      <div className="stat-item">
                        <Text type="secondary">文章数</Text>
                        <Text strong>{category.articleCount}</Text>
                      </div>
                      <div className="stat-item">
                        <Text type="secondary">浏览量</Text>
                        <Text strong>{category.totalViews.toLocaleString()}</Text>
                      </div>
                    </div>
                    <Progress
                      percent={category.percentage}
                      strokeColor={category.color}
                      size="small"
                      format={(percent) => `${percent}%`}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default StatisticsManage