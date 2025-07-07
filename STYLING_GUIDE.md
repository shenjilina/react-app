# 样式配置指南

本项目已配置了 Less 和 TailwindCSS，可以同时使用这两种样式解决方案。

## TailwindCSS 配置

### 配置文件
- `tailwind.config.js` - TailwindCSS 主配置文件
- `postcss.config.js` - PostCSS 配置文件
- `src/index.css` - 已导入 TailwindCSS 基础样式

### 使用方法
```jsx
// 在 JSX 中直接使用 TailwindCSS 类名
function Button() {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      点击我
    </button>
  );
}
```

### 自定义配置
在 `tailwind.config.js` 中可以自定义主题、添加插件等：
```js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#1e40af',
      }
    },
  },
  plugins: [],
}
```

## Less 配置

### 配置文件
- `less.config.js` - Less 独立配置文件
- `vite.config.ts` - Vite 中的 Less 配置
- `src/styles/variables.less` - 全局变量文件
- `src/styles/example.less` - 示例样式文件

### 使用方法

#### 1. 创建 Less 文件
```less
// src/components/Button/Button.less
@import '../../styles/variables.less';

.custom-button {
  .button-style(@primary-color, #fff);
  
  &.large {
    padding: @padding-lg @padding-lg * 2;
    font-size: @font-size-lg;
  }
}
```

#### 2. 在组件中导入
```jsx
// src/components/Button/Button.tsx
import './Button.less';

function Button({ size = 'normal', children }) {
  return (
    <button className={`custom-button ${size === 'large' ? 'large' : ''}`}>
      {children}
    </button>
  );
}
```

### 全局变量
在 `src/styles/variables.less` 中定义的变量可以在所有 Less 文件中使用：
```less
@primary-color: #1890ff;
@success-color: #52c41a;
@warning-color: #faad14;
@error-color: #f5222d;
```

### 混合器（Mixins）
```less
// 定义混合器
.flex-center() {
  display: flex;
  justify-content: center;
  align-items: center;
}

// 使用混合器
.my-component {
  .flex-center();
}
```

## 同时使用 TailwindCSS 和 Less

你可以在同一个项目中同时使用这两种方案：

```jsx
// 组件文件
import './Component.less';

function Component() {
  return (
    <div className="flex items-center justify-center p-4"> {/* TailwindCSS */}
      <div className="custom-card"> {/* Less 样式 */}
        <h2 className="text-xl font-bold text-blue-600">标题</h2> {/* TailwindCSS */}
        <p className="custom-text">内容</p> {/* Less 样式 */}
      </div>
    </div>
  );
}
```

```less
// Component.less
@import '../styles/variables.less';

.custom-card {
  background: #fff;
  border-radius: @border-radius-base;
  box-shadow: @box-shadow-base;
  padding: @padding-lg;
}

.custom-text {
  color: @primary-color;
  font-size: @font-size-base;
}
```

## 开发建议

1. **TailwindCSS** 适合快速原型开发和实用工具类
2. **Less** 适合复杂的组件样式和主题定制
3. 保持样式的一致性，建议团队制定样式规范
4. 利用 Less 变量和 TailwindCSS 的自定义主题保持设计系统的统一性

## 构建和开发

```bash
# 开发模式
pnpm dev

# 构建生产版本
pnpm build
```

样式会自动编译和优化，TailwindCSS 会自动移除未使用的样式以减小包体积。