"use client"

import React from 'react'
import Image from "next/image";
import LoginForm from "@/components/auth/LoginForm";


const Page = () => {

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-7 flex flex-row items-center  max-w-[850px] w-full border-[0.5px] border-gray-200">
                <Image src="/login.png" alt="login" width={340} height={384}/>
                <LoginForm/>
            </div>
        </div>
    )
}
export default Page
