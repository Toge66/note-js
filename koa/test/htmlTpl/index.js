export const htmlTpl = async (ctx, next) => {
  ctx.type = 'text/html, charset=utf-8'
  ctx.body = require('./htmlTpl')
}