const router = require('koa-router')()
const { get } = require('./controller')

router.prefix('/api/notices')

router.get('/', get)


module.exports = router