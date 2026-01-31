'use client'
import './globals.css'
import localFont from 'next/font/local'
import { ReactNode } from 'react'
import Header from './components/Header'



// Fuente custom
const zanovaFont = localFont({
  src: [{ path: './fonts/engry.otf', weight: '400', style: 'normal' }],
  variable: '--font-zanova',
})

const igFont = localFont({
  src: [{ path: './fonts/ig_regular.otf', weight: '400', style: 'normal' }],
  variable: '--font-ig',
})


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${zanovaFont.variable} ${igFont.variable}`}>
<body className="flex  justify-center relative min-h-[100dvh] overflow-hidden mt-48">
  {/* Imagen de fondo */}
   <div
    className="fixed inset-0 -z-10 bg-cover bg-center "
    style={{ backgroundImage: "url('/hero.jpg')" }}
  />

  {/* Overlay oscuro suave para mejorar contraste */}
  <div className="fixed inset-0 bg-black/40 -z-5"></div>
  <Header/>
  
  <main className="relative z-10 text-white">
    {children}
  </main>
</body>

    </html>
  )
}

