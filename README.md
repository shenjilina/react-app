# React + TypeScript + Vite 项目

这是一个基于 React、TypeScript 和 Vite 的现代化前端项目模板，集成了完整的代码质量工具链和开发规范。

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 预览构建结果

```bash
pnpm preview
```

## 📋 可用脚本

- `pnpm dev` - 启动开发服务器
- `pnpm build` - 构建生产版本
- `pnpm lint` - 运行 ESLint 检查
- `pnpm lint:fix` - 运行 ESLint 并自动修复问题
- `pnpm format` - 使用 Prettier 格式化代码
- `pnpm format:check` - 检查代码格式
- `pnpm type-check` - 运行 TypeScript 类型检查
- `pnpm preview` - 预览构建结果

## 🛠️ 技术栈

- **框架**: React 19
- **语言**: TypeScript
- **构建工具**: Vite
- **样式**: TailwindCSS + Less
- **代码质量**: ESLint + Prettier
- **路由**: React Router

## 📁 项目结构

```
src/
├── components/          # 通用组件
├── pages/              # 页面组件
├── hooks/              # 自定义 Hook
├── utils/              # 工具函数
├── types/              # 类型定义
├── styles/             # 全局样式
├── assets/             # 静态资源
├── layout/             # 布局组件
└── router/             # 路由配置
```

## 🎯 代码规范

项目集成了完整的代码质量工具链：

### ESLint 配置
- TypeScript 严格模式
- React Hooks 规则
- 自动修复常见问题
- 禁用 `any` 类型

### Prettier 配置
- 统一代码格式
- 单引号
- 无分号
- 2 空格缩进

### Git Hooks
- 提交前自动运行 lint 和格式化
- 类型检查
- 提交信息规范检查

## 🎨 样式方案

项目支持两种样式方案：

### TailwindCSS
```jsx
<div className="bg-blue-500 text-white p-4 rounded-lg">
  TailwindCSS 样式
</div>
```

### Less
```less
.custom-component {
  background: @primary-color;
  padding: @padding-base;
}
```

## 🔧 路径别名

项目配置了路径别名，方便模块导入：

```typescript
import Button from '@/components/Button'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/utils/api'
```

## 📝 开发规范

详细的开发规范请查看 [RULES.md](./RULES.md) 文件，包含：

- 命名规范
- 代码规范
- TypeScript 规范
- React 组件规范
- 样式规范
- Git 提交规范

## 🔍 VSCode 配置

项目包含 VSCode 配置文件，推荐安装以下扩展：

- ESLint
- Prettier
- TypeScript
- Tailwind CSS IntelliSense
- Auto Rename Tag
- Path Intellisense

## 📚 更多信息

- [样式配置指南](./STYLING_GUIDE.md)
- [开发规范](./RULES.md)
- [Vite 文档](https://vitejs.dev/)
- [React 文档](https://react.dev/)
- [TypeScript 文档](https://www.typescriptlang.org/)

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。
## 目录
public 公共目录
src
├── assets 静态资源
├── App.css 根组件样式
├── App.tsx 根组件
├── index.css 全局css文件
├── main.tsx 全局tsx文件
├── vite-env.d.ts 声明文件

├── .eslintrc.cjs eslint配置文件
├── .gitignore git忽略文件
├── index.html 入口文件index.html
├── package.json 项目依赖模块文件
├── tsconfig.json ts配置文件
├── tsconfig.node.json vite-ts配置文件
├── vite.config.ts vite配置文件
