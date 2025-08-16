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
    Share2,
} from "lucide-react"


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
    const components = useBuildStore(state => state.components)
    const desiredOrder = ["cpu","cpuCooler", "motherboard", "ram", "storage", "gpu", "psu", "case"];
    const removeComponent = useBuildStore(state => state.removeComponent)
    const sortedComponents = components.slice().sort((a, b) => {
        const indexA = desiredOrder.indexOf(a.type)
        const indexB = desiredOrder.indexOf(b.type);
        return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB)
    })
    const errors = useBuildStore(state => state.errors)

    function hasErrors(component:PCComponent) : boolean {
        return errors.some(e => e.components?.some(c => c.type === component.type))
    }
    return (
        <Card className="bg-white w-full">
            <CardHeader>
                <CardTitle>Wybrane podzespoły</CardTitle>
                <CardDescription>
                    {sortedComponents.length} {sortedComponents.length === 1 ? "podzespół" : "podzespołów"} w konfiguracji
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {sortedComponents.map((component) => {
                    const IconComponent = categoryIcons[component.type as keyof typeof categoryIcons]
                    const hasError = hasErrors(component)
                    console.log(hasError)

                    return (
                        <div
                            key={component.id}
                            className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                            <div className="flex items-center space-x-4 flex-1">
                                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                                    {IconComponent && <IconComponent className="h-6 w-6 text-muted-foreground" />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <h3 className={`${hasError ? 'text-rose-700' : 'text-foreground'} font-medium`}>{component.name}</h3>
                                        {hasError && <AlertTriangle className="h-4 w-4 text-rose-600" />}
                                    </div>
                                    <p className={` ${hasError ? 'text-rose-600' : 'text-muted-foreground'} text-sm `}>{component.type}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-foreground">{component.price.toLocaleString("pl-PL")} zł</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                onClick={() => {removeComponent(component.id)}}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )
                })}

                {sortedComponents.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        <Cpu className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Brak wybranych podzespołów</p>
                        <p className="text-sm">Dodaj komponenty, aby rozpocząć budowę PC</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
export default ComponentList
