const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
    ctx.body = 'hhahahahha'
})

app.listen(3333)