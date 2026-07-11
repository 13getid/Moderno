import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X, Loader2 } from 'lucide-react'
import { categoryList, priceRanges } from '../data/products'
import { apiGetProducts } from '../utils/api'
import ProductCard from '../components/ProductCard'

const sortOptions = [
  { label: 'Featured',       value: 'featured'   },
  { label: 'Price: Low–High', value: 'price-asc'  },
  { label: 'Price: High–Low', value: 'price-desc' },
  { label: 'Name: A–Z',       value: 'name-asc'   },
]

export default function Shop() {
  const [products, setProducts]     = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState('')
  const [selectedCats, setSelectedCats] = useState([])
  const [selectedPrice, setSelectedPrice] = useState(null)
  const [sort, setSort]             = useState('featured')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchParams] = useSearchParams()
  const urlSearch = searchParams.get('search') || ''

  // Fetch products from the database when the page loads
  useEffect(() => {
    setLoading(true)
    apiGetProducts()
      .then((data) => setProducts(data))
      .catch(() => setError('Could not load products. Is the server running?'))
      .finally(() => setLoading(false))
  }, [])

  function toggleCat(cat) {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  // Filter + sort happens on the fetched products — same logic as before
  const filtered = useMemo(() => {
    let result = [...products]

    if (urlSearch) {
      const q = urlSearch.toLowerCase()
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
    }
    if (selectedCats.length > 0) {
      result = result.filter((p) => selectedCats.includes(p.category))
    }
    if (selectedPrice !== null) {
      const range = priceRanges[selectedPrice]
      result = result.filter((p) => p.price >= range.min && p.price < range.max)
    }
    if (sort === 'price-asc')  result.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
    if (sort === 'name-asc')   result.sort((a, b) => a.name.localeCompare(b.name))
    return result
  }, [products, selectedCats, selectedPrice, sort, urlSearch])

  // Loading spinner
  if (loading) return (
    <div className="min-h-screen bg-[#F5F0E8] dark:bg-ink flex items-center justify-center">
      <Loader2 size={32} className="animate-spin text-[#8B6C42]" />
    </div>
  )

  // Error state
  if (error) return (
    <div className="min-h-screen bg-[#F5F0E8] dark:bg-ink flex items-center justify-center">
      <p className="text-red-500 text-sm">{error}</p>
    </div>
  )

  return (
    <div className="bg-[#F5F0E8] dark:bg-ink min-h-screen">

      {/* Page header */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            {urlSearch ? `Results for "${urlSearch}"` : 'All Products'}
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
            {urlSearch && (
              <a href="/shop" className="ml-3 text-[#8B6C42] hover:underline text-xs">
                Clear search ×
              </a>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-sm border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-2 rounded text-stone-700 dark:text-stone-300 cursor-pointer"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden flex items-center gap-2 text-sm border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-2 rounded"
          >
            <SlidersHorizontal size={14} /> Filters
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16 flex gap-8">

        {/* Sidebar */}
        <aside className={`shrink-0 w-56 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
          <div className="mb-8">
            <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-stone-800 dark:text-stone-100 mb-4">
              Category
            </h3>
            {categoryList.map((cat) => (
              <label key={cat} className="flex items-center gap-3 mb-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedCats.includes(cat)}
                  onChange={() => toggleCat(cat)}
                  className="accent-[#8B6C42] w-4 h-4 cursor-pointer"
                />
                <span className="text-sm text-stone-600 dark:text-stone-300 group-hover:text-stone-900 dark:group-hover:text-stone-100">
                  {cat}
                </span>
              </label>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-stone-800 dark:text-stone-100 mb-4">
              Price Range
            </h3>
            {priceRanges.map((range, i) => (
              <label key={range.label} className="flex items-center gap-3 mb-3 cursor-pointer group">
                <input
                  type="radio"
                  name="price"
                  checked={selectedPrice === i}
                  onChange={() => setSelectedPrice(i)}
                  className="accent-[#8B6C42] w-4 h-4 cursor-pointer"
                />
                <span className="text-sm text-stone-600 dark:text-stone-300 group-hover:text-stone-900 dark:group-hover:text-stone-100">
                  {range.label}
                </span>
              </label>
            ))}
          </div>

          {(selectedCats.length > 0 || selectedPrice !== null) && (
            <button
              onClick={() => { setSelectedCats([]); setSelectedPrice(null) }}
              className="flex items-center gap-2 text-xs text-[#8B6C42] hover:underline"
            >
              <X size={12} /> Clear all filters
            </button>
          )}
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-stone-400">
              <p className="text-lg mb-2">
                {urlSearch ? `No results for "${urlSearch}"` : 'No products found'}
              </p>
              <p className="text-sm">
                {urlSearch ? 'Try a different search term' : 'Try adjusting your filters'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}