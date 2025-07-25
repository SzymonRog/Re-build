import React from 'react'
import BuildNavbar from "@/components/navbars/BuildNavbar";
import SidebarDesktop from "@/components/sidebars/SidebarDesktop";


const RootLayout = ({children} : {children: React.ReactNode}) => {
    return (
        <section>
            <BuildNavbar/>
            <main>
                <div className="flex flex-row w-full max-md:px-5">
                    <div className="max-md:hidden max-w-[250px] w-full"><SidebarDesktop/></div>
                    {children}
                </div>
            </main>
        </section>

    )}
export default RootLayout
