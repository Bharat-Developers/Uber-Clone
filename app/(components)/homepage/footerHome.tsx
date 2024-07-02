import React from 'react'
import { FooterAnim } from './animations'

const footer = () => {

    const footerData = [
        {
            heading: "Company",
            links: [
                "About us",
                "Our offerings",
                "Newsroom",
                "Investors",
                "Blog",
                "Careers",
                "AI",
                "Gift cards"
            ]
        },
        {
            heading: "Products",
            links: [
                "Ride",
                "Drive",
                "Deliver",
                "Eat",
                "Uber for Business",
                "Uber Freight",
            ]
        },
        {
            heading: "Global citizenship",
            links: [
                "Safety",
                "Diversity and Inclusion",
                "Sustainablility",
            ]
        },
        {
            heading: "Travel",
            links: [
                "Reserve",
                "Airports",
                "Cities",
            ]
        },
    ]



    return (
        <>
            <div className='flex flex-col justify-around w-full h-[650px] text-white pl-[170px] pt-7 bg-black'>
                {/* Help center */}
                <div className='space-y-2'>
                    <a href="/" className='text-[24px]'>Uber</a>  {/*24px*/}
                    <p><a href="/" className='text-[13px] hover:underline underline-offset-8'>Visit Help Center</a></p>  {/*16px*/}
                </div>


                <div className='flex gap-[210px] h-fit text-[14px] font-normal'>
                    {footerData.map((data, index) => {
                        return (
                            <>
                                <FooterAnim>
                                    <div key={index}>
                                        <div className='flex flex-col gap-[15px]'>
                                            <div className='text-[18px] font-medium mb-1'>{data.heading}</div>
                                            {data.links.map((link, linkIndex) => {
                                                return (
                                                    <>
                                                        <a key={linkIndex} href="/"><p className='w-fit hover:text-foot'>{link}</p></a>
                                                    </>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </FooterAnim>
                            </>
                        )
                    })}
                </div>

                {/* Social media links */}
                <div className='flex'>
                    <div className='flex w-[100px]'><a className='flex size-[48px] justify-center items-center rounded-lg hover:bg-GG duration-200' href=""><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><title>facebook</title><path d="M21.79 1H2.21C1.54 1 1 1.54 1 2.21v19.57c0 .68.54 1.22 1.21 1.22h10.54v-8.51H9.9v-3.33h2.86V8.71c0-2.84 1.74-4.39 4.27-4.39.85 0 1.71.04 2.56.13v2.97h-1.75c-1.38 0-1.65.65-1.65 1.62v2.12h3.3l-.43 3.33h-2.89V23h5.61c.67 0 1.21-.54 1.21-1.21V2.21C23 1.54 22.46 1 21.79 1Z" fill="currentColor"></path></svg></a></div>
                    <div className='w-[100px]'><a className='flex size-[48px] justify-center items-center rounded-lg hover:bg-GG duration-200' href=""><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><title>twitter</title><path d="M14.094 10.317 22.28 1H20.34l-7.11 8.088L7.557 1H1.01l8.583 12.231L1.01 23H2.95l7.503-8.543L16.446 23h6.546M3.649 2.432h2.978L20.34 21.639h-2.98" fill="currentColor"></path></svg></a></div>
                    <div className='w-[100px]'><a className='flex size-[48px] justify-center items-center rounded-lg hover:bg-GG duration-200' href=""><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><title>youtube</title><path d="M23 12s0-3.85-.46-5.58c-.25-.95-1-1.7-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46c-.95.25-1.69 1.01-1.94 1.96C1 8.15 1 12 1 12s.04 3.85.5 5.58c.25.95 1 1.7 1.95 1.96 1.71.46 8.59.46 8.59.46s6.88 0 8.6-.46c.95-.25 1.69-1.01 1.94-1.96.46-1.73.42-5.58.42-5.58Zm-13 3.27V8.73L15.5 12 10 15.27Z" fill="currentColor"></path></svg></a></div>
                    <div className='w-[100px]'><a className='flex size-[48px] justify-center items-center rounded-lg hover:bg-GG duration-200' href=""><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><title>linkedin</title><path d="M21.37 1H2.62C1.73 1 1 1.71 1 2.58v18.83c0 .88.73 1.59 1.62 1.59h18.75c.9 0 1.63-.71 1.63-1.59V2.58C23 1.71 22.27 1 21.37 1ZM7.53 19.75H4.26V9.25h3.27v10.5ZM5.89 7.81C4.85 7.81 4 6.96 4 5.92s.84-1.89 1.89-1.89c1.04 0 1.89.85 1.89 1.89.01 1.04-.84 1.89-1.89 1.89Zm13.86 11.94h-3.26v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7v5.19H9.57V9.26h3.13v1.43h.04c.44-.83 1.5-1.7 3.09-1.7 3.3 0 3.91 2.17 3.91 5v5.76h.01Z" fill="currentColor"></path></svg></a></div>
                    <div className='w-[100px]'><a className='flex size-[48px] justify-center items-center rounded-lg hover:bg-GG duration-200' href=""><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><title>instagram</title><g fill="currentColor"><path d="M21.15 2.85C19.05.74 16.23 1 12 1 8.04 1 5 .69 2.85 2.85.74 4.95 1 7.77 1 12c0 3.95-.31 7 1.85 9.15C4.95 23.26 7.77 23 12 23c3.96 0 7 .31 9.15-1.85C23.25 19.05 23 16.23 23 12c0-4.31.24-7.07-1.85-9.15Zm-1.4 16.9c-1.37 1.37-3.18 1.27-7.75 1.27-4.29 0-6.34.15-7.75-1.27-1.44-1.44-1.27-3.51-1.27-7.75 0-4.23-.15-6.33 1.27-7.75C5.66 2.84 7.6 2.98 12 2.98c4.23 0 6.33-.15 7.75 1.27 1.38 1.38 1.27 3.22 1.27 7.75 0 4.24.15 6.34-1.27 7.75Z"></path><path d="M12 6.35a5.65 5.65 0 1 0 .001 11.301A5.65 5.65 0 0 0 12 6.35Zm0 9.32c-2.02 0-3.67-1.64-3.67-3.67 0-2.03 1.64-3.67 3.67-3.67 2.03 0 3.67 1.64 3.67 3.67 0 2.02-1.65 3.67-3.67 3.67ZM17.87 4.81c-.73 0-1.32.59-1.32 1.32 0 .73.59 1.32 1.32 1.32.73 0 1.32-.59 1.32-1.32 0-.73-.59-1.32-1.32-1.32Z"></path></g></svg></a></div>
                </div>
            </div >
        </>
    )
}

export default footer