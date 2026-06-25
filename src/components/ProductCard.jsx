import { ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatKES } from '../utils/currency'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="group cursor-pointer transition-all duration-300 hover:-translate-y-1">

      {/* Image box */}
      <div className="bg-[#F0E8D8] aspect-square overflow-hidden mb-3 relative rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300">
        {product.badge && (
          <span className="absolute top-2 left-2 bg-stone-900 text-white text-[10px] px-2 py-1 rounded uppercase font-semibold z-10">
            {product.badge}
          </span>
        )}

        {/* Dynamic Media Renderer — Evaluates images first, falls back gracefully to emojis */}
        <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // If a path string exists but the file fails to load, gracefully fall back to its emoji icon
                e.target.style.display = 'none';
                e.target.parentElement.innerText = product.emoji || "📦";
              }}
            />
          ) : (
            <span className="text-5xl">{product.emoji || "📦"}</span>
          )}
        </div>

        {/* Add to cart button — appears on hover */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents card navigation triggers when clicking add-to-cart
            addToCart(product);
          }}
          className="absolute bottom-0 left-0 right-0 bg-stone-900 text-white text-xs py-2 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <ShoppingCart size={13} /> Add to Cart
        </button>
      </div>

      <p className="text-xs text-stone-500 mb-0.5">{product.category}</p>

      <p className="text-sm text-stone-800 font-medium">{product.name}</p>

      {product.rating && (
        <p className="text-xs text-amber-500 mt-1">
          ★★★★★ <span className="text-stone-600">({product.rating})</span>
        </p>
      )}

      <p className="text-sm font-semibold text-stone-900 mt-1">
        {formatKES(product.price)}
      </p>

    </div>
  )
}
