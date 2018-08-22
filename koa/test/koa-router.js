const Koa = require('koa')
const app = new Koa()
const log = require('koa-logger')
const session = require('koa-session')

app.keys = ['测试测试']
app.use(log())
// app.use(session(config,app))
const config = {
  key: 'koa:sess',
  maxAge: 3000,
  overwrite: false,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false,
}
app.use(session(config, app))

app.use(ctx => {
  if (ctx.path === '/favicon.ico') return

  if (ctx.path === '/') {
    let n = ctx.session.views || 0
    ctx.session.views = ++n
    ctx.body = n + '次'
  } else if (ctx.path === '/h') {
    ctx.body = 'Hello world'
  } else if (ctx.path === '/session') {
    console.log(ctx.session)
    ctx.body = JSON.stringify(ctx.session)
  } else {
    ctx.body = '没找到'
  }
})

app.listen(3333)