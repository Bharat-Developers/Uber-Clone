import React from 'react'
import { ANavbarElements } from './animations'

const navbar = () => {
    return (
        <>
            <nav className='w-full h-[64px] pt-[12px] pb-[12px] text-white bg-black'>
                <ANavbarElements />
            </nav >
        </>
    )
}

export default navbar