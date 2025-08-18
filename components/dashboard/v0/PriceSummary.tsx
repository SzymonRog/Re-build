import React from 'react'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {useBuildStore} from "@/store/buildStore";


const PriceSummary = () => {
    const components = useBuildStore(state => state.components)
    const totalPrice = useBuildStore(state => state.totalPrice)
    return (
        <Card className="bg-white hover:shadow-lg transition duration-300">
            <CardHeader>
                <CardTitle>Podsumowanie cen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    {components.map((component) => (
                        <div key={component.id} className="flex justify-between text-sm">
                            <span className="text-muted-foreground truncate mr-2">{component.type}</span>
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
    )
}
export default PriceSummary
