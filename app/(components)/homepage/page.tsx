import React from 'react'
import Image from 'next/image'
import Navbar from './navbar'
import { AFirstBlock } from './animations'
import Second from './images/second.webp'
import Third from './images/third.webp'
import Fourth from './images/fourth.webp'
import Fifth from './images/fifth.webp'
import GeneralBlock from './generalBlock'
import PageWrapper from './pageWrapper'

const homepage = () => {

    return (
        <>
            <div>
                <PageWrapper>
                    <Navbar />

                    {/* first block : "Go anywhere with Uber" */}
                    <div className='w-full h-[680px] bg-black px-[64px] py-[64px] content-center flex justify-center'>
                        <AFirstBlock />
                    </div>


                    {/* Second Block */}
                    <GeneralBlock
                        heading={"Drive when you want, make what you need"}
                        paras={"Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through Uber."}
                        linkBar={"Already have an account? Sign in"}
                        picture={Second}
                        TrowRev={true}
                        Tfstc={'text-[52px] text-black'}
                        Theight={'h-[383px]'}
                        Tmt={'mt-8'}
                        TupperHalf={''}
                        button={"Get started"}
                        TspecialCaseWMB={'w-[135px] mt-[0px]'}
                    />


                    {/* Third Block */}
                    <GeneralBlock
                        heading={"The Uber you know, reimagined for business"}
                        paras={"Uber for Business is a platform for managing global rides and meals, and local deliveries, for companies of any size."}
                        linkBar={"Check out our solutions"}
                        picture={Third}
                        TrowRev={false}
                        Tfstc={'text-[52px] text-GG'}
                        Theight={'h-[390px] mb-[-13px]'}
                        Tmt={'text-GG pt-3 mt-7'}
                        TupperHalf={'pt-1 mb-3'}
                        button={"Get started"}
                        TspecialCaseWMB={'w-[135px]'}
                    />


                    {/*Fourth block*/}
                    <GeneralBlock
                        heading={"Make money by renting out your car"}
                        paras={"Connect with thousands of drivers and earn more per week with Uber’s free fleet management tools."}
                        linkBar={''}
                        picture={Fourth}
                        TrowRev={true}
                        Tfstc={'text-[36px] text-black'}
                        Theight={'h-[240px]'}
                        Tmt={''}
                        TupperHalf={'flex flex-col pb-6'}
                        button={"Get started"}
                        TspecialCaseWMB={'w-[135px]'}
                    />

                    {/* Fifth Block */}
                    <GeneralBlock
                        heading={"Check out what's new at Uber"}
                        paras={"The products and features announced at Go-Get 2024 are designed to help you connect with others and save a little money along the way. Discover how we’re making every journey an opportunity for interaction—because life is better together."}
                        linkBar={''}
                        picture={Fifth}
                        TrowRev={false}
                        Tfstc={'text-[52px] text-black'}
                        Theight={'h-[383px]'}
                        Tmt={'mt-8'}
                        TupperHalf={'flex flex-col'}
                        button={"Watch the event"}
                        TspecialCaseWMB={'w-[173px] mb-[-10px]'}
                    />
                </PageWrapper>

            </div>
        </>
    )
}

export default homepage