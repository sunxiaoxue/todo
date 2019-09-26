//处理正式环境
const Router = require('koa-router')
const path = require('path')
const VueServerRender = require('vue-server-renderer')
const serverRender = require('./server-render')
const fs = require('fs')
const clientMansfest = require('../../public/vue-ssr-client-manifest.json')
const renderer = VueServerRender.createBundleRenderer(
  path.join(__dirname, '../../server-build/vue-ssr-server-bundle.json'), {
    inject: false,
    clientMansfest
  }
)
const template = fs.readFileSync(
  path.join(__dirname, '../server.template.ejs'),
  'utf-8'
)
const pageRouter = new Router()
pageRouter.get('*', async (ctx) => {
  await serverRender(ctx, renderer, template)
})
module.exports = pageRouter
