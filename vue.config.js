module.exports = {
  devServer: {
    // disableHostCheck: true
  },
  "devServer": {
    "proxy": {
      "/": {
        "target": "http://localhost:3000/",
        "changeOrigin": true,
        "pathRewrite" :{
          "^/": ""
        },
        "secure": false
      }
    }
  }
}
