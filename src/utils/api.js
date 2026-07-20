// Use VITE_API_URL in production (Vercel → Render)
// Falls back to /api locally (Vite proxy → Express)
const BASE = import.meta.env.VITE_API_URL || '/api'

function getHeaders() {
  const token = localStorage.getItem('moderno_token')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

async function request(path, options = {}) {
  const res  = await fetch(`${BASE}${path}`, { headers: getHeaders(), ...options })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

// ── Auth ──────────────────────────────────────────────
export const apiRegister = (name, email, password) =>
  request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  })

export const apiLogin = (email, password) =>
  request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

export const apiGetMe = () => request('/auth/me')

// ── Products ──────────────────────────────────────────
export const apiGetProducts = (params = {}) => {
  const qs = new URLSearchParams(params).toString()
  return request(`/products${qs ? '?' + qs : ''}`)
}

export const apiGetProduct = (id) => request(`/products/${id}`)

// ── Orders ────────────────────────────────────────────
export const apiPlaceOrder = (items, address) =>
  request('/orders', {
    method: 'POST',
    body: JSON.stringify({ items, address }),
  })

export const apiGetMyOrders  = () => request('/orders/my')
export const apiGetAllOrders = () => request('/orders')

export const apiUpdateOrderStatus = (id, status) =>
  request(`/orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  })

// ── Admin ─────────────────────────────────────────────
export const apiGetAdminStats = () => request('/admin/stats')

// ── Contact ───────────────────────────────────────────
export const apiSendContact = (name, email, subject, message) =>
  request('/contact', {
    method: 'POST',
    body: JSON.stringify({ name, email, subject, message }),
  })