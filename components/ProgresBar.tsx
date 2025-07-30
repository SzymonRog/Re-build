import React from 'react'
import { Progress } from "@/components/ui/progress"
import {useBuildStore} from "@/store/buildStore";
import {cn} from "@/lib/utils";

const ProgressBar = () => {
    const components = useBuildStore(state => state.components)
    const totalRequired = 8
    const uniqueTypes = new Set(components.map(component => component.type))
    const filled = uniqueTypes.size
    const percentage = (filled / totalRequired) * 100
    return (
        <div className="flex flex-col gap-3">
            <h3 className="font-inter font-medium text-lg">Twój Postęp</h3>
            <Progress value={percentage} className={cn("w-full h-[13px] bg-white [&>div]:bg-[#0071C5] rounded-full]", percentage === 100 && "[&>div]:bg-[#2FAE7F]")}/>
        </div>


    )
}
export default ProgressBar
