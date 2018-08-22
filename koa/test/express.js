const express = require('express')
const app = new express()

var indentt = function (n) {
  return new Array(n).join('&nbsp;')
}

const mid1 = (req, res, next) => {
  res.body = '<h3>请求 => 第一层</h3>'
  next()
  res.body += '<h3>响应 <= 第一层</h3>' //express 单纯的手段是走不到这里的，不会像koa的杨总模型一步一步进去再一步一步出来
}

const mid2 = (req, res, next) => {
  res.body += `<h3>${indentt(4)}请求 => 第二层</h3>`
  next()
  res.body += `<h3>${indentt(4)}响应 <= 第二层</h3>`  //这里也是走不到的
}

const mid3 = (req, res, next) => {
  res.body += `<h3>${indentt(8)}请求 => 第三层</h3>`
  next()
  res.body += `<h3>${indentt(8)}响应 <= 第三层</h3>`  //这里走不到
}

app.use(mid1)
app.use(mid2)
app.use(mid3)
app.get('/',(req, res, next) => {
  res.body += `<h3 style="color: #32b5c5">${indentt(12)}Express 业务处理</h3>`
  res.send(res.body)
})

app.listen(3334)

