import React from 'react'
import { NavbarAnim } from './animations'


const navbar = () => {
    return (
        <>
            <nav className='w-full h-[64px] pt-[12px] pb-[12px] text-white bg-black'>
                <NavbarAnim>
                    <div className='pr-[64px] pl-[114px] flex'>
                        <ul>
                            <li className='text-[24px] mt-[2px]'>
                                <a href="/" className=' pl-[5px]'>Uber</a>    {/*Uber*/}
                            </li>
                        </ul>
                        <ul className='w-full mx-[10px] flex font-medium text-[14px]'>
                            <li className='flex items-center ml-3 justify-center'><a href="/Customer/ride" className='flex justify-center items-center rounded-2xl w-[58px] h-[36px] hover:bg-GG duration-200'>Ride</a></li>
                            <li className='flex items-center ml-1 justify-center'><a href="/Driver/HomePage" className='flex justify-center items-center rounded-2xl w-[58px] h-[36px] hover:bg-GG duration-200'>Drive</a></li>
                            <li></li>
                        </ul>
                        <ul className='w-[270px] h-[36px] flex justify-center gap-2 pr-7 mt-[2px]'>
                            <button className={`w-[62px] font-medium text-[14px] rounded-3xl hover:bg-GG duration-200`}>< a href="/homepage/login-options">
                                Log in</a>
                            </button>
                            <button className={`w-fit h-full rounded-3xl px-[12px] pb-0 text-[14px] bg-white text-black font-medium cursor-pointer hover:bg-gray-300 duration-200`}>< a href="/homepage/signup-options">
                                Sign up</a>
                            </button>
                        </ul>
                    </div >
                </NavbarAnim>
            </nav >
        </>
    )
}

export default navbar