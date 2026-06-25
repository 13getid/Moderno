import { useNavigate } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { categories } from '../data/categories'

// picks the right lucide icon by name string
function getIcon(name) {
  const Icon = Icons[name]
  return Icon ? <Icon size={20} /> : null
}

export default function ShopByCategory() {
  const navigate = useNavigate()

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      {/* Section heading */}
      <h2 className="text-center text-xs tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 mb-10">
        Shop by Category
      </h2>

      {/* 5 category cards — Balanced layout for taller cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/shop?category=${cat.slug}`)}
            className="group cursor-pointer rounded-lg overflow-hidden border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300 bg-white dark:bg-ink-light"
          >
            {/* Increased height from h-36 to h-56 so your uploaded furniture contents are beautifully visible */}
            <div className="bg-stone-100 dark:bg-ink-light h-56 overflow-hidden flex items-center justify-center text-4xl relative">
              {cat.image ? (
                <img 
                  src={cat.image} 
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    // Fallback string if image fails
                    e.target.parentElement.innerHTML = `<span class="text-stone-400 text-sm font-medium">${cat.name}</span>`;
                  }}
                />
              ) : (
                <span className="text-stone-400 text-sm font-medium">{cat.name}</span>
              )}
              
              {/* Subtle elegant shadow overlay gradient to enrich the image contents */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Card footer details container */}
            <div className="bg-[#EDE8DF] dark:bg-ink-dark py-4 flex flex-col items-center gap-1.5 group-hover:bg-[#E4DDD2] dark:group-hover:bg-ink transition-colors duration-300">
              <span className="text-[#8B6C42] transform group-hover:scale-110 transition-transform duration-300">
                {getIcon(cat.icon)}
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-800 dark:text-stone-100">{cat.name}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
