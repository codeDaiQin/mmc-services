const router = require('koa-router')()
const { get, detail, add, update, star } = require('./controller')

router.prefix('/api/resources')

router.get('/', get)

router.get('/detail/:id', detail)

router.post('/add', add)

router.put('/update', update)

router.put('/star', star)

module.exports = router