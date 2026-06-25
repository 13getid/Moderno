import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function SaleBanner() {
  const navigate = useNavigate()

  return (
    <section className="max-w-7xl mx-auto px-6 pb-16">
      <div className="bg-[#E0C8A8] rounded-lg px-10 py-10 flex items-center justify-between overflow-hidden relative">

        {/* Left — text + button */}
        <div className="z-10">
          <p className="text-xs tracking-[0.15em] uppercase text-[#7A5830] mb-2">
            Summer Sale
          </p>
          <h2 className="text-4xl font-bold text-stone-900 mb-1">
            Up to 30% Off
          </h2>
          <p className="text-sm text-[#7A5830] mb-6">
            On selected collections
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="bg-stone-900 text-white text-xs tracking-widest px-6 py-3 flex items-center gap-2 hover:bg-brown transition-colors"
          >
            SHOP NOW <ArrowRight size={14} />
          </button>
        </div>

        {/* Right — decorative chair image */}
        <div className="text-[120px] leading-none select-none opacity-90">
          🪑
        </div>

        {/* Soft circle decoration behind chair */}
        <div className="absolute right-24 top-1/2 -translate-y-1/2 w-48 h-48 bg-[#C8A878] rounded-full opacity-30" />

      </div>
    </section>
  )
}