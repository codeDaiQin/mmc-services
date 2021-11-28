const router = require('koa-router')()
const { resources, user } = require('./controller')

router.prefix('/api/admin')

router.get('/resources', resources)

router.get('/user', user)

module.exports = router