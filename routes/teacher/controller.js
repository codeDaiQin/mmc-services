const mysql = require('../../utils/mysql')

const table = 'teacher'

exports.get = async (ctx) => {
  const { pageSize = 12, pageNum = 1 } = ctx.request.query

  const list = await mysql(
    `SELECT * FROM ${table} LIMIT ${(pageNum - 1) * pageSize},${pageSize}`
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
  const [{ name: author, avatar }] = await mysql(
    `SELECT * FROM user WHERE id=?`,
    data.uid
  )
  ctx.body = { ...data, author, avatar }
}

exports.add = async (ctx) => {
  const { resource, title, tags, type } = ctx.request.body
  const uid = ctx.auth
  const data = await mysql(
    `INSERT INTO ${table} SET resource=?,title=?,uid=?,tags=?,type=?`,
    [resource, title, uid, JSON.stringify(tags), type]
  )

  ctx.body = {
    data,
    message: 'ok',
  }
}
