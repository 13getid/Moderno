import { createContext, useContext, useState, useEffect } from 'react'
import { apiGetMe } from '../utils/api'

// Step 1: Create the context — like creating the security office room
const AuthContext = createContext(null)

// Step 2: Create the Provider — this wraps the whole app
// and makes auth data available everywhere
export function AuthProvider({ children }) {
  // user = the logged-in user object, or null if not logged in
  const [user, setUser]       = useState(null)
  // loading = true while we check if a saved token exists
  const [loading, setLoading] = useState(true)

  // When the app first loads, check if a token is saved in localStorage
  // If yes, fetch the user profile so they stay logged in after page refresh
  // This is like the mall checking if you already have a wristband from yesterday
  useEffect(() => {
    const token = localStorage.getItem('moderno_token')
    if (!token) {
      setLoading(false)
      return
    }
    apiGetMe()
      .then((data) => setUser(data))
      .catch(() => {
        // Token is expired or invalid — clear it
        localStorage.removeItem('moderno_token')
        localStorage.removeItem('moderno_user')
      })
      .finally(() => setLoading(false))
  }, [])

  // Called after a successful login or register
  // Saves token + user so the whole app knows who is logged in
  function loginUser(token, userData) {
    localStorage.setItem('moderno_token', token)
    localStorage.setItem('moderno_user', JSON.stringify(userData))
    setUser(userData)
  }

  // Called when user clicks "Sign Out"
  // Clears everything — like cutting off the wristband
  function logoutUser() {
    localStorage.removeItem('moderno_token')
    localStorage.removeItem('moderno_user')
    setUser(null)
  }

  // While we're checking localStorage on first load, show nothing
  // This stops a flash of "not logged in" before we confirm the token
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] dark:bg-stone-950 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-[#8B6C42] border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// Step 3: Custom hook — any component uses this to access auth
// Usage: const { user, logoutUser } = useAuth()
export function useAuth() {
  return useContext(AuthContext)
}