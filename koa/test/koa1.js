const Koa = require('koa')
const app = new Koa()
const loger = require('koa-logger')

var indentt = function (n) {
  return new Array(n).join('&nbsp;')
}

var mid1 = function * (next) {
  this.body = '<h3>请求 => 第一层</h3>'
  yield next
  this.body += '<h3>响应 <= 第一层</h3>'
}

var mid2 = function * (next) {
  this.body += '<h3>' + indentt(4) + '请求 => 第二层</h3>'
  yield next
  this.body += '<h3>' + indentt(4) + '响应 <= 第二层</h3>'
}

var mid3 = function * (next) {
  this.body += '<h3>' + indentt(8) + '请求 => 第三层</h3>'
  yield next
  this.body += '<h3>' + indentt(8) + '响应 <= 第三层</h3>'
}

app.use(loger())
app.use(mid1)
app.use(mid2)
app.use(mid3)
app.use(function * (next) {
  this.body += '<h3 style="color: #32b5c5">' + indentt(12) + 'Koa1 业务处理</h3>'
  yield next
})

app.listen(3333)

