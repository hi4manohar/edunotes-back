const mysql = require('mysql')
const { connection } = require('./db.config')

const dbinst = mysql.createConnection({
    host: connection.host,
    user: connection.user,
    password: connection.password,
    database: connection.database
});

dbinst.connect((err) => {
    if (err) throw err;
    // console.log('Connected!');
});

module.exports = {
    dbinst
}