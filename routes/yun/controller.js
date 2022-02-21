const mysql = require('../../utils/mysql')
const table = 'yun'

exports.get = async ctx => {
  const data = await mysql(`SELECT * FROM ${table} ORDER BY id`)
  const [{ count }] = await mysql(`SELECT COUNT(*) as count FROM ${table}`)
  ctx.body = { todos: data, total: count }
}

exports.del = async ctx => {
  const { id } = ctx.request.query
  if (!id) return ctx.body = '请求出错'
  ctx.body = await mysql(`UPDATE ${table} SET status=1 WHERE id=${id}`)
}

exports.getTotal = async ctx => {
  const data = await mysql(`SELECT * FROM ${table}`)
  ctx.body = { todos: data }
}

exports.add = async ctx => {
  let { content, time = new Date() } = ctx.request.body
  let user = 0
  // 判断是饼是谦
  if (content.indexOf('@') > -1) {
    content = content.replace('@', '')
    user = 1
  }
  if (!content || !time) return ctx.body = '错误请求'
  ctx.body = await mysql(`INSERT INTO ${table} SET content=?,time=?,user=?`, [content, time, user])
}