import React, {ReactNode} from 'react'
import Image from "next/image";


interface ComponentButtonProps {
    type?: string;
    isActive: boolean;
    onClick: () => void;
    isAdded?: boolean;
    hasError?: boolean;
    children: ReactNode;
}

const ComponentButton: React.FC<ComponentButtonProps> = ({ type,isActive, onClick, children, isAdded, hasError }) => {
    return (
        <button
            className={`px-4 py-2 border-1  transition rounded-lg w-full ${hasError ? 'hover:border-transparent border-rose-600' : ''}  ${isActive ? " border-transparent opacity-100 bg-[#0071C5] text-white font-medium border-[#0071C5]" : "hover:text-white hover:bg-[#6398e3] bg-white hover:opacity-100 opacity-75"}`}
            onClick={onClick}
        >
            <div className="flex justify-between items-center">
                {children}
                <div className={`bg-[#E2E8F0] ${hasError ? 'rounded-full' : 'rounded-sm'} ${type === 'any' ? 'invisible' : ''}`}>
                    {type === 'any'}{hasError ? (<Image src="/error.svg" alt="checkbox" width={18} height={18}/>) : (<Image src="/Checkbox.svg" alt="checkbox" width={18} height={18} className={isAdded ? '' : 'invisible'}/>)}
                </div>
            </div>

        </button>
    )
}
export default ComponentButton
