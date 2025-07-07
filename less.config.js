export default {
  // Less编译选项
  lessOptions: {
    // 启用内联JavaScript
    javascriptEnabled: true,
    // 修改变量前缀
    modifyVars: {
      // 可以在这里定义全局Less变量
      // '@primary-color': '#1890ff',
    },
    // 数学计算模式
    math: 'always',
    // 启用严格单位
    strictUnits: false,
    // 启用严格数学
    strictMath: false,
  },
  // 全局Less变量文件路径
  globalVars: {
    // 可以在这里定义全局变量文件
    // '@import': '"~@/styles/variables.less"',
  },
  // 附加数据，会在每个Less文件前添加
  additionalData: '',
}