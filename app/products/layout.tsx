
import { ReactNode } from 'react'
import Footer from '../components/Footer'




export default function RootLayout({ children }: { children: ReactNode }) {
  return (
        <div>
            {children}
            <Footer />
        </div>
        
  )
}

