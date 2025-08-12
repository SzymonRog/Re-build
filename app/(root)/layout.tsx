'use client'

import {useState, useEffect} from 'react'
import BuildNavbar from "@/components/navbars/BuildNavbar";
import SidebarDesktop from "@/components/sidebars/SidebarDesktop";


const RootLayout = ({children} : {children: React.ReactNode}) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) return null;

    return (
        <section>
            <BuildNavbar setSidebarOpen={setIsSidebarOpen}/>
            <main>
                <div className="flex flex-row w-full max-md:px-5">
                    <div className={`
                         md:max-w-[250px] md:w-full                  
                         max-md:fixed max-md:top-0 max-md:left-0 max-md:z-50 max-md:w-screen max-md:h-screen
                         transform transition-transform duration-300 ease-in-out
                   
                         ${isSidebarOpen ? 'translate-x-0' : 'max-md:-translate-x-full'}          
                    `}><SidebarDesktop setSidebarOpen={setIsSidebarOpen}/></div>
                    {children}
                </div>
            </main>
        </section>

    )}
export default RootLayout
