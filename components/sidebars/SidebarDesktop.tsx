'use client'

import {useState} from 'react'
import ComponentButton from "@/components/ComponentButton";
import {redirect, usePathname} from 'next/navigation';
import Link from "next/link";

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

const SidebarDesktop = () => {
    const pathname = usePathname();
    const isAdding = pathname.includes('/dodaj/');

    const parts = pathname.split('/');
    const type = isAdding ? parts[parts.length - 1] : null;

    return (
        <>
        {!isAdding ? (  <div className="bg-[#E2E8F0] px-4 py-5 flex flex-col gap-4 max-w-[250px] w-full h-screen justify-between">
                <div>
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
                                <>
                                    <ComponentButton
                                        key={component.type}
                                        type={component.type}
                                        isActive={type === component.type}
                                        onClick={() => redirect('/konfiguracja/nowa/dodaj/' + component.type,)}>
                                        {component.label}
                                    </ComponentButton>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center bg-[#0071C5] text-center py-3 rounded-full text-white">
                    <Link href="/konfiguracja/nowa">Podsumowanie</Link>
                </div>
            </div>) : (<div>Not this path</div>)}
        </>
    )
}
export default SidebarDesktop
