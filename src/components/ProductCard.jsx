import { ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatKES } from '../utils/currency'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="group cursor-pointer">

      {/* Image box */}
      <div className="bg-[#F0E8D8] dark:bg-ink-light aspect-square overflow-hidden mb-3 relative rounded-md">
        
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
          className="absolute bottom-0 left-0 right-0 bg-stone-900 dark:bg-ink-dark text-white text-xs py-2 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <ShoppingCart size={13} /> Add to Cart
        </button>
      </div>

      <p className="text-xs text-stone-500 dark:text-stone-400 mb-0.5">{product.category}</p>
      <p className="text-sm text-stone-800 dark:text-stone-100 font-medium">{product.name}</p>
      <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
        {formatKES(product.price)}
      </p>

    </div>
  )
}
