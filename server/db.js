import pg     from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const { Pool } = pg

// Production (Neon): uses DATABASE_URL with SSL
// Development (local): uses individual .env variables
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
        // Suppresses the pg SSL mode warning in Node.js v24+
        sslmode: 'verify-full' 
      },
    })
  : new Pool({
      host:     process.env.DB_HOST,
      port:     Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    })

// Handle background errors on idle clients so the app doesn't crash
pool.on('error', (err) => {
  console.error('⚠️ Idle PostgreSQL client error:', err.message)
})

pool.connect()
  .then((client) => {
    console.log('✅ PostgreSQL connected')
    client.release() // Always release test connection back to pool
  })
  .catch((e) => console.error('❌ DB connection error:', e.message))

export default pool