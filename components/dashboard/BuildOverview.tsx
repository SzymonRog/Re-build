import React from 'react'
import {useBuildStore} from "@/store/buildStore";
import ComponentInfo from "@/components/dashboard/ComponentInfo";

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
            {sortedComponents.map((component) => (
                <ComponentInfo key={component.id} componentData={component}/>
            ))}
        </div>
    )
}
export default BuildOverview
