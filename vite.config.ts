import tailwindcss from '@tailwindcss/postcss'
import react from '@vitejs/plugin-react-swc'
import autoprefixer from 'autoprefixer'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/components': resolve(__dirname, './src/components'),
      '@/pages': resolve(__dirname, './src/pages'),
      '@/hooks': resolve(__dirname, './src/hooks'),
      '@/utils': resolve(__dirname, './src/utils'),
      '@/types': resolve(__dirname, './src/types'),
      '@/styles': resolve(__dirname, './src/styles'),
      '@/assets': resolve(__dirname, './src/assets'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        // 启用内联JavaScript
        javascriptEnabled: true,
        // 修改变量前缀
        modifyVars: {
          // 可以在这里定义全局Less变量
          // '@primary-color': '#1890ff',
        },
        // 数学计算模式
        math: 'always',
        // 全局Less变量，会在每个Less文件前添加
        additionalData: `
          // @import "@/styles/variables.less";
        `,
      },
    },
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
})
