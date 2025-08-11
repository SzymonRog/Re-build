import React from 'react'
import AuthLayout from "@/components/layouts/AuthLayout";
import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";

const Page = () => {
    return (
        <AuthLayout
            title="Zarejestruj się"
            imageSrc="/register.png"
            subtitle={
                <p className="text-lg font-satoshi">
                    Masz już konto? Nie trać czasu{" "}
                    <Link href="/auth/login" className="underline-offset-2 underline text-primary hover:text-lg transition">
                        Zaloguj się
                    </Link>
                </p>
            }
        >
            <RegisterForm/>
        </AuthLayout>
    )
}
export default Page
