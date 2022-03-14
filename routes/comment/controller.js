const mysql = require('../../utils/mysql')

const table = 'comment'

exports.get = async (ctx) => {
  const { fid, pageSize = 8, pageNum = 1, sortType } = ctx.request.query
  const list = await mysql(
    `SELECT a.*, b.name, b.avatar FROM ${table} a inner join user b on a.uid = b.id WHERE fid=${fid} ${
      sortType && 'ORDER BY id DESC'
    } LIMIT ${(pageNum - 1) * pageSize}, ${pageSize}`
  )
  const [{ total }] = await mysql(
    `SELECT COUNT(*) as total FROM ${table} WHERE fid=${fid}`
  )
  ctx.body = { list, total }
}

exports.add = async (ctx) => {
  const { fid, content } = ctx.request.body
  const uid = ctx.auth
  const data = await mysql(
    `INSERT INTO ${table} SET fid=?,content=?,time=?,uid=?`,
    [fid, content, new Date(), uid]
  )
  ctx.body = {
    data,
    message: 'ok',
  }
}

exports.like = async (ctx) => {
  const { cid } = ctx.request.query
  const uid = ctx.auth
  const userInfo = await mysql(`SELECT * FROM user WHERE id=?`, [uid])
  const starResourceIds = JSON.parse(userInfo.starResourceIds ?? '[]').push(cid)
  await mysql(`UPDATE USER SET starResourceIds=? WHERE id=?`, [
    JSON.stringify(starResourceIds),
    uid,
  ])
  const data = await mysql(`UPDATE ${table} SET likeCount=? WHERE id=?`, [
    1,
    cid,
  ])
  ctx.body = {}
}
