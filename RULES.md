# 项目开发规范

本文档定义了项目的开发规范和最佳实践，确保代码质量和团队协作的一致性。

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

项目使用 ESLint 进行代码检查，主要规则包括：

```javascript
// 基础规则
- 使用 2 空格缩进
- 行末不允许有分号（除非必要）
- 字符串使用单引号
- 对象和数组最后一个元素后必须有逗号
- 函数参数超过 3 个时必须换行

// React 规则
- 组件必须使用函数式组件
- Hook 必须在组件顶层调用
- 依赖数组必须完整
- 事件处理函数使用 handle 或 on 前缀
```

### 代码格式化

使用 Prettier 进行代码格式化，配置如下：

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

### 导入顺序

严格按照以下顺序导入模块：

```typescript
// 1. React 相关导入
import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

// 2. 第三方库导入
import axios from 'axios'
import { Router } from 'react-router'

// 3. 项目内部导入（按路径层级排序）
import { Button } from '@/components/Button'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/utils/api'

// 4. 相对路径导入
import './index.less'
import { helper } from '../utils/helper'
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
// ✅ 标准组件结构
import React, { useState, useEffect } from 'react'
import './index.less'

interface IButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
}

const Button: React.FC<IButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick 
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    if (onClick) {
      setIsLoading(true)
      onClick()
      setIsLoading(false)
    }
  }

  return (
    <button 
      className={`btn btn--${variant} ${isLoading ? 'btn--loading' : ''}`}
      onClick={handleClick}
      disabled={isLoading}
    >
      {children}
    </button>
  )
}

export default Button
```

### Hook 使用规范

```typescript
// ✅ 自定义 Hook
const useAuth = () => {
  const [user, setUser] = useState<IUserInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 获取用户信息
    fetchUserInfo()
  }, [])

  const login = async (credentials: ILoginCredentials) => {
    // 登录逻辑
  }

  const logout = () => {
    // 登出逻辑
  }

  return { user, loading, login, logout }
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

```less
// ✅ 使用全局变量
@import '../../styles/variables.less';

.custom-button {
  background-color: @primary-color;
  padding: @padding-base;
  border-radius: @border-radius-base;
  
  &:hover {
    background-color: @primary-color-hover;
  }
}
```

### TailwindCSS 使用

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
```

## 文件组织规范

### 目录结构

```
src/
├── components/          # 通用组件
│   ├── Button/
│   │   ├── index.tsx
│   │   ├── index.less
│   │   └── types.ts
│   └── Navigation/
├── pages/              # 页面组件
│   ├── Home/
│   ├── About/
│   └── Contact/
├── hooks/              # 自定义 Hook
├── utils/              # 工具函数
├── types/              # 类型定义
├── styles/             # 全局样式
│   ├── variables.less
│   └── global.less
└── assets/             # 静态资源
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