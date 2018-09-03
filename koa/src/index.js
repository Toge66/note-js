const Koa = require('koa')
const app = new Koa()
import { htmlTpl } from '../test/htmlTpl'

// app.use(async (ctx, next) => {
//   ctx.body = 'Hello World!!'
// })

app.use(htmlTpl)

app.listen(1111)

