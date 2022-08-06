const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false,  // 2.关闭语法检查
  // 代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // 这边不需要路径重写,因为'/api'已经被加上了
        // pathRewrite: { '^api': '' },
      },
    }
  },
})
