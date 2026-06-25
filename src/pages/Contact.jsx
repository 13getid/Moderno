import { useState } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const contactInfo = [
  { Icon: MapPin, label: "Address",  value: "14 Moi Avenue, Mombasa, Kenya" },
  { Icon: Phone,  label: "Phone",    value: "+254 700 123 456" },
  { Icon: Mail,   label: "Email",    value: "hello@moderno.co.ke" },
  { Icon: Clock,  label: "Hours",    value: "Mon–Sat: 9am – 6pm" },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  // Update form state when user types
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Handle form submit
  function handleSubmit(e) {
    e.preventDefault()
    // In a real app you'd POST to an API here
    setSubmitted(true)
  }

  return (
    <div className="bg-[#F5F0E8] dark:bg-ink min-h-screen">

      {/* Header */}
      <section className="bg-[#EDE8DF] dark:bg-ink-light py-20 text-center px-6">
        <p className="text-xs tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 mb-3">Get In Touch</p>
        <h1 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">We'd Love To Hear From You</h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto">
          Questions, custom orders, or just want to say hello? Send us a message.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">

        {/* Left: contact details */}
        <div>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-8">Contact Information</h2>
          <div className="space-y-6 mb-10">
            {contactInfo.map(({ Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#F0E8D8] dark:bg-ink-light rounded-full flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-[#8B6C42]" />
                </div>
                <div>
                  <p className="text-xs text-stone-400 mb-0.5">{label}</p>
                  <p className="text-sm text-stone-800 dark:text-stone-100 font-medium">{value}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Map placeholder */}
          <div className="bg-[#E0D8CC] dark:bg-ink-light rounded-lg h-48 flex items-center justify-center text-stone-500 dark:text-stone-400 text-sm">
            🗺️ Map embed goes here
          </div>
        </div>

        {/* Right: form */}
        <div>
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-2">Message Sent!</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400">We'll get back to you within 24 hours.</p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name:'', email:'', subject:'', message:'' }) }}
                className="mt-6 text-sm text-[#8B6C42] underline"
              >Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-6">Send a Message</h2>
              {[
                { name:"name",    label:"Your Name",     type:"text" },
                { name:"email",   label:"Email Address", type:"email" },
                { name:"subject", label:"Subject",       type:"text" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-xs text-stone-500 dark:text-stone-400 mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    required
                    className="w-full border border-stone-200 dark:border-stone-700 bg-white dark:bg-ink-light dark:text-stone-100 px-4 py-3 text-sm rounded focus:outline-none focus:border-[#8B6C42]"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs text-stone-500 dark:text-stone-400 mb-1">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full border border-stone-200 dark:border-stone-700 bg-white dark:bg-ink-light dark:text-stone-100 px-4 py-3 text-sm rounded focus:outline-none focus:border-[#8B6C42] resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-stone-900 dark:bg-ink-dark text-white py-3 text-xs tracking-widest hover:bg-[#8B6C42] transition-colors"
              >
                SEND MESSAGE
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}