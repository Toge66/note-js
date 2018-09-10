const Koa = require('koa')
const app = new Koa()
import loger from 'koa-logger'
import { htmlTpl, ejsTpl, pugTpl } from '../test/htmlTpl'

// app.use(async (ctx, next) => {
//   ctx.body = 'Hello World!!'
// })

app.use(loger())
app.use(htmlTpl)
app.use(ejsTpl)
app.use(pugTpl)

app.listen(1111)

