import './globals.css'
import localFont from 'next/font/local'
import { ReactNode } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Cormorant_Garamond } from 'next/font/google'

const heroFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-hero'
})

// Fuente custom
const zanovaFont = localFont({
    src: [
        {
            path: './fonts/engry.otf',
            weight: '400',
            style: 'normal'
        }
    ],
    variable: '--font-zanova'
})

const igFont = localFont({
    src: [
        {
            path: './fonts/ig_regular.otf',
            weight: '400',
            style: 'normal'
        }
    ],
    variable: '--font-ig'
})



export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${zanovaFont.variable} ${igFont.variable} ${heroFont.variable}`}>
      <body className="min-h-[100dvh] overflow-x-hidden text-white">
        <Header />
        <div className="h-16"> {/* espacio igual al header */} </div>
        {children}
        <Footer />
      </body>
    </html>
  )
}

