const router = require('koa-router')()
const { get, detail, add } = require('./controller')

router.prefix('/api/av')

router.get('/', get)

router.post('/', add)

router.get('/:id', detail)


module.exports = router