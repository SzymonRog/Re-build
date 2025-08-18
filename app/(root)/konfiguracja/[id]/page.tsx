'use client'
import React from 'react'
import Compatibility from "@/components/dashboard/Compatibility";
import ComponentList from "@/components/dashboard/v0/ComponentList";
import PriceSummary from "@/components/dashboard/v0/PriceSummary";
import BuildInfo2 from "@/components/dashboard/v0/BuildInfo2";
import ActionBar from "@/components/dashboard/ActionBar";

const Page = () => {


    return (

        <>
            <div className="lg:flex flex-col gap-8 md:p-15 p-4  lg:items-center  w-full hidden">
                <ActionBar/>
                <div className="flex flex-row gap-8 justify-center w-full max-w-[1700px]">
                    <div className="flex flex-col gap-8 md:max-w-[400px] w-full">

                        <BuildInfo2/>
                        <Compatibility/>
                        <PriceSummary/>
                    </div>
                    <ComponentList/>
                </div>
            </div>

            <div className="max-lg:flex flex-col gap-3 md:p-15 py-4  lg:items-center  w-full hidden">
                <div className="flex flex-col gap-2 justify-center w-full max-w-[2000px]">
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
