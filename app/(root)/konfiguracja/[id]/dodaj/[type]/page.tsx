'use client'

import React from 'react';
import {usePathname} from "next/navigation";
import {dummyComponents} from "@/app/data/dummyComponents";
import ItemCard from "@/components/ItemCard";
import {useBuildStore} from "@/store/buildStore";

const Page = () => {

    const pathname = usePathname();
    const parts = pathname.split('/');
    const type =  parts[parts.length - 1];
    const curentPart = useBuildStore(state => state.components.find((c) => c.type === type))
    const activeId = curentPart?.id || null;


    const filtredComponents = dummyComponents.filter(component => component.type === type).sort(
        (a, b) =>{
            if(a.id === activeId) return -1;
            if(b.id === activeId) return 1;
            return 0;
        }
    )

    return (
        <section className="w-full h-full lg:justify-center flex flex-col ">
            <div className="w-full h-full px-3 py-10 lg:py-20 flex flex-col items-center">
                <div className="flex flex-row justify-between mb-8 max-w-[1000px] w-full">
                    <h2 className="font-satoshi font-bold text-lg">Masz do wyboru {filtredComponents.length} produkty z kategori &apos;{type}&apos; :</h2>
                </div>
                <div className="flex gap-4 flex-col max-w-[1000px] w-full">
                    {filtredComponents.map((component) => (
                        <ItemCard
                            key={component.id}
                            isSelected={activeId === component.id}
                            componentData={component}
                        />
                    ))}
                </div>

            </div>
        </section>
    )
}
export default Page
