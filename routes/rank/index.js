const router = require('koa-router')()
const { level, recruit } = require('./controller')

router.prefix('/api/rank')

router.get('/level', level)

router.get('/recruit', recruit)

module.exports = router