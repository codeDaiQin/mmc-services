const router = require('koa-router')()
const { level, recruit, admin, getFindList } = require('./controller')

router.prefix('/api/world')

router.get('/rank', level)
router.get('/findList', getFindList)
module.exports = router