# React 项目开发规范

本文档定义了基于 React + TypeScript + Vite + Ant Design 技术栈的项目开发规范和最佳实践，确保代码质量和团队协作的一致性。

## 技术栈

- **前端框架**: React 19.1.0
- **构建工具**: Vite 6.1.1
- **语言**: TypeScript 5.8.3
- **UI 组件库**: Ant Design 5.26.4
- **路由**: React Router 7.6.3
- **样式**: Less + TailwindCSS 4.1.11
- **代码检查**: ESLint + TypeScript ESLint
- **代码格式化**: Prettier
- **包管理器**: pnpm

## 目录

- [命名规范](#命名规范)
- [代码规范](#代码规范)
- [TypeScript 规范](#typescript-规范)
- [React 组件规范](#react-组件规范)
- [样式规范](#样式规范)
- [文件组织规范](#文件组织规范)
- [Git 提交规范](#git-提交规范)
- [性能优化规范](#性能优化规范)

## 命名规范

### 文件命名

- **组件文件**: 使用 PascalCase，如 `SectionTitle/index.tsx`
- **工具文件**: 使用 camelCase，如 `useStatus.ts`
- **页面文件**: 使用 PascalCase，目录结构清晰，如 `Home/index.tsx`
- **样式文件**: 与组件文件同名，如 `SectionTitle/index.less`
- **类型定义文件**: 使用 camelCase，如 `types.ts` 或 `userTypes.ts`

### 变量命名

- **变量**: 使用 camelCase，如 `serviceArea`
- **常量**: 使用 UPPER_SNAKE_CASE，如 `API_BASE_URL`
- **组件名**: 使用 PascalCase，如 `SectionTitle`
- **函数名**: 使用 camelCase，如 `onSubmitAudit`
- **接口名**: 使用 PascalCase，以 `I` 开头，如 `IUserInfo`
- **类型别名**: 使用 PascalCase，如 `UserType`

### 目录命名

- **组件目录**: 使用 PascalCase，如 `components/Navigation`
- **页面目录**: 使用 PascalCase，如 `pages/Home`
- **工具目录**: 使用 camelCase，如 `utils/helpers`

## 代码规范

### ESLint 规则

项目使用 ESLint 进行代码检查，配置文件为 `eslint.config.js`，主要规则包括：

```javascript
// TypeScript 规则
'@typescript-eslint/no-unused-vars': 'error',
'@typescript-eslint/no-explicit-any': 'error',
'@typescript-eslint/prefer-const': 'error',
'@typescript-eslint/explicit-function-return-type': 'warn',

// 通用规则
'no-console': ['warn', { allow: ['warn', 'error'] }],
'no-debugger': 'error',
'no-var': 'error',
'prefer-const': 'error',
'quotes': ['error', 'single'],
'semi': ['error', 'never'],
'comma-dangle': ['error', 'es5'],

// React 规则
'react-hooks/rules-of-hooks': 'error',
'react-hooks/exhaustive-deps': 'warn',
'react-refresh/only-export-components': 'warn',
```

### 代码检查命令

```bash
# 检查代码
pnpm lint

# 自动修复
pnpm lint:fix

# 类型检查
pnpm type-check

# 格式化代码
pnpm format

# 检查格式
pnpm format:check
```

### 代码格式化

使用 Prettier 进行代码格式化，配置文件为 `.prettierrc`：

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

忽略文件配置 `.prettierignore`：

```
dist
node_modules
*.config.js
*.config.ts
public
```

### 导入顺序

严格按照以下顺序导入模块：

```typescript
// 1. React 相关导入
import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

// 2. 第三方库导入
import { Card, Button, Row, Col } from 'antd'
import { UserOutlined, HomeOutlined } from '@ant-design/icons'
import { Outlet, useNavigate } from 'react-router-dom'

// 3. 项目内部导入（按路径层级排序）
import { routeConfig } from '@/config/routes'
import { useRouteGuard } from '@/hooks/useRouteGuard'
import { auth } from '@/utils/auth'

// 4. 相对路径导入
import './index.less'
import { helper } from '../utils/helper'
```

## 路由配置规范

### 路由配置文件

路由配置统一在 `src/config/routes.ts` 中管理：

```typescript
// ✅ 路由配置接口
export interface RouteConfig {
  key: string
  path: string
  title: string
  icon?: string
  children?: RouteConfig[]
  requireAuth?: boolean
}

// ✅ 路由配置数据
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
    path: '/system',
    title: '系统管理',
    icon: 'SettingOutlined',
    requireAuth: true,
    children: [
      {
        key: '2-1',
        path: '/users',
        title: '用户管理',
        icon: 'UserOutlined',
        requireAuth: true
      }
    ]
  }
]

// ✅ 工具函数
export const getRouteByPath = (path: string): RouteConfig | undefined => {
  // 实现逻辑
}

export const isRouteProtected = (path: string): boolean => {
  const route = getRouteByPath(path)
  return route?.requireAuth ?? false
}
```

### 布局组件规范

```typescript
// ✅ 布局组件结构
import { Layout } from 'antd'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import HeaderComponent from './Header'
import MenuComponent from './Menu'
import './index.less'

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState(['1'])

  const toggleCollapsed = (): void => {
    setCollapsed(!collapsed)
  }

  const handleSelectedKeysChange = (keys: string[]): void => {
    setSelectedKeys(keys)
  }

  return (
    <Layout className="main-layout">
      <MenuComponent
        collapsed={collapsed}
        selectedKeys={selectedKeys}
        onSelectedKeysChange={handleSelectedKeysChange}
      />
      <Layout className="layout-main">
        <HeaderComponent
          collapsed={collapsed}
          onToggleCollapsed={toggleCollapsed}
        />
        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
```

## TypeScript 规范

### 类型定义

```typescript
// ✅ 正确的类型定义
interface IUserInfo {
  id: number
  name: string
  email: string
  avatar?: string
}

type UserStatus = 'active' | 'inactive' | 'pending'

// ✅ 组件 Props 类型
interface IButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
  disabled?: boolean
}
```

### 严格模式

- 启用 `strict: true`
- 禁用 `any` 类型，使用具体类型或 `unknown`
- 必须定义函数返回类型（复杂函数）
- 使用类型断言时必须添加注释说明

```typescript
// ❌ 避免使用 any
const data: any = response.data

// ✅ 使用具体类型
const data: IUserInfo = response.data as IUserInfo // 确保 API 返回正确格式
```

## React 组件规范

### 组件结构

```typescript
// ✅ 标准页面组件结构
import React, { useState, useEffect } from 'react'
import { Card, Button, Row, Col } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import './index.less'

interface IHomeProps {
  title?: string
}

const Home: React.FC<IHomeProps> = ({ title = '首页' }) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // 组件挂载时的逻辑
  }, [])

  const handleAction = (): void => {
    setLoading(true)
    // 处理逻辑
    setLoading(false)
  }

  return (
    <div className="home-container">
      <Card title={title} bordered={false}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Button 
              type="primary" 
              icon={<UserOutlined />}
              loading={loading}
              onClick={handleAction}
            >
              操作按钮
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default Home
```

### Ant Design 使用规范

```typescript
// ✅ 正确使用 Ant Design 组件
import { Card, Row, Col, Statistic, Button, Space } from 'antd'
import { UserOutlined, DollarOutlined } from '@ant-design/icons'

// ✅ 统计数据展示
const StatsCard: React.FC = () => {
  const statsData = [
    {
      title: '总用户数',
      value: 11280,
      prefix: <UserOutlined />,
      valueStyle: { color: '#3f8600' },
    },
    {
      title: '总收入',
      value: 112893,
      prefix: <DollarOutlined />,
      precision: 2,
      suffix: '元',
    },
  ]

  return (
    <Row gutter={[16, 16]}>
      {statsData.map((stat, index) => (
        <Col xs={24} sm={12} lg={6} key={index}>
          <Card>
            <Statistic
              title={stat.title}
              value={stat.value}
              precision={stat.precision}
              valueStyle={stat.valueStyle}
              prefix={stat.prefix}
              suffix={stat.suffix}
            />
          </Card>
        </Col>
      ))}
    </Row>
  )
}
```

### Hook 使用规范

```typescript
// ✅ 状态管理 Hook
const useStatus = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const resetStatus = (): void => {
    setStatus('idle')
    setError(null)
  }

  const setLoading = (): void => {
    setStatus('loading')
    setError(null)
  }

  const setSuccess = (): void => {
    setStatus('success')
    setError(null)
  }

  const setErrorStatus = (errorMessage: string): void => {
    setStatus('error')
    setError(errorMessage)
  }

  return {
    status,
    error,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error',
    resetStatus,
    setLoading,
    setSuccess,
    setError: setErrorStatus
  }
}

// ✅ 路由守卫 Hook
const useRouteGuard = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const isProtected = isRouteProtected(location.pathname)
    const isAuthenticated = checkAuthStatus()

    if (isProtected && !isAuthenticated) {
      navigate('/login', { replace: true })
    }
  }, [location.pathname, navigate])

  return { isAuthenticated: checkAuthStatus() }
}
```

### 事件处理

```typescript
// ✅ 事件处理函数命名
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  // 处理逻辑
}

const onUserSelect = (userId: string) => {
  // 处理逻辑
}
```

## 样式规范

### CSS 类命名（BEM 方法论）

```less
// ✅ BEM 命名规范
.button {
  // 块（Block）
  
  &__icon {
    // 元素（Element）
  }
  
  &--primary {
    // 修饰符（Modifier）
  }
  
  &--large {
    // 修饰符（Modifier）
  }
}
```

### Less 变量使用

项目使用 Less 预处理器，全局变量定义在 `src/styles/variables.less` 中：

```less
// ✅ 使用全局变量
@reference "tailwindcss";

// 主题色彩
@primary-color: #1890ff;
@success-color: #52c41a;
@warning-color: #faad14;
@error-color: #f5222d;

// 字体大小
@font-size-base: 14px;
@font-size-lg: 16px;
@font-size-sm: 12px;

// 间距
@padding-base: 8px;
@padding-lg: 16px;
@padding-sm: 4px;

// 使用示例
.custom-button {
  .button-style(@primary-color, #fff);
  
  &:hover {
    opacity: 0.8;
  }
}
```

### TailwindCSS 使用

项目集成了 TailwindCSS 4.1.11，配置文件为 `tailwind.config.js`：

```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,less}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

使用示例：

```jsx
// ✅ 合理使用 TailwindCSS
const Card = ({ children }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    {children}
  </div>
)

// ✅ 响应式设计
const ResponsiveGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* 内容 */}
  </div>
)

// ✅ 在 Less 文件中使用 @apply
.custom-button {
  @apply bg-indigo-500 text-white py-2 px-4 rounded;
}
```

## 文件组织规范

### 项目目录结构

```
src/
├── config/             # 配置文件
│   └── routes.ts       # 路由配置
├── hooks/              # 自定义 Hook
│   └── useRouteGuard.ts
├── layout/             # 布局组件
│   ├── Header/         # 头部组件
│   ├── Main/           # 主体组件
│   ├── Menu/           # 菜单组件
│   ├── index.tsx       # 布局入口
│   └── index.less      # 布局样式
├── pages/              # 页面组件
│   ├── About/          # 关于页面
│   ├── Contact/        # 联系页面
│   ├── Home/           # 首页
│   ├── Login/          # 登录页面
│   └── Reducer/        # Reducer 示例页面
├── router/             # 路由配置
│   └── index.tsx       # 路由入口
├── styles/             # 全局样式
│   ├── variables.less  # Less 变量
│   └── example.less    # 样式示例
├── utils/              # 工具函数
│   └── auth.ts         # 认证工具
├── App.tsx             # 应用入口组件
├── main.tsx            # 应用启动文件
└── vite-env.d.ts       # Vite 类型声明
```

### 组件文件结构

```
Button/
├── index.tsx           # 主组件文件
├── index.less          # 样式文件
├── types.ts            # 类型定义
├── Button.test.tsx     # 测试文件
└── README.md           # 组件文档
```

## 工具函数规范

### 认证工具函数

```typescript
// ✅ 认证相关工具函数
export const checkAuthStatus = (): boolean => {
  const token = localStorage.getItem('auth_token')
  return !!token && !isTokenExpired(token)
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return Date.now() >= payload.exp * 1000
  } catch {
    return true
  }
}

export const clearAuthData = (): void => {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('user_info')
}
```

### 通用工具函数

```typescript
// ✅ 格式化工具函数
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY'
  }).format(amount)
}

export const formatDate = (date: Date | string): string => {
  return new Intl.DateTimeFormat('zh-CN').format(new Date(date))
}

// ✅ 防抖和节流
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
```

## 项目配置规范

### ESLint 配置

项目使用 `eslint.config.js` 进行代码检查：

```javascript
// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'warn',
    },
  },
)
```

### 代码检查命令

```bash
# 检查代码
npm run lint

# 自动修复
npm run lint:fix

# 类型检查
npm run type-check
```

### Prettier 配置

项目使用 `.prettierignore` 忽略特定文件：

```
# .prettierignore
dist
node_modules
*.min.js
*.min.css
public
```

## Git 提交规范

### 提交信息格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 类型说明

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式化（不影响功能）
- `refactor`: 重构代码
- `test`: 添加或修改测试
- `chore`: 构建过程或辅助工具的变动

### 示例

```
feat(auth): add user login functionality

- Add login form component
- Implement authentication API
- Add user state management

Closes #123
```

## 性能优化规范

### React 性能优化

```typescript
// ✅ 使用 React.memo 优化组件
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* 复杂渲染逻辑 */}</div>
})

// ✅ 使用 useMemo 优化计算
const expensiveValue = useMemo(() => {
  return heavyCalculation(data)
}, [data])

// ✅ 使用 useCallback 优化函数
const handleClick = useCallback(() => {
  // 处理逻辑
}, [dependency])
```

### 代码分割

```typescript
// ✅ 路由级别的代码分割
const Home = lazy(() => import('../pages/Home'))
const About = lazy(() => import('../pages/About'))

// ✅ 组件级别的代码分割
const HeavyComponent = lazy(() => import('./HeavyComponent'))
```

### 资源优化

- 图片使用 WebP 格式
- 启用 gzip 压缩
- 使用 CDN 加载第三方库
- 合理使用缓存策略

## 代码审查清单

### 提交前检查

- [ ] 代码通过 ESLint 检查
- [ ] 代码通过 TypeScript 类型检查
- [ ] 组件有适当的 Props 类型定义
- [ ] 使用了合适的 Hook 依赖数组
- [ ] 样式遵循 BEM 命名规范
- [ ] 提交信息符合规范
- [ ] 添加了必要的注释
- [ ] 性能敏感的组件进行了优化

### 代码审查要点

- 代码逻辑是否清晰
- 是否有潜在的性能问题
- 错误处理是否完善
- 类型定义是否准确
- 组件是否可复用
- 测试覆盖是否充分

---

**注意**: 本规范会根据项目发展持续更新，请定期查看最新版本。
