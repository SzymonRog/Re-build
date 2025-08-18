import React from 'react'
import Image from "next/image";
import {PCComponent, useBuildStore} from "@/store/buildStore";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {cn} from "tailwind-variants";

const Compatibility = () => {
    const errors = useBuildStore(state => state.errors)
    const errorsCount = errors.length

    function  formatErrorMessage(message:string, components:PCComponent[] = []){
        let formatted = message;
        components.forEach(component => {
            formatted = formatted.replace(component.name, `<strong class="font-medium">${component.name}</strong>`)
        })
        return formatted;
    }

    return (
        <Card className="bg-white hover:shadow-lg transition duration-300">
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center gap-3">
                        {errorsCount ? (<Image src='/error.svg' alt='error icon' width={24} height={24}/>) : (<Image src="/check.svg" alt="checkmark" width={34} height={34}/>)}
                        <p className="text-2xl">{errorsCount ? 'Nie Kompatybilne' : 'Kompatybilne'}</p>
                    </div>

                </CardTitle>
                <CardDescription>
                    {errorsCount ?
                        'Któryś z komponentów nie pasuje do reszty' :
                        'Wszystkie twoje podzespoły są kompatybilne'}

                </CardDescription>
                {errorsCount ? (<Separator className="mt-2 bg-gray-400"/>) : <></>}
            </CardHeader>
            {errorsCount ? (
                <CardContent className="space-y-4">
                    <div className="space-y-4">
                        {errors.map((error, index) => (
                            <div key={index} className="flex gap-4">
                                <div className={`flex max-w-[25px] max-h-[25px] w-full h-full ${error.type == 'missing_component' ? 'bg-[#F59E0B]' :'bg-[#E11D48]' } rounded-lg justify-center items-center text-center text-white`}>{index + 1}</div>
                                <p dangerouslySetInnerHTML={{ __html: formatErrorMessage(error.message, error?.components) }} className={`${error.type == 'missing_component' ? 'text-amber-700' :'text-rose-700' }`}></p>
                            </div>
                        ))}
                    </div>

                </CardContent>
            ) :  <></>}

        </Card>
    )
}
export default Compatibility
