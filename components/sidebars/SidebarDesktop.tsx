'use client'

import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import ComponentButton from "@/components/ComponentButton";

import {redirect, useParams, usePathname, useRouter} from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import {useBuildStore} from "@/store/buildStore";
import ProgressBar from "@/components/ProgresBar";
import { ArrowLeft } from 'lucide-react';
import {useBuildData} from "@/hooks/useBuildData";




const componentsPossible = [
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
    const params = useParams();
    const buildId = useBuildData().buildId
    const isAdding = pathname.includes('/dodaj');
    const clearBuild = useBuildData().clearBuild
    const components = useBuildData().components
    const addedTypes = new Set(components.map(c => c.type))
    const errors = useBuildData().errors


    const parts = pathname.split('/');
    const type = isAdding ? parts[parts.length - 1] : null;
    console.log(buildId)

    function handleClick(type:string){
        const URL = `/konfiguracja/${buildId ? buildId : 'nowa'}/dodaj/${type}`
        setSidebarOpen(false);
        router.push(URL)
        return 0;
    }
    return (
        <>
        {isAdding ? (
            <aside className="bg-[#E2E8F0] relative max-sm:px-10 md:px-4 px-15 md:py-4  py-15 flex flex-col gap-4  w-full min-h-screen justify-between overflow-y-auto">
                <button onClick={() => setSidebarOpen(false)} className="absolute top-7 right-15 md:hidden"><Image src={"/X.svg"} alt="X" width={25} height={25}/></button>
                <div className="relative flex flex-col gap-5">
                    <button
                        onClick={() => {
                            setSidebarOpen(false)
                            redirect(`/konfiguracja/${buildId ? buildId : 'nowa'}`)
                        }}
                        className="flex flex-row gap-2 items-center hover:text-white hover:bg-[#6398e3] p-1.5 rounded-xl transition">
                        <ArrowLeft className="w-5 h-5"/>
                        <h4 className="text-md">Podsumowanie</h4>
                    </button>
                    <div>
                        <ProgressBar errors={errors}/>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <h4 className="font-inter font-medium text-md">Kategorie</h4>
                            <hr className="border-black border-1 opacity-50" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <ComponentButton
                                type='any'
                                isActive={type === 'any'}
                                isAdded={addedTypes.has('any')}
                                onClick={() => handleClick('any')}
                            >
                                Wszystkie kategorie
                            </ComponentButton>
                            {componentsPossible.map((component) => (

                                    <ComponentButton
                                        key={component.type}
                                        type={component.type}
                                        isActive={type === component.type}
                                        isAdded={addedTypes.has(component.type)}
                                        onClick={() => handleClick(component.type)}
                                        hasError={errors.some(e => e.components?.some(c => c.type === component.type))}
                                    >

                                        {component.label}
                                    </ComponentButton>

                            ))}
                        </div>
                    </div>
                </div>

                <Link
                    href={`/konfiguracja/${buildId ? buildId : 'nowa'}`}
                    onClick={() => setSidebarOpen(false)}
                    className="
                    md:max-w-[214px] w-full
                    flex justify-center items-center
                    bg-[#0071C5] text-white font-medium
                    py-2 px-3 rounded-full
                    shadow-md
                    transition-all duration-300
                    hover:bg-[#005a9e] hover:shadow-lg hover:scale-[1.03]
                    active:scale-[0.97] active:bg-[#004c82]
                    focus:outline-none focus:ring-2 focus:ring-[#0071C5]/50
                    fixed bottom-3 left-4"
                >
                    <span className="text-center">Podsumowanie</span>
                </Link>

            </aside>)
            :
            (
                <aside className="bg-[#E2E8F0] relative md:px-4 px-15 md:py-5 py-20 flex flex-col gap-4 w-full min-h-screen justify-between">
                    <button onClick={() => setSidebarOpen(false)} className="absolute top-7 right-15 md:hidden">
                        <Image src={"/X.svg"} alt="X" width={25} height={25} />
                    </button>

                    <div className="flex flex-col gap-10">
                        <ProgressBar errors={errors}/>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-[15px]">
                                {/* Dodaj komponenty */}
                                <button
                                    className="px-3 py-2 rounded-xl w-full bg-white "
                                    onClick={() => handleClick('any')}
                                >
                                    <div className="flex justify-start gap-2 items-center md:text-start text-center">
                                        <Image src="/add_icon.svg" alt="add icon" width={24} height={24} />
                                        <h3 className="w-full">Dodaj komponenty</h3>
                                    </div>
                                </button>


                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <button className="px-3 py-2 rounded-xl w-full bg-white text-rose-700">
                                            <div className="flex justify-start gap-5 items-center md:text-start text-center">
                                                <Image src="/trashIcon.svg" alt="add icon" width={24} height={24} />
                                                <h3 className="w-full">Usuń zestaw</h3>
                                            </div>
                                        </button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Potwierdź usunięcie buildu</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Na pewno chcesz usunąć cały build? Tej operacji nie da się cofnąć.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Anuluj</AlertDialogCancel>
                                            <AlertDialogAction
                                                className="bg-red-600 text-white px-4 py-2 rounded-md"
                                                onClick={() => {
                                                    clearBuild()
                                                    setSidebarOpen(false)
                                                }}
                                            >
                                                Usuń
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </div>

                    {/* Edytuj link */}
                    <Link
                        href={`/konfiguracja/${buildId ? buildId : 'nowa'}/dodaj`}
                        onClick={() => setSidebarOpen(false)}
                        className="
                    md:max-w-[214px] w-full
                    flex justify-center items-center
                    bg-[#0071C5] text-white font-medium
                    py-2 px-3 rounded-full
                    shadow-md
                    transition-all duration-300
                    hover:bg-[#005a9e] hover:shadow-lg hover:scale-[1.03]
                    active:scale-[0.97] active:bg-[#004c82]
                    focus:outline-none focus:ring-2 focus:ring-[#0071C5]/50
                    fixed bottom-3 left-4"
                    >
                        <span className="text-center">Edytuj</span>
                    </Link>
                </aside>
            )}
        </>
    )
}
export default SidebarDesktop
