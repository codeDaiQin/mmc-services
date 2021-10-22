const router = require('koa-router')()
const mysql = require('../../utils/mysql')

router.prefix('/user')

const table = 'user'

router.get('/', async (ctx, next) => {
  const data = await mysql(`SELECT * FROM ${table}`)
  const [{ count }] = await mysql(`SELECT COUNT(*) as count FROM ${table}`)
  ctx.body = { data, message: 'GET USER_LIST', count }
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
