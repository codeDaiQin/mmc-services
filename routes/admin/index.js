const router = require('koa-router')()
const { resources, user, control } = require('./controller')

router.prefix('/api/admin')

router.get('/resources', resources)
router.put('/resources/control', control)

router.get('/user', user)

module.exports = router