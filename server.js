import Koa from 'koa'
import fs from 'fs'
import path from 'path'
const app = new Koa()
const __dirname = path.dirname(new URL(import.meta.url).pathname)
console.log(__dirname,path.dirname)
console.log(new URL(import.meta.url).pathname)


app.use(async (ctx) => {
  // ctx.body = 'Hello World'
    const { url } = ctx.request
  if (url === '/') {
    ctx.type = "text/html"
    ctx.body = fs.readFileSync("./index.html","utf8")
  } else if (url.endsWith('.js')) {// 
    const p = path.join(__dirname, url)// 
    console.log({// 
      __dirname,// 
      p,
      // 
      url// 
    })// 
    ctx.type = "application/javascript"// 
    ctx.body = fs.readFileSync(p, 'utf8')// 
  }else if (url.endsWith('.css')) {// 
    ctx.type = "text/css"// 
    ctx.body = fs.readFileSync(`.${url}`, 'utf8')// 
  }
})

app.listen(3000, () => {
  console.log('server start')
})
