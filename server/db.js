import pg     from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const { Pool } = pg

// Production (Neon): uses DATABASE_URL with SSL
// Development (local): uses individual .env variables
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })
  : new Pool({
      host:     process.env.DB_HOST,
      port:     Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    })

pool.connect()
  .then(() => console.log('✅ PostgreSQL connected'))
  .catch((e) => console.error('❌ DB error:', e.message))

export default pool