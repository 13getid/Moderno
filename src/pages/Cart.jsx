import { useCart } from '../context/CartContext'
import { Trash2, Plus, Minus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatKES } from '../utils/currency'

export default function Cart() {
  const { cartItems, updateQty, removeFromCart, cartCount } = useCart()

  const USD_TO_KES = 128

  // 1. Calculate the raw subtotal in USD first
  const subtotalUSD = cartItems.reduce((sum, i) => sum + (Number(i.price) * Number(i.qty)), 0)
  
  // 2. Convert the subtotal to Kenyan Shillings for the threshold check
  const subtotalKES = Math.round(subtotalUSD * USD_TO_KES)

  const shippingThreshold = 100000; // Free shipping threshold is KSh 100,000
  const shippingFeeKES = 1000;        // Small nominal delivery fee of KSh 500

  // 3. Now the math aligns perfectly! (e.g. 799 * 128 = 102,272, which triggers FREE shipping)
  const shippingKES = subtotalKES >= shippingThreshold ? 0 : shippingFeeKES
  const totalKES    = subtotalKES + shippingKES

  if (cartCount === 0) {
    return (
      <div className="bg-[#F5F0E8] dark:bg-ink min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">Your cart is empty</h2>
        <p className="text-stone-500 dark:text-stone-400 text-sm mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="bg-stone-900 dark:bg-ink-dark text-white px-8 py-3 text-xs tracking-widest hover:bg-[#8B6C42] transition-colors">
          START SHOPPING
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-[#F5F0E8] dark:bg-ink min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">Your Cart</h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 mb-10">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Cart items list */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white dark:bg-ink-light rounded-lg p-5 flex items-center gap-5">
                <div className="w-20 h-20 bg-[#F0E8D8] dark:bg-ink-light rounded overflow-hidden flex items-center justify-center text-3xl shrink-0">
                  {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" /> : <span>{item.emoji}</span>}
                </div>

                <div className="flex-1">
                  <p className="text-xs text-stone-400 mb-0.5">{item.category}</p>
                  <p className="font-medium text-stone-900 dark:text-stone-100">{item.name}</p>
                  {/* Displays individual converted KSh item price */}
                  <p className="text-sm font-semibold text-stone-700 dark:text-stone-300 mt-1">{formatKES(item.price)}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 bg-stone-100 dark:bg-ink-light rounded flex items-center justify-center hover:bg-stone-200"><Minus size={12} /></button>
                  <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 bg-stone-100 dark:bg-ink-light rounded flex items-center justify-center hover:bg-stone-200"><Plus size={12} /></button>
                </div>

                {/* Multiplies the item's dollar value into KSh total format */}
                <p className="w-24 text-right font-semibold text-stone-900 dark:text-stone-100 text-sm">
                  {formatKES(item.price * item.qty)}
                </p>

                <button onClick={() => removeFromCart(item.id)} className="text-stone-300 hover:text-red-400 transition-colors ml-2"><Trash2 size={16} /></button>
              </div>
            ))}
          </div>

          {/* Order Summary Column */}
          <div className="bg-white dark:bg-ink-light rounded-lg p-6 h-fit">
            <h2 className="font-semibold text-stone-900 dark:text-stone-100 mb-6">Order Summary</h2>
            <div className="space-y-3 text-sm text-stone-600 dark:text-stone-300 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                {/* Fixed: We format the pre-converted KSh subtotal directly without doubling it */}
                <span>{`KSh ${subtotalKES.toLocaleString('en-KE')}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className={shippingKES === 0 ? 'text-green-600 font-medium' : ''}>
                  {shippingKES === 0 ? 'FREE' : `KSh ${shippingFeeKES}`}
                </span>
              </div>
              <div className="border-t border-stone-100 dark:border-stone-700 pt-3 flex justify-between font-semibold text-stone-900 dark:text-stone-100">
                <span>Total</span>
                <span>{`KSh ${totalKES.toLocaleString('en-KE')}`}</span>
              </div>
            </div>
            
            {/* Dynamic free shipping message calculated safely */}
            {shippingKES > 0 && (
              <p className="text-xs text-[#8B6C42] mb-4 bg-stone-50 dark:bg-ink-light p-2.5 rounded border border-stone-100 dark:border-stone-700">
                Add <span className="font-semibold">{`KSh ${(shippingThreshold - subtotalKES).toLocaleString('en-KE')}`}</span> more for free shipping!
              </p>
            )}
            
            <button className="w-full bg-stone-900 dark:bg-ink-dark text-white py-3 text-xs tracking-widest hover:bg-[#8B6C42] transition-colors">
              PROCEED TO CHECKOUT
            </button>
            <Link to="/shop" className="block text-center text-xs text-stone-400 mt-4 hover:text-stone-600">
              ← Continue Shopping
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
