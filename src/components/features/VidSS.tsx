import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const VidSS = () => {
  return (
    <>
    <Link href='/home' prefetch={true} >
      <div className="flex cursor-pointer items-center gap-2">
        <Image
          src={logo}
          alt="Blue TV logo" className=' w-16 h-16' />
      </div>
    </Link>
    </>
  )
}
