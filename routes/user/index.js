const router = require('koa-router')()
const { get, captcha, login, notices, register } = require('./controller')

router.prefix('/api/user')

router.get('/current', get)

router.get('/captcha', captcha)

router.get('/notices', notices)

router.post('/login', login)

router.post('/register', register)

module.exports = router