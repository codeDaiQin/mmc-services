const mysql = require('../../utils/mysql')

exports.resources = async (ctx) => {
  const table = 'resources'
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

exports.user = async (ctx) => {
  const table = 'user'
  const { pageSize = 12, pageNum = 1, name, email } = ctx.request.query
  let sql = `SELECT * FROM ${table}`
  if (name || email) sql += ' WHERE'
  if (name) sql += ` name='${name}'`
  if (name && email) sql += 'AND'
  if (email) sql += ` email='${email}'`
  sql += ` LIMIT ${(pageNum - 1) * pageSize}, ${pageSize}`
  const list = await mysql(sql)

  const [{ total }] = await mysql(`SELECT COUNT(*) as total FROM ${table}`)
  ctx.body = {
    list,
    total,
  }
}

exports.control = async (ctx) => {
  const table = 'resources'
  const { status, id } = ctx.request.query
  const data = await mysql(`UPDATE ${table} SET status=? WHERE id=${id}`, [
    status,
  ])
  ctx.body = {
    data,
    message: 'ok',
  }
}

exports.update = async (ctx) => {
  const table = 'user'
  const { email, name, access, id } = ctx.request.body
  const data = await mysql(
    `UPDATE ${table} SET email=?,name=?,access=? WHERE id=${id}`,
    [email, name, access]
  )
  ctx.body = {
    data,
    message: 'ok',
  }
}

// 获取管理员列表
exports.adminList = async (ctx) => {
  const table = 'user'
  const list = await mysql(`SELECT * FROM ${table} WHERE access=1`)

  const [{ total }] = await mysql(`SELECT COUNT(*) as total FROM ${table}`)
  ctx.body = {
    list,
    total,
  }
}
