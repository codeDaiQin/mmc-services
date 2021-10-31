const router = require('koa-router')()
const { get, captcha, login, notices } = require('./controller')

router.prefix('/api/user')

router.get('/current', get)

router.get('/captcha', captcha)

router.get('/notices', notices)

router.post('/login', login)

module.exports = router