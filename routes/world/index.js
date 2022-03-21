const router = require('koa-router')()
const { level, recruit, admin } = require('./controller')

router.prefix('/api/world')

router.get('/level', level)

router.get('/recruit', recruit)

router.get('/admin', admin)

module.exports = router