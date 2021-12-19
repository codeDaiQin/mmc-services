const router = require('koa-router')()
const { get, add } = require('./controller')

router.prefix('/api/comment')

router.get('/', get)

router.post('/', add)

module.exports = router