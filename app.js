const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const path = require('path')
const jwt = require('jsonwebtoken')

// 路由
const index = require('./routes/index')
const user = require('./routes/user')
const resources = require('./routes/resources')
const rank = require('./routes/rank')
const admin = require('./routes/admin')
const comment = require('./routes/comment')
const mClub = require('./routes/mClub')

// error handler
onerror(app)

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

app.use(json())
app.use(logger())
app.use(
	require('koa-mount')('/api', require('koa-static')(__dirname + '/public'))
)

// logger
app.use(async (ctx, next) => {
	const { user_token = '' } = ctx.headers
	let userInfo = {}
	if (user_token) {
		try {
			userInfo = jwt.verify(user_token, 'MMSZB') ?? {}
		} catch (error) {}
		ctx.auth = userInfo
	}
	await next()
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(resources.routes(), resources.allowedMethods())
app.use(rank.routes(), rank.allowedMethods())
app.use(admin.routes(), admin.allowedMethods())
app.use(comment.routes(), comment.allowedMethods())
app.use(mClub.routes(), mClub.allowedMethods())

app.listen(3000)
// module.exports = app
