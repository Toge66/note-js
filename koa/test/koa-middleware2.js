const Koa = require('koa')
const app = new Koa()
const log = require('koa-logger')

const mid1 = async (ctx, next) => {
  ctx.type = 'text/html; charet=utf-8'
  await next()

  ctx.body += ' 第二部分'
}

const mid2 = async (ctx, next) => {
  ctx.body = 'middleware'
  await next()

  ctx.body += ' 这部分'
}

const mid3 = async (ctx, next) => {
  ctx.body += ' 测试'
  await next()
}

app.use(log())
app.use(mid1)
app.use(mid2)
app.use(mid3)

app.listen(3333)