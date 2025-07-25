import React from 'react'
import Image from "next/image";

type ItemCardProps = {
    name: string
    price: number
    imageUrl: string
}

const ItemCard = ({name, price, imageUrl}: ItemCardProps) => {
    return (
        <div className="bg-white rounded-xl flex flex-row justify-between gap-5 pr-4 pl-0 lg:pr-20 lg:pl-12 py-4 drop-shadow-sm w-full max-w-[1000px]">
            <Image src={imageUrl} alt={name} width={150} height={150} className="sm:hidden object-contain"/>
            <div className="flex sm:flex-row flex-col justify-center sm:justify-between sm:items-center items-start gap-4 w-full">
                <div className="flex sm:flex-row gap-4 items-center">
                    <Image src={imageUrl} alt={name} width={150} height={150} className="max-sm:hidden object-cover object-contain"/>
                    <div className="flex justify-center">
                        <h2 className="font-satoshi font-medium  text-xl">{name}</h2>
                    </div>
                </div>
                <div className="flex flex-col gap-2 justify-center sm:items-end items-start">
                    <h2 className="font-satoshi text-3xl ">{price} <span className="text-xl">zł</span></h2>
                    <button className="bg-[#0071C5] text-white rounded-2xl px-3 py-3 font-satoshi  lg:text-lg sm:text-md  text-xs font-medium">
                        Dodaj do konfiguracji
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ItemCard


