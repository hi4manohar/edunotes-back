const mysql = require('mysql')
const { connection } = require('./db.config')
const { expressConfig } = require('./express.config')

const dbinst = mysql.createPool({
    connectionLimit: 10,
    host: connection.host,
    user: connection.user,
    password: connection.password,
    database: connection.database
});

module.exports = {
    dbinst
}