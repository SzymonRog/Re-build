import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Component = {
    id: string
    type: string
    name: string
    price: number
}

type BuildState = {
    name: string
    components: Component[]
    totalPrice: number

    setName: (name: string) => void
    addComponent: (component: Component) => void
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