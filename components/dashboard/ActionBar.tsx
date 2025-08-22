import React, {useState} from 'react'
import {Card, CardContent} from "@/components/ui/card";

import {Button} from "@/components/ui/button";
import { Copy, Save,Share } from 'lucide-react';
import {useBuildStore} from "@/store/buildStore";
import {useUserStore} from "@/store/user";
import {toast} from "sonner";
import {Skeleton} from "@/components/ui/skeleton";
import {updateBuild} from "@/lib/updateBuild";
import {useAutoSaveBuild} from "@/hooks/useAutoSaveBuild";
import {useBuildData} from "@/hooks/useBuildData";
import {redirect} from "next/navigation";



const ActionBar = () => {

    const name = useBuildStore(state => state.name)
    const components = useBuildStore(state => state.components)
    const componentsIds  = components.map(component => component.id)
    const totalPrice = useBuildStore(state => state.totalPrice)
    const setBuildId = useBuildStore(state => state.setBuildId)
    const buildId = useBuildStore(state => state.buildId)
    const buildIdDisplay = useBuildData().buildId

    const [isLoading, setIsLoading] = useState(false)
    const [copied, setCopied] = useState(false)
    const user = useUserStore(state => state.user)

    const buildURL = `http://localhost:3000/konfiguracja/${buildIdDisplay}`
    useAutoSaveBuild(buildId, componentsIds)
    async function handleSave(){

        try {

            if(!user){
                return toast('By zapisac swoja konfiguracje należy zalogowac sie')
            }
            if(componentsIds.length === 0){
                return toast('Brak komponentów w konfiguracji')
            }


            if(!buildId){
                setIsLoading(true)
                const response = await fetch(`/api/save/build`,
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            name,
                            componentsIds,
                            totalPrice
                        })}
                )
                const data = await response.json()
                setIsLoading(false)
                if(data.success){
                    const URL = `http://localhost:3000/konfiguracja/${data.data.id}`
                    setBuildId(data.data.id)
                    toast("Build zapisany ✅");
                    redirect(URL)
                }else{
                    console.error(data.error)
                    toast.error("Nie udało się zapisać builda");
                }
            }else{
                const success = await updateBuild(buildId, componentsIds)
                if (success) toast("Build zaktualizowany ✅");

            }


        }catch (e) {
            setIsLoading(false)
            console.error(e)
            toast.error('Wystąpił błąd podczas zapisywania konfiguracji');
        }
    }

    function handleCopy(){
        navigator.clipboard.writeText(buildURL)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        return;
    }
    return (
        <Card className="bg-white hover:shadow-xs transition duration-300 w-full max-w-[1700px] p-1 pl-0">
            <CardContent className="px-1">
                <div className="flex flex-row gap-4 justify-between ">
                    <div className="flex gap-3 items-center bg-muted px-3  rounded-lg w-[85%]">
                        <div className="relative group">
                            <Button className="hover:bg-muted bg-muted" onClick={handleCopy}>
                                <Copy className="group-hover:scale-115 h-4 w-4 text-black transition duration-300"/>
                            </Button>

                            {/* Tooltip */}
                            <div
                                className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-sm text-white rounded bg-primary transition-opacity duration-200 
                                ${copied ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                                {copied ? "Skopiowano!" : "Kopiuj"}
                            </div>
                        </div>
                        <hr className="w-[1.25px] bg-black rotate-180  h-5"/>
                        {isLoading ? <Skeleton className={"w-120 bg-secondary h-3 rounded-sm opacity-40"}/> : <p className="text-gray-600">{buildIdDisplay ? buildURL : 'Zapisz swoją konfiguracjie aby podzielić się nią ze wszystkimi'}</p>}

                    </div>
                    <div className="flex gap-2 items-center justify-end">
                        <Button className="bg-[#2FAE7F] hover:opacity-90 hover:bg-[#2FAE7F]" onClick={() => handleSave()}><Save/>Zapisz</Button>
                        <Button className="bg-[#2FAE7F] hover:opacity-90 hover:bg-[#2FAE7F]"><Share/>Udostępnij</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
export default ActionBar
