import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Home, ShoppingBag, Info, Newspaper, Mail, Search, ShoppingCart, X, Sun, Moon, User, LogOut } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import SearchOverlay from './SearchOverlay'

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
      {/* ─── NAVBAR WRAPPER ─── */}
      <nav className="sticky top-0 z-50 flex justify-center px-5 py-3.5 bg-[rgba(245,240,232,0.85)] dark:bg-[rgba(20,18,16,0.85)] backdrop-blur-md border-b border-brown/10 dark:border-brown/20">

        {/* ─── THE CAPSULE ─── */}
        <div className="relative flex items-center w-full max-w-[900px] h-14 pr-1.5 bg-stone-900 border border-brown/35 rounded-full overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(139,108,66,0.25),inset_0_-1px_0_rgba(0,0,0,0.4)]">

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

            {/* Account — shows name + logout when logged in, sign-in icon when not */}
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
      </nav>

      {/* ─── MOBILE DRAWER ─── */}
      <div className={`md:hidden fixed inset-0 z-[60] ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        {/* Overlay */}
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/55 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
        />
        {/* Panel */}
        <div className={`absolute right-0 top-0 bottom-0 w-[260px] bg-stone-900 border-l border-brown/35 px-5 py-7 flex flex-col gap-1 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>

          {/* Close */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="self-end mb-5 text-stone-400 hover:text-brown-light transition-colors"
          >
            <X size={18} />
          </button>

          {/* Search */}
          <button
            type="button"
            onClick={() => { setMenuOpen(false); setShowSearch(true) }}
            className="flex items-center gap-3.5 px-3 py-3 rounded-xl text-stone-400 hover:bg-brown/10 hover:text-brown-light transition-colors"
          >
            <Search size={18} strokeWidth={1.5} />
            <span className="text-[13px] tracking-[0.1em] uppercase">Search</span>
          </button>

          {/* Nav links */}
          {navLinks.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={label}
              to={path}
              end={path === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-3 py-3 rounded-xl transition-colors no-underline ${
                  isActive ? 'bg-brown text-white' : 'text-stone-400 hover:bg-white/[0.04] hover:text-stone-200'
                }`
              }
            >
              <Icon size={18} strokeWidth={1.5} />
              <span className="text-[13px] tracking-[0.1em] uppercase font-medium">{label}</span>
            </NavLink>
          ))}

          <div className="h-px my-2 bg-brown/25" />

          {/* Account — dynamic based on login state */}
          {user ? (
            <button
              type="button"
              onClick={() => { logoutUser(); setMenuOpen(false); navigate('/') }}
              className="flex items-center gap-3.5 px-3 py-3 rounded-xl text-stone-400 hover:bg-brown/10 hover:text-brown-light transition-colors"
            >
              <LogOut size={18} strokeWidth={1.5} />
              <span className="text-[13px] tracking-[0.1em] uppercase">
                Sign Out ({user.name.split(' ')[0]})
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => { setMenuOpen(false); navigate('/login') }}
              className="flex items-center gap-3.5 px-3 py-3 rounded-xl text-stone-400 hover:bg-brown/10 hover:text-brown-light transition-colors"
            >
              <User size={18} strokeWidth={1.5} />
              <span className="text-[13px] tracking-[0.1em] uppercase">Sign In</span>
            </button>
          )}

          {/* Dark / Light mode */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-3.5 px-3 py-3 rounded-xl text-stone-400 hover:bg-brown/10 hover:text-brown-light transition-colors"
          >
            {isDark
              ? <Sun  size={18} strokeWidth={1.5} />
              : <Moon size={18} strokeWidth={1.5} />}
            <span className="text-[13px] tracking-[0.1em] uppercase">
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>

          {/* Cart */}
          <button
            type="button"
            onClick={() => { setMenuOpen(false); navigate('/cart') }}
            className="flex items-center gap-3.5 px-3 py-3 rounded-xl text-stone-400 hover:bg-brown/10 hover:text-brown-light transition-colors"
          >
            <ShoppingCart size={18} strokeWidth={1.5} />
            <span className="text-[13px] tracking-[0.1em] uppercase">
              Cart{cartCount > 0 ? ` (${cartCount})` : ''}
            </span>
          </button>

        </div>
      </div>

      {/* ─── SEARCH OVERLAY ─── */}
      {showSearch && (
        <SearchOverlay onClose={() => setShowSearch(false)} />
      )}
    </>
  )
}