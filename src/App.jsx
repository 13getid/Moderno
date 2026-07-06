import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider }  from './context/CartContext'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar    from './components/Navbar'
import Footer    from './components/Footer'
import Home      from './pages/Home'
import Shop      from './pages/Shop'
import About     from './pages/About'
import Blog      from './pages/Blog'
import BlogPost  from './pages/BlogPost'
import Contact   from './pages/Contact'
import Cart      from './pages/Cart'
import Dashboard from './pages/Dashboard'
import Login     from './pages/Login'
import Register  from './pages/Register'

// PrivateRoute: if user is NOT logged in, send them to /login
// If they ARE logged in, show the page normally
// Like a bouncer at a VIP section
function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

// AdminRoute: only users with role="admin" can enter
function AdminRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'admin') return <Navigate to="/" replace />
  return children
}

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* Public routes — anyone can visit */}
          <Route path="/"         element={<Home />} />
          <Route path="/shop"     element={<Shop />} />
          <Route path="/about"    element={<About />} />
          <Route path="/blog"     element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private routes — must be logged in */}
          <Route path="/cart" element={
            <PrivateRoute><Cart /></PrivateRoute>
          } />

          {/* Admin route — must be logged in AND be admin */}
          <Route path="/dashboard" element={
            <AdminRoute><Dashboard /></AdminRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
    {/* Order matters: BrowserRouter → ThemeProvider → AuthProvider → CartProvider */}
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <AppLayout />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}