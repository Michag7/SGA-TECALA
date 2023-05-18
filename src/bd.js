const {Pool} = require('pg')
const {bd} = require('./config')

const pool = new Pool({
    user: bd.user,
    password: bd.password,
    host: bd.host,
    port: bd.port,
    database: bd.database,
})

module.exports = pool;