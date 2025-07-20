'use client'

import React from 'react'
import { useConfigStore } from '@/store/config'
import Image from "next/image";
import Link from "next/link";

const BuildNavbar = () => {
    const name = useConfigStore((s) => s.name)
    return (
        <header className="navbar-container-build">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-10">
                    <div className="flex flex-row items-center gap-4">
                        <Image src="/logo.png" alt="re-build logo" width={43} height={47} />
                        <h3 className="text-2xl font-bold font-inter text-primary">Re-Build</h3>
                    </div>
                    <h3 className="text-md max-md:hidden "><span className="opacity-75 text-md">Konfiguracja:  </span>{name ? name : 'Bez_nazwy'}</h3>
                </div>
                <div className="flex gap-6 font-inter">
                    <div className="flex flex-row gap-2 font-lg justify-center items-center max-md:hidden">
                        <Link href="/auth/register">Stwórz konto</Link>
                        <span>|</span>
                        <Link href="/auth/login">Zaloguj się</Link>
                    </div>
                    <Link href="/auth/login">
                        <Image src="/account.svg" alt="account icon" width={40} height={40} />
                    </Link>
                </div>


            </div>

        </header>

    )
}
export default BuildNavbar

