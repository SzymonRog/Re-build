import React, {ReactNode} from 'react'
import Image from "next/image";


interface ComponentButtonProps {
    type?: string;
    isActive: boolean;
    onClick: () => void;
    isAdded?: boolean;
    children: ReactNode;
}

const ComponentButton: React.FC<ComponentButtonProps> = ({ type, isActive, onClick, children, isAdded }) => {
    return (
        <button
            className={`px-4 py-3 border-2  transition rounded-2xl w-full  bg-white hover:border-[#0071C5]  ${isActive ? "opacity-100 font-medium border-[#0071C5] border-2" : "hover:opacity-75 opacity-50 border-transparent"}`}
            onClick={onClick}
        >
            <div className="flex justify-between items-center">
                {children}
                <div className="bg-[#E2E8F0] rounded-sm">
                     <Image src="/Checkbox.svg" alt="checkbox" width={18} height={18} className={isAdded ? '' : 'invisible'}/>
                </div>
            </div>

        </button>
    )
}
export default ComponentButton
