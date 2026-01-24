'use client'

import {motion, useScroll, useTransform} from 'framer-motion'
import Link from "next/link"
import {ShoppingCart, Mail} from "lucide-react"

export default function Header() {
    const {scrollY} = useScroll()
    const opacity = useTransform(scrollY, [
        0, 100
    ], [1, 0.9])

    return (
        <motion.header
            style={{
                opacity
            }}
            className="sticky top-0 z-50 h-16 bg-white shadow-md">
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
                    <h1 className="text-3xl font-bold font-zanova text-black grow-3">
                        Zanova
                    </h1>
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
