const Koa = require('koa')
const logger = require('koa-logger')
const app = new Koa()
const server = require('koa-static')
const { resolve } = require('path')

app.use(logger())
app.use(server(resolve(__dirname,'./')))
app.listen(3333)