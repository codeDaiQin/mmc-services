const mysql = require('../../utils/mysql')

const table = 'user'

exports.level = async (ctx) => {
  const list = await mysql(`SELECT * FROM ${table} ORDER BY exp DESC`)
  const [{ total }] = await mysql(
    `SELECT COUNT(*) as total FROM ${table} LIMIT 20`
  )

  ctx.body = {
    list,
    total,
  }
}

exports.getFindList = async (ctx) => {
  const list = [
    {
      user: 'admin',
      content: '水杯',
    },
    {
      user: 'admin',
      content: '充电器',
    },
  ]
  ctx.body = {
    list,
  }
}
