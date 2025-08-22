import React from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {PCComponent, useBuildStore} from "@/store/buildStore";
import {
    Cpu,
    HardDrive,
    Monitor,
    Zap,
    Box,
    Fan,
    MemoryStick,
    CircuitBoardIcon as Motherboard,
    AlertTriangle,
    CheckCircle,
    Trash2,
    Edit3,
    Save,
    Share2, Plus,
} from "lucide-react"
import Link from "next/link";
import {useBuildData} from "@/hooks/useBuildData";
import {useParams} from "next/navigation";


const categoryIcons = {
    cpu: Cpu,
    motherboard: Motherboard,
    ram: MemoryStick,
    gpu: Monitor,
    storage: HardDrive,
    psu: Zap,
    case: Box,
    cpuCooler: Fan,
}

const ComponentList = () => {
    const components =  useBuildData().components
    const desiredOrder = ["cpu","cpuCooler", "motherboard", "ram", "storage", "gpu", "psu", "case"];
    const removeComponent =  useBuildData().removeComponent
    const sortedComponents = components.slice().sort((a, b) => {
        const indexA = desiredOrder.indexOf(a.type)
        const indexB = desiredOrder.indexOf(b.type);
        return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB)
    })
    const params = useParams();
    const buildId = params.id;
    const errors = useBuildData().errors

    function hasErrors(component:PCComponent) : boolean {
        return errors.some(e => e.components?.some(c => c.type === component.type))
    }
    return (
        <Card className="bg-white w-full hover:shadow-lg transition duration-300">
            <CardHeader>
                <CardTitle>Wybrane podzespoły</CardTitle>
                <CardDescription>
                    {sortedComponents.length} {sortedComponents.length === 1 ? "podzespół" : "podzespołów"} w konfiguracji
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border-2 border-dashed border-primary/30 rounded-lg hover:border-primary/50 transition-colors bg-primary/5">
                    <div className="flex max-sm:flex-col max-sm:text-center max-sm:gap-4 items-center space-x-4 flex-1">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center border-2 border-dashed border-primary/30">
                            <Plus className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-medium text-foreground">Dodaj komponenty</h3>
                            <p className="text-sm text-muted-foreground">Kliknij aby przeglądać i dodawać nowe podzespoły</p>
                        </div>
                        <Link href="nowa/dodaj/any">
                            <Button className="bg-primary hover:bg-primary/90">
                                <Plus className="h-4 w-4 mr-1" />
                                Przeglądaj
                            </Button>
                        </Link>
                    </div>
                </div>

                {desiredOrder.map((category) => {
                    const IconComponent = categoryIcons[category as keyof typeof categoryIcons]
                    const existingComponent = components.find((comp) => comp.type === category)
                    if(existingComponent){
                        const hasError = hasErrors(existingComponent)
                        return (
                            <div
                                key={existingComponent.id}
                                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                                <div className="flex items-center space-x-4 flex-1">
                                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                                        {IconComponent && <IconComponent className="h-6 w-6 text-muted-foreground" />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2">
                                            <h3 className={`${hasError ? 'text-rose-700' : 'text-foreground'} font-medium line-clamp-2`}>{existingComponent.name}</h3>
                                            {hasError && <AlertTriangle className="h-4 w-4 text-rose-600" />}
                                        </div>
                                        <p className={` ${hasError ? 'text-rose-600' : 'text-muted-foreground'} text-sm `}>{existingComponent.type}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-foreground">{existingComponent.price.toLocaleString("pl-PL")} zł</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {removeComponent(existingComponent.id)}}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        )
                    }else {
                        return (
                            <div
                                key={category}
                                className="flex items-center justify-between p-4 border-2 border-dashed border-muted-foreground/30 rounded-lg hover:border-primary/50 transition-colors"
                            >
                                <div className="flex items-center space-x-4 flex-1">
                                    <div className="w-12 h-12 bg-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
                                        {IconComponent && <IconComponent className="h-6 w-6 text-muted-foreground/50" />}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-muted-foreground">Nie wybrano</h3>
                                        <p className="text-sm text-muted-foreground/70">{category}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-muted-foreground">-</p>
                                    </div>
                                    <Link href={`${buildId ? buildId : 'nowa'}/dodaj/${category}`}>
                                        <Button variant="outline" size="sm" className="bg-transparent">
                                            Dodaj
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )
                    }


                })}

            </CardContent>
        </Card>
    )
}
export default ComponentList
