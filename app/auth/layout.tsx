import React from 'react'
import { Toaster } from "@/components/ui/sonner"

const Layout = ({children} : {children: React.ReactNode}) => {
    return (
        <div>
            {children}
            <Toaster/>
        </div>
    )
}
export default Layout
