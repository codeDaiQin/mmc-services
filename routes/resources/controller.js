const mysql = require('../../utils/mysql')

const table = 'resources'

exports.get = async ctx => {
  const { pageSize = 12, current = 1 } = ctx.request.query
  let data = await mysql(`SELECT * FROM ${table} WHERE status=1 LIMIT ${(current - 1) * pageSize},${pageSize}`)
  const [{ count }] = await mysql(`SELECT COUNT(*) as count FROM ${table}`)
  ctx.body = {
    data: {
      list: data,
      total: count,
    },
  }
}

exports.detail = async ctx => {
  const { id } = ctx.params
  const [data] = await mysql(`SELECT * FROM ${table} WHERE id=?`, id)
  ctx.body = {
    data
  }
}

exports.add = async ctx => {
  const { title, url, description, tags, file } = ctx.request.body

  // const fileUrl = await

  const data = await mysql(
    `INSERT INTO ${table} SET title=?,url=?,description=?,tag=?`,
    [title, url, description, JSON.stringify(tags)]
  )
  ctx.body = {
    data,
    message: 'ok'
  }
}

