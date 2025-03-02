import Link from 'next/link'
import React from 'react'

const TrendingBtn: React.FC = () => {
    return (
        <>
            <Link href={`/trending-now`} >
                <button
                    className="group relative bg-transparent h-16 w-64 border-2 border-[var(--soft-blue)] text-white text-base font-bold rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:border-pink-500 hover:text-pink-200 p-3 text-left before:absolute before:w-10 before:h-10 before:content[''] before:right-2 before:top-2 before:z-10 before:bg-indigo-500 before:rounded-full before:blur-lg before:transition-all before:duration-500 after:absolute after:z-10 after:w-16 after:h-16 after:content[''] after:bg-pink-400 after:right-6 after:top-4 after:rounded-full after:blur-lg after:transition-all after:duration-500 hover:before:right-10 hover:before:-bottom-4 hover:before:blur hover:after:-right-6 hover:after:scale-110"
                >
                    Popular Now
                </button>

            </Link>
        </>
    )
}

export default TrendingBtn