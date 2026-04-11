import HeroImage from './components/HeroImage'
import ProductsFetch from './components/ProductsFetch'

export default function LandingPage() {
  return (
    <main className="relative z-10 text-white">
      <HeroImage />
      <ProductsFetch />
    </main>
  )
}