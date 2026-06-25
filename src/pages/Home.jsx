import HeroBanner    from '../sections/HeroBanner'
import TrustBadges from '../sections/TrustBadges'
import ShopByCategory from '../sections/ShopByCategory'
import SalesBanner     from '../sections/SalesBanner'
import NewArrivals    from '../sections/NewArrivals'

export default function Home() {
  return (
    <main className="bg-cream dark:bg-ink min-h-screen">
      <HeroBanner />
      <TrustBadges />
      <ShopByCategory />
      <SalesBanner />
       <NewArrivals />
    </main>
  )
}