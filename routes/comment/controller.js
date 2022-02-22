const mysql = require('../../utils/mysql')

const table = 'comment'

exports.get = async (ctx) => {
	const { fid } = ctx.request.query
	const list = await mysql(`SELECT * FROM ${table} WHERE fid=${fid}`)
	const [{ total }] = await mysql(`SELECT COUNT(*) as total FROM ${table}`)
	ctx.body = { list, total }
}

exports.add = async (ctx) => {
	const { fid, content } = ctx.request.body
	const data = await mysql(`INSERT INTO ${table} SET fid=?,content=?,time=?`, [
		fid,
		content,
		new Date()
	])
	ctx.body = {
		data,
		message: 'ok',
	}
}

exports.like = async ctx => {
	const { cid } = ctx.request.query
	const { uid } = ctx.auth
	const userInfo = await mysql(`SELECT * FROM user WHERE id=?`, [uid])
	const starResourceIds = JSON.parse(userInfo.starResourceIds ?? '[]').push(cid)
	await mysql(`UPDATE USER SET starResourceIds=? WHERE id=?`,[JSON.stringify(starResourceIds), uid])	
	const data = await mysql(`UPDATE ${table} SET likeCount=? WHERE id=?`, [1, cid])
	ctx.body = {
		
	}
}