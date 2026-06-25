import { Link, useNavigate } from 'react-router-dom'
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

const navLinks = [
  { label: 'Home',     path: '/' },
  { label: 'Shop',     path: '/shop' },
  { label: 'About Us', path: '/about' },
  { label: 'Blog',     path: '/blog' },
  { label: 'Contact',  path: '/contact' },
]

export default function Navbar() {
  const { cartCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <nav className="bg-[#F5F0E8] sticky top-0 z-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-base font-bold tracking-[0.18em] text-stone-900">
          MODERNO
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="text-sm text-stone-600 hover:text-[#8B6C42] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 text-stone-700">
          <Search size={20} className="cursor-pointer hover:text-[#8B6C42] hidden md:block" />
          <User   size={20} className="cursor-pointer hover:text-[#8B6C42] hidden md:block" />

          {/* Cart icon with live count badge */}
          <div
            className="relative cursor-pointer"
            onClick={() => navigate('/cart')}
          >
            <ShoppingCart size={20} className="hover:text-[#8B6C42]" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#8B6C42] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* Mobile menu — slides open when hamburger clicked */}
      {menuOpen && (
        <div className="md:hidden bg-[#F5F0E8] border-t border-stone-200 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="text-sm text-stone-700"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}