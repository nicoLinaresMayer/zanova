'use client'
import './globals.css'
import localFont from 'next/font/local'
import {ReactNode} from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { ScrollProvider } from '../app/components/ScrollProvider'

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

export default function RootLayout({children} : {
    children: ReactNode
}) {
    return (
        <html lang="es" className={`${zanovaFont.variable} ${igFont.variable}`}>
            <body className="relative min-h-[100dvh]">

                <Header/>

                <main>
                     <ScrollProvider>
                    {children}
                    </ScrollProvider>
                </main>
                {/*<Footer/>*/}
            </body>
      
        </html>
    )
}
