import 'dotenv/config';
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER || 'Niraj Dhakal',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'esports_teams',
  password: process.env.DB_PASSWORD || 'root',
  port: process.env.DB_PORT || 5432,
});

export default pool;