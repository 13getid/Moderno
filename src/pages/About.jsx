const values = [
  { image: "/images/about/value-1.jpg", 
    title: "Sustainable",  
    body: "We source responsibly, using eco-certified wood and natural fibres wherever possible." },

  { image: "/images/about/value-2.jpg", 
    title: "Handcrafted",  
    body: "Every piece is made by skilled artisans who take pride in every joint and finish." },

  { image: "/images/about/value-3.jpg", 
    title: "Delivered Fast",
     body: "Free shipping on orders over 100K. Most items arrive within 5–7 business days." },

  { image: "/images/about/value-4.jpg",
     title: "Customer First",
     body: "30-day returns, no questions asked. We stand behind everything we sell." },
]

const team = [
  { name: "Ian Otieno",    
    role: "Founder & CEO",       
    image: "/images/about/team-1.jpg" },

  { name: "Latifa Clay",  
    role: "Head of Design",     
     image: "/images/about/team-2.jpg" },

  { name: "Daniel Kiu",  
     role: "Operations Lead",     
     image: "/images/about/team-3.jpg" },

  { name: "Momanyi Kelvin",  
     role: "Systems Administrator",     
     image: "/images/about/team-4.jpg" },   
]

export default function About() {
  return (
    <div className="bg-[#F5F0E8] dark:bg-ink min-h-screen">

      {/* Hero */}
      <section className="bg-[#EDE8DF] dark:bg-ink-light py-24 text-center px-6">
        <p className="text-xs tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 mb-4">Our Story</p>
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-6 max-w-2xl mx-auto leading-tight">
          Furniture Made With Purpose
        </h1>
        <p className="text-stone-600 dark:text-stone-300 max-w-xl mx-auto text-sm leading-relaxed">
          Moderno was founded in 2026 with one belief: that beautiful furniture
          should not cost the earth — literally or financially. We work directly
          with artisans across East Africa and Southeast Asia to bring timeless
          pieces to modern homes.
        </p>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-center text-xs tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 mb-12">
          What We Stand For
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v) => (
            <div key={v.title} className="text-center flex flex-col items-center">
              {/* Values Image Container */}
              <div className="w-16 h-16 rounded-full overflow-hidden bg-stone-200 dark:bg-stone-700 mb-4 shadow-sm">
                <img 
                  src={v.image} 
                  alt={v.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">{v.title}</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#8B6C42] py-14">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center text-white">
          {[["10+", "Happy Customers"], ["100+", "Products"], ["5", "Countries Shipped"]].map(([num, lbl]) => (
            <div key={lbl}>
              <p className="text-3xl font-bold mb-1">{num}</p>
              <p className="text-sm text-orange-100">{lbl}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-center text-xs tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 mb-12">
          Meet The Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-3xl mx-auto">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              {/* Team Profile Photo Container */}
              <div className="w-24 h-24 rounded-full overflow-hidden bg-stone-200 dark:bg-stone-700 mx-auto mb-4 shadow-md">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <p className="font-semibold text-stone-900 dark:text-stone-100">{member.name}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
