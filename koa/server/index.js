const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  ctx.body = 'hhahahahha'
  await next()
})

app.listen(3333)