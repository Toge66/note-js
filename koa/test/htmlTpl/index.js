import ejs from 'ejs'

export const htmlTpl = async (ctx, next) => {
  ctx.type = 'text/html, charset=utf-8'
  ctx.body = require('./htmlTpl')
  await next()
}

export const ejsTpl = async (ctx, next) => {
  ctx.type = 'text/html, charset=utf-8'
  ctx.body = ejs.render(require('./ejsTpl'),{
    data:{
      first: "Hello this is EJS template",
      second: "EJS test"
    }
  })
  await next()
}