const Koa = require('koa')
const app = new Koa()
const log = require('koa-logger')
const session = require('koa-session')

app.keys = ['测试测试']
app.use(log())
// app.use(session(config,app))
app.use(session(app))

app.use(ctx => {
  // ignore favicon
  if (ctx.path === '/favicon.ico') return;

  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  ctx.body = n + '次';
});


app.listen(3333)