'use client'

import {motion, useScroll, useTransform} from 'framer-motion'
import Link from "next/link"
import {ShoppingCart, Mail} from "lucide-react"

export default function Header() {
    const {scrollY} = useScroll()
    const opacity = useTransform(scrollY, [20, 90], [0, 1])
  const height = useTransform(scrollY, [20, 90], ['0px', '56px'])

    return (
        <motion.header
              style={{ opacity, height }}
      className="fixed top-0 left-0 w-full z-30 backdrop-blur-md transition-colors bg-white">

            <div className="flex items-center h-full px-4">

                <div className="flex-1">
                    <Link href="/products">
                        <button
                            className="p-2 hover:opacity-70 text-gray-400 hover:text-gray-600 transition-colors">
                            <ShoppingCart className="w-5 h-5"/>
                        </button>
                    </Link>
                </div>
               <Link href="/">
                <div className="flex-none text-center">
                </div>
                </Link>

                <div className="flex-1 text-right">
                    <Link href="/contacto">
                        <button
                            className="p-2 hover:opacity-70 text-gray-400 hover:text-gray-600 transition-colors">
                            <Mail className="w-5 h-5"/>
                        </button>
                    </Link>
                </div>

            </div>
        </motion.header>
    )
}
