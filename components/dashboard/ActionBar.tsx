import React from 'react'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import { Copy, Save,Share } from 'lucide-react';

const ActionBar = () => {
    return (
        <Card className="bg-white hover:shadow-xs transition duration-300 w-full max-w-[1700px] p-1 pl-0">
            <CardContent className="px-1">
                <div className="flex flex-row gap-4 justify-between ">
                    <div className="flex gap-3 items-center bg-muted px-3  rounded-lg w-[85%]">
                        <Button className=" hover:bg-muted bg-muted group"><Copy className="group-hover:scale-115 h-4 w-4 text-black transition duration-300"/></Button>
                        <hr className="w-[1.25px] bg-black rotate-180  h-5"/>
                        <p className="">https://re-build.com/list/fqnKVF</p>
                    </div>
                    <div className="flex gap-3 items-center justify-end">
                        <Button className="bg-[#2FAE7F] hover:opacity-90 hover:bg-[#2FAE7F]"><Save/>Zapisz</Button>
                        <Button className="bg-[#2FAE7F] hover:opacity-90 hover:bg-[#2FAE7F]"><Share/>Udostępnij</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
export default ActionBar
