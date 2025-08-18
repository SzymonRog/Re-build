'use client'
import React, {useEffect} from 'react'
import {redirect} from "next/navigation";

const Page = () => {
    useEffect(() => {
        redirect('dodaj/any')
    }, []);
    return (
        <section>
            <div>
                <div className="flex flex-row justify-between">
                    <h2>Wybierz Komponent który cie interesuje</h2>
                </div>
            </div>
        </section>
    )
}
export default Page
