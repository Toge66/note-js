const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  console.log(ctx.href)
  console.log(ctx.request.href)
  ctx.body = 'hhahahahha'
  await next()
})

app.listen(3333)