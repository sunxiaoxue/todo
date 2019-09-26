const Koa = require('koa')
const staticRouter = require('./routers/static')
const apiRouter= require('./routers/api')
const app = new Koa()
const isDev = process.env.NODE_ENV === 'development'
const send=require('koa-send')
const path=require('path')
const createDb = require('./db/db')
const config = require('../app.config')
const db = createDb(config.db.appId, config.db.appKey)
app.use(async (ctx, next) => {
  try { //把所有请求进来的路径记录下来
    console.log(`请求路径 ${ctx.path}`)
    await next()
  } catch (error) {
    console.log(error)
    ctx.status = 500
    if (isDev) {
      ctx.body = error.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})
app.use(async (ctx, next) => {
  ctx.db = db
  await next()

})

app.use(async (ctx, next) => {
  if(ctx.path === '/favicon.ico'){
   await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../')})
  }else{
    await next()
  }
})

//app.use(userRouter.routes()).use(userRouter.allowedMethods())
//在pageRouter之前使用
 app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
 app.use(apiRouter.routes()).use(apiRouter.allowedMethods())
let pageRouter
if (isDev) {
  pageRouter = require('./routers/dev-ssr')
  // pageRouter = require('./routers/dev-ssr-no-bundle')
}else {
  pageRouter = require('./routers/ssr')
}


app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333
console.log('process.env.HOST', process.env.HOST)
app.listen(PORT, HOST, () => {
  console.log(`${HOST}:${PORT}`)
})
