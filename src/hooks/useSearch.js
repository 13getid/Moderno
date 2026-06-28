import { useMemo } from 'react'
import { allProducts } from '../data/products'
import { blogPosts }  from '../data/blogPosts'

// Static pages that also appear in search results
const pages = [
  { type: 'page', name: 'About Us',  path: '/about' },
  { type: 'page', name: 'Contact',   path: '/contact' },
  { type: 'page', name: 'Blog',      path: '/blog' },
  { type: 'page', name: 'Dashboard', path: '/dashboard' },
]

export function useSearch(query) {
  return useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 2) return { products: [], posts: [], pages: [] }

    const matchedProducts = allProducts
      .filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
      .slice(0, 5)  // max 5 product results

    const matchedPosts = blogPosts
      .filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q)
      )
      .slice(0, 3)  // max 3 blog results

    const matchedPages = pages
      .filter((p) => p.name.toLowerCase().includes(q))

    return { products: matchedProducts, posts: matchedPosts, pages: matchedPages }
  }, [query])
}