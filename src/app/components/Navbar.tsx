import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <div className='absolute top-0 w-full flex justify-between bg-primary text-tertiary font-bold p-5'>
      <Link href="/visx">
        Visx
      </Link>
      <Link href="/nivo">
        Nivo
      </Link>
      <Link href="/example3">
        Example 3
      </Link>
    </div>
  )
}

export default Navbar