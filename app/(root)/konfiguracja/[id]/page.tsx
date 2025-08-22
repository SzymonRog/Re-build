'use client'
import React, {useEffect} from 'react'
import Compatibility from "@/components/dashboard/Compatibility";
import ComponentList from "@/components/dashboard/v0/ComponentList";
import PriceSummary from "@/components/dashboard/v0/PriceSummary";
import BuildInfo2 from "@/components/dashboard/v0/BuildInfo2";
import ActionBar from "@/components/dashboard/ActionBar";
import {useParams} from "next/navigation";
import {usePreviewBuildStore} from "@/store/previewBuildStore";
import {useBuildStore} from "@/store/buildStore";
import {toast} from "sonner";

const Page = () => {
    const params = useParams();
    const buildId = params.id;
    const setPreviewBuild = usePreviewBuildStore(state => state.setBuild)
    const setBuild = useBuildStore(state => state.setBuild)
    useEffect(() => {
        if(!buildId) return;

        const fetchBuild = async () => {
            try {
                if(buildId === 'nowa') return;
                const response = await fetch(`/api/build/${buildId}`, { method: 'GET' });
                const result = await response.json();

                if (!result.success) {
                    console.error(result.error);
                    toast.error(result.error);
                    return;
                }
                // mapowanie komponentów z Prisma do PCComponent[]
                const mappedBuild = {
                    ...result.data,
                    components: result.data.components
                        .map((bc: any) => {
                            console.log("Mapping component:", bc.component); // Debug każdy komponent
                            return bc.component;
                        })
                        .filter(component => component != null), // Usuń null/undefined
                };


                if (result.isOwner) {
                    setBuild(mappedBuild);
                } else {
                    setPreviewBuild(mappedBuild);
                }
                usePreviewBuildStore.setState({ isOwner: result.isOwner });

            } catch (e) {
                console.error(e);
                toast.error("Błąd przy pobieraniu danych");
            }
        }
        fetchBuild();
    }, [buildId]);
    return (

        <>
            <div className="lg:flex flex-col gap-8 md:p-15 p-4  lg:items-center  w-full hidden">
                <ActionBar/>
                <div className="flex flex-row gap-8 justify-center w-full max-w-[1700px]">
                    <div className="flex flex-col gap-8 md:max-w-[400px] w-full">

                        <BuildInfo2/>
                        <Compatibility/>
                        <PriceSummary/>
                    </div>
                    <ComponentList/>
                </div>
            </div>

            <div className="max-lg:flex flex-col gap-3 md:p-15 py-4  lg:items-center  w-full hidden">
                <div className="flex flex-col gap-2 justify-center w-full max-w-[2000px]">
                    <BuildInfo2/>
                    <ComponentList/>
                    <PriceSummary/>
                    <Compatibility/>
                </div>
            </div>
        </>

    )
}
export default Page
