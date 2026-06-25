import { useState } from 'react'
import { blogPosts } from '../data/blogPosts'
import { ArrowRight } from 'lucide-react'

// All unique categories from posts
const allCats = ["All", ...new Set(blogPosts.map((p) => p.category))]

export default function Blog() {
  const [activeCat, setActiveCat] = useState("All")

  const filtered = activeCat === "All"
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCat)

  return (
    <div className="bg-[#F5F0E8] dark:bg-ink min-h-screen">

      {/* Header */}
      <section className="bg-[#EDE8DF] dark:bg-ink-light py-20 text-center px-6">
        <p className="text-xs tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 mb-3">The Moderno Journal</p>
        <h1 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">Ideas for Your Home</h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto">
          Design tips, style guides, and stories from the world of home decor.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Category filter pills */}
        <div className="flex gap-3 flex-wrap mb-12 justify-center">
          {allCats.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium border transition-colors ${
                activeCat === cat
                  ? 'bg-[#8B6C42] text-white border-[#8B6C42]'
                  : 'bg-white dark:bg-ink-light text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-[#8B6C42]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-ink-light rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
            >
              {/* Thumbnail Container — Now rendering your /public folder image */}
              <div className="h-48 overflow-hidden bg-[#F0E8D8] dark:bg-ink-light relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs bg-[#F0E8D8] dark:bg-ink-light text-[#8B6C42] px-2 py-1 rounded-full font-medium">
                    {post.category}
                  </span>
                  <span className="text-xs text-stone-400">{post.readTime}</span>
                </div>
                <h2 className="font-semibold text-stone-900 dark:text-stone-100 mb-2 leading-snug group-hover:text-[#8B6C42] transition-colors">
                  {post.title}
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-400">{post.date}</span>
                  <span className="flex items-center gap-1 text-xs text-[#8B6C42] font-medium">
                    Read <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
