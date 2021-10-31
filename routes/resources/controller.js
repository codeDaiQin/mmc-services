const mysql = require('../../utils/mysql')

const table = 'resources'

exports.get = async ctx => {
  let data = await mysql(`SELECT * FROM ${table}`)
  ctx.body = {
    data: {
      list: data,
      total: 50,
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
  const { title, url, description, tag, cover } = ctx.request.body
  const data = await mysql(
    `INSERT INTO ${table} SET title=?,url=?,description=?,tag=?,cover=?`,
    [title, url, description, JSON.stringify(tag), JSON.stringify(cover)]
  )
  ctx.body = {
    data,
    message: 'ok'
  }
}