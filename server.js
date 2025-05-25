import Koa from 'koa'
import fs from 'fs'
import path, { join } from 'path'
import { fileURLToPath } from 'url';
const app = new Koa()
const __dirname = path.dirname(new URL(import.meta.url).pathname)
import { parse } from '@vue/compiler-sfc'
import { compile } from '@vue/compiler-dom'


app.use(async (ctx) => {
  // ctx.body = 'Hello World'
  const { url, query } = ctx.request
  console.log({
    url,
  })
  if (url === '/') {
    ctx.type = "text/html"
    ctx.body = fs.readFileSync(path.join(__dirname, './index.html'), "utf8")
  } else if (url.endsWith('.js')) {// 
    const p = path.join(__dirname, url)// 
    ctx.type = "application/javascript"// 
    const content = fs.readFileSync(p, 'utf8');
    ctx.body = rewiereImport(content);
  } else if (url.endsWith('.css')) {// 
    ctx.type = "text/css"// 
    ctx.body = fs.readFileSync(`.${url}`, 'utf8')// 
  } else if (url.startsWith('/@modules/')) {
    const moduleName = url.replace('/@modules/', '')
    // 获取模块的package.json文件路径
    const prefix = join(fileURLToPath(new URL('.', import.meta.url)), `./node_modules/${moduleName}`);
    // 读取package.json
    const module = JSON.parse(fs.readFileSync(`${prefix}/package.json`, 'utf-8')).module;
    const filePath = path.join(prefix, module)
    // 获取模块的入口文件路径
    // const modulePath = join(fileURLToPath(new URL('.', import.meta.url)), `./node_modules/${moduleName}/${pkg.module || pkg.main || 'index.js'}`);
    // 动态导入模块
    // const module = await import(modulePath);
    // ctx.bod = fs.readFileSync(modulePath, 'utf-8')
    // const pkg =  module.module; // 获取 module 字段
    console.log({
      url,
      module,
      filePath
    })
    // rewiereImport() 
    ctx.type = "application/javascript"
    ctx.body = rewiereImport(fs.readFileSync(filePath, 'utf-8'))
    // const pkg = JSON.parse(fs.readFileSync(p, 'utf-8')).module;
    // console.log({ pkg });

    // const module = await import(p)
    // ctx.type = "application/javascript"
    // ctx.body = `export default ${JSON.stringify(module)}`
  } else if (url.indexOf('.vue') > -1) {
    const type = query.type
    const p = path.join(__dirname, url.split('?')[0])
    const content = fs.readFileSync(p, 'utf8')
    const { descriptor } = parse(content)
    if (!type) {
      const scriptContent = descriptor.script?.content
      const script = scriptContent.replace('export default', 'const __script =')
      ctx.type = "application/javascript"
      ctx.body = `
      ${rewiereImport(script)}
      import { render as __render } from '${url}?type=template'
      __script.render = __render
      export default __script
      `
    } else if (type === 'template') {
      const templateContent = descriptor.template?.content
      const render = compile(templateContent, {
        mode: 'module'
      }).code
      ctx.type = "application/javascript"
      ctx.body = rewiereImport(render)

    }


  }
})


function rewiereImport(content) {
  return content.replace(/from ['"]([^'"]+)['"]/g, function (s0, s1) {
    // 如果是相对路径或者绝对路径，就不需要重写
    if (s1.startsWith('./') || s1.startsWith('../') || s1.startsWith('/')) {
      return s0
    } else {
      return ` from '/@modules/${s1}'`
    }
  })
}

app.listen(3000, () => {
  console.log('server start')
})
