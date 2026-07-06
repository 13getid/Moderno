import bcrypt from 'bcryptjs'
import jwt    from 'jsonwebtoken'
import pool   from '../db.js'
import dotenv from 'dotenv'
dotenv.config()

const makeToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

// POST /api/auth/register
export async function register(req, res) {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password)
      return res.status(400).json({ error: 'All fields required' })

    const exists = await pool.query(
      'SELECT id FROM users WHERE email=$1', [email]
    )
    if (exists.rows.length)
      return res.status(400).json({ error: 'Email already registered' })

    const hashed = await bcrypt.hash(password, 10)
    const { rows } = await pool.query(
      `INSERT INTO users (name,email,password)
       VALUES ($1,$2,$3) RETURNING id,name,email,role`,
      [name, email, hashed]
    )
    const user = rows[0]
    res.status(201).json({ user, token: makeToken(user) })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

// POST /api/auth/login
export async function login(req, res) {
  try {
    const { email, password } = req.body
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email=$1', [email]
    )
    const user = rows[0]
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ error: 'Invalid email or password' })

    const { password: _, ...safe } = user
    res.json({ user: safe, token: makeToken(user) })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

// GET /api/auth/me
export async function getMe(req, res) {
  try {
    const { rows } = await pool.query(
      'SELECT id,name,email,role,created_at FROM users WHERE id=$1',
      [req.user.id]
    )
    res.json(rows[0])
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}