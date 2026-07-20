import express        from 'express'
import cors           from 'cors'
import dotenv         from 'dotenv'
import path           from 'path'
import { fileURLToPath } from 'url'
import authRoutes     from './routes/auth.routes.js'
import productRoutes  from './routes/product.routes.js'
import orderRoutes    from './routes/order.routes.js'
import adminRoutes    from './routes/admin.routes.js'
import contactRoutes  from './routes/contact.routes.js'

dotenv.config()

// Needed to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const app = express()

// ── Middleware ──────────────────────────────────────
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? false           // same origin in production — no CORS needed
    : 'http://localhost:5173', // allow Vite dev server locally
  credentials: true,
}))
app.use(express.json())

// ── API Routes ──────────────────────────────────────
app.use('/api/auth',     authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders',   orderRoutes)
app.use('/api/admin',    adminRoutes)
app.use('/api/contact',  contactRoutes)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Moderno API running 🚀' })
})

// ── Serve React (production only) ───────────────────
// In production, Express serves the built React files from dist/
// In development, Vite handles this instead
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React build
  app.use(express.static(path.join(__dirname, '../dist')))

  // For any route that is NOT /api/..., send React's index.html
  // Updated for Express v5 wildcard syntax ({*path})
  app.get('{*path}', (_req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
  })
}

// ── Error handlers ──────────────────────────────────
app.use((_req, res) => res.status(404).json({ error: 'Route not found' }))
app.use((err, _req, res, _next) => {
  console.error(err.message)
  res.status(500).json({ error: 'Server error' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Moderno running on http://localhost:${PORT}`)
})