const router = require('koa-router')()
const { get, detail, add, update, star, getStar } = require('./controller')

router.prefix('/api/resources')

router.get('/', get)

router.get('/detail/:id', detail)

router.post('/add', add)

router.put('/update', update)

router.put('/star', star)

router.get('/getStar', getStar)

module.exports = router
