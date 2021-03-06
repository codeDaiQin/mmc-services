const router = require('koa-router')()
const { get, detail, add } = require('./controller')

router.prefix('/api/mClub')

router.get('/', get)

router.get('/:id', detail)

router.post('/', add)

module.exports = router