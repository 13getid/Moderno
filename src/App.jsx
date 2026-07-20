import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider }  from './context/CartContext'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider, useAuth } from './context/AuthContext'

// UI Components
import Navbar    from './components/Navbar.jsx'
import Footer    from './components/Footer.jsx'

// Pages
import Home      from './pages/Home.jsx'
import Shop      from './pages/Shop.jsx'
import About     from './pages/About.jsx'
import Blog      from './pages/Blog.jsx'
import BlogPost  from './pages/BlogPost.jsx'
import Contact   from './pages/Contact.jsx'
import Cart      from './pages/Cart.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login     from './pages/Login.jsx'
import Register  from './pages/Register.jsx'
import MyOrders  from './pages/MyOrders.jsx'

// PrivateRoute: if user is NOT logged in, send them to /login
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
          {/* Public routes */}
          <Route path="/"         element={<Home />} />
          <Route path="/shop"     element={<Shop />} />
          <Route path="/about"    element={<About />} />
          <Route path="/blog"     element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private routes */}
          <Route path="/cart" element={
            <PrivateRoute><Cart /></PrivateRoute>
          } />

          <Route path="/my-orders" element={
            <PrivateRoute><MyOrders /></PrivateRoute>
          } />

          {/* Admin route */}
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