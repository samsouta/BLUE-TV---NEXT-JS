import Image from 'next/image'
import React from 'react'
import logo from '../../../../public/img/logo.png'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href='/home' >
      <div className="flex cursor-pointer items-center gap-2">
        <Image
          src={logo}
          alt="Blue TV logo" className=' w-16 h-16' />
      </div>
    </Link>

  )
}

export default Logo