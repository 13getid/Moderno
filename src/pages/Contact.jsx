import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react'
import { apiSendContact } from '../utils/api'

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', subject: '', message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError]     = useState('')

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await apiSendContact(form.name, form.email, form.subject, form.message)
      setSuccess(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8] dark:bg-stone-950">
      <div className="max-w-5xl mx-auto px-6 py-14">

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-['Cormorant_Garamond',serif] text-4xl font-semibold text-stone-900 dark:text-stone-100 mb-3">
            Get in Touch
          </h1>
          <p className="text-stone-500 dark:text-stone-400 text-sm max-w-md mx-auto">
            Have a question about a product or your order? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-10">

          {/* Left — contact info */}
          <div className="md:col-span-2 space-y-6">
            {[
              { icon: Mail,    label: 'Email',   value: 'hello@moderno.co.ke' },
              { icon: Phone,   label: 'Phone',   value: '+254 700 000 000'    },
              { icon: MapPin,  label: 'Address', value: 'Westlands, Nairobi, Kenya' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#8B6C42]/10 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-[#8B6C42]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-stone-400 mb-0.5">{label}</p>
                  <p className="text-sm text-stone-700 dark:text-stone-300">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right — form */}
          <div className="md:col-span-3">

            {/* Success state */}
            {success ? (
              <div className="bg-white dark:bg-stone-900 rounded-2xl p-10 shadow-sm text-center">
                <CheckCircle size={48} className="text-[#8B6C42] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-2">
                  Message Sent!
                </h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                  Check your inbox — we've sent you a confirmation.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="text-sm text-[#8B6C42] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div className="bg-white dark:bg-stone-900 rounded-2xl p-8 shadow-sm space-y-5">

                {/* Name + Email row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: 'name',  label: 'Your Name',  type: 'text',  placeholder: 'Ian Otieno'          },
                    { name: 'email', label: 'Email',      type: 'email', placeholder: 'ian@example.com'      },
                  ].map(({ name, label, type, placeholder }) => (
                    <div key={name}>
                      <label className="block text-xs font-medium tracking-widest uppercase text-stone-500 dark:text-stone-400 mb-1.5">
                        {label}
                      </label>
                      <input
                        type={type}
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B6C42]/40 focus:border-[#8B6C42] transition"
                      />
                    </div>
                  ))}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-medium tracking-widest uppercase text-stone-500 dark:text-stone-400 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="e.g. Question about the Luna Sofa"
                    className="w-full px-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B6C42]/40 focus:border-[#8B6C42] transition"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-medium tracking-widest uppercase text-stone-500 dark:text-stone-400 mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B6C42]/40 focus:border-[#8B6C42] resize-none transition"
                  />
                </div>

                {/* Error */}
                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-3 bg-[#8B6C42] hover:bg-[#7A5C35] disabled:opacity-60 text-white text-sm font-medium tracking-widest uppercase rounded-xl transition flex items-center justify-center gap-2"
                >
                  {loading
                    ? <><Loader2 size={15} className="animate-spin" /> Sending...</>
                    : <><Send size={15} /> Send Message</>
                  }
                </button>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}