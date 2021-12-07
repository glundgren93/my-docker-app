const { Pool } = require("pg");

const pool = new Pool({
  max: 20,
  //connectionString: 'postgres://root:newPassword@localhost:port/dbname',
  // connectionString: "postgres://user:password@db:5432/todo-db",
  connectionString: "postgres://user:password@localhost:5432/todo-db",
  idleTimeoutMillis: 30000,
});

module.exports = pool;
