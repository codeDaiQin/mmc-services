const router = require('koa-router')()

router.prefix('/api')

router.post('/publish', async (ctx) => {
  const { file } = ctx.request.files
  // 正则 替换掉文件原始路径中不需要的部分
  const reg = new RegExp('.*/public/', 'g')

  ctx.body = file?.path?.replace(reg, '') ?? ''
})

router.get('/taglist', async (ctx) => {
  ctx.body = ['前端', '后端']
})

router.get('/test', async ctx => {
  ctx.body = 'success'
})

module.exports = router
