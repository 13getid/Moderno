import { newArrivals } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function NewArrivals() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-center text-xs tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 mb-10">
        New Arrivals
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {newArrivals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}