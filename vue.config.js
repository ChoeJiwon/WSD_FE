module.exports = {
  devServer: {
      proxy: {
          '/':{
              target: 'http://localhost:3000/',
              changeOrigin: true,
              pathRewrite: {
                  '^/': ''
              }
          }
      }
  },
  outputDir: '../be/public',
}
