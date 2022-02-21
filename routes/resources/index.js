const router = require('koa-router')()
const { get, detail, add, update } = require('./controller')

router.prefix('/api/resources')

router.get('/', get)

router.get('/:id', detail)

router.post('/add', add)

router.put('/update', update)

module.exports = router