'use client'
import React, {useEffect} from 'react'
import Compatibility from "@/components/dashboard/Compatibility";
import ComponentList from "@/components/dashboard/v0/ComponentList";
import PriceSummary from "@/components/dashboard/v0/PriceSummary";
import BuildInfo2 from "@/components/dashboard/v0/BuildInfo2";
import ActionBar from "@/components/dashboard/ActionBar";
import {useParams} from "next/navigation";
import {usePreviewBuildStore} from "@/store/previewBuildStore";
import {PCComponent, useBuildStore} from "@/store/buildStore";
import {toast} from "sonner";
import {updateBuild} from "@/lib/updateBuild";

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
                    buildId: result.data.id,
                    components: result.data.components
                        .map((bc:  { component: PCComponent | null }) => {// Debug każdy komponent
                            return bc.component;
                        })
                        .filter((component : PCComponent): component is PCComponent => component != null), // Usuń null/undefined
                };


                if (result.isOwner) {
                    usePreviewBuildStore.setState({ isOwner: true });
                    setBuild(mappedBuild);
                    updateBuild(mappedBuild.id, mappedBuild.components.map((c: PCComponent) => c.id))
                        .then(() => console.log("Auto-save po fetchu"))
                        .catch(console.error);
                } else {
                    usePreviewBuildStore.setState({ isOwner: false });
                    setPreviewBuild(mappedBuild);
                }


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
