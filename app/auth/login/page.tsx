"use client"

import React from 'react'
import Image from "next/image";
import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";
import AuthLayout from "@/components/layouts/AuthLayout";


const Page = () => {

    return (
        <AuthLayout
            imageSrc="/login.png"
            title="Zaloguj się"
            subtitle={
                <p className="text-lg font-satoshi">
                    Nie masz jeszcze konta?{" "}
                    <Link href="/auth/register" className="underline-offset-2 underline text-primary">
                        Stwórz konto
                    </Link>
                </p>
            }
        >
                    <LoginForm/>
        </AuthLayout>
    )
}
export default Page
