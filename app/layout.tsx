import './globals.css'
import localFont from 'next/font/local'
import { ReactNode } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'


// Fuente custom
const zanovaFont = localFont({
  src: [{ path: './fonts/engry.otf', weight: '400', style: 'normal' }],
  variable: '--font-zanova',
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={zanovaFont.variable}>
      <body className="bg-white text-light-black">
        <Header />
        <main className="">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

