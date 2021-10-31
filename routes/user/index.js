const router = require('koa-router')()
const mysql = require('../../utils/mysql')
const { get, login } = require('./controller')

router.prefix('/api/user')

const table = 'user'

router.get('/current', get)

router.post('/login', login)

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router