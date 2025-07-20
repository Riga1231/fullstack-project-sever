const mysql = require("mysql2/promise");
const { URL } = require("url");

const dbUrl = new URL(process.env.DATABASE_URL);

const connection = await mysql.createConnection({
  host: dbUrl.hostname,
  port: dbUrl.port,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.slice(1), // remove leading slash
});
