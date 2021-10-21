const mysql = require('mysql')
// const pool = mysql.createPool({
//   host: '172.17.16.10',
//   port: 3306,
//   user: 'root',
//   password: 'DAIQIN*daiqin123',
//   database: 'mmszb'
// })
const pool = mysql.createPool({
  host: 'sh-cynosdbmysql-grp-5ittrh02.sql.tencentcdb.com',
  port: 23933,
  user: 'root',
  password: 'DAIQIN*daiqin123',
  database: 'mmszb'
})

let query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err)
      else connection.query(sql, values, (err, rows) => {
        if (err) reject(err)
        else { resolve(rows) }
        connection.release()
      })
    })
  })
}

module.exports = query