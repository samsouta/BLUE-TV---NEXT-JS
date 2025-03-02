import { ArrowUp } from 'lucide-react'
import React from 'react'


const GoUpBtn: React.FC = () => {
    return (
        <>
            <button
                className="cursor-pointer  borde bg-black/80 border-pink-400 backdrop:blur-sm px-3 py-2 rounded-md text-white tracking-wider shadow-xl animate-bounce hover:animate-none"
            >
                <ArrowUp/>
            </button>

        </>
    )
}

export default GoUpBtn