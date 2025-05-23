import Koa from 'koa'
import fs from 'fs'
import path from 'path'
const app = new Koa()


app.use(async (ctx) => {
  const { url } = ctx.request
  if (url === '/') {
    ctx.type = "text/html"
    ctx.body = fs.readFileSync("./index.html", "utf8")
  } else if (url.endsWith('.js')) {
    const p = path.join(__dirname, url)
    console.log(p)
    ctx.type = "application/javascript"
    ctx.body = fs.readFileSync(p, 'utf8')
  }
})

app.listen(3000, () => {
  console.log('server start')
})
