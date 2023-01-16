const mariadb = require('mariadb');

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

const pool = mariadb.createPool({
    host,
    user,
    password,
    database,
    connectionLimit: 5
});

pool.getConnection((err, connection) => {

    if(err) console.log('Database connection error');

    if(connection) connection.release();

    return;
});

module.exports = pool;