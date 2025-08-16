"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
    Cpu,
    HardDrive,
    Monitor,
    Zap,
    MemoryStick,
    CircuitBoardIcon as Motherboard,
    AlertTriangle,
    CheckCircle,
    Trash2,
    Edit3,
    Save,
    Share2,
} from "lucide-react"

interface PCComponent {
    id: string
    category: string
    name: string
    price: number
    image?: string
    compatibility: "compatible" | "warning" | "error"
    compatibilityMessage?: string
}

const mockComponents: PCComponent[] = [
    {
        id: "1",
        category: "Procesor",
        name: "AMD Ryzen 7 7700X",
        price: 1299,
        compatibility: "compatible",
    },
    {
        id: "2",
        category: "Płyta główna",
        name: "ASUS ROG STRIX B650-F",
        price: 899,
        compatibility: "compatible",
    },
    {
        id: "3",
        category: "Pamięć RAM",
        name: "G.Skill Trident Z5 32GB DDR5-6000",
        price: 649,
        compatibility: "warning",
        compatibilityMessage: "Sprawdź kompatybilność z płytą główną",
    },
    {
        id: "4",
        category: "Karta graficzna",
        name: "NVIDIA GeForce RTX 4070 Ti",
        price: 3299,
        compatibility: "error",
        compatibilityMessage: "Zasilacz może być za słaby dla tej karty",
    },
    {
        id: "5",
        category: "Dysk SSD",
        name: "Samsung 980 PRO 1TB NVMe",
        price: 449,
        compatibility: "compatible",
    },
    {
        id: "6",
        category: "Zasilacz",
        name: "Corsair RM750x 750W",
        price: 599,
        compatibility: "warning",
        compatibilityMessage: "Zalecany 850W dla RTX 4070 Ti",
    },
]

const categoryIcons = {
    Procesor: Cpu,
    "Płyta główna": Motherboard,
    "Pamięć RAM": MemoryStick,
    "Karta graficzna": Monitor,
    "Dysk SSD": HardDrive,
    Zasilacz: Zap,
}

export default function DashboardPage() {
    const [components, setComponents] = useState<PCComponent[]>(mockComponents)
    const [buildName, setBuildName] = useState("Mój Gaming PC")
    const [isEditingName, setIsEditingName] = useState(false)

    const totalPrice = components.reduce((sum, component) => sum + component.price, 0)
    const compatibilityIssues = components.filter((c) => c.compatibility === "error")
    const compatibilityWarnings = components.filter((c) => c.compatibility === "warning")

    const removeComponent = (id: string) => {
        setComponents(components.filter((c) => c.id !== id))
    }

    const getCompatibilityColor = (compatibility: string) => {
        switch (compatibility) {
            case "compatible":
                return "text-green-600"
            case "warning":
                return "text-yellow-600"
            case "error":
                return "text-red-600"
            default:
                return "text-gray-600"
        }
    }

    const getCompatibilityIcon = (compatibility: string) => {
        switch (compatibility) {
            case "compatible":
                return <CheckCircle className="h-4 w-4 text-green-600" />
            case "warning":
                return <AlertTriangle className="h-4 w-4 text-yellow-600" />
            case "error":
                return <AlertTriangle className="h-4 w-4 text-red-600" />
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content - Component List */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Build Name */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    {isEditingName ? (
                                        <div className="flex items-center space-x-2 flex-1">
                                            <Input
                                                value={buildName}
                                                onChange={(e) => setBuildName(e.target.value)}
                                                className="text-lg font-semibold"
                                            />
                                            <Button size="sm" onClick={() => setIsEditingName(false)}>
                                                <CheckCircle className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-2">
                                            <h1 className="text-2xl font-bold text-foreground">{buildName}</h1>
                                            <Button variant="ghost" size="sm" onClick={() => setIsEditingName(true)}>
                                                <Edit3 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                <CardDescription>
                                    Zarządzaj swoją konfiguracją PC i sprawdzaj kompatybilność podzespołów
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        {/* Compatibility Alerts */}
                        {compatibilityIssues.length > 0 && (
                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Wykryto problemy z kompatybilnością</AlertTitle>
                                <AlertDescription>
                                    <ul className="mt-2 space-y-1">
                                        {compatibilityIssues.map((component) => (
                                            <li key={component.id} className="text-sm">
                                                • {component.name}: {component.compatibilityMessage}
                                            </li>
                                        ))}
                                    </ul>
                                </AlertDescription>
                            </Alert>
                        )}

                        {compatibilityWarnings.length > 0 && (
                            <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800">
                                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                                <AlertTitle>Ostrzeżenia dotyczące kompatybilności</AlertTitle>
                                <AlertDescription>
                                    <ul className="mt-2 space-y-1">
                                        {compatibilityWarnings.map((component) => (
                                            <li key={component.id} className="text-sm">
                                                • {component.name}: {component.compatibilityMessage}
                                            </li>
                                        ))}
                                    </ul>
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* Components List */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Wybrane podzespoły</CardTitle>
                                <CardDescription>
                                    {components.length} {components.length === 1 ? "podzespół" : "podzespołów"} w konfiguracji
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {components.map((component) => {
                                    const IconComponent = categoryIcons[component.category as keyof typeof categoryIcons]

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
                                                        <h3 className="font-medium text-foreground">{component.name}</h3>
                                                        {getCompatibilityIcon(component.compatibility)}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{component.category}</p>
                                                    {component.compatibilityMessage && (
                                                        <p className={`text-xs mt-1 ${getCompatibilityColor(component.compatibility)}`}>
                                                            {component.compatibilityMessage}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold text-foreground">{component.price.toLocaleString("pl-PL")} zł</p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeComponent(component.id)}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                })}

                                {components.length === 0 && (
                                    <div className="text-center py-12 text-muted-foreground">
                                        <Cpu className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>Brak wybranych podzespołów</p>
                                        <p className="text-sm">Dodaj komponenty, aby rozpocząć budowę PC</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar - Build Summary */}
                    <div className="space-y-6">
                        {/* Price Summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Podsumowanie cen</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    {components.map((component) => (
                                        <div key={component.id} className="flex justify-between text-sm">
                                            <span className="text-muted-foreground truncate mr-2">{component.category}</span>
                                            <span className="font-medium">{component.price.toLocaleString("pl-PL")} zł</span>
                                        </div>
                                    ))}
                                </div>

                                {components.length > 0 && (
                                    <>
                                        <Separator />
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-semibold">Łączna cena:</span>
                                            <span className="text-2xl font-bold text-primary">{totalPrice.toLocaleString("pl-PL")} zł</span>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        {/* Build Status */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Status buildu</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Kompatybilność</span>
                                    <Badge
                                        variant={
                                            compatibilityIssues.length > 0
                                                ? "destructive"
                                                : compatibilityWarnings.length > 0
                                                    ? "secondary"
                                                    : "default"
                                        }
                                    >
                                        {compatibilityIssues.length > 0 ? "Błędy" : compatibilityWarnings.length > 0 ? "Ostrzeżenia" : "OK"}
                                    </Badge>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Kompletność</span>
                                    <Badge variant="outline">{components.length}/8 podzespołów</Badge>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Szacowane TDP</span>
                                    <span className="text-sm font-medium">~450W</span>
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Brakujące komponenty:</Label>
                                    <div className="space-y-1">
                                        {["Obudowa", "Chłodzenie CPU"].map((missing) => (
                                            <div key={missing} className="text-xs text-muted-foreground flex items-center">
                                                <div className="w-2 h-2 bg-muted-foreground/30 rounded-full mr-2" />
                                                {missing}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Szybkie akcje</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button className="w-full bg-transparent" variant="outline">
                                    Dodaj podzespół
                                </Button>
                                <Button className="w-full bg-transparent" variant="outline">
                                    Sprawdź alternatywy
                                </Button>
                                <Button className="w-full bg-transparent" variant="outline">
                                    Eksportuj listę
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
