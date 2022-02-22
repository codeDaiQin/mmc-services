const mysql = require('../../utils/mysql')

const table = 'resources'

exports.get = async (ctx) => {
	const { pageSize = 12, current = 1 } = ctx.request.query
	let list = await mysql(
		`SELECT * FROM ${table} LIMIT ${(current - 1) * pageSize},${pageSize}`
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
	const [{ name: author, avatar }] = await mysql(`SELECT * FROM user WHERE id=?`,data.uid)
	ctx.body = { ...data, author, avatar }
}

exports.add = async (ctx) => {
	const { name, url, description, tags, cover } = ctx.request.body
	const { uid } = ctx.auth
	const data = await mysql(
		`INSERT INTO ${table} SET name=?,url=?,description=?,tags=?,createTime=?,cover=?,uid=?`,
		[name, url, description, JSON.stringify(tags), new Date(), cover, uid]
	)
	ctx.body = {
		data,
		message: 'ok',
	}
}

exports.update = async (ctx) => {
	const { id, url, name, description, cover } = ctx.request.body
	const data = await mysql(
		`UPDATE ${table} SET url=?,name=?,description=?,tags=?,createTime=?,cover=? WHERE id=${id}`,
		[url, name, description, JSON.stringify(tags), new Date(), cover]
	)
	ctx.body = {
		data,
		message: 'ok',
	}
}
