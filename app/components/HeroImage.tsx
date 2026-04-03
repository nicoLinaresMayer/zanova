import { getHeroImage } from '@/lib/products'
import HeroClient from './HeroClient'

export default async function HeroImage() {
  const heroImage = await getHeroImage()
  return <HeroClient heroImage={heroImage} />
}