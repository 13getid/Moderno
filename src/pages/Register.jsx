import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { apiRegister } from '../utils/api'

export default function Register() {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const { loginUser } = useAuth()
  const navigate      = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    // Simple client-side check before hitting the server
    if (password !== confirm) {
      return setError('Passwords do not match')
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters')
    }

    setLoading(true)
    try {
      const data = await apiRegister(name, email, password)
      loginUser(data.token, data.user) // auto login after register
      navigate('/')
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8] dark:bg-stone-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-2xl shadow-lg p-8">

        <div className="text-center mb-8">
          <span className="font-['Cormorant_Garamond',serif] text-3xl font-semibold text-stone-900 dark:text-white">
            Moder<span className="text-[#8B6C42]">no</span>
          </span>
          <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">Create your account</p>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-5">

          <div>
            <label className="block text-xs font-medium tracking-widest uppercase text-stone-500 dark:text-stone-400 mb-1.5">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ian Otieno"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B6C42]/40 focus:border-[#8B6C42] transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium tracking-widest uppercase text-stone-500 dark:text-stone-400 mb-1.5">Email</label>
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
            <label className="block text-xs font-medium tracking-widest uppercase text-stone-500 dark:text-stone-400 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B6C42]/40 focus:border-[#8B6C42] transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium tracking-widest uppercase text-stone-500 dark:text-stone-400 mb-1.5">Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
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
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

        </div>

        <p className="text-center text-sm text-stone-500 dark:text-stone-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-[#8B6C42] hover:underline font-medium">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  )
}