const mysql = require("mysql2/promise");

let pool;

if (process.env.DATABASE_URL) {
  // Production (e.g., Railway)
  const { URL } = require("url");
  const dbUrl = new URL(process.env.DATABASE_URL);

  pool = mysql.createPool({
    host: dbUrl.hostname,
    port: dbUrl.port,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.slice(1), // removes the leading slash
  });
} else {
  // Development (local)
  require("dotenv").config(); // only needed for local
  pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "", // your local password
    database: "plp_db",
    port: 3306,
  });
}

module.exports = pool;
