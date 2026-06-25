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
      <h2 className="text-center text-xs tracking-[0.2em] uppercase text-stone-500 mb-10">
        Shop by Category
      </h2>

      {/* 5 category cards in a row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/shop?category=${cat.slug}`)}
            className="group cursor-pointer rounded overflow-hidden border border-stone-200 hover:shadow-md transition-shadow"
          >
            {/* Image area — replace div with img when you have photos */}
            <div className="bg-sand h-36 flex items-center justify-center text-4xl group-hover:bg-stone-200 transition-colors">
              {cat.emoji}
            </div>

            {/* Card footer */}
            <div className="bg-cream py-3 flex flex-col items-center gap-1">
              <span className="text-brown">{getIcon(cat.icon)}</span>
              <p className="text-xs font-medium text-stone-700">{cat.name}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}