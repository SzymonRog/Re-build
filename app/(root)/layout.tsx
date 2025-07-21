import React from 'react'
import BuildNavbar from "@/components/navbars/BuildNavbar";
import SidebarDesktop from "@/components/sidebars/SidebarDesktop";


const RootLayout = ({children} : {children: React.ReactNode}) => {
    return (
        <section>
            <BuildNavbar/>
            <main>
                <div className="flex flex-row">
                    <SidebarDesktop/>
                    {children}
                </div>
            </main>
        </section>

    )}
export default RootLayout
