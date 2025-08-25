import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {validateBuild} from "@/lib/validateBuild";
import {JsonValue} from "@prisma/client/runtime/library";

export type PCComponent = {
    id: string
    type: string
    name: string
    description: JsonValue,
    specs: JsonValue,
    price: number
    imageUrl: string | null
}

export type ValidationError = {
    type: string,
    message: string,
    components?: PCComponent[],
}

export type BuildState = {
    buildId: string | null
    name: string
    components: PCComponent[]
    totalPrice: number
    errors: ValidationError[]
    isOwner: boolean

    // Ustawia cały zustand
    setBuild: (build: {
        buildId: string | null
        name: string
        components: PCComponent[]
        totalPrice: number
        errors: ValidationError[]
    }) => void
    setIsOwner: (isOwner: boolean) => void
    setBuildId: (id: string | null) => void
    setName: (name: string) => void
    addComponent: (component: PCComponent) => void
    removeComponent: (componentId: string) => void
    clearBuild: () => void
    calculateTotal: () => void
    validateBuild: () => void
}
export type BuildSaveData ={
    name: string
    components: PCComponent[]
    totalPrice: number
}

export const useBuildStore = create<BuildState>()(
    persist(
        (set, get) => ({
            name: 'Bez_nazwy',
            components: [],
            totalPrice: 0,
            errors: [],
            buildId: null,
            isOwner: false,

            setBuild: (build) => {
                set({
                    buildId: build.buildId,
                    name: build.name,
                    components: build.components,
                    totalPrice: build.totalPrice,
                    errors: build.errors,
                    isOwner: true,
                });
                get().validateBuild();
            },
            setIsOwner: (isOwner) => set({ isOwner }),
            setBuildId: (id) => set({ buildId: id }),
            setName: (name) => set({ name }),
            addComponent: (newComponent) => {
                const currentComponents = get().components;
                const updated = [
                    ...currentComponents.filter((c) => c.type !== newComponent.type),
                    newComponent,
                ];
                set({ components: updated }, false);
                get().calculateTotal();
                get().validateBuild();
            },
            removeComponent: (componentId) => {
                const currentComponents = get().components;
                const updated = currentComponents.filter((c) => c.id !== componentId);
                set({ components: updated }, false);
                get().calculateTotal();
                get().validateBuild();
            },
            clearBuild: () => {
                set({
                    components: [],
                    totalPrice: 0,
                })
                get().validateBuild();
            },
            calculateTotal: () => {
                const currentComponents = get().components;
                const total = currentComponents.reduce((acc, c) => acc + c.price, 0);
                set({ totalPrice: total }, false);
            },
            validateBuild: () => {
                const errors = validateBuild(get().components);
                set({ errors });
            },
        }),
        {
            name: 'pc-build-store',
        }
    )
)