var pg = require('pg');

const connectionString = "postgres://viodirogkywhwr:28c88d9e25535dc5edf11cb1a6bc4a782eba072a8e5304f7bee3f32e6c5d2084@ec2-52-214-23-110.eu-west-1.compute.amazonaws.com:5432/d7mgchkb44q4a5"
const Pool = pg.Pool
const pool = new Pool({
    connectionString,
    max: 10,
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
})

module.exports = pool;