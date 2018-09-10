const Koa = require('koa')
const app = new Koa()
import loger from 'koa-logger'
import { htmlTpl, ejsTpl } from '../test/htmlTpl'

// app.use(async (ctx, next) => {
//   ctx.body = 'Hello World!!'
// })

app.use(loger())
app.use(htmlTpl)
app.use(ejsTpl)

app.listen(1111)

