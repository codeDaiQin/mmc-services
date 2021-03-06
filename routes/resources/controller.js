const mysql = require('../../utils/mysql')

const table = 'resources'

exports.get = async (ctx) => {
  const {
    pageSize = 12,
    pageNum = 1,
    keyword,
    orderKey,
    tags,
  } = ctx.request.query

  const list = await mysql(
    `SELECT * FROM ${table} WHERE status=1
    ${keyword ? ` AND name LIKE '%${keyword}%'` : ' '}
    ${tags ? ` AND tags LIKE '%${tags}%' ` : ' '}
    ORDER BY ${orderKey || 'id'} DESC
    LIMIT ${(pageNum - 1) * pageSize},${pageSize}`
  )

  const [{ total }] = await mysql(
    `SELECT COUNT(*) as total FROM ${table}  WHERE status=1
    ${keyword ? ` AND name LIKE '%${keyword}%'` : ' '}
    ${tags ? ` AND tags LIKE '%${tags}%' ` : ' '}`
  )
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
  const { name, url, description, tags, cover } = ctx.request.body
  const uid = ctx.auth
  const data = await mysql(
    `INSERT INTO ${table} SET name=?,url=?,description=?,tags=?,createTime=?,cover=?,uid=?,lastEditUser=?,lastEditTime=?`,
    [
      name,
      url,
      description,
      JSON.stringify(tags),
      new Date(),
      cover,
      uid,
      uid,
      new Date(),
    ]
  )
  const [user] = await mysql(`SELECT * FROM user WHERE id=?`, uid)
  await mysql(`UPDATE user SET exp=? WHERE id=${uid}`, [user.exp + 5])
  ctx.body = {
    data,
    message: 'ok',
  }
}

exports.update = async (ctx) => {
  const { id, url, name, description, cover, tags } = ctx.request.body
  const uid = ctx.auth
  const data = await mysql(
    `UPDATE ${table} SET url=?,name=?,description=?,tags=?,createTime=?,cover=?,lastEditTime=?,lastEditUser=? WHERE id=${id}`,
    [
      url,
      name,
      description,
      JSON.stringify(tags),
      new Date(),
      cover,
      new Date(),
      uid,
    ]
  )
  ctx.body = {
    data,
    message: 'ok',
  }
}

exports.star = async (ctx) => {
  const id = Number(ctx.request.query.id)
  const uid = ctx.auth
  // ?????? ?????????
  const [{ starCount }] = await mysql(
    `SELECT starCount FROM ${table} WHERE id=${id}`
  )
  // ????????????????????????
  const [{ starResourceIds, exp }] = await mysql(
    `SELECT starResourceIds, exp FROM user WHERE id=${uid}`
  )
  let res = 0
  const stars = JSON.parse(starResourceIds || '[]')
  if (stars.includes(id)) {
    stars.splice(stars.indexOf(id), 1)
    res = -1
  } else {
    stars.push(id)
    res = 1
  }

  await mysql(`UPDATE user SET starResourceIds=?,exp=? WHERE id=?`, [
    JSON.stringify(stars),
    exp + res,
    uid,
  ])

  await mysql(`UPDATE ${table} SET starCount=? WHERE id=?`, [
    starCount + res,
    id,
  ])
  ctx.body = res
}

exports.getStar = async (ctx) => {
  const { ids } = ctx.request.query

  let list = await mysql(`SELECT * FROM ${table} WHERE status=1, id in ${ids} `)
  const [{ total }] = await mysql(`SELECT COUNT(*) as total FROM ${table}`)
  ctx.body = {
    list,
    total,
  }
}
