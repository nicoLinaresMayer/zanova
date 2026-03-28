import Hero from './components/Hero'
import ProductsFetch from './components/ProductsFetch'

export const metadata = {
  title: 'Zanova ✦', // texto que aparece en la pestaña
  description: 'Tienda oficial de Zanova'
}



export default function LandingPage() {
  return (
    <main className="relative z-10 text-white">
        
      <Hero />
      <ProductsFetch />
    </main>
  )
}
