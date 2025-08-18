import React, {useState} from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {CheckCircle, Edit3} from "lucide-react";
import {useBuildStore} from "@/store/buildStore";
const BuildInfo2 = () => {
    const [isEditingName, setIsEditingName] = useState(false)
    const buildName = useBuildStore(state => state.name)
    const setName = useBuildStore((state) => state.setName)
    return (
        <Card className="bg-primary text-white hover:shadow-lg transition duration-300">
            <CardHeader >
                <div className="flex items-center justify-between ">
                    {isEditingName ? (
                        <div className="flex items-center space-x-2 flex-1 text-white">
                            <Input
                                value={buildName}
                                onChange={(e) => setName(e.target.value)}
                                className="text-lg font-semibold"
                            />
                            <Button size="sm" onClick={() => setIsEditingName(false)}>
                                <CheckCircle className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2 ">
                            <h1 className="text-2xl font-bold text-white">{buildName}</h1>
                            <Button variant="ghost" size="sm" onClick={() => setIsEditingName(true)}>
                                <Edit3 className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
                <CardDescription className="text-white">
                    Zarządzaj swoją konfiguracją PC i sprawdzaj kompatybilność podzespołów
                </CardDescription>
            </CardHeader>
        </Card>
    )
}
export default BuildInfo2
