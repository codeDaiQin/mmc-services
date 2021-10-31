const router = require('koa-router')()
const { get, detail, add } = require('./controller')

router.prefix('/api/resources')

router.get('/', get)

router.get('/:id', detail)


module.exports = router