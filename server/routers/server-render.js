//服务端渲染，在开发和正式都要用到
const ejs = require('ejs') // 用ejs渲染template
module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'

  const context = {
    url: ctx.path
  }

  try {
    const appString = await renderer.renderToString(context)
    //renderToString后可以拿到meta对象
    const {
      title
    } = context.meta.inject()

    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      title: title.text()
    })
    ctx.body = html
    console.log('context.renderStyles()', context.renderStyles())
    console.log('context.renderScripts()', context.renderScripts())
  } catch (error) {
    console.log('render error', error)
    throw error
  }
}
