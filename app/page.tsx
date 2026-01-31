'use client'

import {motion} from 'framer-motion'

const INSTAGRAM_URL = 'https://www.instagram.com/zanova.zn/'

export default function Landing() {
    return (
        <div
            className="fixed inset-0 z-10 flex items-center justify-centerflex flex-col min-h-[100dvh]  text-pearl">
                <div className="absolute top-[20%]">
            <motion.a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                    scale: 1.05
                }}
                className="">
                <div className="flex flex-col">
                    <h2 className="text-1.5xl font-times text-center">
                        Proximamente
                    </h2>
                    <h1 className="text-2xl font-bold text-center font-zanova">Tienda Zanova</h1>

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
                className="flex items-center justify-center">
                <div className="flex flex-col">

                    <h1
                        className="text-3xl f text-center font-ig  drop-shadow-lg flex flex-col items-center">
                        <span className="text-1.5xl font-times drop-shadow-lg -mb-2 mt-[clamp(1rem,1vh,2rem)]">
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
        </div>
    )
}
