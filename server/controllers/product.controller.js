import pool from '../db.js'

// GET /api/products
export async function getProducts(req, res) {
  try {
    const { category, search, sort } = req.query
    let q = 'SELECT * FROM products WHERE 1=1'
    const p = []

    if (category) { p.push(category); q += ` AND category=$${p.length}` }
    if (search)   { p.push(`%${search}%`); q += ` AND name ILIKE $${p.length}` }

    const sortMap = {
      'price-asc':  'ORDER BY price ASC',
      'price-desc': 'ORDER BY price DESC',
      'name-asc':   'ORDER BY name ASC',
    }
    q += ` ${sortMap[sort] || 'ORDER BY created_at DESC'}`

    const { rows } = await pool.query(q, p)
    res.json(rows)
  } catch (e) { res.status(500).json({ error: e.message }) }
}

// GET /api/products/:id
export async function getProduct(req, res) {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM products WHERE id=$1', [req.params.id]
    )
    if (!rows[0]) return res.status(404).json({ error: 'Not found' })
    res.json(rows[0])
  } catch (e) { res.status(500).json({ error: e.message }) }
}

// POST /api/products  (admin)
export async function createProduct(req, res) {
  try {
    const { name, price, category, image, description, stock } = req.body
    const { rows } = await pool.query(
      `INSERT INTO products (name,price,category,image,description,stock)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [name, price, category, image, description, stock ?? 0]
    )
    res.status(201).json(rows[0])
  } catch (e) { res.status(500).json({ error: e.message }) }
}

// PUT /api/products/:id  (admin)
export async function updateProduct(req, res) {
  try {
    const { name, price, category, image, description, stock } = req.body
    const { rows } = await pool.query(
      `UPDATE products SET name=$1,price=$2,category=$3,
       image=$4,description=$5,stock=$6 WHERE id=$7 RETURNING *`,
      [name, price, category, image, description, stock, req.params.id]
    )
    if (!rows[0]) return res.status(404).json({ error: 'Not found' })
    res.json(rows[0])
  } catch (e) { res.status(500).json({ error: e.message }) }
}

// DELETE /api/products/:id  (admin)
export async function deleteProduct(req, res) {
  try {
    await pool.query('DELETE FROM products WHERE id=$1', [req.params.id])
    res.json({ message: 'Deleted' })
  } catch (e) { res.status(500).json({ error: e.message }) }
}