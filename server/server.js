import express        from 'express'
import cors           from 'cors'
import dotenv         from 'dotenv'
import pool           from './db.js'
import authRoutes     from './routes/auth.routes.js'
import productRoutes  from './routes/product.routes.js'
import orderRoutes    from './routes/order.routes.js'
import adminRoutes    from './routes/admin.routes.js'
import contactRoutes  from './routes/contact.routes.js'
dotenv.config()

const app = express()

// ── Middleware ──────────────────────────────────────
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())

// ── Routes ──────────────────────────────────────────
app.use('/api/auth',     authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders',   orderRoutes)
app.use('/api/admin',    adminRoutes)  // Admin routes
app.use('/api/contact',  contactRoutes)
// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Moderno API running 🚀' })
})

// 404
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err.message)
  res.status(500).json({ error: 'Server error' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 API → http://localhost:${PORT}/api/health`)
})