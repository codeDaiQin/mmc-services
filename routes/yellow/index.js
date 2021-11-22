const router = require('koa-router')()
const { get, detail, add } = require('./controller')

router.prefix('/api/yellow')

router.get('/', get)

router.post('/', add)

router.get('/:id', detail)

module.exports = router