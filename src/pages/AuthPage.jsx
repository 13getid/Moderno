import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, Eye, EyeOff, ArrowRight } from 'lucide-react'

/*
  AuthPage — a combined Sign In / Create Account screen.

  Big picture (read this first):
  - This ONE component shows two forms (login + register) and a little
    pill-shaped toggle to switch between them. Which one is visible is stored
    in a piece of state called `tab`.
  - We rebuilt the original design using the project's Tailwind tokens
    (brown / cream / ink) so it matches the rest of the site AND reacts to the
    light/dark toggle in the navbar. Every color that should change in dark mode
    has a `dark:` twin, e.g. `bg-white dark:bg-ink-light`.
*/

// ── Google icon ──────────────────────────────────────────────
// Just an SVG. Keeping Google's official brand colors is intentional —
// those don't get themed.
const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
)

/*
  AuthInput — ONE reusable text box so we don't copy/paste the same markup
  for every field. This is a common beginner win: build the field once, use it
  many times.

  Props (the inputs to this component):
  - id, label, type: obvious ones. `label` is shown above the box.
  - icon: an optional lucide icon shown on the right (decoration only).
  - ...props: anything else (value, onChange, placeholder, required) is
    forwarded straight to the real <input> via the spread operator `{...props}`.

  Special case: if type === "password", the field grows its own little
  show/hide eye button and manages that on/off state by itself.
*/
function AuthInput({ id, label, type = 'text', icon: Icon, ...props }) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'
  // When it's a password field, flip between "password" (dots) and "text".
  const inputType = isPassword ? (show ? 'text' : 'password') : type

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-[11px] tracking-[0.1em] uppercase text-stone-500 dark:text-stone-400 mb-1.5 font-medium"
      >
        {label}
      </label>

      <div className="relative flex items-center">
        <input
          id={id}
          type={inputType}
          className="w-full rounded-lg bg-cream dark:bg-ink border border-stone-300 dark:border-stone-700 px-4 py-2.5 pr-10 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 outline-none focus:border-brown focus:ring-1 focus:ring-brown transition-colors"
          {...props}
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? 'Hide password' : 'Show password'}
            className="absolute right-3 text-stone-400 hover:text-brown transition-colors"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        ) : Icon ? (
          // pointer-events-none so clicks pass through to the input behind it
          <Icon size={16} className="absolute right-3 text-stone-400 pointer-events-none" />
        ) : null}
      </div>
    </div>
  )
}

// Small shared pieces so both forms look identical ────────────
function Divider() {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-stone-300 dark:bg-stone-700" />
      <span className="text-[11px] tracking-[0.08em] uppercase text-stone-400 whitespace-nowrap">
        or continue with
      </span>
      <div className="flex-1 h-px bg-stone-300 dark:bg-stone-700" />
    </div>
  )
}

function GoogleButton() {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-center gap-2.5 rounded-lg border border-stone-300 dark:border-stone-700 py-2.5 text-sm text-stone-600 dark:text-stone-300 hover:border-brown dark:hover:border-brown transition-colors"
    >
      <GoogleIcon />
      Continue with Google
    </button>
  )
}

// The brown primary button used to submit each form ───────────
function PrimaryButton({ children }) {
  return (
    <button
      type="submit"
      className="w-full flex items-center justify-center gap-2 rounded-lg bg-brown hover:bg-brown-dark text-white py-3 text-xs font-semibold tracking-[0.1em] uppercase transition-colors"
    >
      {children}
      <ArrowRight size={14} />
    </button>
  )
}

// ── LoginForm ────────────────────────────────────────────────
function LoginForm({ onSwitch }) {
  // `form` holds what the user typed. This is a "controlled form": React owns
  // the values, the inputs just display them.
  const [form, setForm] = useState({ email: '', password: '' })

  // Helper that returns an onChange handler for a given field name.
  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  // Wrapping inputs in a <form> means pressing Enter submits, and this runs.
  const handleSubmit = (e) => {
    e.preventDefault() // stop the browser from reloading the page
    // TODO: replace this with a real API call to your backend.
    console.log('Login →', form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-['Cormorant_Garamond',serif] text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-1">
        Welcome back
      </h2>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
        Sign in to your Moderno account
      </p>

      <AuthInput
        id="login-email"
        label="Email address"
        type="email"
        icon={Mail}
        placeholder="you@example.com"
        value={form.email}
        onChange={set('email')}
        required
      />

      <AuthInput
        id="login-password"
        label="Password"
        type="password"
        placeholder="••••••••"
        value={form.password}
        onChange={set('password')}
        required
      />

      <div className="text-right -mt-1 mb-5">
        {/* Placeholder — wire this to a real route when you build it. */}
        <Link to="/login" className="text-xs text-brown hover:underline">
          Forgot password?
        </Link>
      </div>

      <PrimaryButton>Sign In</PrimaryButton>
      <Divider />
      <GoogleButton />

      <p className="text-center text-xs text-stone-500 dark:text-stone-400 mt-5">
        Don&apos;t have an account?{' '}
        <button type="button" onClick={onSwitch} className="text-brown hover:underline font-medium">
          Create one
        </button>
      </p>
    </form>
  )
}

// ── RegisterForm ─────────────────────────────────────────────
function RegisterForm({ onSwitch }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  })
  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: replace this with a real API call to your backend.
    console.log('Register →', form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-['Cormorant_Garamond',serif] text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-1">
        Join Moderno
      </h2>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
        Create your account and start shopping
      </p>

      {/* Two fields side by side on wider screens, stacked on phones */}
      <div className="flex flex-col sm:flex-row sm:gap-3">
        <div className="flex-1">
          <AuthInput
            id="reg-first"
            label="First name"
            placeholder="Jane"
            value={form.firstName}
            onChange={set('firstName')}
            required
          />
        </div>
        <div className="flex-1">
          <AuthInput
            id="reg-last"
            label="Last name"
            placeholder="Doe"
            value={form.lastName}
            onChange={set('lastName')}
            required
          />
        </div>
      </div>

      <AuthInput
        id="reg-email"
        label="Email address"
        type="email"
        icon={Mail}
        placeholder="you@example.com"
        value={form.email}
        onChange={set('email')}
        required
      />

      <AuthInput
        id="reg-phone"
        label="Phone (for M-Pesa)"
        type="tel"
        icon={Phone}
        placeholder="+254 7XX XXX XXX"
        value={form.phone}
        onChange={set('phone')}
      />

      <AuthInput
        id="reg-password"
        label="Password"
        type="password"
        placeholder="Min. 8 characters"
        value={form.password}
        onChange={set('password')}
        minLength={8}
        required
      />

      <PrimaryButton>Create Account</PrimaryButton>

      <p className="text-center text-[11px] text-stone-400 mt-4">
        By creating an account you agree to our{' '}
        <Link to="/login" className="text-brown hover:underline">Terms</Link> &amp;{' '}
        <Link to="/login" className="text-brown hover:underline">Privacy Policy</Link>
      </p>

      <p className="text-center text-xs text-stone-500 dark:text-stone-400 mt-3">
        Already have an account?{' '}
        <button type="button" onClick={onSwitch} className="text-brown hover:underline font-medium">
          Sign in
        </button>
      </p>
    </form>
  )
}

// ── AuthPage (main export) ───────────────────────────────────
// `initialMode` lets the route decide which tab opens first:
//   /login    → "login"      /register → "register"
export default function AuthPage({ initialMode = 'login' }) {
  const [tab, setTab] = useState(initialMode)

  return (
    <div className="min-h-screen bg-cream dark:bg-ink flex items-center justify-center p-6 transition-colors">
      {/* The card: two columns on desktop, stacked on mobile */}
      <div className="w-full max-w-[940px] flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800">

        {/* ─── Left panel: image + brand copy ─── */}
        <div
          className="relative md:flex-[1.1] min-h-[240px] md:min-h-0 flex flex-col justify-end p-10 text-white"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&auto=format&fit=crop&q=70')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Dark gradient so white text stays readable over any image */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80" />

          {/* Everything below sits ABOVE the overlay (relative + z-10) */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-brown/15 border border-brown/40 px-4 py-1.5 mb-5 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-brown-light" />
              <span className="text-[11px] tracking-[0.12em] uppercase text-brown-light font-medium">
                Est. 2024 · Nairobi, Kenya /
                            Mombasa, Kenya
              </span>
            </div>

            <h1 className="font-['Cormorant_Garamond',serif] text-4xl font-semibold leading-tight mb-4">
              Spaces that<br />
              <em>speak for</em><br />
              themselves.
            </h1>

            <p className="text-sm text-white/60 leading-relaxed max-w-[290px] mb-7">
              Curated furniture for homes that deserve more than ordinary.
              Free delivery over KSh 100,000.
            </p>

            <div className="flex gap-8">
              {[
                { num: '2,400+', label: 'Happy homes' },
                { num: '15', label: 'Collections' },
                { num: '4.9★', label: 'Rating' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <span className="font-['Cormorant_Garamond',serif] text-2xl font-semibold text-brown-light leading-none">
                    {s.num}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.06em] text-white/45">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Right panel: the forms ─── */}
        <div className="md:flex-1 bg-white dark:bg-ink-light p-8 sm:p-12 flex flex-col justify-center">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-8">
            <span className="w-9 h-9 rounded-full bg-cream dark:bg-ink border border-brown flex items-center justify-center">
              <span className="font-['Cormorant_Garamond',serif] italic text-brown text-base leading-none">M</span>
            </span>
            <span className="text-[13px] tracking-[0.2em] uppercase font-medium text-stone-900 dark:text-stone-100">
              Moderno
            </span>
          </div>

          {/* Pill tab toggle */}
          <div className="flex bg-cream dark:bg-ink rounded-full p-1 mb-8" role="tablist">
            <button
              role="tab"
              aria-selected={tab === 'login'}
              onClick={() => setTab('login')}
              className={`flex-1 py-2 rounded-full text-sm font-medium tracking-[0.04em] transition-colors ${
                tab === 'login'
                  ? 'bg-brown text-white'
                  : 'text-stone-500 dark:text-stone-400 hover:text-brown'
              }`}
            >
              Sign In
            </button>
            <button
              role="tab"
              aria-selected={tab === 'register'}
              onClick={() => setTab('register')}
              className={`flex-1 py-2 rounded-full text-sm font-medium tracking-[0.04em] transition-colors ${
                tab === 'register'
                  ? 'bg-brown text-white'
                  : 'text-stone-500 dark:text-stone-400 hover:text-brown'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Show one form or the other based on `tab` */}
          {tab === 'login' ? (
            <LoginForm onSwitch={() => setTab('register')} />
          ) : (
            <RegisterForm onSwitch={() => setTab('login')} />
          )}
        </div>
      </div>
    </div>
  )
}
