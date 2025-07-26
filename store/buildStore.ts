import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type PCComponent = {
    id: string
    type: string
    name: string
    price: number
    imageUrl: string
}

export  type BuildState = {
    name: string
    components: PCComponent[]
    totalPrice: number

    setName: (name: string) => void
    addComponent: (component: PCComponent) => void
    removeComponent: (type: string) => void
    clearBuild: () => void
    calculateTotal: () => void
}


export const useBuildStore = create<BuildState>()(
    persist(
        (set, get) => ({
            name: '',
            components: [],
            totalPrice: 0,
            setName: () => {},
            addComponent: () => {},
            removeComponent: () => {},
            clearBuild: () => {},
            calculateTotal: () => {},
        }),
        {
            name: 'pc-build-store',
        }
    )
)