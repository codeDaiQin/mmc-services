const mysql = require('../../utils/mysql')

const table = 'resources'

exports.get = async (ctx) => {
	const { pageSize = 12, current = 1 } = ctx.request.query
	let list = await mysql(
		`SELECT * FROM ${table} LIMIT ${
			(current - 1) * pageSize
		},${pageSize}`
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
	ctx.body = data
}

exports.add = async (ctx) => {
	const { name, url, description, tags, cover  } = ctx.request.body

	// const fileUrl = await

	const data = await mysql(
		`INSERT INTO ${table} SET name=?,url=?,description=?,tags=?`,
		[name, url, description, JSON.stringify(tags)]
	)
	ctx.body = {
		data,
		message: 'ok',
	}
}

exports.update = async (ctx) => {
	const { id, url, name, description, cover } = ctx.request.body
	const data = await mysql(
		`UPDATE ${table} SET url=?,name=?,description=?,tags=? WHERE id=${id}`,
		[url, name, description, JSON.stringify(tags)]
	)
	ctx.body = {
		data,
		message: 'ok',
	}
}
