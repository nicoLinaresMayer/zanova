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
<body className="min-h-[100dvh] overflow-x-hidden">
  {/* Imagen de fondo */}
   <div className="fixed inset-0 -z-10 min-h-[100dvh]">
  <img
    src="/hero.jpg"
    alt=""
    className="w-full h-full object-cover object-[50%_50%]"
  />
</div>

  {/* Overlay oscuro suave para mejorar contraste */}
  <div className="fixed inset-0 bg-black/40 -z-5 min-h-[100dvh]"></div>
  <Header/>
  
  <main className="relative z-10 text-white">
    {children}
  </main>
</body>

    </html>
  )
}

