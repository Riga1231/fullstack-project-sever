const mysql = require("mysql2/promise");

let pool;

if (process.env.MYSQL_URL) {
  // Production (e.g., Railway)
  const { URL } = require("url");
  const dbUrl = new URL(process.env.MYSQL_URL);

  pool = mysql.createPool({
    host: dbUrl.hostname,
    port: dbUrl.port,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.slice(1), // removes the leading slash
  });
}
module.exports = pool;
