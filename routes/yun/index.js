const router = require('koa-router')()
const { get, add, del, getTotal } = require('./controller')

router.prefix('/api/yun')

router.get('/', get)

router.post('/', add)

router.delete('/', del)

router.get('/total', getTotal)

module.exports = router