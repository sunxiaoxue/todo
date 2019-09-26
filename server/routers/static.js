const Router = require('koa-router')
const send = require('koa-send')

//只会处理斜杠开头的public
const staticRouter = new Router({ prefix: '/public' })
staticRouter.get('/*', async ctx => {
  console.log("ctx.path", ctx.path)
  await send(ctx, ctx.path)
})

module.exports = staticRouter
