const mysql = require('../../utils/mysql')

exports.resources = async ctx => {
  const table = 'resources'
  const { pageSize = 12, current = 1 } = ctx.request.query
  const list = await mysql(`SELECT * FROM ${table} LIMIT ${(current - 1) * pageSize},${pageSize}`)
  const [{ count }] = await mysql(`SELECT COUNT(*) as count FROM ${table}`)
  ctx.body = {
    data: {
      list,
      total: count,
    },
  }
}

exports.user = async ctx => {
  const table = 'user'
  const { pageSize = 12, current = 1 } = ctx.request.query
  const list = await mysql(`SELECT * FROM ${table} LIMIT ${(current - 1) * pageSize},${pageSize}`)
  const [{ count }] = await mysql(`SELECT COUNT(*) as count FROM ${table}`)
  ctx.body = {
    data: {
      list,
      total: count,
    },
  }
}

exports.control = async ctx => {
  const table = 'resources'
  const { status, id } = ctx.request.query
  const data = await mysql(`UPDATE ${table} SET status=? WHERE id=${id}`, [status])
  ctx.body = {
    data,
    message: 'ok'
  }
}