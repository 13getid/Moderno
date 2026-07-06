import pool from '../db.js'

function calcShipping(subtotal) {
  if (subtotal >= 100000) return 0
  if (subtotal >= 50000)  return 300
  return 800
}

// POST /api/orders
export async function createOrder(req, res) {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const { items, address } = req.body

    const subtotal    = items.reduce((s, i) => s + i.price * i.qty, 0)
    const shippingFee = calcShipping(subtotal)
    const total       = subtotal + shippingFee

    const { rows } = await client.query(
      `INSERT INTO orders (user_id,total,shipping_fee,address)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [req.user.id, total, shippingFee, address]
    )
    const order = rows[0]

    for (const i of items) {
      await client.query(
        `INSERT INTO order_items
         (order_id,product_id,name,price,qty,image)
         VALUES ($1,$2,$3,$4,$5,$6)`,
        [order.id, i.id, i.name, i.price, i.qty, i.image]
      )
    }
    await client.query('COMMIT')
    res.status(201).json({ order, message: 'Order placed!' })
  } catch (e) {
    await client.query('ROLLBACK')
    res.status(500).json({ error: e.message })
  } finally {
    client.release()
  }
}

// GET /api/orders/my
export async function getMyOrders(req, res) {
  try {
    const { rows } = await pool.query(
      `SELECT o.*, json_agg(oi.*) AS items
       FROM orders o
       LEFT JOIN order_items oi ON oi.order_id = o.id
       WHERE o.user_id=$1
       GROUP BY o.id
       ORDER BY o.created_at DESC`,
      [req.user.id]
    )
    res.json(rows)
  } catch (e) { res.status(500).json({ error: e.message }) }
}

// GET /api/orders  (admin)
export async function getAllOrders(req, res) {
  try {
    const { rows } = await pool.query(
      `SELECT o.*, u.name AS customer_name, u.email,
              json_agg(oi.*) AS items
       FROM orders o
       JOIN users u ON u.id = o.user_id
       LEFT JOIN order_items oi ON oi.order_id = o.id
       GROUP BY o.id, u.name, u.email
       ORDER BY o.created_at DESC`
    )
    res.json(rows)
  } catch (e) { res.status(500).json({ error: e.message }) }
}

// PUT /api/orders/:id/status  (admin)
export async function updateStatus(req, res) {
  try {
    const { rows } = await pool.query(
      'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *',
      [req.body.status, req.params.id]
    )
    res.json(rows[0])
  } catch (e) { res.status(500).json({ error: e.message }) }
}