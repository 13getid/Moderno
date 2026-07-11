import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Home, ShoppingBag, Info, Newspaper, Mail, Search, ShoppingCart, X, Sun, Moon, User, LogOut } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import SearchOverlay from './SearchOverlay'
import { Package } from 'lucide-react'

const navLinks = [
  { label: 'Home',     path: '/',        icon: Home },
  { label: 'Shop',     path: '/shop',    icon: ShoppingBag },
  { label: 'About Us', path: '/about',   icon: Info },
  { label: 'Blog',     path: '/blog',    icon: Newspaper },
  { label: 'Contact',  path: '/contact', icon: Mail },
]

export default function Navbar() {
  const { user, logoutUser }   = useAuth()
  const { cartCount }          = useCart()
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen]     = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const navigate = useNavigate()
  const isDark = theme === 'dark'

  // Close drawer on Escape + lock body scroll while open
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      {/* ─── FLOATING VIEWPORT LAYER (Click-Through) ─── */}
      <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-5 pointer-events-none">

        {/* ─── THE CAPSULE (Interactive) ─── */}
        <div className="pointer-events-auto relative flex items-center w-full max-w-[900px] h-14 pr-1.5 bg-stone-900 border border-brown/35 rounded-full overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(139,108,66,0.25),inset_0_-1px_0_rgba(0,0,0,0.4)]">

          {/* Logo cap */}
          <Link
            to="/"
            className="relative flex items-center gap-2.5 shrink-0 h-full pl-5 pr-5 rounded-l-full no-underline bg-[linear-gradient(135deg,#2a2215_0%,#1c1917_60%)]"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-full border-[1.5px] border-brown shrink-0">
              <span className="font-['Cormorant_Garamond',serif] text-brown text-base font-semibold leading-none">M</span>
            </span>
            <span className="hidden sm:inline font-['Cormorant_Garamond',serif] text-[15px] font-semibold tracking-[0.18em] text-white uppercase whitespace-nowrap">
              Moder<span className="text-brown">no</span>
            </span>
            {/* gradient seam */}
            <span aria-hidden="true" className="absolute right-0 top-[10%] h-[80%] w-px bg-gradient-to-b from-transparent via-brown to-transparent" />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex flex-1 items-center justify-center px-1">
            {navLinks.map(({ label, path, icon: Icon }) => (
              <NavLink
                key={label}
                to={path}
                end={path === '/'}
                className="group relative flex flex-col items-center gap-0.5 px-3.5 py-1.5 rounded-full no-underline"
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={15}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className={`transition-colors ${isActive ? 'text-brown-light' : 'text-stone-400 group-hover:text-brown-light'}`}
                    />
                    <span className={`text-[9px] font-medium tracking-[0.12em] uppercase whitespace-nowrap transition-colors ${isActive ? 'text-brown-light' : 'text-stone-400 group-hover:text-brown-light'}`}>
                      {label}
                    </span>
                    {isActive && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-brown" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-6 mx-1 shrink-0 bg-brown/35" />

          {/* Right actions */}
          <div className="flex items-center gap-0.5 shrink-0 ml-auto md:ml-0 pr-1">

            {/* Search */}
            <button
              type="button"
              title="Search"
              aria-label="Search"
              onClick={() => setShowSearch(true)}
              className="flex items-center justify-center w-[38px] h-[38px] rounded-full text-stone-200 hover:bg-white/[0.07] transition-colors"
            >
              <Search size={17} strokeWidth={1.5} aria-hidden="true" />
            </button>

            {/* Account */}
            {user ? (
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-stone-300 tracking-wide hidden lg:block">
                  Hi, {user.name.split(' ')[0]}
                </span>
                <button
                  type="button"
                  title="Sign out"
                  aria-label="Sign out"
                  onClick={() => { logoutUser(); navigate('/') }}
                  className="flex items-center justify-center w-[38px] h-[38px] rounded-full text-stone-200 hover:bg-white/[0.07] transition-colors"
                >
                  <LogOut size={17} strokeWidth={1.5} aria-hidden="true" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                title="Sign in"
                aria-label="Sign in"
                onClick={() => navigate('/login')}
                className="flex items-center justify-center w-[38px] h-[38px] rounded-full text-stone-200 hover:bg-white/[0.07] transition-colors"
              >
                <User size={17} strokeWidth={1.5} aria-hidden="true" />
              </button>
            )}

            {/* Dark / Light mode */}
            <button
              type="button"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={toggleTheme}
              className="flex items-center justify-center w-[38px] h-[38px] rounded-full text-stone-200 hover:bg-white/[0.07] transition-colors"
            >
              {isDark
                ? <Sun  size={17} strokeWidth={1.5} aria-hidden="true" />
                : <Moon size={17} strokeWidth={1.5} aria-hidden="true" />}
            </button>

            {/* Cart */}
            <button
              type="button"
              title="Cart"
              aria-label={`Cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
              onClick={() => navigate('/cart')}
              className="relative flex items-center justify-center w-[38px] h-[38px] rounded-full text-stone-200 hover:bg-white/[0.07] transition-colors"
            >
              <ShoppingCart size={17} strokeWidth={1.5} aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex items-center justify-center w-3.5 h-3.5 rounded-full bg-brown text-white text-[8px] font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="md:hidden flex flex-col items-center justify-center gap-1 w-[38px] h-[38px] rounded-full hover:bg-white/[0.07] transition-colors"
            >
              <span className="block w-[18px] h-px bg-stone-200 rounded" />
              <span className="block w-[18px] h-px bg-stone-200 rounded" />
              <span className="block w-[18px] h-px bg-stone-200 rounded" />
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer menu overlay content goes below here... */}
  
      {user && (
        <button
          type="button"
          onClick={() => { setMenuOpen(false); navigate('/my-orders') }}
          className="flex items-center gap-3.5 px-3 py-3 rounded-xl text-stone-400 hover:bg-brown/10 hover:text-brown-light transition-colors"
        >
          <Package size={18} strokeWidth={1.5} />
          <span className="text-[13px] tracking-[0.1em] uppercase">My Orders</span>
        </button>
      )}

  
      {/* SearchOverlay component container goes here... */}
      {showSearch && <SearchOverlay onClose={() => setShowSearch(false)} />}
    </>
  )
}
