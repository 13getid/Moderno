import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Package, Loader2 } from 'lucide-react'
import { apiGetMyOrders } from '../utils/api'
import { formatKES } from '../utils/currency'

// Status badge colours
const statusStyle = {
  processing: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  shipped:    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  delivered:  'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  cancelled:  'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
}

export default function MyOrders() {
  const [orders, setOrders]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  useEffect(() => {
    apiGetMyOrders()
      .then(setOrders)
      .catch(() => setError('Could not load orders.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-[#F5F0E8] dark:bg-stone-950 flex items-center justify-center">
      <Loader2 size={32} className="animate-spin text-[#8B6C42]" />
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-[#F5F0E8] dark:bg-stone-950 flex items-center justify-center">
      <p className="text-red-500 text-sm">{error}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F5F0E8] dark:bg-stone-950">
      <div className="max-w-3xl mx-auto px-6 py-10">

        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-8">
          My Orders
        </h1>

        {/* No orders yet */}
        {orders.length === 0 ? (
          <div className="text-center py-24 text-stone-400">
            <Package size={48} strokeWidth={1} className="mx-auto mb-4" />
            <p className="text-lg mb-4">No orders yet</p>
            <Link
              to="/shop"
              className="px-6 py-2.5 bg-[#8B6C42] text-white text-sm rounded-lg hover:bg-[#7A5C35] transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-stone-900 rounded-xl shadow-sm overflow-hidden"
              >
                {/* Order header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 dark:border-stone-800">
                  <div>
                    <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                      Order #{order.id}
                    </p>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {new Date(order.created_at).toLocaleDateString('en-KE', {
                        day: 'numeric', month: 'long', year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${statusStyle[order.status] || statusStyle.processing}`}>
                      {order.status}
                    </span>
                    <p className="text-sm font-bold text-stone-900 dark:text-stone-100">
                      {formatKES(order.total)}
                    </p>
                  </div>
                </div>

                {/* Order items */}
                <div className="px-5 py-3 space-y-2">
                  {(order.items || []).filter(Boolean).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover bg-stone-100"
                        onError={(e) => { e.target.src = '/images/placeholder.jpg' }}
                      />
                      <div className="flex-1">
                        <p className="text-sm text-stone-700 dark:text-stone-300">{item.name}</p>
                        <p className="text-xs text-stone-400">Qty: {item.qty}</p>
                      </div>
                      <p className="text-sm text-stone-700 dark:text-stone-300">
                        {formatKES(item.price * item.qty)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Delivery address */}
                {order.address && (
                  <div className="px-5 py-3 border-t border-stone-100 dark:border-stone-800">
                    <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">Delivery to</p>
                    <p className="text-sm text-stone-600 dark:text-stone-400">{order.address}</p>
                  </div>
                )}

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}