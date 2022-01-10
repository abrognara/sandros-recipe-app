const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b59f9076846d0c',
    password: '5f00f69c',
    database: 'heroku_c20ccf2941bde2b'
});

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error(`Database connection was closed (${err.code})`);
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error(`Database has too many connections (${err.code})`);
        }
        if (err.code === 'ECONNREFUSED') {
            console.error(`Database connection was refused (${err.code})`);
        }

        if (connection) connection.release();

        return;
    }
});

module.exports = pool;