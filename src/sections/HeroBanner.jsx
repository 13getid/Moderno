import { useState, useEffect } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import hero1 from '../assets/images/hero1.jpg'
import hero2 from '../assets/images/hero2.jpg'
import hero3 from '../assets/images/hero3.jpg'
import hero4 from '../assets/images/hero4.jpg'
import hero5 from '../assets/images/hero5.jpg'
import hero6 from '../assets/images/hero6.jpg'



const slides = [
  {
    id: 0,
    eyebrow: "Modern Designs. Timeless Comfort.",
    headline: ["Furniture", "That Defines", "Your Space"],
    body: "Discover curated collections that blend style, functionality and quality for every corner of your home.",
    image: hero2
  },
  {
    id: 1,
    eyebrow: "Refresh Your Bedroom.",
    headline: ["Sleep", "In Style", "Every Night"],
    body: "Handcrafted beds and storage designed for rest, comfort, and beautiful mornings.",
    image: hero6,
  },
  {
    id: 2,
    eyebrow: "WORK FROM HOME, IN STYLE.",
    headline: ["Your Office", "Your Rules", "Your Look"],
    body: "Ergonomic desks and chairs that make your workspace as inspiring as your ideas.",
    image: hero3,
  },

// 2. Add these objects to your data array:
  {
    id: 3,
    eyebrow: "THE HEART OF THE HOME.",
    headline: ["Culinary Spaces", "Modern Design", "Smart Storage"],
    body: "Minimalist cabinetry and sleek countertops that turn everyday cooking into an experience.",
    image: hero1,
  },
  {
    id: 4,
    eyebrow: "LOUNGE WITHOUT BOUNDARIES.",
    headline: ["Open Skies", "Pure Comfort", "Weather Proof"],
    body: "Durable luxury sofas and dining sets engineered to blend seamlessly with your landscape.",
    image: hero4, // Replace with your actual imported image variable
  },
  {
    id: 5,
    eyebrow: "YOUR PRIVATE SANCTUARY.",
    headline: ["Clean Lines", "Calming Tones", "Spa Quality"],
    body: "Elegant vanities and matte fixtures designed to turn your bathroom into a personal retreat.",
    image: hero5, 
  },

]

export default function HeroBanner() {
  const [active, setActive] = useState(0)
  const navigate = useNavigate()
  const slide = slides[active]

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setActive((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(timer)
  }, [active])

  return (
    <section className="relative w-full h-[65vh] md:h-[70vh] lg:h-[75vh] min-h-[500px] overflow-hidden bg-[#F5F5F3] dark:bg-ink group">
      
      {/* ── 1. Background Image Layer (Occupies exactly 75% width on large screens) ── */}
      <div className="absolute top-0 right-0 w-full lg:w-[75%] h-full z-0">
        <img 
          src={slide.image} 
          alt="Banner Background" 
          className="w-full h-full object-cover object-center transition-all duration-700 ease-in-out"
        />
        
        {/* Soft, professional gradient mask blending the image into the left layout block */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5F5F3] via-[#F5F5F3]/40 to-transparent dark:from-ink dark:via-ink/40 z-10 hidden lg:block" />
        {/* Mobile fallback gradient */}
        <div className="absolute inset-0 bg-white/80 dark:bg-ink/80 z-10 lg:hidden" />
      </div>

     {/* ── 2. Manual Navigation Controls (Locked Perfectly to Vertical Center) ── */}
<button
  onClick={prevSlide}
  className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/60 backdrop-blur-md text-stone-800 hover:bg-white/90 transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center shadow-md border border-stone-200/50"
  aria-label="Previous slide"
>
  <ChevronLeft size={22} />
</button>

<button
  onClick={nextSlide}
  className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/60 backdrop-blur-md text-stone-800 hover:bg-white/90 transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center shadow-md border border-stone-200/50"
  aria-label="Next slide"
>
  <ChevronRight size={22} />
</button>


      {/* ── 3. Foreground Content Framework Layer ── */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-8 md:px-12 flex items-center w-full">
        {/* Content bound strictly to the remaining 25% to 30% space column structure */}
        <div className="w-full lg:w-[35%] py-6">
          
          <p className="text-xs tracking-[0.2em] text-stone-500 dark:text-stone-400 mb-4 uppercase font-semibold">
            {slide.eyebrow}
          </p>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-stone-100 leading-[1.15] mb-5 tracking-tight">
            {slide.headline.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h1>
          
          <p className="text-stone-600 dark:text-stone-300 text-xs md:text-sm font-medium leading-relaxed mb-8">
            {slide.body}
          </p>
          
          <button
            onClick={() => navigate('/shop')}
            className="bg-stone-900 dark:bg-ink-dark text-white px-7 py-3.5 text-xs tracking-[0.2em] font-medium flex items-center gap-3 hover:bg-stone-800 transition-all duration-300 shadow-md"
          >
            SHOP NOW <ArrowRight size={12} />
          </button>

          {/* Navigation Progress Dots */}
          <div className="flex gap-2 mt-10">
            {slides.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  active === s.id ? 'bg-stone-900 dark:bg-stone-100 w-8' : 'bg-stone-300 dark:bg-stone-700 w-1.5'
                }`}
                aria-label={`Go to slide ${s.id + 1}`}
              />
            ))}
          </div>
          
        </div>
      </div>
    </section>
  )
}
