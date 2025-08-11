import React from 'react'
import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: React.ReactNode;
    imageSrc: string;
}
const AuthLayout = ({children, title,subtitle, imageSrc}: AuthLayoutProps) => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="sm:bg-white sm:rounded-2xl sm:shadow-xl sm:p-7 flex sm:flex-row flex-col items-center md:py-10 justify-center max-sm:justify-between md:gap-20 gap-10 max-w-[950px] w-full sm:border-[0.5px] sm:border-gray-200 max-sm:h-screen ">
                <Image src={imageSrc} alt="login" width={346} height={345} className="max-sm:pt-15 md:scale-105 object-contain"/>
                <div className="flex flex-col gap-10 md:max-w-[410px] w-full bg-white rounded-2xl max-sm:border-[0.5px] max-sm:border-gray-200 max-sm:p-7 max-sm:items-center max-sm:h-full">
                    <div className="flex flex-col gap-3 max-sm:text-center">
                        <h1 className="text-4xl font-satoshi font-bold">{title}</h1>
                        {subtitle}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}
export default AuthLayout
