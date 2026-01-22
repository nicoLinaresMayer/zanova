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
<body className="flex items-center justify-center relative min-h-screen">
  {/* Imagen de fondo */}
  <img
    src="/zanova_bg_2.jpg"
    alt="Fondo difuminado"
    className="fixed inset-0 w-full h-full object-cover filter blur-xs -z-10"
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

