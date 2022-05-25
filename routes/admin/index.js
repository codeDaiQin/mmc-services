const router = require('koa-router')()
const { resources, user, control, update, adminList } = require('./controller')

router.prefix('/api/admin')

router.get('/adminList', adminList)
router.get('/resources', resources)
router.put('/resources/control', control)

router.get('/user', user)

router.put('/user', update)

module.exports = router
