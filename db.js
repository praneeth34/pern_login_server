const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "praneeth7474292",
  host: "localhost",
  port: 5432,
  database: "loginauth",
});

module.exports = pool;
