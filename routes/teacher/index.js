const router = require('koa-router')()
const { get, detail, add } = require('./controller')

router.prefix('/api/teacher')

router.get('/', get)

router.get('/detail/:id', detail)

router.post('/add', add)

module.exports = router
