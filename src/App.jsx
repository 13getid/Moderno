import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import AuthPage from './pages/AuthPage'
import Footer from './components/Footer'

export default function App() {
  return (
    <ThemeProvider>
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-cream dark:bg-ink text-stone-900 dark:text-stone-100 transition-colors duration-300">
        <Navbar />

        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/shop"       element={<Shop />} />
          <Route path="/dashboard"  element={<Dashboard />} />
          <Route path="/about"      element={<About />} />
          <Route path="/blog"       element={<Blog />} />
          <Route path="/blog/:id"   element={<BlogPost />} />
          <Route path="/contact"    element={<Contact />} />
          <Route path="/cart"       element={<Cart />} />
          {/* Two routes share ONE component — initialMode just picks the first tab */}
          <Route path="/login"      element={<AuthPage initialMode="login" />} />
          <Route path="/register"   element={<AuthPage initialMode="register" />} />

          {/* Catch-all route to instantly reveal broken links */}
          <Route path="*" element={<div className="p-20 text-center text-red-500 font-bold">Error 404: The URL "{window.location.pathname}" does not exist.</div>} />
        </Routes>
        
        <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
    </ThemeProvider>
  )
}
