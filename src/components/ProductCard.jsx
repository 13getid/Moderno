import { ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatKES } from '../utils/currency'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="group cursor-pointer">

      {/* Image box */}
      <div className="bg-[#F0E8D8] aspect-square overflow-hidden mb-3 relative">
        {/* emoji placeholder — swap with real img later */}
        <div className="w-full h-full flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-300">
          {product.emoji}
        </div>

        {/* Add to cart button — appears on hover */}
        <button
          onClick={() => addToCart(product)}
          className="absolute bottom-0 left-0 right-0 bg-stone-900 text-white text-xs py-2 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ShoppingCart size={13} /> Add to Cart
        </button>
      </div>

      <p className="text-xs text-stone-500 mb-0.5">{product.category}</p>
      <p className="text-sm text-stone-800 font-medium">{product.name}</p>
      <p className="text-sm font-semibold text-stone-900 mt-0.5">
        {formatKES(product.price)}
      </p>

    </div>
  )
}
