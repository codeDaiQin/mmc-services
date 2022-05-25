const mysql = require('../../utils/mysql')

const table = 'mClub'

exports.get = async (ctx) => {
  const { pageSize = 12, current = 1 } = ctx.request.query
  const list = await mysql(
    `SELECT * FROM ${table} LIMIT ${(current - 1) * pageSize},${pageSize}`
  )
  const [{ total }] = await mysql(`SELECT COUNT(*) as total FROM ${table}`)

  ctx.body = {
    list,
    total,
  }
}

exports.detail = async (ctx) => {
  const { id } = ctx.params
  const [data] = await mysql(`SELECT * FROM ${table} WHERE id=?`, id)
  ctx.body = data
}

exports.add = async (ctx) => {
  const { content} = ctx.request.body
  const uid = ctx.auth
  await mysql(`INSERT INTO ${table} SET uid=?,content=?`, [uid, content])
  ctx.body = {
    message: 'ok',
  }
}
