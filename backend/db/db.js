const Pool = require('pg').pool;

const pool = new Pool({
  user: "alecfaustino",
  host: "localhost",
  port: 5432,
  database: "grocerylist"
})

// pg_ctl -D /usr/local/var/postgresql@14 start

module.exports = pool;