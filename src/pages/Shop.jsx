import { useState, useMemo } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { allProducts, categoryList, priceRanges } from '../data/products'
import ProductCard from '../components/ProductCard'
import { useSearchParams } from 'react-router-dom'

// Sort options shown in the dropdown
const sortOptions = [
  { label: "Featured",      value: "featured" },
  { label: "Price: Low–High", value: "price-asc" },
  { label: "Price: High–Low", value: "price-desc" },
  { label: "Name: A–Z",       value: "name-asc" },
]

export default function Shop() {
  // Read active search terms out of the window URL parameters (?search=...)
  const [searchParams] = useSearchParams()
  const urlSearch = searchParams.get('search') || ''

  // Which categories are ticked — starts empty = show all
  const [selectedCats, setSelectedCats] = useState([])
  // Which price range is selected
  const [selectedPrice, setSelectedPrice] = useState(null)
  // Sort order
  const [sort, setSort] = useState("featured")
  // Mobile: show/hide sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Toggle a category on/off
  function toggleCat(cat) {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  // useMemo: recalculates when filters, sort criteria, or URL keyword changes
  const filtered = useMemo(() => {
    let result = [...allProducts]

    // 1. Filter by live URL Search Text (Matching against Name or Category keys)
    if (urlSearch) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(urlSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(urlSearch.toLowerCase())
      )
    }

    // 2. Filter by category checkboxes
    if (selectedCats.length > 0) {
      result = result.filter((p) => selectedCats.includes(p.category))
    }

    // 3. Filter by price range radio selections
    if (selectedPrice !== null) {
      const range = priceRanges[selectedPrice]
      result = result.filter((p) => p.price >= range.min && p.price < range.max)
    }

    // 4. Sort calculations
    if (sort === "price-asc")  result.sort((a, b) => a.price - b.price)
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price)
    if (sort === "name-asc")   result.sort((a, b) => a.name.localeCompare(b.name))

    return result
  }, [selectedCats, selectedPrice, sort, urlSearch]) // Added urlSearch dependency tracking

  return (
    <div className="bg-[#F5F0E8] dark:bg-ink min-h-screen">

      {/* Page header */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-4 flex items-center justify-between">
        <div>
          {/* Dynamic header title switching on active search queries */}
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            {urlSearch ? `Results for "${urlSearch}"` : 'All Products'}
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">{filtered.length} products</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Sort dropdown */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-sm border border-stone-200 dark:border-stone-700 bg-white dark:bg-ink-light px-3 py-2 rounded text-stone-700 dark:text-stone-300 cursor-pointer"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden flex items-center gap-2 text-sm border border-stone-200 dark:border-stone-700 bg-white dark:bg-ink-light px-3 py-2 rounded"
          >
            <SlidersHorizontal size={14} /> Filters
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16 flex gap-8">

        {/* ── Sidebar (desktop always visible, mobile toggles) ── */}
        <aside className={`
          shrink-0 w-56
          ${sidebarOpen ? 'block' : 'hidden'}
          md:block
        `}>

          {/* Category filter */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-stone-800 dark:text-stone-100 mb-4">
              Category
            </h3>
            {categoryList.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-3 mb-3 cursor-pointer group"
              >
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

          {/* Price filter */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-stone-800 dark:text-stone-100 mb-4">
              Price Range
            </h3>
            {priceRanges.map((range, i) => (
              <label
                key={range.label}
                className="flex items-center gap-3 mb-3 cursor-pointer group"
              >
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

          {/* Clear all filters */}
          {(selectedCats.length > 0 || selectedPrice !== null) && (
            <button
              onClick={() => { setSelectedCats([]); setSelectedPrice(null) }}
              className="flex items-center gap-2 text-xs text-[#8B6C42] hover:underline"
            >
              <X size={12} /> Clear all filters
            </button>
          )}
        </aside>

        {/* ── Product grid ── */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-stone-400">
              <p className="text-lg mb-2">No products found</p>
              <p className="text-sm">Try adjusting your filters</p>
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
