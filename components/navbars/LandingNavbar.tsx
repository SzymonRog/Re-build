import React from 'react'
import Link from "next/link";
import Image from "next/image";

const LandingNavbar = () => {
    return (
        <header className="navbar-container">
            <div className="flex items-center justify-between max-w-[1600px] w-full">
                <h3 className="font-satoshi text-2xl font-bold">Re-Build</h3>
                <div className="flex gap-6">
                    <div className="flex flex-row gap-6 font-lg justify-center items-center max-sm:hidden">
                        <Link href="/auth/register">Stwórz konto</Link>
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
export default LandingNavbar
