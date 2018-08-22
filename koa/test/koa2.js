const Koa = require('koa')
const app = new Koa()
const loger = require('koa-logger')

const indentt = function (n) {
  return new Array(n).join('&nbsp;')
}

const mid1 = async (ctx, next) => {
  ctx.body = '<h3>请求 => 第一层</h3>'
  await next()
  ctx.body += '<h3>响应 <= 第一层</h3>'
}

const mid2 = async (ctx, next) => {
  ctx.body += `<h3>${indentt(4)}请求 => 第二层</h3>`
  await next()
  ctx.body += `<h3>${indentt(4)}响应 <= 第二层</h3>`
}

const mid3 = async (ctx, next) => {
  ctx.body += `<h3>${indentt(8)}请求 => 第三层</h3>`
  await next()
  ctx.body += `<h3>${indentt(8)}响应 <= 第三层</h3>`
}

app.use(loger())
app.use(mid1)
app.use(mid2)
app.use(mid3)
app.use(async (ctx, next) => {
  ctx.body += `<h3 style="color: #32b5c5">${indentt(12)}Koa2 业务处理</h3>`
})

app.listen(3333)