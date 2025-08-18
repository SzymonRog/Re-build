'use client'

import React, {useEffect, useRef, useState} from 'react'
import { useBuildStore } from '@/store/buildStore'
import Image from "next/image";
import Link from "next/link";
import {useUserStore} from "@/store/user";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {toast} from "sonner";





const BuildNavbar = ({setSidebarOpen} : { setSidebarOpen: (val: boolean) => void }) => {
    const name = useBuildStore((s) => s.name)
    const totalPrice  = useBuildStore((s) => s.totalPrice)
    const user = useUserStore(state => state.user)
    const [open, setOpen] = useState(false)
    const errors = useBuildStore((s) => s.errors)
    const filtredErrors = errors?.filter(error => error.type === 'incompatible')
    const hasErrors = filtredErrors && filtredErrors.length > 0
    const [hasScrolled, setHasScrolled] = useState(true)
    const [atTop, setAtTop] = useState(true);
    const lastScrollY = useRef(0)


    async function handleLogout() {
        try{
            await fetch('/api/auth/logout', {method: 'POST'})
            window.location.href = '/auth/login'
            toast('Urzytkownik został wylogowany nastąpi przekierowanie')
            return;
        }catch (e) {
            console.error(e)
        }

    }

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            setAtTop(currentY === 0);

            if (currentY === 0) {
                // jesteśmy na górze -> navbar normalnie
                setHasScrolled(true);
            } else if (currentY > lastScrollY.current) {
                // scroll w dół -> chowamy navbar
                setHasScrolled(false);
            } else if (currentY < lastScrollY.current) {
                // scroll w górę -> pokazujemy navbar fixed
                setHasScrolled(true);
            }

            lastScrollY.current = currentY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <>
            <header className={`navbar-container-build transition-transform duration-300 ease-in-out
        max-md:${!atTop && hasScrolled ? 'fixed translate-y-0  top-0 z-10' : ''}
        ${!atTop && !hasScrolled ? "max-md:translate-y-[-100%]" : ""}`}>
                <div className="flex items-center justify-between w-full max-md:flex-wrap">
                    <div className="flex items-center gap-10">
                        <div className="flex flex-row items-center gap-4">
                            <Image src="/logo.png" alt="re-build logo" width={43} height={47}/>
                            <h3 className="text-2xl font-bold font-inter text-primary">Re-Build</h3>
                        </div>
                        <h3 className="text-md max-md:hidden "><span
                            className="opacity-75 text-md">Konfiguracja:  </span>{name ? name : name}</h3>
                    </div>
                    <div className="flex gap-6 font-inter items-center">
                        <h3 className="text-md max-md:hidden "><span
                            className="opacity-75 text-md">Suma:  </span>{totalPrice ? `${totalPrice} zł` : '0 zł'}</h3>
                        <div className="flex flex-row gap-2 font-lg justify-center items-center max-md:hidden">
                            {user ?
                                (<p>Witaj {user.name}</p>)
                                :
                                (<><Link href="/auth/register">Stwórz konto</Link>
                                    <span>|</span>
                                    <Link href="/auth/login">Zaloguj się</Link></>)
                            }

                        </div>
                        {user ? (

                                <DropdownMenu open={open} onOpenChange={setOpen}>
                                    <DropdownMenuTrigger asChild>
                                        <Image src="/account.svg" alt="account icon" width={40} height={40}
                                               className="cursor-pointer"/>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => {
                                        }}>Zarządzaj kontem</DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleLogout}>Wyloguj się</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                            ) :
                            (
                                <Link href="/auth/login">
                                    <Image src="/account.svg" alt="account icon" width={40} height={40}/>
                                </Link>
                            )}

                    </div>
                    <div
                        className="basis-full max-md:w-full mt-4 flex justify-between flex-row items-center gap-4 md:hidden">
                        <div className="hamburger-menu">
                            <button onClick={() => setSidebarOpen(true)}><Image src="/menu.svg" alt="menu" width={33}
                                                                                height={33} className="opacity-75"/>
                            </button>
                        </div>
                        {hasErrors ? (
                            <div
                                className="flex flex-row gap-2 bg-white px-2 py-1.5 rounded-xl justify-between shadow-md">
                                <Image src="/error.svg" alt="error" width={24} height={24}/>
                                <h3>Nie Kompatybilne</h3>
                            </div>
                        ) : (
                            <div
                                className=" px-3 py-2 group bg-white w-full flex rounded-xl border border-gray-50 focus-within:border-2 focus-within:border-gray-500 transition-colors duration-200 ">
                                <input
                                    placeholder="Wyszukaj"
                                    className=" w-full rounded-xl outline-none"
                                />
                                <Image src="/search.svg" alt="search" width={24} height={24} className="opacity-75"/>
                            </div>
                        )}


                    </div>
                </div>
            </header>
            {!atTop && hasScrolled && <div className={'max-md:h-[145px] max-md:w-full'}/>}
        </>
    )
}
export default BuildNavbar

