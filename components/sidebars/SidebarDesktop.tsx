'use client'

import React from 'react'
import ComponentButton from "@/components/ComponentButton";
import {usePathname,useRouter} from 'next/navigation';
import Link from "next/link";
import Image from "next/image";


const components = [
    { type: 'cpu', label: 'Procesor' },
    { type: 'gpu', label: 'Karta graficzna' },
    { type: 'ram', label: 'Pamięć RAM' },
    { type: 'motherboard', label: 'Płyta główna' },
    { type: 'storage', label: 'Dysk SSD/HDD' },
    { type: 'psu', label: 'Zasilacz' },
    { type: 'case', label: 'Obudowa' },
    { type: 'cpuCooler', label: 'Chłodzenie CPU' },
];

const SidebarDesktop = ({setSidebarOpen} : { setSidebarOpen: (val: boolean) => void }) => {
    const router = useRouter();
    const pathname = usePathname();
    const isAdding = pathname.includes('/dodaj');

    const parts = pathname.split('/');
    const type = isAdding ? parts[parts.length - 1] : null;

    function handleClick(type:string){
        setSidebarOpen(false);
        router.push('/konfiguracja/nowa/dodaj/' + type)
        return 0;
    }
    return (
        <>
        {isAdding ? (  <div className="bg-[#E2E8F0] relative md:px-4 px-15 md:py-5 py-15 flex flex-col gap-4  w-full h-screen justify-between">
                <button onClick={() => setSidebarOpen(false)} className="absolute top-7 right-15 md:hidden"><Image src={"/X.svg"} alt="X" width={25} height={25}/></button>
                <div className="relative">

                    <div>
                        {/*   Progers Bar to do */}
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <h4>Wymagane</h4>
                            <hr/>
                        </div>
                        <div className="flex flex-col gap-[15px]">
                            {components.map((component) => (

                                    <ComponentButton
                                        key={component.type}
                                        type={component.type}
                                        isActive={type === component.type}
                                        onClick={() => handleClick(component.type)}>
                                        {component.label}
                                    </ComponentButton>

                            ))}
                        </div>
                    </div>
                </div>

                    <Link href="/konfiguracja/nowa" onClick={() => setSidebarOpen(false)} className="w-full flex justify-center  items-center bg-[#0071C5]  py-3 rounded-full text-white "><div className="text-center">Podsumowanie</div></Link>

            </div>)
            :
            (<div className="bg-[#E2E8F0] relative md:px-4 px-15 md:py-5 py-20 flex flex-col gap-4  w-full h-screen justify-between">
                <button onClick={() => setSidebarOpen(false)} className="absolute top-7 right-15 md:hidden"><Image src={"/X.svg"} alt="X" width={25} height={25}/></button>
                <div>
                    <div>
                        {/*   Progers Bar to do */}
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-[15px]">

                            <button
                                className={`px-4 py-3 rounded-2xl w-full bg-white `}
                             onClick={() => router.push('/konfiguracja/nowa/dodaj')}>
                                <div className="flex justify-start gap-2 items-center md:text-start text-center">
                                    <Image src="/add_icon.svg" alt="add icon" width={24} height={24} />
                                    <h3 className="w-full">Dodaj komponenty</h3>
                                </div>

                            </button>

                            <button
                                className={`px-4 py-3 rounded-2xl w-full bg-white`}
                            >
                                <div className="flex justify-start gap-5 items-center md:text-start text-center">
                                    <Image src="/trashIcon.svg" alt="add icon" width={24} height={24} />
                                    <h3 className="w-full">Usuń zestaw</h3>
                                </div>

                            </button>


                        </div>
                    </div>
                </div>
                    <Link href="/konfiguracja/nowa/dodaj" onClick={() => setSidebarOpen(false)}className="w-full flex justify-center  items-center bg-[#0071C5]  py-3 rounded-full text-white "><div className="text-center">Podsumowanie</div></Link>

            </div>)}
        </>
    )
}
export default SidebarDesktop
