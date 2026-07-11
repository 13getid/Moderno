import pool from '../db.js'

// GET /api/admin/stats
// Returns: total orders, revenue, customers + recent 10 orders
export async function getStats(req, res) {
  try {
    // Run all queries at the same time for speed
    const [ordersRes, revenueRes, customersRes, recentRes] = await Promise.all([

      // Total number of orders
      pool.query('SELECT COUNT(*) FROM orders'),

      // Total revenue (sum of all order totals)
      pool.query('SELECT COALESCE(SUM(total), 0) AS revenue FROM orders'),

      // Total number of customers
      pool.query("SELECT COUNT(*) FROM users WHERE role = 'customer'"),

      // 10 most recent orders with customer name
      pool.query(`
        SELECT o.id, o.total, o.status, o.created_at,
               o.address, u.name AS customer_name, u.email,
               json_agg(oi.*) AS items
        FROM orders o
        JOIN users u ON u.id = o.user_id
        LEFT JOIN order_items oi ON oi.order_id = o.id
        GROUP BY o.id, u.name, u.email
        ORDER BY o.created_at DESC
        LIMIT 10
      `),
    ])

    res.json({
      totalOrders:   parseInt(ordersRes.rows[0].count),
      totalRevenue:  parseInt(revenueRes.rows[0].revenue),
      totalCustomers: parseInt(customersRes.rows[0].count),
      recentOrders:  recentRes.rows,
    })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

// PUT /api/admin/orders/:id/status (reuse from order controller)
// Already covered by order.routes.js — no need to duplicate