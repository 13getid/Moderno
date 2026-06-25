import { Link } from 'react-router-dom'

// Explicitly define your layout structures and paths
const footerLinks = {
  Shop: [
    { label: "Living Room",  path: "/shop" },
    { label: "Bedroom",      path: "/shop" },
    { label: "Dining Room",   path: "/shop" },
    { label: "Office",       path: "/shop" },
    { label: "Outdoor",      path: "/shop" },
  ],
  Help: [
    { label: "Shipping Info", path: "#" },
    { label: "Returns",       path: "#" },
    { label: "Track Order",   path: "#" },
    { label: "FAQ",           path: "#" },
  ],
  Company: [
    { label: "About Us",     path: "/about" }, 
    { label: "Blog",         path: "/blog" },
    { label: "Careers",      path: "#" },
    { label: "Contact",      path: "/contact" },
  ],
}

// Replaced broken Lucide brand imports with native, safe inline SVGs
const socials = [
  { 
    name: "Instagram", 
    href: "#", 
    svg: (
      <svg xmlns="http://w3.org" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    )
  },
  { 
    name: "Twitter", 
    href: "#", 
    svg: (
      <svg xmlns="http://w3.org" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
      </svg>
    )
  },
  { 
    name: "Facebook", 
    href: "#", 
    svg: (
      <svg xmlns="http://w3.org" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    )
  },
  { 
    name: "Youtube", 
    href: "#", 
    svg: (
      <svg xmlns="http://w3.org" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
        <polygon points="10 15 15 12 10 9"/>
      </svg>
    )
  },
]

export default function Footer() {
  return (
    <footer className="bg-stone-900 dark:bg-ink-dark text-stone-400">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand column */}
        <div className="col-span-2 md:col-span-1">
          <p className="text-white font-bold tracking-[0.18em] text-sm mb-4">MODERNO</p>
          <p className="text-xs leading-relaxed mb-6 text-stone-500">
            Curated home decor for the modern home. Quality crafted with timeless style,
            delivered to your door.
          </p>
          {/* Social icons */}
          <div className="flex gap-3">
            {socials.map((social, i) => (
              <a
                key={i} 
                href={social.href}
                aria-label={social.name}
                className="w-8 h-8 bg-stone-800 rounded-full flex items-center justify-center hover:bg-[#8B6C42] transition-colors text-stone-300"
              >
                {social.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, items]) => (
          <div key={title}>
            <p className="text-white text-xs font-semibold tracking-[0.12em] uppercase mb-5">
              {title}
            </p>
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-xs text-stone-500 hover:text-stone-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      {/* Newsletter strip */}
      <div className="border-t border-stone-800 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white text-sm font-medium mb-1">Get 10% off your first order</p>
            <p className="text-xs text-stone-500">Subscribe to our newsletter for design tips and offers.</p>
          </div>
          <div className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 md:w-64 px-4 py-2 text-sm bg-stone-800 text-stone-300 placeholder-stone-600 border border-stone-700 focus:outline-none focus:border-[#8B6C42]"
            />
            <button className="bg-[#8B6C42] text-white px-5 py-2 text-xs tracking-wider hover:bg-[#7A5C35] transition-colors">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800 py-5 px-6 text-center text-xs text-stone-600">
        © 2026 Moderno. All rights reserved. · Privacy Policy · Terms of Service
      </div>
    </footer>
  )
}
