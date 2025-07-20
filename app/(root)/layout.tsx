import React from 'react'
import BuildNavbar from "@/components/navbars/BuildNavbar";


const RootLayout = ({children} : {children: React.ReactNode}) => {
    return (
        <div>
            <BuildNavbar/>
            <main>
                {children}
            </main>

        </div>

    )}
export default RootLayout
