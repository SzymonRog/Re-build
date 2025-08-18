'use client'

import React, {ComponentType, useEffect, useState} from 'react';
import {usePathname} from "next/navigation";
import ItemCard from "@/components/ItemCard";
import {PCComponent, useBuildStore} from "@/store/buildStore";
import {ItemCardSkeleton} from "@/components/skeletons/ItemCardSkeleton";

const Page = () => {

    const pathname = usePathname();
    const parts = pathname.split('/');
    const type =  parts[parts.length - 1];
    const curentComponents = useBuildStore(state => state.components);
    const activeIds = curentComponents.map(c => c.id);

    const [components, setComponents] = useState<PCComponent[]>([]);
    const [isLoading, setIsLoading] = useState(false)

    async function fetchData(type:string) {
        try{
            const response = await fetch(`/api/components/${type}`, {method:'GET'})
            const data = await response.json()

            return data;
        }catch (e) {
            console.error(e)
            return null
        }
    }

    useEffect(() => {
        async function getComponents(){
            setIsLoading(true);
            const data = await fetchData(type)
            if(data?.components) setComponents(data.components);
            else setComponents([]);
            setIsLoading(false);

        }
        getComponents();
    }, [type]);

    const filtredComponents = components.sort(
        (a, b) =>{
            const aActive = activeIds.includes(a.id) ? 0 : 1;
            const bActive = activeIds.includes(b.id) ? 0 : 1;
            return aActive - bActive;
        }
    )

    return (
        <section className="w-full h-full lg:justify-center flex flex-col ">
            <div className="w-full h-full px-3 py-10 lg:py-20 flex flex-col items-center">
                <div className="flex flex-row justify-between mb-8 max-w-[1000px] w-full">
                    <h2 className="font-satoshi font-bold text-lg">Masz do wyboru {filtredComponents.length} produkty z kategori &apos;{type}&apos; :</h2>
                </div>
                <div className="flex gap-4 flex-col max-w-[1000px] w-full">
                    {isLoading ? (
                        Array(5).fill(0).map((_, i) => <ItemCardSkeleton key={i} />)
                    ) :  filtredComponents.length > 0 ? (
                        filtredComponents.map((component) => (
                        <ItemCard
                        key={component.id}
                    isSelected={activeIds.includes(component.id)}
                    componentData={component}
                />
                ))
                ) : (
                <p className="text-center text-gray-500">Brak komponentów do wyświetlenia</p>
                )}

                </div>

            </div>
        </section>
    )
}
export default Page
