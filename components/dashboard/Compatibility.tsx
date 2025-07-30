import React from 'react'
import Image from "next/image";

const Compatibility = () => {
    return (
        <div className=" flex flex-col gap-4 bg-white shadow-xl rounded-2xl px-10 py-6 w-full">
            <div className="flex flex-row gap-2 justify-center items-center">
                <Image src="/check.svg" alt="checkmark" width={34} height={34}/>
                <h3 className="font-medium text-xl w-full">Kompatybilne</h3>
            </div>
            <p className="opacity-75 text-md">Wszystkie twoje podzespoły sa kompatybilne</p>
        </div>
    )
}
export default Compatibility
