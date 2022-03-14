const mysql = require('../../utils/mysql')

const table = 'notices'

exports.get = async (ctx) => {
  const { pageSize = 12, pageNum = 1 } = ctx.request.query
  let list = await mysql(
    `SELECT * FROM ${table} LIMIT ${(pageNum - 1) * pageSize},${pageSize}`
  )
  const [{ total }] = await mysql(`SELECT COUNT(*) as total FROM ${table}`)
  ctx.body = {
    list,
    total,
  }
}
