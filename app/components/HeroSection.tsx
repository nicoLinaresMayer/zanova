"use client"

import { FloatingLogo } from '../components/FloatingLogo'

const INSTAGRAM_URL = 'https://www.instagram.com/zanova.zn/'

export default function HeroSection() {
  return (
    <section className="relative h-[calc(100svh)] w-full overflow-hidden">
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: "url('/zanova_bg_3.jpg')" }}
  />
  <div className="absolute inset-0 bg-black/40" />

  {/* CONTENEDOR DE REFERENCIA */}
  <div className="relative h-full">
    <FloatingLogo />
  </div>
</section>

  )
}
