const mysql = require('../../utils/mysql')

const table = 'comment'

exports.get = async (ctx) => {
	const { fid = '1' } = ctx.request.query
	const list = await mysql(`SELECT * FROM ${table} WHERE fid=${fid}`)
	const [{ total }] = await mysql(`SELECT COUNT(*) as total FROM ${table}`)
	ctx.body = { list, total }
}

exports.add = async (ctx) => {
	const { fid, content } = ctx.request.body
	const data = await mysql(`INSERT INTO ${table} SET fid=?,content=?`, [
		fid,
		content,
	])

	ctx.body = {
		data,
		message: 'ok',
	}
}
