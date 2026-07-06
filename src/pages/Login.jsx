import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { apiLogin } from '../utils/api'

export default function Login() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const { loginUser } = useAuth()
  const navigate      = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault() // stop the page from refreshing
    setError('')
    setLoading(true)

    try {
      const data = await apiLogin(email, password)
      // apiLogin throws if response is not ok (from our api.js helper)
      loginUser(data.token, data.user) // save to AuthContext + localStorage
      navigate('/')                   // redirect to homepage
    } catch (err) {
      setError(err.message || 'Login failed. Check your email and password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8] dark:bg-stone-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-2xl shadow-lg p-8">

        {/* Logo / heading */}
        <div className="text-center mb-8">
          <span className="font-['Cormorant_Garamond',serif] text-3xl font-semibold text-stone-900 dark:text-white">
            Moder<span className="text-[#8B6C42]">no</span>
          </span>
          <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">Sign in to your account</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="space-y-5">

          <div>
            <label className="block text-xs font-medium tracking-widest uppercase text-stone-500 dark:text-stone-400 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B6C42]/40 focus:border-[#8B6C42] transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium tracking-widest uppercase text-stone-500 dark:text-stone-400 mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B6C42]/40 focus:border-[#8B6C42] transition"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-lg bg-[#8B6C42] hover:bg-[#7A5C35] disabled:opacity-60 text-white text-sm font-medium tracking-widest uppercase transition"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

        </div>

        {/* Switch to register */}
        <p className="text-center text-sm text-stone-500 dark:text-stone-400 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#8B6C42] hover:underline font-medium">
            Create one
          </Link>
        </p>

      </div>
    </div>
  )
}