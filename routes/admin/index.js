const router = require('koa-router')()
const { get, detail, add } = require('./controller')

router.prefix('/api/admin')

router.get('/', get)

router.get('/:id', detail)


module.exports = router