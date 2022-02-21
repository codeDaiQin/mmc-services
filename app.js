const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const auth = require('./utils/auth')
const cors = require('koa2-cors')

// 路由
const index = require('./routes/index')
const user = require('./routes/user')
const resources = require('./routes/resources')
const rank = require('./routes/rank')
const yellow = require('./routes/yellow')
const admin = require('./routes/admin')
const yun = require('./routes/yun')
const comment = require('./routes/comment')

// error handler
onerror(app)

// middlewares
app.use(cors())
app.use(bodyparser())
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(auth())
app.use(views(__dirname + '/views', { extension: 'pug' }))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(resources.routes(), resources.allowedMethods())
app.use(rank.routes(), rank.allowedMethods())
app.use(yellow.routes(), yellow.allowedMethods())
app.use(admin.routes(), admin.allowedMethods())
app.use(yun.routes(), yun.allowedMethods())
app.use(comment.routes(), comment.allowedMethods())

app.listen(3000)
// module.exports = app
