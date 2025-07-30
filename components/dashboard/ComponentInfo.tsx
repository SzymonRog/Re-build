import React, {JSX} from 'react'
import {PCComponent} from "@/store/buildStore";
import { Cpu,Fan, CircuitBoard, HardDrive,MemoryStick,Gpu, BatteryCharging, PcCase,CircleQuestionMark } from "lucide-react"
import { LucideIcon } from "lucide-react";

type ComponentsProps = {
    componentData: PCComponent,
}

const typeLabels: Record<string, string> = {
    cpu: "Processor",
    cpuCooler: "Chłodzenie CPU",
    motherboard: "Płyta główna",
    ram: "Pamięć RAM",
    storage: "Dysk",
    gpu: "Karta graficzna",
    psu: "Zasilacz",
    case: "Obudowa",
}

// const typeImages: Record<string, JSX.Element> = {
//     cpu: <Cpu className="w-full h-full"/>,
//     cpuCooler: <Fan className="w-full h-full"/>,
//     motherboard: <CircuitBoard className="w-full h-full"/>,
//     ram: <HardDrive className="w-full h-full"/>,
//     storage: <MemoryStick className="w-full h-full"/>,
//     gpu: <Gpu className="w-full h-full"/>,
//     psu: <BatteryCharging className="w-full h-full"/>,
//     case: <PcCase className="w-full h-full"/>,
// }
const typeImages: Record<string, LucideIcon> = {
    cpu: Cpu,
    cpuCooler: Fan,
    motherboard: CircuitBoard,
    ram: HardDrive,
    storage: MemoryStick,
    gpu: Gpu,
    psu: BatteryCharging,
    case: PcCase,
}

const ComponentInfo = ({componentData} : ComponentsProps) => {
    const {imageUrl, name,type, price} = componentData;
    const label = typeLabels[type] || 'Nieznany Typ';
    const Image = typeImages[type] || <CircleQuestionMark className="w-full h-full"/>;
    return (
        <>
            <div className="flex flex-row justify-between pr-10 px-2 gap-5 w-full">
                <div className="flex flex-row gap-5 items-center">
                    <Image className="w-8 h-8"/>
                    <div className="flex flex-col gap-2">
                        <span className="opacity-75">{label}:</span>
                        <h3 className="text-lg font-inter font-medium">{name}</h3>
                    </div>
                </div>
                <div className="flex flex-col gap-2 justify-center">
                    <span className="opacity-75">Cena:</span>
                    <h3 className="text-lg font-inter font-medium">{price} zł</h3>
                </div>

            </div>
            <hr className="border-black border-0.5"/>
        </>

    )
}
export default ComponentInfo
