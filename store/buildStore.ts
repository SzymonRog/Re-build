import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type PCComponent = {
    id: string
    type: string
    name: string
    price: number
    imageUrl?: string
}

export  type BuildState = {
    name: string
    components: PCComponent[]
    totalPrice: number

    setName: (name: string) => void
    addComponent: (component: PCComponent) => void
    removeComponent: (componentId: string) => void
    clearBuild: () => void
    calculateTotal: () => void
}


export const useBuildStore = create<BuildState>()(
    persist(
        (set, get) => ({
            name: 'NoName',
            components: [],
            totalPrice: 0,
            setName: () => {},
            addComponent: (newComponent) => {
                const currentComponents = get().components;
                const updated = [
                    ...currentComponents.filter((c) => c.type !== newComponent.type),
                    newComponent,
                ];
                set({ components: updated }, false);
                get().calculateTotal();
            },
            removeComponent: (componentId) => {
                const currentComponents = get().components;
                const updated = currentComponents.filter((c) => c.id !== componentId);
                set({ components: updated }, false);
                get().calculateTotal();
            },
            clearBuild: () => {
                set({
                    components: [],
                    totalPrice: 0,
                })
            },
            calculateTotal: () => {
                const currentComponents = get().components;
                const total = currentComponents.reduce((acc, c) => acc + c.price, 0);
                set({ totalPrice: total }, false);
            },
        }),
        {
            name: 'pc-build-store',
        }
    )
)