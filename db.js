const mysql = require("mysql2/promise");

const dbUrl = new URL(process.env.MYSQL_URL);

// Extract and convert to mysql2 format
const pool = mysql.createPool({
  host: dbUrl.hostname,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.replace("/", ""), // remove leading slash
  port: dbUrl.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
