import React, {useState} from 'react'
import {useBuildStore} from "@/store/buildStore";

const BuildInfo = () => {
    const name = useBuildStore(state => state.name)
    const setName = useBuildStore((state) => state.setName)
    const totalPrice = useBuildStore(state => state.totalPrice)

    const [isEditing, setIsEditing] = useState(false)
    const [inputValue, setInputValue] = useState(name)
    const handleSave = () => {
        const trimmed = inputValue.trim()
        if(trimmed.length > 0 && trimmed){
            setName(trimmed)
        }
        setIsEditing(false)
    }
    return (
        <div className="flex flex-col bg-[#0071C5] rounded-2xl shadow-xl   p-8 pr-10 gap-4 w-full" >
            <div className="flex flex-col gap-2 w-full">

                <h4 className="text-white text-md font-inter">Konfiguracja:</h4>

                <div className="flex flex-row gap-3  items-end">
                    {isEditing ? (
                        <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                        autoFocus
                        maxLength={20}
                        className="text-white text-lg font-satoshi font-medium bg-transparent border-b border-white outline-none"
                        />
                    ): (
                        <>
                            <h2 className="text-white text-xl font-satoshi font-medium">{name}</h2>
                            <button
                                onClick={() => {
                                    setInputValue(name)
                                    setIsEditing(true)
                                }}
                                className="text-white text-sm opacity-75 pb-0.5 hover:underline"
                            >
                                zmień
                            </button>
                        </>
                    )}



                </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <h4 className="text-white text-md font-inter">Suma:</h4>
                <h2 className="text-white text-4xl font-satoshi font-medium">{totalPrice} zł</h2>
            </div>
        </div>
    )
}
export default BuildInfo
