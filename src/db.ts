import { createPool, Pool } from "mysql2/promise";

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

console.log(DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME);

const pool: Pool = createPool({
  connectionLimit: 10,
  host: DB_HOST,
  port: DB_PORT ? +DB_PORT : 3306,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  queueLimit: 0,
});

export default pool;
