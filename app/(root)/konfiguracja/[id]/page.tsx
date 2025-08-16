'use client'
import React from 'react'
import { useBuildStore } from '@/store/buildStore'
import BuildInfo from "@/components/dashboard/BuildInfo";
import Compatibility from "@/components/dashboard/Compatibility";
import BuildOverview from "@/components/dashboard/BuildOverview";
import ComponentList from "@/components/dashboard/v0/ComponentList";
import PriceSummary from "@/components/dashboard/v0/PriceSummary";
import BuildInfo2 from "@/components/dashboard/v0/BuildInfo2";

const Page = () => {

    const name = useBuildStore(state => state.name)
    const components = useBuildStore(state => state.components)
    const totalPrice = useBuildStore(state => state.totalPrice)

    return (

        <>
            <div className="lg:flex flex-col gap-8 md:p-15 p-4  lg:items-center  w-full hidden">
                <div className="flex flex-row gap-8 justify-center w-full max-w-[2000px]">
                    <div className="flex flex-col gap-8 md:max-w-[400px] w-full">

                        <BuildInfo2/>
                        <Compatibility/>
                        <PriceSummary/>
                    </div>
                    <ComponentList/>
                </div>
            </div>

            <div className="max-lg:flex flex-col gap-8 md:p-15 p-4  lg:items-center  w-full hidden">
                <div className="flex flex-col gap-8 justify-center w-full max-w-[2000px]">
                    <BuildInfo2/>
                    <ComponentList/>
                    <PriceSummary/>
                    <Compatibility/>
                </div>
            </div>
        </>

    )
}
export default Page
