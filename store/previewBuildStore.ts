import { create } from "zustand";
import {PCComponent, ValidationError} from "@/store/buildStore";
import {validateBuild} from "@/lib/validateBuild";


export type PreviewBuildState = {
    buildId: string | null;
    name: string;
    components: PCComponent[];
    totalPrice: number;
    errors: ValidationError[];
    isOwner: boolean;

    // akcje
    setBuild: (build: {
        buildId: string | null;
        name: string;
        components: PCComponent[];
        totalPrice: number;
        errors?: ValidationError[];
        isOwner: boolean;
    }) => void;

    validateBuild: () => void
    addComponent: (component: PCComponent) => void;
    removeComponent: (componentId: string) => void;
    markEdited: () => void;
    clearBuild: () => void;
};



export const usePreviewBuildStore = create<PreviewBuildState>((set, get) => ({
    buildId: null,
    name: "",
    components: [],
    totalPrice: 0,
    errors: [],
    isOwner: false,

    setBuild: ({ buildId, name, components, totalPrice, errors = [], isOwner }) => {
        set({
        buildId,
        name,
        components,
        totalPrice,
        errors,
        isOwner,
        })
        get().validateBuild();
    },



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

    clearBuild: () => set({
        buildId: null,
        name: "",
        components: [],
        totalPrice: 0,
        errors: [],
        isOwner: false,
        isEdited: false,
    }),
}));