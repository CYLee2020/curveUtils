module.exports = {
  plugins: [
    require('autoprefixer')({
      //这里可以填写需要支持的浏览器，不填写使用默认配置
      "overrideBrowserslist": [
        "defaults",
        "> 0.2% in CN"
      ]
    })
  ]
}