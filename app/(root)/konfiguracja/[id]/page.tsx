'use client'
import React from 'react'
import { useBuildStore } from '@/store/buildStore'
import BuildInfo from "@/components/dashboard/BuildInfo";
import Compatibility from "@/components/dashboard/Compatibility";
import BuildOverview from "@/components/dashboard/BuildOverview";

const Page = () => {

    const name = useBuildStore(state => state.name)
    const components = useBuildStore(state => state.components)
    const totalPrice = useBuildStore(state => state.totalPrice)

    return (

            <div className="flex flex-col gap-8 md:p-15 p-4  lg:items-center  w-full">
                <div className="flex flex-row gap-8 justify-center w-full max-w-[2000px]">
                    <div className="flex flex-col gap-8 md:max-w-[400px] w-full">
                        <BuildInfo/>
                        <Compatibility/>
                    </div>
                    <BuildOverview/>
                </div>

            </div>

    )
}
export default Page
