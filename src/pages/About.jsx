const values = [
  { emoji: "🌿", title: "Sustainable",  body: "We source responsibly, using eco-certified wood and natural fibres wherever possible." },
  { emoji: "✂️", title: "Handcrafted",  body: "Every piece is made by skilled artisans who take pride in every joint and finish." },
  { emoji: "🚚", title: "Delivered Fast",body: "Free shipping on orders over $100. Most items arrive within 5–7 business days." },
  { emoji: "💛", title: "Customer First",body: "30-day returns, no questions asked. We stand behind everything we sell." },
]

const team = [
  { name: "Amara Osei",    role: "Founder & CEO",       emoji: "👩🏾‍💼" },
  { name: "James Mwangi",  role: "Head of Design",      emoji: "👨🏿‍🎨" },
  { name: "Sofia Reyes",   role: "Operations Lead",     emoji: "👩🏽‍💻" },
]

export default function About() {
  return (
    <div className="bg-[#F5F0E8] min-h-screen">

      {/* Hero */}
      <section className="bg-[#EDE8DF] py-24 text-center px-6">
        <p className="text-xs tracking-[0.2em] uppercase text-stone-500 mb-4">Our Story</p>
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6 max-w-2xl mx-auto leading-tight">
          Furniture Made With Purpose
        </h1>
        <p className="text-stone-600 max-w-xl mx-auto text-sm leading-relaxed">
          Moderno was founded in 2026 with one belief: that beautiful furniture
          should not cost the earth — literally or financially. We work directly
          with artisans across East Africa and Southeast Asia to bring timeless
          pieces to modern homes.
        </p>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-center text-xs tracking-[0.2em] uppercase text-stone-500 mb-12">
          What We Stand For
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v) => (
            <div key={v.title} className="text-center">
              <div className="text-4xl mb-4">{v.emoji}</div>
              <h3 className="font-semibold text-stone-900 mb-2">{v.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#8B6C42] py-14">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center text-white">
          {[["5,000+", "Happy Customers"], ["200+", "Products"], ["12", "Countries Shipped"]].map(([num, lbl]) => (
            <div key={lbl}>
              <p className="text-3xl font-bold mb-1">{num}</p>
              <p className="text-sm text-orange-100">{lbl}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-center text-xs tracking-[0.2em] uppercase text-stone-500 mb-12">
          Meet The Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-3xl mx-auto">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="w-24 h-24 rounded-full bg-[#E0C8A8] flex items-center justify-center text-4xl mx-auto mb-4">
                {member.emoji}
              </div>
              <p className="font-semibold text-stone-900">{member.name}</p>
              <p className="text-xs text-stone-500 mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}