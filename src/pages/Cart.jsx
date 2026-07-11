import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, CheckCircle, Loader2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { apiPlaceOrder } from '../utils/api'
import { formatKES } from '../utils/currency'

// Shipping tier logic — same as backend
function calcShipping(subtotal) {
  if (subtotal >= 100000) return 0
  if (subtotal >= 50000)  return 300
  return 800
}

export default function Cart() {
  const { cartItems, updateQty, removeFromCart, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [address, setAddress]     = useState('')
  const [placing, setPlacing]     = useState(false)
  const [error, setError]         = useState('')
  const [orderDone, setOrderDone] = useState(false)
  const [orderId, setOrderId]     = useState(null)

  const subtotal    = cartItems.reduce((s, i) => s + i.price * i.qty, 0)
  const shippingFee = calcShipping(subtotal)
  const total       = subtotal + shippingFee
  const freeAt      = 100000
  const progress    = Math.min((subtotal / freeAt) * 100, 100)

  // ── Place Order ──────────────────────────────────────
  async function handlePlaceOrder() {
    if (!address.trim()) {
      return setError('Please enter your delivery address')
    }
    setError('')
    setPlacing(true)
    try {
      // Send cart items (id, name, price, qty, image) + address to Express
      const items = cartItems.map((i) => ({
        id:    i.id,
        name:  i.name,
        price: i.price,
        qty:   i.qty,
        image: i.image,
      }))
      const data = await apiPlaceOrder(items, address)
      setOrderId(data.order.id)
      clearCart()       // empty the cart
      setOrderDone(true) // show success screen
    } catch (err) {
      setError(err.message || 'Could not place order. Please try again.')
    } finally {
      setPlacing(false)
    }
  }

  // ── Order success screen ─────────────────────────────
  if (orderDone) return (
    <div className="min-h-screen bg-[#F5F0E8] dark:bg-stone-950 flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <CheckCircle size={64} className="text-[#8B6C42] mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
          Order Placed!
        </h1>
        <p className="text-stone-500 dark:text-stone-400 mb-1">
          Thank you for shopping with Moderno.
        </p>
        <p className="text-stone-400 dark:text-stone-500 text-sm mb-8">
          Order #{orderId} · We'll be in touch soon.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate('/my-orders')}
            className="px-6 py-2.5 bg-[#8B6C42] hover:bg-[#7A5C35] text-white text-sm rounded-lg transition"
          >
            View My Orders
          </button>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-2.5 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-sm rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition"
          >
            Keep Shopping
          </button>
        </div>
      </div>
    </div>
  )

  // ── Empty cart ───────────────────────────────────────
  if (cartItems.length === 0) return (
    <div className="min-h-screen bg-[#F5F0E8] dark:bg-stone-950 flex flex-col items-center justify-center gap-4 text-stone-400">
      <ShoppingBag size={48} strokeWidth={1} />
      <p className="text-lg">Your cart is empty</p>
      <Link
        to="/shop"
        className="px-6 py-2.5 bg-[#8B6C42] text-white text-sm rounded-lg hover:bg-[#7A5C35] transition"
      >
        Browse Products
      </Link>
    </div>
  )

  // ── Main cart view ───────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F5F0E8] dark:bg-stone-950">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-8">
          Your Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Left: cart items ── */}
          <div className="flex-1 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-white dark:bg-stone-900 rounded-xl p-4 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg bg-stone-100"
                  onError={(e) => { e.target.src = '/images/placeholder.jpg' }}
                />
                <div className="flex-1">
                  <p className="font-medium text-stone-900 dark:text-stone-100 text-sm">{item.name}</p>
                  <p className="text-[#8B6C42] text-sm font-semibold mt-0.5">{formatKES(item.price)}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-7 h-7 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm w-6 text-center text-stone-800 dark:text-stone-200">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-7 h-7 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto text-stone-300 hover:text-red-400 transition"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
                <p className="text-sm font-semibold text-stone-700 dark:text-stone-300 self-start">
                  {formatKES(item.price * item.qty)}
                </p>
              </div>
            ))}
          </div>

          {/* ── Right: order summary + checkout ── */}
          <div className="lg:w-80 space-y-4">

            {/* Shipping progress bar */}
            <div className="bg-white dark:bg-stone-900 rounded-xl p-4 shadow-sm">
              {shippingFee === 0 ? (
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                  🎉 You qualify for FREE shipping!
                </p>
              ) : (
                <>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mb-2">
                    Add {formatKES(freeAt - subtotal)} more for free shipping
                  </p>
                  <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#8B6C42] rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Order totals */}
            <div className="bg-white dark:bg-stone-900 rounded-xl p-4 shadow-sm space-y-3">
              <div className="flex justify-between text-sm text-stone-600 dark:text-stone-400">
                <span>Subtotal</span>
                <span>{formatKES(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-stone-600 dark:text-stone-400">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? 'FREE' : formatKES(shippingFee)}</span>
              </div>
              <div className="border-t border-stone-100 dark:border-stone-800 pt-3 flex justify-between font-semibold text-stone-900 dark:text-stone-100">
                <span>Total</span>
                <span>{formatKES(total)}</span>
              </div>
            </div>

            {/* Delivery address */}
            <div className="bg-white dark:bg-stone-900 rounded-xl p-4 shadow-sm">
              <label className="block text-xs font-medium tracking-widest uppercase text-stone-500 dark:text-stone-400 mb-2">
                Delivery Address
              </label>
              <textarea
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. 14 Mombasa Road, Nairobi"
                className="w-full text-sm px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#8B6C42]/40 focus:border-[#8B6C42] resize-none transition"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-500 px-1">{error}</p>
            )}

            {/* Place order button */}
            <button
              onClick={handlePlaceOrder}
              disabled={placing}
              className="w-full py-3 bg-[#8B6C42] hover:bg-[#7A5C35] disabled:opacity-60 text-white font-medium text-sm tracking-widest uppercase rounded-xl transition flex items-center justify-center gap-2"
            >
              {placing && <Loader2 size={16} className="animate-spin" />}
              {placing ? 'Placing Order...' : 'Place Order'}
            </button>

            <Link
              to="/shop"
              className="block text-center text-sm text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition"
            >
              ← Continue Shopping
            </Link>

          </div>
        </div>
      </div>
    </div>
  )
}