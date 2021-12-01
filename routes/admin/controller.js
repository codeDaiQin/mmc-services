const mysql = require('../../utils/mysql')

exports.resources = async ctx => {
  const table = 'resources'
  const { pageSize = 12, current = 1 } = ctx.request.query
  let data = await mysql(`SELECT * FROM ${table} LIMIT ${(current - 1) * pageSize},${pageSize}`)
  const [{ count }] = await mysql(`SELECT COUNT(*) as count FROM ${table}`)
  ctx.body = {
    data: {
      list: data,
      total: count,
    },
  }
}

exports.user = async ctx => {
  const table = 'user'
  const { pageSize = 12, current = 1 } = ctx.request.query
  let data = await mysql(`SELECT * FROM ${table} LIMIT ${(current - 1) * pageSize},${pageSize}`)
  const [{ count }] = await mysql(`SELECT COUNT(*) as count FROM ${table}`)
  ctx.body = {
    data: {
      list: data,
      total: count,
    },
  }
}

exports.control = async ctx => {
  const { type, id } = ctx.request.query
  // const data = await mysql(
  //   `INSERT INTO ${table} SET title =?, url =?, description =?, tag =?, cover =? `,
  //   [title, url, description, JSON.stringify(tag), JSON.stringify(cover)]
  // )
  ctx.body = {
    // data,
    type, id,
    message: 'ok'
  }
}