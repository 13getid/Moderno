import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, ShoppingBag, FileText, Layout } from 'lucide-react'
import { useSearch } from '../hooks/useSearch'
import { formatKES } from '../utils/currency'

export default function SearchOverlay({ onClose }) {
  const [query, setQuery]     = useState('')
  const inputRef              = useRef(null)
  const navigate              = useNavigate()
  const { products, posts, pages } = useSearch(query)
  const hasResults = products.length > 0 || posts.length > 0 || pages.length > 0
  const showEmpty  = query.trim().length >= 2 && !hasResults

  // Auto-focus input when overlay opens
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 80)
    return () => clearTimeout(t)
  }, [])

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Navigate to result and close overlay
  function goTo(path) {
    navigate(path)
    onClose()
  }

  // Full search → /shop with query in URL
  function handleSubmit(e) {
    e.preventDefault()
    if (query.trim()) {
      goTo(`/shop?search=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex flex-col items-center pt-[80px] px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Blurred dark backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Search panel */}
      <div className="relative w-full max-w-2xl bg-stone-900 border border-brown/30 rounded-2xl shadow-2xl overflow-hidden">

        {/* Input row */}
        <form onSubmit={handleSubmit} className="flex items-center gap-3 px-5 py-4 border-b border-stone-700">
          <Search size={18} className="text-brown shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, articles, pages..."
            className="flex-1 bg-transparent text-stone-100 placeholder-stone-500 text-sm outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-stone-500 hover:text-stone-300 transition-colors"
            >
              <X size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-stone-500 hover:text-stone-300 transition-colors ml-1"
          >
            <X size={20} />
          </button>
        </form>

        {/* Results layout */}
        <div className="max-h-[60vh] overflow-y-auto">

          {/* Empty state view */}
          {showEmpty && (
            <div className="py-12 text-center text-stone-500 text-sm">
              No results for <span className="text-brown">"{query}"</span>
            </div>
          )}

          {/* Default suggestions when nothing typed */}
          {query.trim().length < 2 && (
            <div className="px-5 py-4">
              <p className="text-xs text-stone-500 uppercase tracking-widest mb-3">
                Quick Links
              </p>
              {[
                { label: 'Browse All Products', path: '/shop' },
                { label: 'New Arrivals',        path: '/shop?sort=newest' },
                { label: 'Living Room',         path: '/shop?category=living-room' },
                { label: 'Blog & Guides',       path: '/blog' },
              ].map((s) => (
                <button
                  key={s.label}
                  onClick={() => goTo(s.path)}
                  className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm text-stone-400 hover:bg-white/5 hover:text-brown transition-colors"
                >
                  <Search size={13} /> {s.label}
                </button>
              ))}
            </div>
          )}

          {/* ── Product results list ── */}
          {products.length > 0 && (
            <div className="px-5 py-3">
              <p className="text-xs text-stone-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                <ShoppingBag size={11} /> Products
              </p>
              {products.map((p) => (
                <button
                  key={p.id}
                  onClick={() => goTo(`/shop?search=${encodeURIComponent(p.name)}`)}
                  className="flex items-center gap-3 w-full px-3 py-3 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  {/* Product thumbnail */}
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-800 shrink-0">
                    <img
                      src={p.image}
                      alt={p.name}
                      onError={(e) => { e.target.src = '/images/placeholder.jpg' }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm text-stone-200 group-hover:text-brown transition-colors">{p.name}</p>
                    <p className="text-xs text-stone-500">{p.category}</p>
                  </div>
                  <p className="text-sm text-brown font-medium">{formatKES(p.price)}</p>
                </button>
              ))}
            </div>
          )}

          {/* ── Blog results list ── */}
          {posts.length > 0 && (
            <div className="px-5 py-3 border-t border-stone-800">
              <p className="text-xs text-stone-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                <FileText size={11} /> Articles
              </p>
              {posts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => goTo(`/blog/${p.id}`)}
                  className="flex items-center gap-3 w-full px-3 py-3 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-800 shrink-0">
                    <img
                      src={p.image}
                      alt={p.title}
                      onError={(e) => { e.target.src = '/images/placeholder.jpg' }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm text-stone-200 group-hover:text-brown transition-colors leading-snug">{p.title}</p>
                    <p className="text-xs text-stone-500">{p.readTime}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* ── Page results list ── */}
          {pages.length > 0 && (
            <div className="px-5 py-3 border-t border-stone-800">
              <p className="text-xs text-stone-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Layout size={11} /> Pages
              </p>
              {pages.map((p) => (
                <button
                  key={p.path}
                  onClick={() => goTo(p.path)}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <Layout size={14} className="text-stone-500 shrink-0" />
                  <p className="text-sm text-stone-200 group-hover:text-brown transition-colors">{p.name}</p>
                </button>
              ))}
            </div>
          )}

          {/* View all results footer */}
          {hasResults && (
            <div className="px-5 py-3 border-t border-stone-800">
              <button
                onClick={handleSubmit}
                className="w-full py-2.5 text-xs text-brown hover:text-brown-light tracking-widest uppercase transition-colors"
              >
                View all results for "{query}"
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
