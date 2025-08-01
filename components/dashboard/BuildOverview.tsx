import React from 'react'
import {useBuildStore} from "@/store/buildStore";
import ComponentInfo from "@/components/dashboard/ComponentInfo";
import Image from "next/image";


const BuildOverview = () => {
    const components = useBuildStore(state => state.components);
    const desiredOrder = ["cpu","cpuCooler", "motherboard", "ram", "storage", "gpu", "psu", "case"];
    const sortedComponents = components.slice().sort((a, b) => {
        const indexA = desiredOrder.indexOf(a.type)
        const indexB = desiredOrder.indexOf(b.type);
        return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB)
    })

    return (
        <div className="bg-[#F1F5F9] rounded-2xl p-5 py-8 flex flex-col gap-3 w-full shadow-xl">
            {sortedComponents.length > 0 ? sortedComponents.map((component,index) => (
                <div key={index}>
                    <ComponentInfo key={component.id} componentData={component}/>
                    {index !== sortedComponents.length - 1 && <hr className="border-black border-0.5"/>}
                </div>
            )) : (

                <div className="flex sm:flex-row flex-col lg:justify-between justify-center gap-10 max-sm:gap-0 px-7 max-sm:items-center justify-center w-full lg:h-full lg:px-20">
                    <div className="flex flex-col gap-4 max-sm:text-center h-full justify-center">
                        <h3 className="font-satoshi text-3xl font-medium">W trakcie przygotowań !</h3>
                        <p className="font-satoshi text-md">Wybierz Pierwsze komponenty by je tu zobaczyc i sprawdzic ich kompatybilnosć</p>

                    </div>

                    <div className="flex lg:h-full lg:w-[324px] max-sm:scale-60 lg:scale-90 scale-0.8 items-center">
                        <Image src="/roboticArm.png" alt="robotic arm" width={324} height={200}
                                className="transform  scale-x-[-1] object-fill "/>
                    </div>

                </div>
            )}
        </div>
    )
}
export default BuildOverview
