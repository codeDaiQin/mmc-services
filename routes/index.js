const router = require('koa-router')()

router.prefix('/api')

router.post('/publish', async (ctx) => {
  const { file } = ctx.request.files
  function getFileName(path) {
    const pos = Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'))
    if (pos < 0) return path
    else return path.substring(pos + 1)
  }
  ctx.body = getFileName(file?.path)
})

router.get('/taglist', async (ctx) => {
  ctx.body = ['前端', '后端']
})

router.all('/test', async (ctx) => {
  ctx.body = 'success'
})

module.exports = router
