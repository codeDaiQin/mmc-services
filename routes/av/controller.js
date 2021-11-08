const mysql = require('../../utils/mysql')

const table = 'av'

exports.get = async ctx => {
  const { current = 1 } = ctx.query
  let data = await mysql(`SELECT * FROM ${table} LIMIT ${(current - 1) * 9},${current * 9}`)
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
  const data = await mysql(`SELECT * FROM ${table} WHERE id=?`, id)
  ctx.body = {
    data
  }
}

exports.add = async ctx => {

  const { title, url, pic } = ctx.request.body
  const data = await mysql(
    `INSERT INTO ${table} SET title=?,url=?,pic=?`,
    [title, url, pic]
  )

  ctx.body = {
    data,
    message: 'ok'
  }
}