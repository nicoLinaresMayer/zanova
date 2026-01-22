'use client'

import {motion} from 'framer-motion'

const INSTAGRAM_URL = 'https://www.instagram.com/zanova.zn/'

export default function Landing() {
    return (
        <div
            className="flex flex-col items-center justify-center min-h-[90px] gap-1 p-4 ">

            <motion.a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                    scale: 1.05
                }}
                className="flex items-center justify-center gap-2 mt-3 mb-8">
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-center text-white">
                        Proximamente
                    </h2>
                    <h1 className="text-2xl font-bold text-center font-zanova text-white">Tienda Zanova</h1>

                </div>

            </motion.a>

            <motion.a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                    scale: 1.05
                }}
                whileTap={{
                    scale: 0.95
                }}
                className="flex items-center justify-center mb-6">
                <div className="flex flex-col pr-">

                    <h1
                        className="text-3xl f text-center font-ig text-white drop-shadow-lg flex flex-col items-center">
                        <span className="text-2xl font-times text-white drop-shadow-lg -mb-1">
                            Visitanos en
                        </span>
                        Instagram
                    </h1>
                </div>

                <motion.svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 20" stroke="white" className="w-6 h-6 mt-9" animate={{
                        x: [
                            5, 10, 5
                        ],
                        rotate: [90, 90, 90]
                    }}
                    // mueve y rota suavemente
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut"
                    }}>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"/>
                </motion.svg>
            </motion.a>

        </div>
    )
}
