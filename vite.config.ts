import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
});
