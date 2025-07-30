import React from 'react'
import Image from "next/image";
import {PCComponent, useBuildStore} from "@/store/buildStore";
import { toast } from "sonner"

type ItemCardProps = {
    componentData: PCComponent
    isSelected?: boolean
}

const ItemCard = ({componentData,isSelected}: ItemCardProps) => {
    const {imageUrl, name, price} = componentData;
    const addComponent = useBuildStore(state => state.addComponent)
    function addComponentToBuild(component:PCComponent){
        addComponent(component)
        toast("Dodano komponent", {
            description: (<span className="text-black">{component.name} został dodany do zestawu.</span>),
        })
    }

    return (
        <div className={`bg-white rounded-xl flex flex-row justify-between gap-5 pr-4 pl-0 lg:pr-20 lg:pl-12 py-4 drop-shadow-sm w-full max-w-[1000px] ${isSelected ? 'border-[2] border-[#80B8E2]' : ''}`}>
            <Image src={imageUrl || ""} alt={name} width={150} height={150} className="sm:hidden object-contain"/>
            <div className="flex sm:flex-row flex-col justify-center sm:justify-between sm:items-center items-start gap-4 w-full">
                <div className="flex sm:flex-row gap-4 items-center">
                    <Image src={imageUrl || ""} alt={name} width={150} height={150} className="max-sm:hidden object-cover object-contain"/>
                    <div className="flex justify-center">
                        <h2 className="font-satoshi font-medium  text-xl">{name}</h2>
                    </div>
                </div>
                <div className="flex flex-col sm:gap-2  gap-4 justify-center sm:items-end items-start">
                    <h2 className="font-satoshi text-3xl ">{price} <span className="text-xl">zł</span></h2>
                    <button
                        onClick={() => addComponentToBuild(componentData)}
                        className="
                        bg-[#0071C5] text-white rounded-2xl px-10 py-2 font-satoshi
                        lg:text-lg sm:text-md text-md font-medium
                        transition
                        hover:bg-[#005a9e] hover:shadow-md
                        active:bg-[#003d6b] active:scale-95
                        focus:outline-none focus:ring-2 focus:ring-[#005a9e] focus:ring-offset-2">
                        Dodaj
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ItemCard


