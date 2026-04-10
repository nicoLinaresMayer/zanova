import HeroImage from './components/HeroImage'
import ProductsFetch from './components/ProductsFetch'

export const metadata = {
  title: 'Zanova - Diseños exclusivos',
  description: 'Tienda oficial de Zanova'
}

export default function LandingPage() {
  return (
    <main className="relative z-10 text-white">
      <HeroImage />
      <ProductsFetch />
    </main>
  )
}