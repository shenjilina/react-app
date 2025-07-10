// 路由配置文件
export interface RouteConfig {
  key: string
  path: string
  title: string
  icon?: string
  children?: RouteConfig[]
  requireAuth?: boolean
}

// 路由配置数据
export const routeConfig: RouteConfig[] = [
  {
    key: '1',
    path: '/dashboard',
    title: '仪表盘',
    icon: 'DashboardOutlined',
    requireAuth: true
  },
  {
    key: '2',
    path: '/home',
    title: '首页',
    icon: 'HomeOutlined',
    requireAuth: true
  },
  {
    key: '3',
    path: '/system',
    title: '系统管理',
    icon: 'SettingOutlined',
    requireAuth: true,
    children: [
      {
        key: '3-1',
        path: '/users',
        title: '用户管理',
        icon: 'UserOutlined',
        requireAuth: true
      },
      {
        key: '3-2',
        path: '/roles',
        title: '角色管理',
        icon: 'TeamOutlined',
        requireAuth: true
      },
      {
        key: '3-3',
        path: '/permissions',
        title: '权限管理',
        icon: 'SafetyOutlined',
        requireAuth: true
      }
    ]
  },
  {
    key: '4',
    path: '/content',
    title: '内容管理',
    icon: 'FileTextOutlined',
    requireAuth: true,
    children: [
      {
        key: '4-1',
        path: '/articles',
        title: '文章管理',
        icon: 'EditOutlined',
        requireAuth: true
      },
      {
        key: '4-2',
        path: '/categories',
        title: '分类管理',
        icon: 'TagsOutlined',
        requireAuth: true
      }
    ]
  },
  {
    key: '5',
    path: '/statistics',
    title: '数据统计',
    icon: 'BarChartOutlined',
    requireAuth: true
  },
  {
    key: '6',
    path: '/settings',
    title: '系统设置',
    icon: 'ToolOutlined',
    requireAuth: true
  }
]

// 获取所有路由路径的工具函数
export const getAllRoutePaths = (): string[] => {
  const paths: string[] = []
  
  const extractPaths = (routes: RouteConfig[]) => {
    routes.forEach(route => {
      paths.push(route.path)
      if (route.children) {
        extractPaths(route.children)
      }
    })
  }
  
  extractPaths(routeConfig)
  return paths
}

// 根据key获取路由配置的工具函数
export const getRouteByKey = (key: string): RouteConfig | undefined => {
  const findRoute = (routes: RouteConfig[]): RouteConfig | undefined => {
    for (const route of routes) {
      if (route.key === key) {
        return route
      }
      if (route.children) {
        const found = findRoute(route.children)
        if (found) return found
      }
    }
    return undefined
  }
  
  return findRoute(routeConfig)
}

// 根据路径获取路由配置的工具函数
export const getRouteByPath = (path: string): RouteConfig | undefined => {
  const findRoute = (routes: RouteConfig[]): RouteConfig | undefined => {
    for (const route of routes) {
      if (route.path === path) {
        return route
      }
      if (route.children) {
        const found = findRoute(route.children)
        if (found) return found
      }
    }
    return undefined
  }
  
  return findRoute(routeConfig)
}

// 检查路由是否需要认证
export const isRouteProtected = (path: string): boolean => {
  const route = getRouteByPath(path)
  return route?.requireAuth ?? false
}