const Koa = require('koa')
const logger = require('koa-logger')
const app = new Koa()

app.use(logger())
app.use(async (ctx, next) => {
  ctx.body = '首页起来了'
})

app.listen(4455)