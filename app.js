const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body')
const cors = require('koa2-cors')
const path = require('path')
const jwt = require('jsonwebtoken')

// 路由
const index = require('./routes/index')
const user = require('./routes/user')
const resources = require('./routes/resources')
const world = require('./routes/world')
const admin = require('./routes/admin')
const comment = require('./routes/comment')
const mClub = require('./routes/mClub')
const notices = require('./routes/notices')

// middlewares
app.use(cors())
app.use(
  koaBody({
    multipart: true, // 支持文件上传
    formidable: {
      uploadDir: path.join(__dirname, 'public/'), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
    },
  })
)
app.use(
  require('koa-mount')('/api', require('koa-static')(__dirname + '/public'))
)

// auth
app.use(async (ctx, next) => {
  const { token = '' } = ctx.headers
  let userInfo
  if (token) {
    try {
      userInfo = jwt.verify(token, 'MMSZB')
    } catch (error) {}
    ctx.auth = userInfo
  }
  await next()
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(resources.routes(), resources.allowedMethods())
app.use(world.routes(), world.allowedMethods())
app.use(admin.routes(), admin.allowedMethods())
app.use(comment.routes(), comment.allowedMethods())
app.use(mClub.routes(), mClub.allowedMethods())
app.use(notices.routes(), notices.allowedMethods())

app.listen(3000)
