"use client"

import React from 'react'
import Image from "next/image";
import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";


const Page = () => {

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="sm:bg-white sm:rounded-2xl sm:shadow-xl sm:p-7 flex sm:flex-row flex-col items-center justify-center gap-10  max-w-[850px] w-full sm:border-[0.5px] sm:border-gray-200 max-sm:h-screen ">
                <Image src="/login.png" alt="login" width={346} height={256} className="max-sm:py-10 max-sm:w-[324px] object-contain max-sm:h-[240px]"/>
                <div className="flex flex-col gap-10 w-full bg-white rounded-2xl max-sm:border-[0.5px] max-sm:border-gray-200 max-sm:p-7 max-sm:items-center max-sm:h-full">
                    <div className="flex flex-col gap-3 max-sm:text-center">
                        <h1 className="text-3xl font-satoshi font-bold">Zaloguj sie</h1>
                        <p className="text-md font-satoshi ">Nie masz jeszcze konta? <Link href="/auth/register" className="underline-offset-2 underline text-primary">Stwórz konto</Link></p>
                    </div>
                    <LoginForm/>
                </div>
            </div>
        </div>
    )
}
export default Page
